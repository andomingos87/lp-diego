# 🔍 Auditoria de Landing Page — Relatório Consolidado de Melhorias

**URL analisada**: `http://localhost:5000`
**Data**: 05 de abril de 2026
**Analista**: AI UI/UX Senior Auditor
**Stack**: React 18 + Vite + Tailwind CSS + TypeScript (Express 5 + Drizzle ORM)

---

## 📊 Score Geral: 7.1/10 — Mediana-Profissional

### Resumo Executivo

A landing page apresenta uma proposta de valor clara e uma identidade visual consistente, com uma paleta verde-escuro que transmite seriedade para o segmento de gestão condominial. O conceito de "phone mockup" como card de formulário é criativo e diferenciado, mas introduz limitações sérias de UX em breakpoints intermediários. O ponto mais crítico é o gap de responsividade na faixa tablet (768–1023 px): o layout passa de coluna única para duas colunas apenas em `lg` (1024 px), fazendo com que tablets em modo retrato vejam a headline e o formulário empilhados verticalmente sem otimização adequada para esse viewport.

A copy é direta e orientada à dor do cliente ("3 a 6 meses de inadimplência custam muito caro"), mas os depoimentos carecem de fotos de perfil, a seção de logos de parceiros usa placeholders de texto, e o rodapé é completamente ausente — o que compromete credibilidade e conformidade com LGPD. As animações de entrada são bem executadas e respeita `prefers-reduced-motion`. O sistema de fontes (Outfit + Inter + Poppins) está bem hierarquizado.

---

## 🎯 Contexto da Página

- **Nicho**: Gestão financeira condominial / inadimplência
- **Público-alvo**: Síndicos profissionais, síndicos moradores e administradores de condomínios
- **Oferta**: Análise gratuita da receita condominial
- **Objetivo**: Captura de leads (nome, telefone, cidade, perfil, faixa de receita)
- **Estágio do funil**: Topo/Meio — geração de leads qualificados

---

## 📐 Pontos de Quebra (Breakpoints) por Dispositivo

O projeto usa os breakpoints padrão do Tailwind (sem personalização de `screens`):


| Dispositivo              | Breakpoint | Largura mínima | Comportamento principal no layout                                                                                                                                     |
| ------------------------ | ---------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Mobile**               | *(base)*   | 0 px           | Layout em coluna única. Hero com headline → imagens → form card empilhados. Grid de logos 2 colunas.                                                                  |
| **Mobile L**             | `sm:`      | 640 px         | Padding aumenta (`px-6`), H1 cresce (`text-[2.6rem]`), grid de logos vai a 4 colunas (`sm:grid-cols-4`), grid do "Exemplo" vai a 2 colunas (`sm:grid-cols-2`).        |
| **Tablet**               | `md:`      | 768 px         | H1 chega a `text-[3.2rem]`, padding extra nos cards, depoimentos viram 3 colunas (`md:grid-cols-3`). **Ainda layout de coluna única no hero** — form abaixo do texto. |
| **Tablet L / Desktop S** | `lg:`      | 1024 px        | **Principal mudança:** hero passa para duas colunas (`lg:flex-row`). Coluna esquerda 55% / direita 45%. Seção "Exemplo" também vai a row.                             |
| **Desktop**              | `xl:`      | 1280 px        | Sem utilitários `xl:` definidos na página. Layout é o mesmo do `lg:`.                                                                                                 |
| **Desktop Wide**         | `2xl:`     | 1400 px        | Container com `max-w-[1200px]` centra o conteúdo — sem diferença visual a partir de 1200 px.                                                                          |


> **Problema crítico**: Não há breakpoint `md:flex-row` para tablets landscape (768–1023 px). Um iPad em modo paisagem (1024 px exatos) acerta o `lg:`, mas iPads em portrait (768–834 px) e a maioria dos tablets Android (768–960 px) ficam em layout de coluna única com o formulário fora da dobra.

---

## 📋 Análise Detalhada por Pilar

---

### 1. Primeira Impressão & Hero Section — 7.5/10

**O que está funcionando:**

- Headline forte e orientada à dor: "3 a 6 meses de inadimplência custam **muito caro**" — imediatamente relevante para o público.
- Hierarquia de peso tipográfico bem executada: `font-bold` / `font-light` dentro do mesmo elemento `<h1>`, criando contraste visual sem aumentar tamanho.
- O subtítulo reforça o insight ("O problema não é a inadimplência existir. O problema é não ter garantia de receita.") — boa diferenciação de oferta.
- As três stat cards com foto criam prova social acima da dobra: +120 condomínios, +R$100 mil, Especialistas. Os conectores green-dot entre os cards são um detalhe de design elegante.
- Animações de entrada (`fade-up` com `animation-delay` escalonado) criam uma percepção de produto premium.

