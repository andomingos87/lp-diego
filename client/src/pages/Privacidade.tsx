export const Privacidade = (): JSX.Element => {
  return (
    <main className="bg-white w-full min-h-screen overflow-x-hidden">
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* Header */}
        <header className="mb-10">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-brand-text-muted font-inter text-sm hover:text-brand-text transition-colors mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Voltar
          </a>

          <h1 className="font-outfit font-bold text-[2rem] sm:text-[2.4rem] text-brand-text leading-tight mb-3">
            Política de Privacidade
          </h1>
          <p className="font-inter text-brand-text-muted text-sm">
            Última atualização: abril de 2026
          </p>
        </header>

        {/* Intro */}
        <Section>
          <p className="font-inter text-brand-text text-[0.95rem] leading-relaxed">
            A <strong>Soluções Condominiais</strong> tem o compromisso com a transparência e a proteção dos seus dados pessoais. Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos as informações que você fornece ao preencher nosso formulário de contato, em conformidade com a{" "}
            <strong>Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018)</strong>.
          </p>
        </Section>

        <Divider />

        {/* 1. Quem somos */}
        <Section>
          <SectionTitle number={1}>Controlador dos Dados</SectionTitle>
          <p className="font-inter text-brand-text text-[0.95rem] leading-relaxed">
            O controlador responsável pelo tratamento dos seus dados pessoais é:
          </p>
          <InfoBox>
            <InfoRow label="Empresa" value="Soluções Condominiais" />
            <InfoRow label="Contato" value="contato@solucoescondominiais.com.br" />
          </InfoBox>
        </Section>

        <Divider />

        {/* 2. Dados coletados */}
        <Section>
          <SectionTitle number={2}>Dados Pessoais Coletados</SectionTitle>
          <p className="font-inter text-brand-text text-[0.95rem] leading-relaxed mb-4">
            Ao preencher o formulário em nosso site, coletamos os seguintes dados:
          </p>
          <ul className="space-y-2">
            {[
              { item: "Nome completo", why: "identificação do solicitante" },
              { item: "Telefone / WhatsApp", why: "contato consultivo" },
              { item: "UF e cidade", why: "regionalização do atendimento" },
              { item: "Perfil (síndico, administrador, etc.)", why: "personalização da abordagem" },
              { item: "Faixa de gestão de receita", why: "adequação da análise financeira" },
              { item: "Origem da visita (UTM)", why: "avaliação de campanhas de marketing" },
            ].map(({ item, why }) => (
              <li key={item} className="flex items-start gap-2.5 font-inter text-[0.9rem] text-brand-text">
                <span className="mt-[5px] w-2 h-2 rounded-full bg-brand-green flex-shrink-0" />
                <span>
                  <strong>{item}</strong>
                  <span className="text-brand-text-muted"> — {why}</span>
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Divider />

        {/* 3. Finalidade */}
        <Section>
          <SectionTitle number={3}>Finalidade do Tratamento</SectionTitle>
          <p className="font-inter text-brand-text text-[0.95rem] leading-relaxed mb-4">
            Seus dados são utilizados exclusivamente para:
          </p>
          <ul className="space-y-2">
            {[
              "Realizar contato consultivo sobre soluções de gestão de inadimplência condominial",
              "Apresentar análise financeira personalizada conforme o perfil informado",
              "Envio de comunicações relacionadas aos serviços contratados ou de interesse",
              "Cumprimento de obrigações legais e regulatórias",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 font-inter text-[0.9rem] text-brand-text">
                <span className="mt-[5px] w-2 h-2 rounded-full bg-brand-green flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="font-inter text-brand-text-muted text-sm mt-4 leading-relaxed">
            A base legal para o tratamento é o <strong>legítimo interesse</strong> (Art. 7º, IX da LGPD) e o <strong>consentimento</strong> expresso ao submeter o formulário (Art. 7º, I).
          </p>
        </Section>

        <Divider />

        {/* 4. Compartilhamento */}
        <Section>
          <SectionTitle number={4}>Compartilhamento de Dados</SectionTitle>
          <p className="font-inter text-brand-text text-[0.95rem] leading-relaxed mb-3">
            Seus dados <strong>não são vendidos</strong> a terceiros. Podemos compartilhá-los somente com:
          </p>
          <ul className="space-y-2 mb-4">
            {[
              "Plataformas de CRM e automação de marketing (ex.: Brevo), para gestão dos contatos recebidos",
              "Prestadores de serviço de hospedagem e infraestrutura que garantem o funcionamento do site",
              "Autoridades públicas, quando exigido por lei ou ordem judicial",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 font-inter text-[0.9rem] text-brand-text">
                <span className="mt-[5px] w-2 h-2 rounded-full bg-brand-green flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="font-inter text-brand-text-muted text-sm leading-relaxed">
            Todos os parceiros que processam seus dados são obrigados a manter sigilo e segurança compatíveis com esta política.
          </p>
        </Section>

        <Divider />

        {/* 5. Retenção */}
        <Section>
          <SectionTitle number={5}>Prazo de Retenção</SectionTitle>
          <p className="font-inter text-brand-text text-[0.95rem] leading-relaxed">
            Seus dados são mantidos pelo tempo necessário para a prestação do serviço consultivo solicitado ou enquanto houver interesse legítimo justificável. Após esse período, os dados são eliminados de forma segura, salvo obrigação legal de retenção por prazo superior.
          </p>
        </Section>

        <Divider />

        {/* 6. Direitos */}
        <Section>
          <SectionTitle number={6}>Seus Direitos como Titular</SectionTitle>
          <p className="font-inter text-brand-text text-[0.95rem] leading-relaxed mb-4">
            Nos termos da LGPD, você tem o direito de:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { right: "Acesso", desc: "Saber quais dados temos sobre você" },
              { right: "Correção", desc: "Corrigir dados incompletos ou desatualizados" },
              { right: "Eliminação", desc: "Solicitar a exclusão dos seus dados" },
              { right: "Portabilidade", desc: "Receber seus dados em formato legível" },
              { right: "Revogação", desc: "Retirar o consentimento a qualquer momento" },
              { right: "Oposição", desc: "Opor-se a tratamentos com base em legítimo interesse" },
            ].map(({ right, desc }) => (
              <div key={right} className="flex items-start gap-3 rounded-xl border border-brand-gray-light p-3.5 bg-white">
                <span className="mt-[3px] w-2 h-2 rounded-full bg-brand-green flex-shrink-0" />
                <div>
                  <p className="font-outfit font-semibold text-brand-text text-sm">{right}</p>
                  <p className="font-inter text-brand-text-muted text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="font-inter text-brand-text-muted text-sm mt-4 leading-relaxed">
            Para exercer qualquer um desses direitos, entre em contato pelo e-mail{" "}
            <a href="mailto:contato@solucoescondominiais.com.br" className="text-brand-text underline underline-offset-2 hover:text-brand-green transition-colors">
              contato@solucoescondominiais.com.br
            </a>.
          </p>
        </Section>

        <Divider />

        {/* 7. Segurança */}
        <Section>
          <SectionTitle number={7}>Segurança dos Dados</SectionTitle>
          <p className="font-inter text-brand-text text-[0.95rem] leading-relaxed">
            Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição — incluindo transmissão criptografada (HTTPS), controle de acesso restrito e monitoramento de sistemas.
          </p>
        </Section>

        <Divider />

        {/* 8. Cookies */}
        <Section>
          <SectionTitle number={8}>Cookies e Rastreamento</SectionTitle>
          <p className="font-inter text-brand-text text-[0.95rem] leading-relaxed">
            Este site pode utilizar cookies de sessão e parâmetros de URL (como UTM) exclusivamente para mensurar o desempenho de campanhas de marketing. Nenhum cookie de rastreamento de terceiros para fins publicitários é utilizado sem sua ciência.
          </p>
        </Section>

        <Divider />

        {/* 9. Alterações */}
        <Section>
          <SectionTitle number={9}>Alterações nesta Política</SectionTitle>
          <p className="font-inter text-brand-text text-[0.95rem] leading-relaxed">
            Esta política pode ser atualizada periodicamente. Alterações relevantes serão comunicadas por meio de aviso no site. O uso continuado do site após a publicação de alterações constitui aceitação da versão vigente.
          </p>
        </Section>

        <Divider />

        {/* 10. Contato / DPO */}
        <Section>
          <SectionTitle number={10}>Contato e Encarregado de Dados (DPO)</SectionTitle>
          <p className="font-inter text-brand-text text-[0.95rem] leading-relaxed mb-3">
            Dúvidas, solicitações ou reclamações relacionadas a esta política podem ser enviadas a:
          </p>
          <InfoBox>
            <InfoRow label="E-mail" value="contato@solucoescondominiais.com.br" />
            <InfoRow label="Prazo de resposta" value="Até 15 dias úteis" />
          </InfoBox>
          <p className="font-inter text-brand-text-muted text-sm mt-3 leading-relaxed">
            Você também pode registrar reclamações perante a{" "}
            <strong>Autoridade Nacional de Proteção de Dados (ANPD)</strong> em{" "}
            <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-brand-text transition-colors">
              www.gov.br/anpd
            </a>.
          </p>
        </Section>

      </div>

      {/* Footer */}
      <footer className="border-t border-brand-gray-light">
        <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-6">
          <p className="font-inter text-brand-text-muted text-xs text-center leading-relaxed">
            Soluções Condominiais © 2026 ·{" "}
            <a href="/privacidade" className="underline underline-offset-2 hover:text-brand-text">
              Política de privacidade
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
};

/* ── Sub-components ── */

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-0">{children}</section>;
}

function Divider() {
  return <hr className="border-brand-gray-light my-8" />;
}

function SectionTitle({ number, children }: { number: number; children: React.ReactNode }) {
  return (
    <h2 className="font-outfit font-semibold text-xl text-brand-text mb-4 flex items-baseline gap-2">
      <span className="font-outfit font-light text-brand-green text-base tabular-nums">{number}.</span>
      {children}
    </h2>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-brand-gray-light bg-brand-gray-light/40 px-4 py-3 space-y-1.5 mt-3">
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap gap-1 font-inter text-sm">
      <span className="text-brand-text-muted">{label}:</span>
      <span className="text-brand-text font-medium">{value}</span>
    </div>
  );
}
