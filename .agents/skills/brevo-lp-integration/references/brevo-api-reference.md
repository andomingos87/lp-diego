# Brevo API — Referência Completa

## Sumário

1. [Autenticação](#autenticação)
2. [Contacts](#contacts)
3. [Lists](#lists)
4. [Transactional Email](#transactional-email)
5. [Webhooks](#webhooks)
6. [Rate Limits](#rate-limits)
7. [Erros Comuns](#erros-comuns)

---

## Autenticação

**Header:** `api-key`

```http
api-key: xkeysib-xxxxxxxxxxxxxxxx
```

Onde obter: Brevo Dashboard → Settings → SMTP & API → API Keys → Generate a new API key.

Permissões necessárias para esta integração:
- Contacts: Create/Update
- Lists: Read (para listar IDs)

---

## Contacts

### Criar Contato

```http
POST https://api.brevo.com/v3/contacts
Content-Type: application/json
Accept: application/json
api-key: <KEY>
```

**Body:**

```json
{
  "email": "user@example.com",
  "updateEnabled": true,
  "listIds": [3, 5],
  "attributes": {
    "NOME": "Maria Silva",
    "SMS": "+5511999887766",
    "CIDADE_ESTADO": "Curitiba/PR",
    "CUSTOM_FIELD": "valor"
  }
}
```

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `email` | string | Não* | Email do contato (*obrigatório se não tiver SMS) |
| `updateEnabled` | boolean | Não | Se `true`, atualiza contato existente em vez de retornar erro |
| `listIds` | number[] | Não | IDs das listas para adicionar o contato |
| `attributes` | object | Não | Atributos personalizados (devem existir no Brevo) |
| `emailBlacklisted` | boolean | Não | Bloquear envio de emails |
| `smsBlacklisted` | boolean | Não | Bloquear envio de SMS |

**Respostas:**
- `201` — Contato criado: `{ "id": 123 }`
- `204` — Contato atualizado (quando `updateEnabled: true` e contato já existe)
- `400` — Validação falhou (atributo não existe, formato inválido)
- `401` — API key inválida
- `429` — Rate limit excedido

### Buscar Contato

```http
GET https://api.brevo.com/v3/contacts/{identifier}
```

`identifier` pode ser email, ID numérico, ou SMS.

**Resposta 200:**
```json
{
  "id": 123,
  "email": "user@example.com",
  "emailBlacklisted": false,
  "smsBlacklisted": false,
  "listIds": [3],
  "attributes": {
    "NOME": "Maria Silva",
    "SMS": "+5511999887766"
  },
  "createdAt": "2024-01-15T10:30:00Z",
  "modifiedAt": "2024-01-15T10:30:00Z"
}
```

### Atualizar Contato

```http
PUT https://api.brevo.com/v3/contacts/{identifier}
```

**Body (apenas campos a atualizar):**
```json
{
  "attributes": {
    "PERFIL": "Administrador"
  },
  "listIds": [3, 7]
}
```

### Listar Contatos

```http
GET https://api.brevo.com/v3/contacts?limit=50&offset=0
```

| Parâmetro | Tipo | Default | Descrição |
|---|---|---|---|
| `limit` | number | 50 | Máximo 1000 |
| `offset` | number | 0 | Paginação |
| `modifiedSince` | string | — | Filtrar por data ISO 8601 |

### Deletar Contato

```http
DELETE https://api.brevo.com/v3/contacts/{identifier}
```

Retorna `204 No Content`.

---

## Lists

### Listar Todas as Listas

```http
GET https://api.brevo.com/v3/contacts/lists?limit=50&offset=0
```

**Resposta:**
```json
{
  "lists": [
    {
      "id": 3,
      "name": "Leads Landing Page",
      "totalSubscribers": 245,
      "totalBlacklisted": 2
    }
  ],
  "count": 1
}
```

### Contatos de uma Lista

```http
GET https://api.brevo.com/v3/contacts/lists/{listId}/contacts?limit=50&offset=0
```

### Adicionar Contatos a uma Lista

```http
POST https://api.brevo.com/v3/contacts/lists/{listId}/contacts/add
```

```json
{
  "emails": ["a@example.com", "b@example.com"]
}
```

---

## Transactional Email

### Enviar Email Transacional

```http
POST https://api.brevo.com/v3/smtp/email
```

```json
{
  "to": [{ "email": "lead@example.com", "name": "João" }],
  "templateId": 5,
  "params": {
    "NOME": "João",
    "CIDADE": "São Paulo"
  }
}
```

O `templateId` se refere a templates criados no Brevo Dashboard → Transactional → Email Templates.

### Double Opt-in

```http
POST https://api.brevo.com/v3/contacts/doubleOptinConfirmation
```

```json
{
  "email": "lead@example.com",
  "attributes": {
    "NOME": "Maria"
  },
  "templateId": 1,
  "redirectionUrl": "https://seusite.com/confirmado",
  "includeListIds": [3]
}
```

---

## Webhooks

### Webhook de Automação

Configurar no Brevo: Automations → Webhook.

O payload enviado pela LP para o webhook:

```json
{
  "name": "João Silva",
  "phone": "+5511999887766",
  "cityState": "São Paulo/SP",
  "role": "Síndico profissional",
  "revenueRange": "Até R$ 50.000",
  "source": "lp-diego",
  "createdAt": "2026-04-05T14:30:00.000Z"
}
```

### Webhook de Eventos (Brevo → Seu Servidor)

Brevo pode notificar seu servidor sobre eventos:

```http
POST https://api.brevo.com/v3/webhooks
```

```json
{
  "url": "https://seusite.com/api/brevo-webhook",
  "events": ["contactUpdated", "contactDeleted"],
  "type": "transactional"
}
```

---

## Rate Limits

| Endpoint | RPH (por hora) | RPS (por segundo) |
|---|---|---|
| Contacts (CRUD) | 36.000 | 10 |
| Email transacional | 3.600.000 | 1.000 |
| SMS | 540.000 | 150 |
| Outros endpoints | 100 | — |

Ao exceder: HTTP `429 Too Many Requests`.

### Estratégia de Retry

Para landing pages com tráfego moderado, 10 RPS é suficiente. Se necessário:

```typescript
async function sendWithRetry(fn: () => Promise<void>, maxRetries = 3): Promise<void> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      await fn();
      return;
    } catch (err: any) {
      if (err.message?.includes("429") && attempt < maxRetries - 1) {
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        continue;
      }
      throw err;
    }
  }
}
```

---

## Erros Comuns

| Código | Causa | Solução |
|---|---|---|
| `400` `attribute_not_found` | Atributo não existe no Brevo | Criar no dashboard: Contacts → Settings → Contact Attributes |
| `400` `duplicate_parameter` | Contato já existe | Usar `updateEnabled: true` |
| `401` `unauthorized` | API key inválida ou expirada | Gerar nova key no dashboard |
| `429` `too_many_requests` | Rate limit excedido | Implementar retry com backoff |
| `400` `invalid_parameter` | Formato do SMS inválido | Usar formato E.164: `+5511999887766` |
