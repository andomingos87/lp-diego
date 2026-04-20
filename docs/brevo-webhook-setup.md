# Brevo Webhook Setup (Opcao A)

Este guia cobre a preparacao da Brevo para receber leads da landing page via `VITE_BREVO_WEBHOOK_URL`.

## 1. Criar lista de contatos

1. Acesse `Contacts -> Lists -> Add a new list`.
2. Nome sugerido: `Leads Landing Page`.
3. Salve e anote o nome da lista para validar no teste final.

## 2. Criar/validar atributos de contato

Em `Contacts -> Settings -> Contact Attributes`, confirme os atributos abaixo:

- `NOME` (Text)
- `SMS` (Phone, padrao Brevo)
- `UF` (Text)
- `CIDADE` (Text)
- `PERFIL` (Text ou Category)
- `FAIXA_GESTAO` (Text ou Category)
- `FONTE` (Text)

## 3. Criar automacao com gatilho webhook

1. Acesse `Automations -> Create an automation`.
2. Escolha gatilho do tipo webhook (inbound webhook trigger).
3. Copie a URL publica gerada pelo Brevo.
4. Adicione acao de criar/atualizar contato.
5. Mapeie o payload recebido para atributos Brevo:
   - `name` -> `NOME`
   - `phone` -> `SMS`
   - `uf` -> `UF`
   - `city` -> `CIDADE`
   - `role` -> `PERFIL`
   - `revenueRange` -> `FAIXA_GESTAO`
   - `source` -> `FONTE`
6. Defina politica de deduplicacao por telefone (`SMS`) para evitar duplicidade.
7. Publique a automacao.

## 4. Payload canonico de validacao

Use este payload para testar rapidamente o mapeamento no webhook:

```json
{
  "name": "Teste Integracao",
  "phone": "+5511999998888",
  "uf": "SP",
  "city": "Sao Paulo",
  "role": "Síndico profissional",
  "revenueRange": "Até R$ 50.000",
  "source": "lp-diego",
  "createdAt": "2026-04-05T22:00:00.000Z"
}
```

## 5. Checklist de pronto da fase Brevo

- [ ] Lista de leads criada
- [ ] Atributos criados com nomes exatos
- [ ] Webhook ativo e publicado
- [ ] Mapeamento validado com payload canonico
- [ ] Dedupe por `SMS` configurado
