# Plano de Melhoria da Landing Page (Itens 1 a 4)

## Escopo

Aplicar melhorias incrementais na landing page para aumentar taxa de conversão sem redesign completo, focando em:

1. responsividade mobile, 2) prova social, 3) confiança no formulário, 4) redução de fricção no envio.

Arquivos principais:

- [C:\Users\asdom\OneDrive\Documentos\Projetos\lp-diego\client\src\pages\Web.tsx](C:\Users\asdom\OneDrive\Documentos\Projetos\lp-diego\client\src\pages\Web.tsx)
- [C:\Users\asdom\OneDrive\Documentos\Projetos\lp-diego\client\src\index.css](C:\Users\asdom\OneDrive\Documentos\Projetos\lp-diego\client\src\index.css)

## Estratégia por Item

### 1) Corrigir quebra mobile (overflow horizontal e composição da hero)

- Revisar estrutura do topo em [Web.tsx](C:\Users\asdom\OneDrive\Documentos\Projetos\lp-diego\client\src\pages\Web.tsx): ajustar grid/flex para coluna única em telas <= `md`, com ordem de leitura `headline -> subtítulo -> prova social -> formulário`.
- Trocar larguras rígidas e proporções que forçam transbordo (`max-w`, `aspectRatio`, offsets negativos) por classes responsivas explícitas para `sm/md/lg`.
- Garantir contenção global com `overflow-x-hidden` no wrapper principal e eliminar elementos com posicionamento absoluto que escapem da viewport no mobile.
- Validar alvo de toque e legibilidade (inputs/botões/linhas de texto) em 320px, 375px e 428px.

### 2) Reforçar prova social (depoimentos e credibilidade visual)

- Criar seção nova de prova social em [Web.tsx](C:\Users\asdom\OneDrive\Documentos\Projetos\lp-diego\client\src\pages\Web.tsx), entre “Exemplo rápido” e CTA final, com:
  - 2–3 depoimentos curtos (nome + função + resultado objetivo);
  - bloco de logos/parceiros (placeholder estilizado se logos finais ainda não estiverem disponíveis);
  - microheadline orientada a confiança.
- Reutilizar tokens de cor/tipografia atuais para manter consistência visual e evitar regressão de identidade.

### 3) Inserir microcopy de confiança no formulário

- Atualizar bloco do formulário em [Web.tsx](C:\Users\asdom\OneDrive\Documentos\Projetos\lp-diego\client\src\pages\Web.tsx) com mensagens de redução de risco próximas ao botão:
  - “Sem spam”
  - “Seus dados estão protegidos”
  - “Retorno consultivo em até X horas” (quando houver SLA definido)
- Ajustar contraste dos textos auxiliares para melhorar leitura sobre fundo escuro (com classes e, se necessário, refinando tokens em [index.css](C:\Users\asdom\OneDrive\Documentos\Projetos\lp-diego\client\src\index.css)).

### 4) Reduzir fricção do formulário (menos campos no primeiro passo)

- Manter no primeiro envio apenas campos essenciais (`name`, `phone`, `cityState`) e tratar `role` + `revenueRange` como etapa 2 (pós-envio ou contato inicial).
- Ajustar validação em [Web.tsx](C:\Users\asdom\OneDrive\Documentos\Projetos\lp-diego\client\src\pages\Web.tsx): remover bloqueio de submit por ausência de `role/revenueRange` no fluxo principal.
- Preservar opção de captura desses dados sem impacto na conversão inicial (estratégia progressiva).

## Sequência de Execução Recomendada

1. Resolver responsividade mobile (item 1) para eliminar risco técnico imediato de conversão.
2. Ajustar formulário e microcopies (itens 3 e 4) para ganho rápido de taxa de envio.
3. Inserir seção de prova social (item 2) para elevar credibilidade e qualidade percebida.
4. Rodar validação final visual em desktop + mobile e checklist de acessibilidade básica (contraste e foco).

## Critérios de Aceite

- Não há scroll horizontal em 320–428px.
- Hero/formulário permanecem legíveis e navegáveis em mobile.
- Formulário envia com campos essenciais sem erro de validação desnecessária.
- Mensagens de confiança aparecem visíveis junto ao CTA.
- Existe seção de prova social com depoimentos e evidências visuais de credibilidade.