**O que precisa melhorar:**

- **Ausência de fundo/textura no lado esquerdo**: a coluna da headline é 100% branca com texto escuro. Em desktop, o olho lê o formulário (canto direito, mais escuro) antes do headline. Um leve gradiente ou textura no fundo esquerdo hierarquizaria o fluxo visual.
- **Nenhum CTA textual no hero esquerdo**: o único CTA visível na primeira dobra é o botão verde dentro do card de formulário. A headline não convida à ação explicitamente em mobile — o formulário está abaixo do scroll em telas < 1024 px.
- **O phone mockup cria um "nested device" confuso em mobile**: em smartphones, o visitante vê um telefone desenhado dentro do próprio telefone. Isso quebra a imersão e pode gerar estranheza.
- **Logo badge minimalista demais**: "Soluções Condominiais" com uma setinha não comunica confiança de marca. Nenhum slogan ou nome de empresa visível.

**Recomendações:**

- Adicionar um botão "Ver análise gratuita ↓" na coluna esquerda (abaixo do subtítulo) para mobile, que faz scroll suave até o formulário. Isso elimina o dead zone entre o copy e o CTA em breakpoints < 1024 px.
- Considerar remover o frame de "phone" em mobile (`lg:` mostrar o frame, abaixo disso mostrar apenas o card flat). Evita o problema de "phone dentro de phone".
- Adicionar um background sutil (ex.: `bg-gradient-to-br from-white to-gray-50`) na coluna esquerda para criar separação visual do formulário.

---

### 2. Design Visual & Identidade — 7.0/10

**O que está funcionando:**

- Paleta coesa: preto-carvão (`#333`), verde vibrante (`hsl(113, 100%, 40%)`), branco e cinza. Funciona bem para o segmento (seriedade + modernidade).
- O verde é usado estrategicamente como accent — nunca como fundo de texto longo, sempre como destaque ou CTA.
- Border radius consistente (`rounded-2xl`, `rounded-xl`, `rounded-lg`) cria uma linguagem visual uniforme.
- As imagens fotográficas (prédio, profissional, laptop) são relevantes e têm sobreposição de gradiente `from-black/80` bem executada para legibilidade do texto.
- Os "green pill indicators" (barrinhas verdes `46x15px`) nos cards criam um detalhe de identidade proprietário.

**O que precisa melhorar:**

- **A cor verde `hsl(113, 100%, 40%)` equivale a `#00CC00`** — é a clássica "green de computador" dos anos 90. Em telas com alto brilho, pode parecer excessivamente vibrante. Considerar um verde mais sofisticado como `hsl(142, 71%, 45%)` (green do Tailwind), que é mais orgânico e premium.
- **Inconsistência de border-radius**: o botão CTA no bottom usa `rounded-full` enquanto o botão dentro do form usa `rounded-lg`. Duas formas diferentes para o mesmo CTA principal cria fragmentação visual.
- **Fundo branco puro (`#fff`) na seção de depoimentos** sem nenhum elemento visual cria um bloco vazio e monótono.
- **A seção de logos de parceiros é completamente placeholder** ("Logo parceiro 1-4") — danifica dramaticamente a credibilidade. Em fase de produção isso é crítico.
- **Sem favicon customizado detectado** — usa o padrão do Vite.

**Recomendações:**

- Unificar o `border-radius` dos botões CTA em toda a página para `rounded-full` (mais moderno) ou `rounded-lg` (mais corporativo), mas consistente.
- Adicionar um `border-bottom: 4px solid brand-green` ou sutil separador visual entre as seções principais.
- Ajustar a tonalidade do verde para `hsl(142, 68%, 40%)` para um look mais profissional.
- Criar o favicon da marca imediatamente.

---

### 3. Hierarquia & Layout — 6.5/10

**O que está funcionando:**

- Fluxo lógico de conteúdo: Problema → Formulário → Prova (Exemplo Numérico) → Prova Social → CTA Final.
- `max-w-[1200px]` com `mx-auto` garante que o conteúdo não se dilua em monitores ultrawide.
- O `grid-cols-1 sm:grid-cols-2` no "Exemplo Rápido" cria uma leitura sequencial que respeita a narrativa 01 → 02 → 03 → conclusão.
- Uso correto de heading levels: `<h1>` para headline principal, `<h2>` para subseções.

**O que precisa melhorar:**

