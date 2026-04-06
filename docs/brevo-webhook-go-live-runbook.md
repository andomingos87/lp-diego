# Go-live e Monitoramento 72h - Brevo Webhook

Runbook operacional para publicacao, monitoramento e rollback da integracao.

## 1) Checklist de publicacao

- [ ] `VITE_BREVO_WEBHOOK_URL` de producao configurada.
- [ ] Build e typecheck passando (`npm run check`).
- [ ] Testes locais de gate executados (`npm run test:brevo:gates`).
- [ ] Automacao Brevo publicada e ativa.
- [ ] Time comercial alinhado para acompanhar entrada dos leads.

## 2) Monitoramento das primeiras 72h

### Janela 0-6h

- Verificar se os primeiros leads entram no Brevo em ate 2 minutos apos submit.
- Amostrar pelo menos 5 envios para confirmar atributos e `source`.

### Janela 6-24h

- Verificar taxa de erro no formulario.
- Verificar volume de leads por hora no Brevo.
- Confirmar se leads entram na lista correta.

### Janela 24-72h

- Revisar tendencia de erro por tipo (`400`, `401`, `429`, timeout).
- Revisar consistencia dos campos `PERFIL` e `FAIXA_GESTAO`.
- Fechar relatorio final de estabilizacao.

## 3) Tabela de incidentes

| Sintoma | Causa provavel | Acao imediata |
|---|---|---|
| Sem leads no Brevo | webhook invalido/inativo | validar URL e estado da automacao |
| Erro 400 | atributo ausente ou payload invalido | corrigir atributos e mapeamento |
| Erro 401 | credencial/configuracao do webhook | revisar configuracao na Brevo |
| Erro 429 | excesso de requests | reduzir burst e reprocessar manualmente |
| Lead sem atributos | mapeamento quebrado na automacao | ajustar mapeamento e retestar payload |

## 4) Rollback controlado

Se o fluxo falhar de forma recorrente:

1. Ativar CTA alternativo para WhatsApp na LP.
2. Pausar campanhas pagas por no maximo 30 minutos (se aplicavel).
3. Corrigir webhook/mapeamento no Brevo.
4. Reexecutar os gates A-D.
5. Reabrir trafego apenas apos 3 envios consecutivos com sucesso.

## 5) Criterio de estabilizacao

Considerar integracao estabilizada quando:

- 72h sem erro recorrente de envio.
- Leads chegando com todos os atributos obrigatorios.
- Time comercial confirma consumo normal dos leads.
