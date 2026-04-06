# Plano Sequencial - Integracao com Brevo (Opcao A: Webhook)

Este plano descreve, em ordem, tudo que precisa ser feito para registrar os leads da landing page usando `VITE_BREVO_WEBHOOK_URL` (sem endpoint `api/leads` local).

## 1) Definir o modelo de dados do lead

- Confirmar os campos que a LP envia hoje:
  - `name`
  - `phone`
  - `cityState`
  - `role`
  - `revenueRange`
- Definir no Brevo como cada campo sera armazenado:
  - Em lista de contatos (atributos customizados), ou
  - Em automacao/evento com mapeamento para propriedades internas.
- Padronizar telefone no formato internacional (E.164), por exemplo: `+5511999999999`.

## 2) Preparar a estrutura no Brevo

- Criar (ou selecionar) a lista de destino para leads da landing page.
- Criar atributos customizados, se necessario, para armazenar:
  - nome
  - telefone
  - cidade/estado
  - perfil
  - faixa de gestao
  - origem/campanha
- Criar uma automacao no Brevo para receber dados via webhook.
- Configurar a URL publica de webhook gerada pelo Brevo (endpoint de entrada da automacao).

## 3) Configurar variaveis de ambiente do projeto

- Criar arquivo `.env` local (ou ajustar o existente) com:
  - `VITE_BREVO_WEBHOOK_URL=<url-do-webhook-brevo>`
- Garantir que:
  - `.env` esteja ignorado no git.
  - Nao exista `VITE_BREVO_API_KEY` em uso no frontend para este fluxo (Opcao A).
- Se houver ambientes separados (dev/staging/prod), definir uma URL de webhook por ambiente.

## 4) Validar o mapeamento no frontend

- Confirmar que o submit do formulario usa `submitLeadToBrevo(...)`.
- Confirmar que, com `VITE_BREVO_WEBHOOK_URL` presente, o codigo usa o caminho de webhook.
- Confirmar payload enviado no frontend:
  - `name`
  - `phone` (normalizado para E.164)
  - `cityState`
  - `role`
  - `revenueRange`
  - `source`
  - `createdAt`

## 5) Testar ponta a ponta em ambiente local

- Rodar projeto em dev.
- Enviar formulario com dados reais de teste.
- Verificar no network do navegador:
  - chamada para URL do webhook
  - status HTTP de sucesso (2xx)
- Verificar no Brevo:
  - lead recebido
  - campos mapeados corretamente
  - contato criado/atualizado na lista esperada
- Repetir teste com telefone em formatos diferentes para validar normalizacao.

## 6) Definir tratamento de erro e observabilidade

- Garantir mensagem amigavel no formulario em caso de falha.
- Definir padrao de reenvio manual (usuario tenta novamente).
- Registrar uma rotina de monitoramento:
  - taxa de erro de envio
  - volume de leads por dia
  - tempo de processamento da automacao no Brevo

## 7) Hardening para producao

- Ativar protecoes anti-spam no formulario:
  - honeypot
  - limite de frequencia por sessao/IP (quando aplicavel)
- Incluir tag de origem/campanha no payload para rastreio de aquisicao.
- Validar LGPD:
  - aviso de privacidade no formulario
  - finalidade de uso dos dados
  - base legal/documentacao interna

## 8) Go-live controlado

- Publicar com `VITE_BREVO_WEBHOOK_URL` de producao.
- Executar checklist final:
  - formulario envia
  - Brevo recebe
  - time comercial consegue acessar novos leads
- Acompanhar primeiras 24-72h com monitoramento reforcado.

## 9) Plano de rollback

- Se o webhook falhar apos deploy:
  - desativar campanha/CTA temporariamente, ou
  - redirecionar para canal alternativo (WhatsApp) ate estabilizar
- Corrigir mapeamento/automacao e repetir testes antes de reabrir trafego.

## 10) Criterios de pronto

A integracao e considerada pronta quando:

- 100% dos testes de envio retornarem sucesso (2xx) no webhook.
- Leads aparecerem no Brevo com campos corretos.
- Nao houver erro recorrente no formulario em producao.
- Time comercial confirmar recebimento e uso dos leads.