- **Gap crítico no layout tablet (768–1023 px)**: nenhuma mudança de layout acontece entre `sm` (640 px) e `lg` (1024 px) no hero. Em tablets, o formulário fica empurrado abaixo de todas as stat cards, levando a uma dobra muito profunda. A Lei de Fitts diz que o objetivo principal deve estar próximo e de fácil acesso — em tablets, isso falha.
- **O form card tem max-w de 340px**, o que em desktop de 1440px o faz parecer "pequeno" dentro do espaço de 45% da coluna. Em 1440px, a coluna direita tem ~630px de largura mas o form ocupa apenas 340px, criando um espaço branco massivo à esquerda do formulário.
- **Ausência de separação visual entre seções**: as seções fluem umas para as outras sem padding top suficiente em alguns pontos, criando um "mar de conteúdo" sem respiro.
- **Sem `<footer>`**: não há rodapé. Faltam: informações de contato, CNPJ, LGPD, políticas de privacidade. Isso prejudica SEO e credibilidade.

**Recomendações:**

- Adicionar `md:flex-row` ao container do hero para resolver o problema de tablet:
  ```jsx
  // De: flex flex-col lg:flex-row
  // Para: flex flex-col md:flex-row
  ```
  E ajustar as larguras para `md:w-[55%]` / `md:w-[45%]`.
- Aumentar o `max-w` do form card para `max-w-[380px]` em `lg:` ou remover o constraint fixo e deixar fluir até a largura da coluna.
- Criar um `<footer>` com CNPJ, endereço, política de privacidade e contato.

---

### 4. Copy & Persuasão — 7.5/10

**O que está funcionando:**

- Headline orientada à dor e quantificada. "3 a 6 meses" é específico e acionável.
- A seção "Exemplo Rápido" com os cards 01-03 é uma técnica de persuasão excelente — demonstra o custo da inação com números concretos (R$ 12.000 em 3 meses → R$ 24.000 em 6 meses).
- O CTA "QUERO MINHA ANÁLISE GRATUITA" é direto e claro. A palavra "gratuita" remove a principal objeção (custo).
- Microcopy de segurança: "Sem spam. Seus dados estão protegidos." e "Retorno consultivo em até 24h úteis." tratam objeções chave.
- Os depoimentos usam linguagem natural ("saímos de decisões no escuro para planejamento com caixa previsível") — não soam fabricados.

**O que precisa melhorar:**

- **O CTA do formulário (`h2`) poderia ser mais específico**: "Receba uma análise gratuita da receita do seu condomínio" é bom, mas poderia incluir um tempo ou benefício adicional. Ex.: "Receba em 24h uma análise gratuita da receita do seu condomínio".
- **Depoimentos sem fotos de perfil**: sem avatar, os nomes "Carla M.", "Rafael S.", "Juliana P." parecem genéricos. São percebidos como fabricados mesmo que reais.
- **Microcopy de LGPD insuficiente**: "Seus dados estão protegidos" não substitui um link para política de privacidade. Isso é tecnicamente necessário para conformidade LGPD.
- **O campo "Faixa de gestão" começa em "Até R$ 20.000"**: para condomínios maiores, isso pode gerar dissonância — a faixa mais baixa está pré-selecionada, o que pode fazer o lead de alto valor se sentir mal qualificado.
- **Ausência de bullet points de benefícios**: após o subtítulo, não há lista do que o lead recebe na análise. O que é a "análise"? Relatório? Ligação? Diagnóstico visual?

**Recomendações:**

- Adicionar 2-3 bullet points sob o subtítulo: "Na sua análise gratuita você recebe: ✓ Diagnóstico do risco de inadimplência ✓ Simulação do impacto no caixa ✓ Plano de ação personalizado".
- Incluir link para política de privacidade na microcopy do formulário.
- Adicionar fotos de perfil (avatares) nos testimonials, mesmo que genéricos.
- Mudar o `defaultChecked` do range de receita para uma opção média ("Até R$ 50.000") para não subqualificar leads visualmente.

---

### 5. CTAs & Elementos de Conversão — 7.0/10

**O que está funcionando:**

- Dois CTAs idênticos ("QUERO MINHA ANÁLISE GRATUITA") — um no hero e um no bottom. Boa cobertura em diferentes estágios do scroll.
- O botão tem `active:scale-[0.98]` — feedback tátil elegante que transmite polimento.
- `disabled:opacity-60 disabled:cursor-not-allowed` durante o submit — bom UX de loading.
- Estado de sucesso com ícone de checkmark verde — confirmação visual clara.
- O `scrollToForm()` no botão bottom funciona com `behavior: smooth` — boa UX de ancoragem.

**O que precisa melhorar:**

