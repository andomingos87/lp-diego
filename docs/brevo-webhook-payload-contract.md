# Contrato de Payload - Brevo Webhook

Contrato congelado para envio de leads da LP para o webhook da Brevo.

## Origem

- Formulario: `client/src/pages/Web.tsx`
- Envio: `client/src/lib/brevo.ts`

## Payload enviado

```json
{
  "name": "string",
  "phone": "+5511999998888",
  "uf": "SC",
  "city": "Florianópolis",
  "role": "Síndico profissional | Administrador | Síndico morador",
  "revenueRange": "Até R$ 20.000 | Até R$ 50.000 | Acima de R$ 50.000 até R$ 100.000",
  "source": "lp-diego",
  "createdAt": "ISO-8601"
}
```

## Regras

- `phone` deve sair no padrao E.164 (`+55...`).
- `name`, `uf` e `city` sao enviados com `trim()`.
- `uf` e normalizada para maiusculas.
- `source` e fixo para rastreamento de origem.
- `createdAt` e gerado no momento do submit.

## Casos de normalizacao de telefone

- `(11) 99999-8888` -> `+5511999998888`
- `011999998888` -> `+5511999998888`
- `5511999998888` -> `+5511999998888`
