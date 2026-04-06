---
name: brevo-lp-integration
description: |
  Integração completa da API Brevo (ex-Sendinblue) com a landing page de captura de leads para o projeto de Soluções Condominiais. Use esta skill SEMPRE que o usuário mencionar: integrar Brevo, configurar Brevo, API Brevo, cadastrar leads no Brevo, enviar contatos para Brevo, criar contato Brevo, configurar lista Brevo, atributos Brevo, migrar integração para backend, webhook Brevo, VITE_BREVO_API_KEY, VITE_BREVO_LIST_ID, VITE_BREVO_WEBHOOK_URL, automação de leads, pipeline de leads, CRM Brevo, ou qualquer tarefa envolvendo a conexão entre o formulário da LP e a plataforma Brevo. Também dispara quando o usuário quer mover a chamada Brevo do frontend para o backend, adicionar novos campos ao contato, configurar listas de segmentação, ou implementar double opt-in.
---

# Brevo LP Integration

Skill para configurar, implementar e manter a integração entre a landing page de captura de leads e a API Brevo (ex-Sendinblue).

## Contexto do Projeto

Esta landing page é para uma marca brasileira de serviços condominiais. O formulário captura leads com os seguintes campos:

| Campo do Form | Atributo Brevo | Tipo |
|---|---|---|
| `name` | `NOME` | texto |
| `phone` | `SMS` | telefone E.164 (`+55...`) |
| `cityState` | `CIDADE_ESTADO` | texto |
| `role` | `PERFIL` | enum: "Síndico profissional", "Administrador", "Síndico morador" |
| `revenueRange` | `FAIXA_GESTAO` | enum: "Até R$ 20.000", "Até R$ 50.000", "Acima de R$ 50.000 até R$ 100.000" |
| (automático) | `FONTE` | fixo: "Landing Page" |

## Arquitetura Atual

O fluxo atual chama a API Brevo **diretamente do frontend** (client-side):

```
Web.tsx form → submitLeadToBrevo() → POST https://api.brevo.com/v3/contacts
                                      (api-key exposta no browser)
```

Arquivos-chave:
- `client/src/lib/brevo.ts` — lógica de envio (API direta + fallback webhook)
- `client/src/pages/Web.tsx` — formulário que chama `submitLeadToBrevo()`
- `server/routes.ts` — vazio (sem processamento server-side)
- `shared/schema.ts` — schema Drizzle + validação Zod dos leads

### Problema de Segurança

A API key está exposta como `VITE_BREVO_API_KEY` no frontend. Qualquer pessoa pode inspecionar o código e usar a key. A migração para o backend é altamente recomendada.

## API Brevo — Referência Rápida

### Autenticação
- Header: `api-key: <SUA_CHAVE_API>`
- Obter chave: Brevo Dashboard → Settings → SMTP & API → API Keys

### Base URL
```
https://api.brevo.com/v3
```

### Rate Limits
- Contacts: **10 RPS** (requests por segundo) / **36.000 RPH** (por hora)
- Erro ao exceder: HTTP `429 Too Many Requests`

### Criar/Atualizar Contato

```http
POST /v3/contacts
Content-Type: application/json
api-key: <KEY>
```

```json
{
  "email": "email@exemplo.com",
  "updateEnabled": true,
  "listIds": [3],
  "attributes": {
    "NOME": "João Silva",
    "SMS": "+5511999998888",
    "CIDADE_ESTADO": "São Paulo/SP",
    "PERFIL": "Síndico profissional",
    "FAIXA_GESTAO": "Até R$ 50.000",
    "FONTE": "Landing Page"
  }
}
```

**Campos do body:**
- `email` (string, opcional se SMS presente) — email do contato
- `updateEnabled` (boolean) — `true` para atualizar se já existir
- `listIds` (number[]) — IDs das listas para adicionar o contato
- `attributes` (object) — atributos personalizados (devem existir no Brevo antes)

**Respostas:**
- `201 Created` — `{ "id": 123 }`
- `204 No Content` — contato atualizado (quando `updateEnabled: true`)
- `400 Bad Request` — campos inválidos
- `429 Too Many Requests` — rate limit excedido

### Normalização de Telefone

Brevo espera telefone no formato E.164 para SMS. A função `normalizePhoneToE164` em `brevo.ts` já faz isso:
- `(11) 99999-8888` → `+5511999998888`
- `011999998888` → `+5511999998888`
- `5511999998888` → `+5511999998888`

## Guia de Implementação

### Opção 1: Migrar para Server-Side (Recomendado)

A abordagem mais segura é rotear a chamada Brevo pelo backend Express. Isso protege a API key e permite persistir o lead no PostgreSQL simultaneamente.

#### Passo 1 — Criar endpoint no backend

Em `server/routes.ts`, criar `POST /api/leads` que:
1. Valida o body com `insertLeadSchema` (Zod, já existe em `shared/schema.ts`)
2. Salva no PostgreSQL via `storage.insertLead()`
3. Envia para Brevo API usando a key do servidor (`process.env.BREVO_API_KEY`)
4. Retorna sucesso mesmo se Brevo falhar (o lead já está salvo no banco)