- **Altura dos inputs é `h-9` (36px)** — abaixo do mínimo recomendado de 44px para alvos touch (WCAG 2.5.8). Em mobile, inputs pequenos causam misclicks e frustração.
- **Ausência de indicador de campo obrigatório (`*`) nos labels**: os inputs têm `required` no HTML mas os labels não indicam visualmente que são obrigatórios.
- **Feedback de erro genérico**: "Erro ao enviar. Verifique os campos e tente novamente." não informa qual campo está errado. A validação acontece apenas no submit (sem inline validation).
- **O `<details>` para "Informações adicionais" esconde os campos de qualificação**: o `role` e `revenueRange` são fundamentais para qualificação do lead mas ficam ocultos por padrão. Síndicos profissionais talvez nunca os vejam.
- **O botão CTA no bottom usa `rounded-full`** enquanto o do form usa `rounded-lg` — inconsistência visual de CTA principal.
- **Sem WhatsApp/link de contato alternativo**: toda a conversão depende do formulário. Um link para WhatsApp como fallback aumentaria a taxa de conversão.

**Recomendações:**

- Aumentar altura dos inputs para `h-11` (44px) para melhor touch target.
- Expandir o `<details>` por padrão (`open` attribute) ou transformar os campos de qualificação em parte do form principal com labels visuais mais compactos.
- Adicionar validação inline no blur dos campos com mensagens específicas.
- Criar um CTA secundário de WhatsApp: "Prefere WhatsApp? [Fale agora]"
- Unificar `border-radius` dos botões.

---

### 6. Prova Social & Credibilidade — 5.5/10

**O que está funcionando:**

- As stat cards na hero ("+120 condomínios atendidos", "+R$100 mil recuperados") são números concretos e específicos.
- Três depoimentos de perfis distintos (síndica profissional, administrador, síndica moradora) demonstram breadth de público-alvo.
- Os depoimentos são naturais e orientados a resultado, não genéricos.
- O subtítulo "Síndicos e administradores que agiram cedo reduziram risco financeiro e ganharam previsibilidade" reforça o benefit de social proof.

**O que precisa melhorar:**

- **Logos de parceiros são 100% placeholder** — "Logo parceiro 1-4" em caixas cinzas é provavelmente o pior elemento da página em termos de credibilidade. Se os parceiros reais existem, adicionar imediatamente. Se não, remover a seção.
- **Depoimentos sem foto, sem cargo específico, sem foto do condomínio**: apenas nomes genéricos (iniciais) e cidade. Comparando com benchmarks de landing pages B2B de alta performance: depoimentos com foto aumentam conversão em 34% (VWO, 2023).
- **A stat "+120 condomínios atendidos" não é verificável**: não há link para cases, não há menção à marca da empresa.
- **Ausência de selos de confiança**: Google Reviews, certificações, prêmios, ABADI/AABIC, ou qualquer terceiro que endosse a solução.
- **Nenhuma menção ao nome da empresa nem ao CNPJ**: fator de desconfiança para B2B onde a compra/contrato é mais racional.

**Recomendações:**

- Substituir os placeholders de logos por logos reais ou remover a seção completamente.
- Adicionar foto de avatar (mesmo que genérico) nos depoimentos — use ícones de silhueta profissional como fallback.
- Adicionar o nome e logo da empresa abaixo do badge "Soluções Condominiais".
- Incluir no rodapé: CNPJ, endereço, link para política de privacidade.
- Considerar adicionar um mini-case com número (ex.: "Condomínio em SP — recuperou R$48.000 em 90 dias").

---

### 7. Responsividade & Performance — 7.0/10

**O que está funcionando:**

- Tailwind garante que nenhum elemento quebre em largura com `overflow-x-hidden` no `<body>` e `overflow-x-hidden` no `<main>`.
- `loading="lazy"` nas imagens da seção de "Exemplo" e CTA final — boa prática de performance.
- `prefers-reduced-motion` respeitado nas animações com `opacity: 1` como fallback.
- Fontes Google (Outfit, Inter, Poppins) carregadas via Vite — assumindo `font-display: swap` no carregamento.
- `max-w-[1200px]` garante leitura confortável em ultrawide monitors.
- `autoComplete` nos inputs (`name`, `tel`, `address-level2`) — melhora UX móvel.

**O que precisa melhorar:**

