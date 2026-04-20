---
name: brevo-lp-troubleshoot
description: |
  Diagnóstico e resolução de problemas na integração Brevo com a landing page de leads condominiais. Use esta skill SEMPRE que o usuário mencionar: leads não chegam no Brevo, erro ao enviar formulário, erro 400 Brevo, erro 401 Brevo, erro 429 Brevo, contato não aparece na lista, atributo não encontrado, API key não funciona, formulário não envia, lead duplicado, telefone inválido no Brevo, webhook não funciona, CORS Brevo, debug integração, testar envio Brevo, verificar se Brevo está funcionando, "o formulário dá erro", "os leads não estão aparecendo", "não consigo enviar para o Brevo", ou qualquer problema relacionado ao fluxo formulário → Brevo. Também dispara quando o usuário compartilha logs de erro, stack traces, ou screenshots de erros relacionados à integração.
---

# Brevo LP Troubleshoot

Skill para diagnosticar e resolver problemas na integração entre a landing page e a API Brevo.

## Fluxo de Diagnóstico

Ao investigar um problema, seguir esta sequência ordenada. Cada etapa tem as verificações mais comuns e os comandos/testes para confirmar.

### 1. Identificar onde o erro acontece

O fluxo de dados é:

```
Formulário (Web.tsx) → submitLeadToBrevo() → [Frontend ou Backend] → API Brevo
```

Perguntar ao usuário:
- O formulário mostra mensagem de erro? (frontend)
- O erro aparece no console do browser? (frontend)
- O erro aparece nos logs do servidor? (backend)
- O lead aparece no banco mas não no Brevo? (backend → Brevo)

### 2. Verificar Variáveis de Ambiente

**Se integração client-side (atual):**

Verificar se as variáveis VITE_ estão definidas no `.env` e acessíveis no build:

```bash
# Verificar se o .env existe e tem as keys
cat .env | grep -i brevo

# As variáveis VITE_ precisam estar no .env na raiz do projeto
# e o servidor dev precisa ser reiniciado após alteração
```

Variáveis esperadas:
- `VITE_BREVO_API_KEY` — obrigatória (começa com `xkeysib-`)
- `VITE_BREVO_LIST_ID` — opcional (número inteiro)
- `VITE_BREVO_WEBHOOK_URL` — opcional (URL completa)

**Se integração server-side (recomendada):**
- `BREVO_API_KEY` — sem prefixo VITE_
- `BREVO_LIST_ID` — opcional

Erro comum: usar `BREVO_API_KEY` no frontend (sem VITE_) — Vite não expõe variáveis sem o prefixo `VITE_`.

### 3. Problemas por Código de Erro

#### Erro 400 — Bad Request

**Causa mais comum:** Atributo não existe no Brevo.

```
Brevo API 400: {"code":"invalid_parameter","message":"Attribute PERFIL does not exist"}
```

**Solução:** Criar o atributo no Brevo Dashboard:
1. Contacts → Settings → Contact Attributes
2. Adicionar cada atributo que está faltando:
   - `NOME` (Text)
   - `CIDADE_ESTADO` (Text)
   - `PERFIL` (Text)
   - `FAIXA_GESTAO` (Text)
   - `FONTE` (Text)

**Outra causa:** Formato inválido do SMS.

```
"message":"SMS number is not valid"
```

**Solução:** Verificar se `normalizePhoneToE164()` está sendo chamada. O telefone deve chegar como `+5511999887766` (E.164). Verificar em `client/src/lib/brevo.ts` que a normalização acontece antes do envio.

**Teste manual:**
```bash
curl -X POST https://api.brevo.com/v3/contacts \
  -H "api-key: SUA_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "updateEnabled": true,
    "attributes": {
      "NOME": "Teste",
      "SMS": "+5511999998888",
      "CIDADE_ESTADO": "São Paulo/SP",
      "PERFIL": "Síndico profissional",
      "FAIXA_GESTAO": "Até R$ 50.000",
      "FONTE": "Landing Page"
    }
  }'
```

#### Erro 401 — Unauthorized

**Causa:** API key inválida, expirada, ou não enviada.

**Verificações:**
1. A key começa com `xkeysib-`?
2. A key foi copiada completamente (sem espaços)?
3. A key está ativa no dashboard? (Settings → SMTP & API → API Keys)
4. O header é `api-key` (não `Authorization` ou `Bearer`)

#### Erro 429 — Too Many Requests