```typescript
// server/routes.ts
import { insertLeadSchema } from "@shared/schema";
import { storage } from "./storage";

app.post("/api/leads", async (req, res) => {
  const parsed = insertLeadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  // 1. Salvar no banco local (fonte de verdade)
  const lead = await storage.insertLead(parsed.data);

  // 2. Enviar para Brevo (best-effort, não bloqueia o usuário)
  try {
    await sendToBrevo(parsed.data);
  } catch (err) {
    console.error("[Brevo] Falha ao enviar lead:", err);
    // Lead já está salvo no banco — pode retentar depois
  }

  res.status(201).json({ id: lead.id });
});
```

#### Passo 2 — Criar função server-side para Brevo

Criar `server/brevo.ts` com a lógica de envio. A API key vem de `process.env.BREVO_API_KEY` (sem prefixo VITE_).

```typescript
// server/brevo.ts
interface LeadData {
  name: string;
  phone: string;
  cityState: string;
  role: string;
  revenueRange: string;
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("55")) return `+${digits}`;
  if (digits.startsWith("0")) return `+55${digits.slice(1)}`;
  return `+55${digits}`;
}

export async function sendToBrevo(lead: LeadData): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("BREVO_API_KEY não configurada");
  }

  const listId = process.env.BREVO_LIST_ID
    ? Number(process.env.BREVO_LIST_ID)
    : undefined;

  const body: Record<string, unknown> = {
    updateEnabled: true,
    attributes: {
      NOME: lead.name,
      SMS: normalizePhone(lead.phone),
      CIDADE_ESTADO: lead.cityState,
      PERFIL: lead.role,
      FAIXA_GESTAO: lead.revenueRange,
      FONTE: "Landing Page",
    },
  };

  if (listId && Number.isFinite(listId)) {
    body.listIds = [listId];
  }

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Brevo ${res.status}: ${text}`);
  }
}
```

#### Passo 3 — Atualizar o frontend

Modificar `client/src/lib/brevo.ts` (ou `Web.tsx`) para chamar o endpoint local em vez da API Brevo diretamente:

```typescript
export async function submitLead(lead: LeadPayload): Promise<void> {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status}: ${text}`);
  }
}
```

#### Passo 4 — Variáveis de ambiente

Remover `VITE_BREVO_API_KEY` e `VITE_BREVO_LIST_ID` (frontend).
Adicionar ao `.env` do servidor:
```
BREVO_API_KEY=xkeysib-...
BREVO_LIST_ID=3
```

### Opção 2: Manter Client-Side (já implementado)

A integração atual em `client/src/lib/brevo.ts` já funciona. Usa duas estratégias em cascata:

1. **Webhook** (preferido se `VITE_BREVO_WEBHOOK_URL` estiver definido) — envia payload para URL de automação Brevo
2. **API direta** (fallback) — `POST /v3/contacts` com a key no header

Para usar a integração client-side atual, basta definir as env vars:
```
VITE_BREVO_API_KEY=xkeysib-...
VITE_BREVO_LIST_ID=3          # opcional
VITE_BREVO_WEBHOOK_URL=...    # opcional, tem prioridade sobre API
```

## Configuração no Dashboard Brevo

### Criar Atributos Personalizados

Antes de enviar contatos, os atributos devem existir no Brevo:

1. Acessar: Brevo → Contacts → Settings → Contact Attributes
2. Criar cada atributo:
   - `NOME` — Type: Text
   - `CIDADE_ESTADO` — Type: Text
   - `PERFIL` — Type: Text (ou Category com os 3 valores)
   - `FAIXA_GESTAO` — Type: Text (ou Category com os 3 valores)
   - `FONTE` — Type: Text
   - `SMS` — já existe por padrão no Brevo

### Criar Lista de Contatos

1. Acessar: Brevo → Contacts → Lists → Add a new list
2. Nomear: "Leads Landing Page" (ou similar)
3. Anotar o **List ID** (número) — usar como `BREVO_LIST_ID`

## Extensões Comuns

### Adicionar campo de email ao formulário

Se o formulário passar a coletar email, adicionar ao body da request:
```json
{ "email": "lead@email.com", ...resto }
```
O email é o identificador principal no Brevo. Sem email, o contato é identificado pelo SMS.

### Double Opt-in

Para implementar double opt-in (confirmação por email):
```json
{
  "email": "lead@email.com",
  "templateId": 1,
  "redirectionUrl": "https://seusite.com/confirmado",
  "updateEnabled": true
}
```
Usar `POST /v3/contacts/doubleOptinConfirmation` em vez de `/v3/contacts`.

### Enviar Email Transacional após Captura

Após salvar o lead, disparar email de boas-vindas:
```http
POST /v3/smtp/email
```
```json
{
  "templateId": 5,
  "to": [{ "email": "lead@email.com", "name": "João" }],
  "params": { "NOME": "João" }
}
```

### Webhook para Automações

Para integrar com automações Brevo (workflows), usar webhook em vez de API direta. Configurar no Brevo: Automations → New Automation → Webhook trigger. O payload enviado deve seguir o formato que o webhook espera.

## Checklist de Integração

Antes de ir para produção, verificar:

- [ ] API key no servidor (não no frontend)
- [ ] Atributos criados no dashboard Brevo (NOME, CIDADE_ESTADO, PERFIL, FAIXA_GESTAO, FONTE)
- [ ] Lista criada e ID configurado
- [ ] Lead salvo no PostgreSQL como fonte de verdade
- [ ] Envio para Brevo é best-effort (não bloqueia se falhar)
- [ ] Tratamento de erro 429 (rate limit) com retry
- [ ] Logs de falha no envio para Brevo
- [ ] Variáveis `VITE_BREVO_*` removidas do frontend (se migrou para backend)