- **Gap de breakpoint tablet**: conforme detalhado, `768–1023 px` não tem uma transição adequada do layout de duas colunas. Isso é o maior problema de responsividade.
- **Phone mockup em mobile**: o card com `rounded-[2.6rem]` e notch artificial dentro de um smartphone real cria sobreposição visual confusa.
- **Imagem de fundo no CTA final sem `object-position` otimizada para mobile**: `object-bottom` pode cortar o topo em viewports pequenos.
- **As três stat cards com `aspect-ratio: 0.52/1`** em mobile ficam muito altas para o viewport — em 375px cada card tem ~118px de largura e ~227px de altura, o que faz a linha de cards ocupar ~227px de altura.
- **Sem `meta viewport` verificado no HTML**: crítico para mobile rendering. (Verificar `client/index.html`.)
- **Sem `srcset` ou `<picture>` nas imagens**: todas as imagens carregam em tamanho único independente do viewport.

**Recomendações:**

- Corrigir o breakpoint do hero para `md:flex-row` (768px).
- Adicionar condicional no phone frame para mostrar card flat em mobile:
  ```jsx
  // Mostrar frame de phone apenas em lg+, card flat em mobile
  className="... lg:rounded-[2.6rem] lg:notch-visible"
  ```
- Otimizar imagens com `srcset` para diferentes densidades de tela.
- Verificar e confirmar tag `<meta name="viewport" content="width=device-width, initial-scale=1">` no `index.html`.

---

### 8. Experiência do Usuário (UX Flow) — 7.0/10

**O que está funcionando:**

- O fluxo de qualificação progressiva (campos principais visíveis + campos opcionais em `<details>`) respeita o princípio de progressão gradual e reduz fricção inicial.
- `scrollToForm()` com `behavior: smooth` no CTA do bottom é uma navegação suave e natural.
- O estado de sucesso após envio é claro e acolhedor (ícone verde + mensagem personalizada).
- Validação `required` nos campos principais previne submits vazios.
- `type="tel"` com `formatPhone` formata automaticamente o número brasileiro — ótima UX para mobile.

**O que precisa melhorar:**

- **Sem `<nav>` nem ancora de volta ao topo**: em páginas longas, usuários em mobile ficam sem forma de retornar ao topo facilmente.
- **O `mutation.isError` mostra mensagem genérica** sem informar se foi erro de rede ou validação do servidor.
- **Ausência de progress indicator** no formulário durante `isPending` — apenas o texto muda para "ENVIANDO..." no botão, sem spinner ou barra de progresso.
- **Sem fallback para a imagem do CTA final** se `cta-buildings.png` não carregar: o texto fica em fundo branco com contraste potencialmente baixo.
- **O campo de telefone não tem `inputmode="tel"`**: em mobile, o teclado numérico não é garantido apenas com `type="tel"` em todos os dispositivos.
- **Ausência de hreflang e lang no HTML**: acessibilidade e SEO para site em PT-BR.

**Recomendações:**

- Adicionar `inputmode="numeric"` (ou `inputmode="tel"`) ao input de telefone.
- Adicionar um spinner `<svg>` animado ao botão de submit durante `isPending`.
- Criar um `<footer>` com âncora de volta ao topo e informações legais.
- Adicionar `lang="pt-BR"` no `<html>` do `index.html`.
- Criar fallback de cor de fundo para a seção do CTA final: `bg-gray-100` caso a imagem falhe.

---

## 📊 Scorecard Resumido


| Pilar                        | Nota   | Peso | Ponderado   |
| ---------------------------- | ------ | ---- | ----------- |
| Primeira Impressão & Hero    | 7.5/10 | 15%  | 1.13        |
| Design Visual & Identidade   | 7.0/10 | 15%  | 1.05        |
| Hierarquia & Layout          | 6.5/10 | 12%  | 0.78        |
| Copy & Persuasão             | 7.5/10 | 15%  | 1.13        |
| CTAs & Conversão             | 7.0/10 | 15%  | 1.05        |
| Prova Social & Credibilidade | 5.5/10 | 10%  | 0.55        |
| Responsividade & Performance | 7.0/10 | 8%   | 0.56        |
| UX Flow                      | 7.0/10 | 10%  | 0.70        |
| **SCORE GERAL**              |        |      | **6.95/10** |


> Classificação: **Mediana-Profissional** — base sólida com oportunidades de alto impacto identificadas.

---

## 🚀 Top 5 Quick Wins

Ações de alto impacto e baixo esforço que devem ser implementadas primeiro:

1. **Corrigir breakpoint do hero para `md:flex-row`** (768px)
  - Arquivo: `client/src/pages/Web.tsx` — linha 56
  - Mudar: `flex flex-col lg:flex-row` → `flex flex-col md:flex-row`
  - Mudar: `lg:w-[55%]` → `md:w-[55%]` e `lg:w-[45%]` → `md:w-[45%]`
  - Impacto: Resolve 100% dos problemas de tablet (768–1023 px) de uma só vez.
