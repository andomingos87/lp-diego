import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { InsertLead } from "@shared/schema";

export const Web = (): JSX.Element => {
  const [formSuccess, setFormSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: InsertLead) => {
      const res = await apiRequest("POST", "/api/leads", data);
      return res.json();
    },
    onSuccess: () => {
      setFormSuccess(true);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const roleCheckboxes = form.querySelectorAll<HTMLInputElement>('input[name="role"]:checked');
    const role = roleCheckboxes.length > 0 ? roleCheckboxes[0].value : "";

    const rangeCheckboxes = form.querySelectorAll<HTMLInputElement>('input[name="revenueRange"]:checked');
    const revenueRange = rangeCheckboxes.length > 0 ? rangeCheckboxes[0].value : "";

    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      cityState: formData.get("cityState") as string,
      role,
      revenueRange,
    } as InsertLead;

    mutation.mutate(data);
  };

  const handleExclusiveCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      const form = e.target.closest("form");
      if (form) {
        const siblings = form.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`);
        siblings.forEach((cb) => {
          if (cb !== e.target) cb.checked = false;
        });
      }
    }
  };

  const scrollToForm = () => {
    document.getElementById("form-card")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white w-full min-h-screen font-inter">
      <div className="max-w-[1200px] mx-auto px-6 py-8 flex flex-col lg:flex-row gap-10 lg:gap-8 items-start">

        {/* ── LEFT COLUMN ── */}
        <div className="w-full lg:w-[55%] flex flex-col">

          {/* Logo badge */}
          <header data-testid="header-logo" className="mb-8">
            <div className="inline-flex items-center bg-[#e8e8e8] rounded-full px-3 py-1.5 gap-2">
              <span className="font-poppins font-semibold text-[#2b2b2b] text-sm tracking-tight leading-none">
                Soluções
              </span>
              <span className="font-poppins font-light text-[#2b2b2b] text-sm tracking-tight leading-none">
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
          <main>
            <section aria-labelledby="hero-heading" data-testid="section-hero">
              <h1
                id="hero-heading"
                className="font-outfit text-[2.6rem] md:text-[3.2rem] lg:text-[3.4rem] leading-[1.1] text-[#1a1a1a] mb-5"
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

              <p className="font-inter text-[0.95rem] leading-relaxed text-[#555] max-w-sm mb-8" data-testid="section-subtitle">
                O problema não é a inadimplência existir.
                <br />
                O problema é não ter garantia de receita.
              </p>

              {/* Stat photo cards */}
              <div className="flex gap-3" data-testid="section-social-proof">

                {/* Card 1 */}
                <div className="relative flex-1 rounded-2xl overflow-hidden" style={{ aspectRatio: "0.52/1" }}>
                  <img
                    src="/figmaAssets/mask-group-1.png"
                    alt="Condomínios atendidos"
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
                <div className="relative flex-1 rounded-2xl overflow-hidden" style={{ aspectRatio: "0.52/1" }}>
                  <img
                    src="/figmaAssets/mask-group-2.png"
                    alt="Receita recuperada"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {/* Green connector dot between card 1 and 2 */}
                  <div className="absolute top-[44%] -left-[7px] w-[14px] h-[14px] bg-brand-green rounded-full z-10 shadow-sm" />
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
                <div className="relative flex-1 rounded-2xl overflow-hidden" style={{ aspectRatio: "0.52/1" }}>
                  <img
                    src="/figmaAssets/mask-group-3.png"
                    alt="Especialistas em receita condominial"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {/* Green connector dot between card 2 and 3 */}
                  <div className="absolute top-[44%] -left-[7px] w-[14px] h-[14px] bg-brand-green rounded-full z-10 shadow-sm" />
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
          </main>
        </div>

        {/* ── RIGHT COLUMN — Phone mockup form card ── */}
        <div className="w-full lg:w-[45%] flex justify-center lg:justify-end" id="form-card" data-testid="section-form-card">
          {/* Phone frame */}
          <div className="relative w-full max-w-[340px] bg-[#2b2b2b] rounded-[2.8rem] px-6 pt-8 pb-7 shadow-2xl">

            {/* Phone notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-[18px] bg-white rounded-full" />

            {/* Left green tab with icon */}
            <div className="absolute top-16 -left-[1px] flex flex-col items-center">
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

                <div>
                  <label htmlFor="nome" className="block font-inter text-[0.72rem] text-white/80 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="name"
                    required
                    className="w-full h-9 rounded-md bg-transparent border border-white/30 px-3 text-white text-sm font-inter focus:border-brand-green focus:ring-1 focus:ring-brand-green/50 focus:outline-none transition-colors"
                    data-testid="input-name"
                  />
                </div>

                <div>
                  <label htmlFor="telefone" className="block font-inter text-[0.72rem] text-white/80 mb-1">
                    Telefone/WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="phone"
                    required
                    className="w-full h-9 rounded-md bg-transparent border border-white/30 px-3 text-white text-sm font-inter focus:border-brand-green focus:ring-1 focus:ring-brand-green/50 focus:outline-none transition-colors"
                    data-testid="input-phone"
                  />
                </div>

                <div>
                  <label htmlFor="cidade" className="block font-inter text-[0.72rem] text-white/80 mb-1">
                    Cidade/Estado
                  </label>
                  <input
                    type="text"
                    id="cidade"
                    name="cityState"
                    required
                    className="w-full h-9 rounded-md bg-transparent border border-white/30 px-3 text-white text-sm font-inter focus:border-brand-green focus:ring-1 focus:ring-brand-green/50 focus:outline-none transition-colors"
                    data-testid="input-city"
                  />
                </div>

                <fieldset>
                  <legend className="font-inter text-[0.72rem] text-white/80 mb-1.5">
                    Você é:
                  </legend>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 font-inter text-white text-xs cursor-pointer hover:text-brand-green transition-colors">
                      <input type="checkbox" name="role" value="Síndico profissional" onChange={handleExclusiveCheckbox} className="accent-brand-green w-3.5 h-3.5 rounded" data-testid="checkbox-sindico-profissional" />
                      Síndico profissional
                    </label>
                    <label className="flex items-center gap-2 font-inter text-white text-xs cursor-pointer hover:text-brand-green transition-colors">
                      <input type="checkbox" name="role" value="Administrador" onChange={handleExclusiveCheckbox} className="accent-brand-green w-3.5 h-3.5 rounded" data-testid="checkbox-administrador" />
                      Administrador
                    </label>
                    <label className="flex items-center gap-2 font-inter text-white text-xs cursor-pointer hover:text-brand-green transition-colors">
                      <input type="checkbox" name="role" value="Síndico morador" onChange={handleExclusiveCheckbox} className="accent-brand-green w-3.5 h-3.5 rounded" data-testid="checkbox-sindico-morador" />
                      Síndico morador
                    </label>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="font-inter text-[0.72rem] text-white/80 mb-1.5">
                    Faixa de gestão de condomínios:
                  </legend>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 font-inter text-white text-xs cursor-pointer hover:text-brand-green transition-colors">
                      <input type="checkbox" name="revenueRange" value="Até R$ 20.000" onChange={handleExclusiveCheckbox} className="accent-brand-green w-3.5 h-3.5 rounded" data-testid="checkbox-range-20k" />
                      Até R$ 20.000
                    </label>
                    <label className="flex items-center gap-2 font-inter text-white text-xs cursor-pointer hover:text-brand-green transition-colors">
                      <input type="checkbox" name="revenueRange" value="Até R$ 50.000" onChange={handleExclusiveCheckbox} className="accent-brand-green w-3.5 h-3.5 rounded" data-testid="checkbox-range-50k" />
                      Até R$ 50.000
                    </label>
                    <label className="flex items-center gap-2 font-inter text-white text-xs cursor-pointer hover:text-brand-green transition-colors">
                      <input type="checkbox" name="revenueRange" value="Acima de R$ 50.000 até R$ 100.000" onChange={handleExclusiveCheckbox} className="accent-brand-green w-3.5 h-3.5 rounded" data-testid="checkbox-range-100k" />
                      Acima de R$ 50.000 até R$ 100.000
                    </label>
                  </div>
                </fieldset>

                {mutation.isError && (
                  <p className="font-inter text-red-400 text-xs text-center" data-testid="form-error">
                    Erro ao enviar. Verifique os campos e tente novamente.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full h-11 bg-brand-green hover:bg-brand-green-light active:scale-[0.98] rounded-lg shadow-md font-outfit font-bold text-white text-sm tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-white/40 focus:outline-none mt-1"
                  data-testid="button-submit"
                >
                  {mutation.isPending ? "ENVIANDO..." : "QUERO MINHA ANÁLISE GRATUITA"}
                </button>
              </form>
            )}

            <p className="font-inter font-light text-white/70 text-[0.72rem] text-center leading-relaxed mt-4">
              Nosso especialista irá apresentar um cenário financeiro mais seguro, para que sua gestão não fique refém da inadimplência.
            </p>

          </div>
        </div>

      </div>

      {/* ── EXEMPLO RÁPIDO SECTION ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-10" data-testid="section-info-cards">
        <div className="bg-[#2b2b2b] rounded-2xl md:rounded-3xl p-6 md:p-8 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2.5 h-2.5 bg-brand-green rounded-full flex-shrink-0" />
            <h2 className="font-poppins text-lg md:text-xl text-white">
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
      <section className="relative w-full overflow-hidden py-16 md:py-20" data-testid="section-bottom-cta">
        <div className="absolute inset-0 flex">
          <div className="w-1/3 h-full">
            <img
              src="/figmaAssets/mask-group-1.png"
              alt=""
              className="w-full h-full object-cover grayscale opacity-40"
            />
          </div>
          <div className="w-1/3 h-full bg-white" />
          <div className="w-1/3 h-full">
            <img
              src="/figmaAssets/mask-group-1.png"
              alt=""
              className="w-full h-full object-cover grayscale opacity-40 scale-x-[-1]"
            />
          </div>
        </div>

        <div className="relative z-10 max-w-lg mx-auto text-center px-6">
          <h2 className="font-outfit text-2xl md:text-3xl text-[#1a1a1a] leading-snug">
            <span className="font-bold">Descubra </span>
            <span className="font-light">quanto seu condomínio pode estar deixando de arrecadar</span>
          </h2>

          <p className="font-inter font-light text-[#555] text-sm md:text-base text-center leading-relaxed mt-4">
            Uma análise simples pode revelar valores que estão comprometendo decisões importantes.
          </p>

          <button
            type="button"
            onClick={scrollToForm}
            className="mt-6 px-8 h-12 bg-brand-green hover:bg-brand-green-light active:scale-[0.98] rounded-lg shadow-md font-outfit font-bold text-white text-sm tracking-wide transition-all duration-200 focus:ring-2 focus:ring-brand-green/50 focus:outline-none"
            data-testid="button-bottom-cta"
          >
            QUERO MINHA ANÁLISE GRATUITA
          </button>
        </div>
      </section>

    </div>
  );
};
