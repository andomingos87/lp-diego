import { useEffect, useId, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { submitLeadToBrevo } from "@/lib/brevo";
import type { LeadPayload } from "@/lib/brevo";

export const Web = (): JSX.Element => {
  const SUBMIT_COOLDOWN_MS = 15000;
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const roleFieldsetId = useId();
  const revenueFieldsetId = useId();
  const exampleSectionRef = useRef<HTMLElement | null>(null);
  const socialProofSectionRef = useRef<HTMLElement | null>(null);
  const bottomCtaSectionRef = useRef<HTMLElement | null>(null);
  const [visibleSections, setVisibleSections] = useState({
    example: false,
    socialProof: false,
    bottomCta: false,
  });

  const mutation = useMutation({
    mutationFn: async (data: LeadPayload) => {
      await submitLeadToBrevo(data);
    },
    onSuccess: () => {
      setFormError(null);
      setFormSuccess(true);
    },
    onError: () => {
      setFormError("Erro ao enviar. Verifique os campos e tente novamente.");
    },
  });

  const buildLeadSource = (): string => {
    const searchParams = new URLSearchParams(window.location.search);
    const utmSource = searchParams.get("utm_source");
    const utmCampaign = searchParams.get("utm_campaign");

    if (utmSource && utmCampaign) {
      return `lp-diego:${utmSource}:${utmCampaign}`;
    }

    if (utmSource) {
      return `lp-diego:${utmSource}`;
    }

    return "lp-diego:direct";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const honeypot = (formData.get("website") as string | null)?.trim();
    if (honeypot) {
      setFormError("Não foi possível enviar o formulário.");
      return;
    }

    const lastSubmitAtRaw = window.sessionStorage.getItem("lead_last_submit_at");
    const lastSubmitAt = lastSubmitAtRaw ? Number(lastSubmitAtRaw) : 0;
    if (Date.now() - lastSubmitAt < SUBMIT_COOLDOWN_MS) {
      setFormError("Aguarde alguns segundos antes de tentar novamente.");
      return;
    }

    const role = (formData.get("role") as string) || "Síndico profissional";
    const revenueRange = (formData.get("revenueRange") as string) || "Até R$ 50.000";
    mutation.mutate({
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      cityState: formData.get("cityState") as string,
      role,
      revenueRange,
      source: buildLeadSource(),
    } as LeadPayload);
    window.sessionStorage.setItem("lead_last_submit_at", String(Date.now()));
  };

  const scrollToForm = () => {
    document.getElementById("form-card")?.scrollIntoView({ behavior: "smooth" });
  };

  const formatPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Mutação direta no DOM (input não-controlado). Se tornar controlado no futuro,
    // converter para useState + value prop.
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (digits.length > 10) {
      e.target.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    } else if (digits.length > 6) {
      e.target.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    } else if (digits.length > 2) {
      e.target.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length > 0) {
      e.target.value = `(${digits}`;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, targetObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (entry.target === exampleSectionRef.current) {
            setVisibleSections((prev) => ({ ...prev, example: true }));
          }

          if (entry.target === socialProofSectionRef.current) {
            setVisibleSections((prev) => ({ ...prev, socialProof: true }));
          }

          if (entry.target === bottomCtaSectionRef.current) {
            setVisibleSections((prev) => ({ ...prev, bottomCta: true }));
          }

          targetObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    const sections = [exampleSectionRef.current, socialProofSectionRef.current, bottomCtaSectionRef.current];
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white w-full min-h-screen overflow-x-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col md:flex-row gap-8 items-start">

        {/* ── LEFT COLUMN ── */}
        <div className="w-full md:w-[55%] flex flex-col bg-gradient-to-br from-white to-gray-50/60 rounded-2xl p-3 sm:p-4">

          {/* Logo badge */}
          <header
            data-testid="header-logo"
            className="mb-8 animate-fade-in opacity-0"
            style={{ "--animation-delay": "0s" } as React.CSSProperties}
          >
            <div className="inline-flex items-center bg-brand-gray-light rounded-full px-3 py-1.5 gap-2">
              <span className="font-outfit font-semibold text-brand-dark text-sm tracking-tight leading-none">
                Soluções
              </span>
              <span className="font-outfit font-light text-brand-dark text-sm tracking-tight leading-none">
                Condominiais
              </span>
              <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                <img
                  className="w-[10px] h-[10px]"
                  alt="Arrow icon"
                  src="/figmaAssets/vector-3.svg"
                />
              </div>
            </div>
          </header>

          {/* Main headline */}
          <section aria-labelledby="hero-heading" data-testid="section-hero">
            <h1
              id="hero-heading"
              className="font-outfit text-[2.15rem] sm:text-[2.6rem] md:text-[3.2rem] lg:text-[3.4rem] leading-[1.08] text-brand-text mb-5 animate-fade-up opacity-0 break-words"
              style={{ "--animation-delay": "0.1s" } as React.CSSProperties}
            >
              <span className="font-bold">3 a 6 meses </span>
              <span className="font-light">de</span>
              <br />
              <span className="font-light">inadimplência custam</span>
              <br />
              <span className="font-bold text-brand-green">muito caro</span>
              <br />
              <span className="font-light">para o seu condomínio</span>
            </h1>

            <p
              className="font-inter text-[0.95rem] leading-relaxed text-brand-text-muted max-w-sm mb-8 animate-fade-up opacity-0"
              data-testid="section-subtitle"
              style={{ "--animation-delay": "0.2s" } as React.CSSProperties}
            >
              O problema não é a inadimplência existir.
              <br />
              O problema é não ter garantia de receita.
            </p>

            <button
              type="button"
              onClick={scrollToForm}
              className="md:hidden mt-1 mb-4 px-6 h-11 bg-brand-green hover:bg-brand-green-light active:scale-[0.98] rounded-full shadow-md font-outfit font-bold text-white text-sm tracking-wide transition-all duration-200 focus:ring-2 focus:ring-brand-green/50 focus:outline-none"
            >
              Ver análise gratuita ↓
            </button>

            <ul className="md:hidden mb-6 space-y-2">
              <li className="flex items-start gap-2 font-inter text-sm text-brand-text">
                <span className="text-brand-green mt-0.5">✓</span>
                Diagnóstico do risco de inadimplência do seu condomínio
              </li>
              <li className="flex items-start gap-2 font-inter text-sm text-brand-text">
                <span className="text-brand-green mt-0.5">✓</span>
                Simulação do impacto financeiro no caixa mensal
              </li>
              <li className="flex items-start gap-2 font-inter text-sm text-brand-text">
                <span className="text-brand-green mt-0.5">✓</span>
                Plano inicial de ação para reduzir exposição ao risco
              </li>
            </ul>

            {/* Stat photo cards */}
            <div className="flex gap-2.5 sm:gap-3 w-full" data-testid="section-social-proof">

              {/* Card 1 */}
              <div
                className="relative flex-1 min-w-0 rounded-2xl overflow-hidden animate-fade-up opacity-0"
                style={{ aspectRatio: "0.52/1", "--animation-delay": "0.3s" } as React.CSSProperties}
              >
                <img
                  src="/figmaAssets/mask-group-1.png"
                  alt="Condomínios atendidos"
                  width={260}
                  height={500}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-6 h-5 bg-brand-green rounded-[4px_6px_6px_4px] flex items-center justify-center flex-shrink-0">
                      <img src="/figmaAssets/vector-1.svg" alt="" className="w-[11px] h-[11px]" />
                    </div>
                  </div>
                  <p className="font-outfit font-bold text-white text-xl leading-tight" data-testid="stat-condominios-value">+120</p>
                  <p className="font-inter font-light text-white/90 text-xs leading-snug" data-testid="stat-condominios-label">condomínios atendidos</p>
                </div>
              </div>

              {/* Card 2 */}
              <div
                className="relative flex-1 min-w-0 rounded-2xl overflow-hidden animate-fade-up opacity-0"
                style={{ aspectRatio: "0.52/1", "--animation-delay": "0.4s" } as React.CSSProperties}
              >
                <img
                  src="/figmaAssets/mask-group-2.png"
                  alt="Receita recuperada"
                  width={260}
                  height={500}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Green connector dot between card 1 and 2 */}
                <div aria-hidden="true" className="absolute top-[44%] -left-[7px] w-[14px] h-[14px] bg-brand-green rounded-full z-10 shadow-sm" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-6 h-5 bg-brand-green rounded-[4px_6px_6px_4px] flex items-center justify-center flex-shrink-0">
                      <img src="/figmaAssets/vector-4.svg" alt="" className="w-[11px] h-[11px]" />
                    </div>
                  </div>
                  <p className="font-outfit font-bold text-white text-xl leading-tight" data-testid="stat-recuperados-value">+R$ 100 mil</p>
                  <p className="font-inter font-light text-white/90 text-xs leading-snug" data-testid="stat-recuperados-label">recuperados</p>
                </div>
              </div>

              {/* Card 3 */}
              <div
                className="relative flex-1 min-w-0 rounded-2xl overflow-hidden animate-fade-up opacity-0"
                style={{ aspectRatio: "0.52/1", "--animation-delay": "0.5s" } as React.CSSProperties}
              >
                <img
                  src="/figmaAssets/mask-group-3.png"
                  alt="Especialistas em receita condominial"
                  width={260}
                  height={500}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Green connector dot between card 2 and 3 */}
                <div aria-hidden="true" className="absolute top-[44%] -left-[7px] w-[14px] h-[14px] bg-brand-green rounded-full z-10 shadow-sm" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-6 h-5 bg-brand-green rounded-[4px_6px_6px_4px] flex items-center justify-center flex-shrink-0">
                      <img src="/figmaAssets/vector-5.svg" alt="" className="w-[11px] h-[11px]" />
                    </div>
                  </div>
                  <p className="font-outfit font-bold text-white text-xl leading-tight" data-testid="stat-especialistas-value">Especialistas</p>
                  <p className="font-inter font-light text-white/90 text-xs leading-snug" data-testid="stat-especialistas-label">em receita condominial</p>
                </div>
              </div>

            </div>
          </section>
        </div>

        {/* ── RIGHT COLUMN — Phone mockup form card ── */}
        <div className="w-full md:w-[45%] flex justify-center md:justify-end" id="form-card" data-testid="section-form-card">
          {/* Phone frame */}
          <div className="relative w-full max-w-[340px] bg-brand-dark rounded-2xl lg:rounded-[2.8rem] px-5 sm:px-6 pt-6 lg:pt-8 pb-7 shadow-2xl">

            {/* Phone notch */}
            <div className="hidden lg:block absolute top-3 left-1/2 -translate-x-1/2 w-20 h-[18px] bg-white rounded-full" />

            {/* Left green tab with icon */}
            <div className="hidden lg:flex absolute top-16 -left-[1px] flex-col items-center">
              <div className="w-8 h-[52px] bg-brand-green rounded-[0_6px_6px_0] flex items-center justify-center">
                <img src="/figmaAssets/vector-4.svg" alt="" className="w-[14px] h-[14px]" />
              </div>
            </div>

            {/* Form heading */}
            <h2 className="font-outfit text-[1.35rem] text-white text-center leading-snug mb-1 mt-3">
              <span className="font-normal">Receba uma<br />análise </span>
              <span className="font-bold">gratuita</span>
              <span className="font-normal"><br />da receita do seu<br />condomínio</span>
            </h2>

            <p className="font-inter text-[0.78rem] text-white/70 text-center leading-snug italic mb-5">
              Leva menos de 1 minuto.
              <br />
              Sem compromisso.
            </p>

            {formSuccess ? (
              <div className="text-center py-8" data-testid="form-success">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-outfit font-bold text-white text-xl mb-2">Obrigado!</p>
                <p className="font-inter text-white text-sm leading-relaxed">
                  Recebemos suas informações. Nosso especialista entrará em contato em breve.
                </p>
              </div>
            ) : (
              <form className="space-y-3" onSubmit={handleSubmit} data-testid="form-lead-capture">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div>
                  <label htmlFor="nome" className="block font-inter text-xs text-white/80 mb-1">
                    Nome <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="name"
                    required
                    autoComplete="name"
                    className="w-full h-11 rounded-md bg-transparent border border-white/30 px-3 text-white text-sm font-inter focus:border-brand-green focus:ring-1 focus:ring-brand-green/50 focus:outline-none transition-colors"
                    data-testid="input-name"
                  />
                </div>

                <div>
                  <label htmlFor="telefone" className="block font-inter text-xs text-white/80 mb-1">
                    Telefone/WhatsApp <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="tel"
                    id="telefone"
                    name="phone"
                    required
                    onChange={formatPhone}
                    maxLength={16}
                    autoComplete="tel"
                    className="w-full h-11 rounded-md bg-transparent border border-white/30 px-3 text-white text-sm font-inter focus:border-brand-green focus:ring-1 focus:ring-brand-green/50 focus:outline-none transition-colors"
                    data-testid="input-phone"
                  />
                </div>

                <div>
                  <label htmlFor="cidade" className="block font-inter text-xs text-white/80 mb-1">
                    Cidade/Estado <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="cidade"
                    name="cityState"
                    required
                    autoComplete="address-level2"
                    className="w-full h-11 rounded-md bg-transparent border border-white/30 px-3 text-white text-sm font-inter focus:border-brand-green focus:ring-1 focus:ring-brand-green/50 focus:outline-none transition-colors"
                    data-testid="input-city"
                  />
                </div>

                <details open className="rounded-lg border border-white/15 bg-white/5 p-3">
                  <summary className="font-inter text-xs text-white/85 cursor-pointer">
                    Informações adicionais (opcional)
                  </summary>

                  <div className="mt-3 space-y-3">
                    <fieldset aria-labelledby={roleFieldsetId}>
                      <legend id={roleFieldsetId} className="font-inter text-xs text-white/80 mb-1.5">
                        Você é:
                      </legend>
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-2 font-inter text-white text-xs cursor-pointer hover:text-brand-green transition-colors">
                          <input type="radio" name="role" defaultChecked value="Síndico profissional" className="accent-brand-green w-3.5 h-3.5" data-testid="checkbox-sindico-profissional" />
                          Síndico profissional
                        </label>
                        <label className="flex items-center gap-2 font-inter text-white text-xs cursor-pointer hover:text-brand-green transition-colors">
                          <input type="radio" name="role" value="Administrador" className="accent-brand-green w-3.5 h-3.5" data-testid="checkbox-administrador" />
                          Administrador
                        </label>
                        <label className="flex items-center gap-2 font-inter text-white text-xs cursor-pointer hover:text-brand-green transition-colors">
                          <input type="radio" name="role" value="Síndico morador" className="accent-brand-green w-3.5 h-3.5" data-testid="checkbox-sindico-morador" />
                          Síndico morador
                        </label>
                      </div>
                    </fieldset>

                    <fieldset aria-labelledby={revenueFieldsetId}>
                      <legend id={revenueFieldsetId} className="font-inter text-xs text-white/80 mb-1.5">
                        Faixa de gestão de condomínios:
                      </legend>
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-2 font-inter text-white text-xs cursor-pointer hover:text-brand-green transition-colors">
                          <input type="radio" name="revenueRange" value="Até R$ 20.000" className="accent-brand-green w-3.5 h-3.5" data-testid="checkbox-range-20k" />
                          Até R$ 20.000
                        </label>
                        <label className="flex items-center gap-2 font-inter text-white text-xs cursor-pointer hover:text-brand-green transition-colors">
                          <input type="radio" name="revenueRange" defaultChecked value="Até R$ 50.000" className="accent-brand-green w-3.5 h-3.5" data-testid="checkbox-range-50k" />
                          Até R$ 50.000
                        </label>
                        <label className="flex items-center gap-2 font-inter text-white text-xs cursor-pointer hover:text-brand-green transition-colors">
                          <input type="radio" name="revenueRange" value="Acima de R$ 50.000 até R$ 100.000" className="accent-brand-green w-3.5 h-3.5" data-testid="checkbox-range-100k" />
                          Acima de R$ 50.000 até R$ 100.000
                        </label>
                      </div>
                    </fieldset>
                  </div>
                </details>

                {formError && (
                  <p className="font-inter text-red-400 text-xs text-center" data-testid="form-error">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full h-11 bg-brand-green hover:bg-brand-green-light active:scale-[0.98] rounded-full shadow-md font-outfit font-bold text-white text-sm tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-white/40 focus:outline-none mt-1"
                  data-testid="button-submit"
                >
                  {mutation.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-100" d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                      </svg>
                      ENVIANDO...
                    </span>
                  ) : (
                    "QUERO MINHA ANÁLISE GRATUITA"
                  )}
                </button>

                <p className="font-inter font-light text-white/80 text-xs text-center leading-relaxed mt-4">
                  Nosso especialista irá apresentar um cenário financeiro mais seguro, para que sua gestão não fique refém da inadimplência.
                </p>
                <p className="font-inter text-white/90 text-xs text-center leading-relaxed">
                  Sem spam.{" "}
                  <a href="/privacidade" className="underline underline-offset-2 hover:text-white">
                    Política de privacidade
                  </a>
                  .
                </p>
                <p className="font-inter text-white/80 text-[0.7rem] text-center leading-relaxed -mt-1">
                  Ao enviar, você autoriza contato consultivo e tratamento dos dados conforme a política de privacidade.
                </p>
                <p className="font-inter text-white/90 text-xs text-center leading-relaxed -mt-1">
                  Retorno consultivo em até 24h úteis.
                </p>
                <p className="font-inter text-white/70 text-[0.7rem] text-center leading-relaxed -mt-1">
                  ou{" "}
                  <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-white hover:text-brand-green-light">
                    fale pelo WhatsApp
                  </a>
                </p>
              </form>
            )}

          </div>
        </div>

      </div>

      {/* ── EXEMPLO RÁPIDO SECTION ── */}
      <section
        ref={exampleSectionRef}
        className={`max-w-[1200px] mx-auto px-4 sm:px-6 pb-10 ${visibleSections.example ? "animate-fade-up opacity-0" : "opacity-0"}`}
        data-testid="section-info-cards"
      >
        <div className="bg-brand-dark rounded-2xl md:rounded-3xl p-6 md:p-8 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2.5 h-2.5 bg-brand-green rounded-full flex-shrink-0" />
            <h2 className="font-outfit text-lg md:text-xl text-white">
              <span className="font-semibold">Exemplo</span>
              <span className="font-light"> rápido</span>
            </h2>
            <div className="ml-auto w-[46px] h-[15px] bg-brand-green rounded-[7.5px]" />
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative bg-[#3a3a3a] rounded-xl p-4 min-h-[110px]">
                <p className="font-outfit font-medium text-white/20 text-5xl absolute top-2 left-3">01</p>
                <p className="font-inter text-white text-sm leading-relaxed relative z-10 mt-7">
                  Condomínio com <span className="font-semibold">100</span> unidades, com uma receita mensal estimada: <span className="font-bold">R$ 100.000</span>.
                </p>
              </div>

              <div className="relative bg-[#3a3a3a] rounded-xl p-4 min-h-[110px]">
                <p className="font-outfit font-medium text-white/20 text-5xl absolute top-2 left-3">02</p>
                <p className="font-inter text-white text-sm leading-relaxed relative z-10 mt-7">
                  Apenas <span className="font-semibold">4</span> unidades inadimplentes durante <span className="font-semibold">3</span> meses, resulta <span className="font-bold">R$ 12.000</span> fora do caixa.
                </p>
              </div>

              <div className="relative bg-[#3a3a3a] rounded-xl p-4 min-h-[110px]">
                <p className="font-outfit font-medium text-white/20 text-5xl absolute top-2 left-3">03</p>
                <p className="font-inter text-white text-sm leading-relaxed relative z-10 mt-7">
                  Se o atraso chega a <span className="font-semibold">6</span> meses serão <span className="font-bold">R$ 24.000</span> comprometidos.
                </p>
              </div>

              <div className="relative bg-brand-green rounded-xl p-4 min-h-[110px] flex items-start gap-2">
                <svg className="w-4 h-4 mt-1 flex-shrink-0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 1v11m0 0l-4-4m4 4l4-4M2 14h12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="font-inter text-white text-sm leading-relaxed">
                  <span className="font-bold">3 a 6 meses</span> já são suficientes para <span className="font-bold">comprometer</span> decisões importantes
                </p>
              </div>
            </div>

            <div className="relative w-full lg:w-[240px] flex-shrink-0 rounded-xl overflow-hidden min-h-[200px] lg:min-h-0">
              <img
                src="/figmaAssets/mask-group-5.png"
                alt="Especialista analisando dados financeiros"
                loading="lazy"
                width={480}
                height={640}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 w-[46px] h-[15px] bg-brand-green rounded-[7.5px]" />
              <div className="absolute bottom-3 right-3 w-[46px] h-[15px] bg-brand-green rounded-[7.5px]" />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-5">
            <div className="w-2.5 h-2.5 bg-brand-green rounded-full flex-shrink-0" />
            <p className="font-inter text-white text-sm leading-relaxed">
              A inadimplência <span className="font-semibold">não</span> precisa ser alta para gerar impacto financeiro.
            </p>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA SECTION ── */}
      <section
        ref={socialProofSectionRef}
        className={`max-w-[1200px] mx-auto px-4 sm:px-6 pb-10 ${visibleSections.socialProof ? "animate-fade-up opacity-0" : "opacity-0"}`}
        data-testid="section-social-proof-extended"
      >
        <div className="bg-white border border-brand-gray-light rounded-2xl md:rounded-3xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="font-outfit text-2xl md:text-3xl text-brand-text leading-snug">
              Quem já tomou essa decisão sente o impacto no caixa
            </h2>
            <p className="font-inter text-brand-text-muted text-sm md:text-base mt-2">
              Síndicos e administradores que agiram cedo reduziram risco financeiro e ganharam previsibilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <article className="rounded-xl border border-brand-gray-light p-4 bg-white">
              <p className="font-inter text-brand-text text-sm leading-relaxed">
                “Em dois meses, saímos de decisões no escuro para planejamento com caixa previsível.”
              </p>
              <p className="font-outfit text-brand-text font-semibold text-sm mt-3">Carla M.</p>
              <p className="font-inter text-brand-text-muted text-xs">Síndica profissional — Curitiba/PR</p>
            </article>
            <article className="rounded-xl border border-brand-gray-light p-4 bg-white">
              <p className="font-inter text-brand-text text-sm leading-relaxed">
                “Recuperamos valores relevantes e evitamos postergar manutenções importantes.”
              </p>
              <p className="font-outfit text-brand-text font-semibold text-sm mt-3">Rafael S.</p>
              <p className="font-inter text-brand-text-muted text-xs">Administrador — Campinas/SP</p>
            </article>
            <article className="rounded-xl border border-brand-gray-light p-4 bg-white">
              <p className="font-inter text-brand-text text-sm leading-relaxed">
                “O diagnóstico mostrou exatamente onde estávamos perdendo receita mês a mês.”
              </p>
              <p className="font-outfit text-brand-text font-semibold text-sm mt-3">Juliana P.</p>
              <p className="font-inter text-brand-text-muted text-xs">Síndica moradora — Belo Horizonte/MG</p>
            </article>
          </div>

        </div>
      </section>

      <section
        ref={bottomCtaSectionRef}
        className={`max-w-[1200px] mx-auto px-4 sm:px-6 pb-10 ${visibleSections.bottomCta ? "animate-fade-up opacity-0" : "opacity-0"}`}
        data-testid="section-bottom-cta"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100">
          <img
            src="/figmaAssets/cta-buildings.png"
            alt="Vista de edifícios"
            loading="lazy"
            width={1200}
            height={640}
            className="absolute inset-0 w-full h-full object-cover object-bottom grayscale"
          />
          <div className="absolute inset-0 bg-white/75" />

          <div className="relative z-10 py-14 md:py-20 max-w-lg mx-auto text-center px-6">
            <h2 className="font-outfit text-2xl md:text-3xl text-brand-text leading-snug">
              <span className="font-bold">Descubra </span>
              <span className="font-light">quanto seu condomínio pode estar deixando de arrecadar</span>
            </h2>

            <p className="font-inter font-light text-brand-text-muted text-sm md:text-base text-center leading-relaxed mt-4">
              Uma análise simples pode revelar valores que estão comprometendo decisões importantes.
            </p>

            <button
              type="button"
              onClick={scrollToForm}
              className="mt-6 px-8 h-12 bg-brand-green border border-brand-green hover:bg-brand-green-light active:scale-[0.98] rounded-full shadow-md font-outfit font-bold text-white text-sm tracking-wide transition-all duration-200 focus:ring-2 focus:ring-brand-green/50 focus:outline-none"
              data-testid="button-bottom-cta"
            >
              QUERO MINHA ANÁLISE GRATUITA
            </button>
          </div>
        </div>
      </section>

      <footer className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 border-t border-brand-gray-light">
        <p className="font-inter text-brand-text-muted text-xs text-center leading-relaxed">
          Soluções Condominiais © 2026 — CNPJ: 00.000.000/0000-00 ·{" "}
          <a href="/privacidade" className="underline underline-offset-2 hover:text-brand-text">
            Política de privacidade
          </a>
        </p>
      </footer>

    </main>
  );
};