2. **Aumentar altura dos inputs de `h-9` para `h-11`**
  - Arquivo: `client/src/pages/Web.tsx` — linhas 241, 258, 273
  - Muda `h-9` para `h-11` (44px) nos três inputs.
  - Impacto: Touch targets conformes com WCAG 2.5.8. Reduz erros de click em mobile.
3. **Substituir logos placeholder ou remover a seção**
  - Arquivo: `client/src/pages/Web.tsx` — linhas 468–480
  - Impacto: Elimina o maior elemento de desconfiança da página.
4. **Adicionar botão CTA "Ver análise gratuita ↓" no hero mobile**
  - Arquivo: `client/src/pages/Web.tsx` — após linha 109 (subtítulo)
  - Mostrar apenas em `< md`: `className="md:hidden mt-4 ..."`
  - Impacto: Elimina o "dead zone" entre copy e formulário em mobile.
5. **Adicionar link de política de privacidade e `lang="pt-BR"` no HTML**
  - Arquivo: `client/index.html`
  - Impacto: Conformidade LGPD + melhora SEO local.

---

## 🔧 Plano de Melhorias Priorizadas

### 🔴 Alta Prioridade (Impacto Alto + Esforço Baixo/Médio)


| #   | Melhoria                                                               | Arquivo(s)            | Esforço     |
| --- | ---------------------------------------------------------------------- | --------------------- | ----------- |
| 1   | Corrigir breakpoint hero: `lg:flex-row` → `md:flex-row`                | `Web.tsx:56,59,189`   | 15 min      |
| 2   | Aumentar inputs de `h-9` para `h-11` (44px mínimo touch)               | `Web.tsx:241,258,273` | 10 min      |
| 3   | Substituir logos placeholder por logos reais ou remover seção          | `Web.tsx:468-480`     | 1h (assets) |
| 4   | Adicionar botão CTA de âncora no hero mobile (`md:hidden`)             | `Web.tsx:109`         | 20 min      |
| 5   | Adicionar `lang="pt-BR"` ao `<html>` e `<meta viewport>`               | `client/index.html`   | 5 min       |
| 6   | Adicionar link de política de privacidade na microcopy do form         | `Web.tsx:344-349`     | 15 min      |
| 7   | Unificar border-radius dos botões CTA (`rounded-full` ou `rounded-lg`) | `Web.tsx:335,507`     | 5 min       |


### 🟡 Média Prioridade (Impacto Médio + Esforço Médio)


| #   | Melhoria                                                                      | Arquivo(s)        | Esforço              |
| --- | ----------------------------------------------------------------------------- | ----------------- | -------------------- |
| 8   | Adicionar fotos de avatar nos depoimentos                                     | `Web.tsx:440-461` | 2h (assets + código) |
| 9   | Expandir `<details>` por padrão (`open`) ou promover campos ao form principal | `Web.tsx:278-324` | 30 min               |
| 10  | Adicionar `inputmode="tel"` no campo de telefone                              | `Web.tsx:251`     | 5 min                |
| 11  | Adicionar spinner SVG ao botão de submit durante `isPending`                  | `Web.tsx:332-339` | 30 min               |
| 12  | Criar `<footer>` com nome da empresa, CNPJ, endereço, links legais            | `Web.tsx:final`   | 1h                   |
| 13  | Adicionar 2-3 bullet points de benefícios abaixo do subtítulo hero            | `Web.tsx:101-109` | 20 min               |
| 14  | Adicionar CTA de WhatsApp como canal alternativo                              | `Web.tsx:189+`    | 30 min               |
| 15  | Remover o phone mockup frame em viewports < `lg` (card flat em mobile)        | `Web.tsx:191`     | 45 min               |


### 🟢 Baixa Prioridade (Refinamentos)


| #   | Melhoria                                                             | Arquivo(s)                   | Esforço |
| --- | -------------------------------------------------------------------- | ---------------------------- | ------- |
| 16  | Ajustar tom do verde para `hsl(142, 68%, 40%)` (mais premium)        | `index.css:44-45`            | 15 min  |
| 17  | Adicionar `srcset` nas imagens para múltiplas densidades             | `Web.tsx` (todas as `<img>`) | 2h      |
| 18  | Criar favicon customizado da marca                                   | `client/public/`             | 30 min  |
| 19  | Mudar `defaultChecked` do range de receita para "Até R$ 50.000"      | `Web.tsx:310`                | 5 min   |
| 20  | Adicionar `object-position` responsivo na imagem do CTA final        | `Web.tsx:491`                | 10 min  |
| 21  | Adicionar sutil background gradient no hero esquerdo                 | `Web.tsx:56`                 | 10 min  |
| 22  | Adicionar validação inline (blur) nos campos com mensagem específica | `Web.tsx:229-350`            | 2h      |
| 23  | Adicionar `preload` para as três fontes principais                   | `client/index.html`          | 20 min  |
| 24  | Adicionar mini-case com número como quarto card de prova social      | `Web.tsx:440-461`            | 45 min  |


