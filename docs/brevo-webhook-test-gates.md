# Testes locais - Gates A-D

Este documento operacionaliza os gates tecnicos da integracao Brevo webhook.

## Pre-requisitos

- `VITE_BREVO_WEBHOOK_URL` configurada no ambiente atual.
- Projeto instalado (`npm install`).

## Gate A - Submit com retorno 2xx

1. Rode a aplicacao: `npm run dev`.
2. Abra a LP e envie o formulario com dados validos.
3. No DevTools (Network), confirme request para o webhook com status 2xx.

## Gate B - Normalizacao E.164

Rode:

```bash
npm run test:brevo:gates
```

O script valida automaticamente os formatos:

- `(11) 99999-8888` -> `+5511999998888`
- `011999998888` -> `+5511999998888`
- `5511999998888` -> `+5511999998888`

## Gate C - UX de falha

1. Remova temporariamente `VITE_BREVO_WEBHOOK_URL` (ou use URL invalida).
2. Envie o formulario.
3. Confirme exibicao da mensagem de erro no card do formulario.
4. Restaure a env correta e reteste.

## Gate D - Validacao no Brevo

1. No Brevo, busque o contato pelo `SMS`.
2. Confirme:
   - contato criado/atualizado
   - atributos (`NOME`, `CIDADE_ESTADO`, `PERFIL`, `FAIXA_GESTAO`, `FONTE`) preenchidos
   - entrada na lista/campanha esperada
