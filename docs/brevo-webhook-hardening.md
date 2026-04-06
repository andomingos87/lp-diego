# Hardening de producao - Brevo Webhook

Controles adicionados para reduzir spam, melhorar rastreamento e reforcar privacidade.

## Controles aplicados no formulario

- Honeypot invisivel (`name="website"`) para bloquear bots simples.
- Cooldown de 15 segundos por sessao antes de permitir novo envio.
- Mensagem explicita de consentimento e tratamento de dados junto da politica de privacidade.

## Rastreabilidade de origem

O campo `source` enviado ao webhook agora segue este padrao:

- Com UTM source e campaign: `lp-diego:<utm_source>:<utm_campaign>`
- Com apenas UTM source: `lp-diego:<utm_source>`
- Sem UTM: `lp-diego:direct`

## Auditoria recomendada pre-go-live

- [ ] Confirmar que honeypot nao impacta usuarios reais.
- [ ] Confirmar cooldown funcionando em envio duplicado rapido.
- [ ] Confirmar `source` chegando corretamente no Brevo.
- [ ] Confirmar visibilidade do texto de consentimento no mobile e desktop.