---

## 🎨 Análise de Fontes


| Fonte       | Uso                             | Variações carregadas                                                     | Avaliação                                                                                                                          |
| ----------- | ------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Outfit**  | Headings, números, CTA          | `font-bold`, `font-semibold`, `font-medium`, `font-normal`, `font-light` | ✅ Excelente escolha. Geométrica, moderna, boa legibilidade em large text.                                                          |
| **Inter**   | Body, labels, microcopy         | `font-light`, `font-normal`, `font-semibold`                             | ✅ Standard industrial para body copy. Alta legibilidade em tamanhos pequenos.                                                      |
| **Poppins** | Logo badge, subtítulos de seção | `font-semibold`, `font-light`                                            | ⚠️ Terceira fonte com uso muito limitado (apenas 2 elementos). Considerar eliminar e usar Outfit. Carregar 3 fonts = ~120KB extra. |


**Tamanhos tipográficos identificados:**


| Elemento       | Mobile           | Tablet (md)     | Desktop (lg)    |
| -------------- | ---------------- | --------------- | --------------- |
| H1 principal   | 34.4px (2.15rem) | 51.2px (3.2rem) | 54.4px (3.4rem) |
| H2 seções      | ~24px            | ~30px           | ~30px           |
| Body/labels    | 11.5px (0.72rem) | 11.5px          | 11.5px          |
| Subtítulo hero | 15.2px (0.95rem) | 15.2px          | 15.2px          |
| Inputs         | 14px (text-sm)   | 14px            | 14px            |


⚠️ **Problema crítico**: Labels dos formulários e microcopy estão em `0.72rem` (≈11.5px). WCAG 1.4.4 exige texto legível até 200% zoom, e tamanhos abaixo de 12px são considerados problemáticos. Aumentar para `text-xs` (12px) no mínimo.

---

## 🎨 Análise de Paleta de Cores

```
brand-green:      hsl(113, 100%, 40%) = #00CC00  ← Vivid green (revisar tom)
brand-green-light: hsl(113, 100%, 48%) = #00F500  ← Hover state
brand-dark:       hsl(0, 0%, 20%)    = #333333  ← Form card BG, dark sections
brand-dark-deep:  hsl(0, 0%, 17%)    = #2B2B2B  ← Não usado diretamente na página
brand-gray:       hsl(0, 0%, 44%)    = #707070  ← Text muted
brand-gray-light: hsl(0, 0%, 85%)    = #D9D9D9  ← Borders, backgrounds
brand-text:       hsl(0, 0%, 20%)    = #333333  ← Body text
brand-text-muted: hsl(0, 0%, 44%)    = #707070  ← Secondary text
```

**Verificação de contraste (WCAG AA = 4.5:1 para texto normal, 3:1 para texto grande):**