**Causa:** Excedeu 10 RPS ou 36.000 RPH no endpoint de contacts.

**Solução:**
- Para tráfego normal de LP, isso raramente acontece
- Se ocorrer, implementar retry com exponential backoff
- Se importando leads em massa, adicionar delay entre requests

#### Erro de CORS (apenas client-side)

```
Access to fetch at 'https://api.brevo.com/v3/contacts' from origin 'http://localhost:5000'
has been blocked by CORS policy
```

**Causa:** A API Brevo não permite CORS de todos os domínios.

**Soluções:**
1. **Migrar para server-side** (recomendado) — consultar skill `brevo-lp-integration`
2. **Usar webhook** — `VITE_BREVO_WEBHOOK_URL` pode aceitar CORS se configurado no Brevo Automations
3. **Proxy via backend** — criar rota `/api/brevo-proxy` que repassa para a API Brevo

### 4. Lead salvo no banco mas não aparece no Brevo

Se usando integração server-side com PostgreSQL:

1. Verificar logs do servidor por erros no envio Brevo
2. O envio para Brevo pode ter falhado silenciosamente (o endpoint retorna 201 mesmo se Brevo falhar)
3. Buscar o contato no Brevo por SMS:
   ```bash
   curl -X GET "https://api.brevo.com/v3/contacts/+5511999998888" \
     -H "api-key: SUA_KEY"
   ```
4. Verificar se o contato está na lista correta:
   ```bash
   curl -X GET "https://api.brevo.com/v3/contacts/lists/3/contacts?limit=10" \
     -H "api-key: SUA_KEY"
   ```

### 5. Lead aparece no Brevo mas sem atributos

**Causa:** Os atributos foram enviados mas não existiam no Brevo no momento do envio. O Brevo cria o contato mas ignora atributos desconhecidos silenciosamente.

**Solução:**
1. Criar todos os atributos no dashboard (ver seção 3, erro 400)
2. Reenviar o lead ou atualizar manualmente

### 6. Formulário não envia (sem erro visível)

**Verificações frontend:**
1. Abrir DevTools → Network → filtrar por `brevo` ou `contacts` ou `leads`
2. Verificar se a request está sendo feita
3. Verificar o status da response
4. Verificar o body da request (os dados estão corretos?)

**Verificações de código:**
1. `Web.tsx` está chamando `mutation.mutate()` no submit?
2. O `handleSubmit` previne default com `e.preventDefault()`?
3. Os campos `name`, `phone`, `cityState` têm atributo `name` correto no HTML?
4. Os radio buttons têm `name="role"` e `name="revenueRange"`?

### 7. Webhook não funciona

Se usando `VITE_BREVO_WEBHOOK_URL`:

1. Verificar se a URL é acessível:
   ```bash
   curl -X POST "SUA_WEBHOOK_URL" \
     -H "Content-Type: application/json" \
     -d '{"test": true}'
   ```
2. Verificar se o webhook está ativo no Brevo Automations
3. O formato do payload deve ser o esperado pelo webhook (ver `postToBrevoWebhook` em `brevo.ts`)

## Script de Teste Rápido

Para validar a integração de ponta a ponta, executar este script no terminal do servidor:

```bash
# Testar criação de contato na API Brevo
curl -s -w "\nHTTP Status: %{http_code}\n" \
  -X POST https://api.brevo.com/v3/contacts \
  -H "api-key: ${BREVO_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "updateEnabled": true,
    "attributes": {
      "NOME": "Teste Integração",
      "SMS": "+5500000000000",
      "CIDADE_ESTADO": "Teste/TS",
      "PERFIL": "Síndico profissional",
      "FAIXA_GESTAO": "Até R$ 20.000",
      "FONTE": "Teste Script"
    }
  }'
```

Resultado esperado: `HTTP Status: 201` (criado) ou `204` (atualizado).

## Checklist de Diagnóstico Rápido

Quando um lead não chega ao Brevo, verificar nesta ordem:

1. [ ] `.env` tem a API key correta (`xkeysib-...`)
2. [ ] Servidor foi reiniciado após alterar `.env`
3. [ ] Atributos existem no dashboard Brevo
4. [ ] Telefone está no formato E.164
5. [ ] Console do browser não mostra erros CORS
6. [ ] Network tab mostra a request saindo com status 2xx
7. [ ] Contato não está em lista de blacklist no Brevo
8. [ ] Rate limit não foi excedido (verificar logs por 429)