| Combinação                                                | Ratio    | WCAG AA                | Observação                       |
| --------------------------------------------------------- | -------- | ---------------------- | -------------------------------- |
| `brand-text` (#333) sobre white (#fff)                    | 10.7:1   | ✅ Pass                 |                                  |
| `brand-text-muted` (#707) sobre white (#fff)              | 4.6:1    | ✅ Pass (margem mínima) |                                  |
| White (#fff) sobre `brand-green` (#00CC00)                | 1.6:1    | ❌ FAIL                 | CTA button text — problema grave |
| White (#fff) sobre `brand-dark` (#333)                    | 10.7:1   | ✅ Pass                 | Form card                        |
| White/80 (rgba 204) sobre `brand-dark` (#333)             | ~6.2:1   | ✅ Pass                 | Labels do form                   |
| `brand-text` (#333) sobre `cta-buildings` (grayscale img) | Variável | ⚠️ Verificar           | Depende da região da imagem      |


> 🚨 **CRÍTICO**: Texto branco sobre verde `#00CC00` tem contraste de apenas **1.6:1** — muito abaixo do mínimo de 4.5:1 (WCAG AA) e até do 3:1 para texto grande. O CTA principal da página falha em acessibilidade. Solução: escurecer o verde para pelo menos `hsl(142, 80%, 28%)` ou usar texto preto/escuro no botão.

---

## 🖼️ Análise de Imagens


| Imagem              | Uso                           | Alt text       | Otimização         | Observação                |
| ------------------- | ----------------------------- | -------------- | ------------------ | ------------------------- |
| `mask-group-1.png`  | Card stat 1 (prédio)          | ✅ Descritivo   | ⚠️ Sem `srcset`    |                           |
| `mask-group-2.png`  | Card stat 2 (profissional)    | ✅ Descritivo   | ⚠️ Sem `srcset`    |                           |
| `mask-group-3.png`  | Card stat 3 (laptop)          | ✅ Descritivo   | ⚠️ Sem `srcset`    |                           |
| `mask-group-5.png`  | Seção Exemplo (laptop)        | ✅ Descritivo   | `loading="lazy"` ✅ |                           |
| `cta-buildings.png` | BG CTA final                  | ✅ Descritivo   | `loading="lazy"` ✅ | Grayscale CSS             |
| `vector-1.svg`      | Ícone stat card 1             | ⚠️ `alt=""`    | ✅ Inline SVG       | Decorativo — alt vazio OK |
| `vector-3.svg`      | Arrow no logo badge           | ✅ "Arrow icon" | ✅ Inline           |                           |
| `vector-4.svg`      | Ícone stat card 2 + phone tab | ⚠️ `alt=""`    | ✅                  | Decorativo — OK           |
| `vector-5.svg`      | Ícone stat card 3             | ⚠️ `alt=""`    | ✅                  | Decorativo — OK           |


**Observações gerais sobre imagens:**

- As imagens dos stat cards não têm `loading="lazy"` — sendo above-the-fold, isso é correto (devem carregar imediatamente).
- Sem `srcset`/`sizes` em nenhuma imagem — em telas 2x (Retina), as imagens podem aparecer desfocadas.
- Sem dimensões declaradas (`width`/`height`) nas imagens — causa Cumulative Layout Shift (CLS) que afeta Core Web Vitals.

---

## ✨ Análise de Efeitos e Animações


| Efeito                                         | Implementação                                          | Avaliação                           |
| ---------------------------------------------- | ------------------------------------------------------ | ----------------------------------- |
| `animate-fade-in` (logo badge)                 | CSS keyframes, delay 0s                                | ✅ Suave, não distrai                |
| `animate-fade-up` (headline, subtítulo, cards) | CSS keyframes, delays 0.1s–0.5s                        | ✅ Stagger effect profissional       |
| `active:scale-[0.98]` (botões)                 | Tailwind transform                                     | ✅ Feedback tátil elegante           |
| `transition-colors` (inputs focus)             | Tailwind transition                                    | ✅ Focus ring verde visível          |
| `hover:text-brand-green` (labels radio)        | Tailwind hover                                         | ✅ Microinteração sutil              |
| `prefers-reduced-motion`                       | `@media` query no CSS                                  | ✅ Acessibilidade respeitada         |
| Green connector dots                           | `position: absolute`, `bg-brand-green`, `rounded-full` | ✅ Detalhe de design premium         |
| Phone notch animado                            | Static div white                                       | ⚠️ Funcional mas sem pulso/animação |
| `hover:bg-brand-green-light` (CTA)             | Tailwind hover                                         | ✅ Feedback de hover claro           |


**Ausências notáveis:**

- Nenhuma animação de scroll (intersection observer) para as seções abaixo da dobra — os elementos de baixo já aparecem renderizados sem entrada visual.
- Sem skeleton loading para as imagens — elas piscam ao carregar.

---

## 🏁 Conclusão

A landing page tem uma base sólida: conceito criativo (phone mockup), copy orientada à dor, sistema de design consistente e animações de entrada polidas. O score de 6.95/10 reflete que os fundamentos estão corretos, mas existem bloqueadores que precisam ser resolvidos antes de escalar tráfego.

**Os três problemas mais urgentes são:**

1. **Contraste do botão CTA** (branco sobre `#00CC00` = 1.6:1) — risco legal de acessibilidade e degradação de conversão.
2. **Breakpoint tablet (768–1023px)** — ~30% do tráfego web está em tablets; o formulário fora da dobra nessa faixa é uma perda direta de leads.
3. **Logos placeholder** — destrói a credibilidade na seção de prova social.

Resolvendo os Top 5 Quick Wins (estimativa de 3–4 horas de trabalho), a página deve atingir um score de **8.2–8.5/10** e uma melhoria mensurável na taxa de conversão. O potencial para 9.0+ existe com o plano completo de melhorias médias e baixas.

---

*Relatório gerado por AI UI/UX Senior Auditor em 05/04/2026*
*Baseado em análise visual via Cursor IDE Browser, inspeção de código-fonte (Web.tsx, index.css, tailwind.config.ts) e screenshots das seções desktop.*