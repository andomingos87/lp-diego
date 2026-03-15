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

  const scrollToForm = () => {
    document.getElementById("form-card")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white w-full min-h-screen">
      <header className="px-4 py-4 md:px-8 lg:px-16" data-testid="header-logo">
        <div className="inline-flex items-center gap-1.5">
          <span className="font-poppins font-semibold text-brand-text text-lg tracking-tight">
            Soluções
          </span>
          <span className="font-poppins font-light italic text-brand-text text-lg tracking-tight">
            Condominiais
          </span>
          <div className="w-5 h-5 bg-brand-green rounded-full flex items-center justify-center">
            <img
              className="w-[10px] h-[10px]"
              alt="Checkmark icon"
              src="/figmaAssets/vector-3.svg"
            />
          </div>
        </div>
      </header>

      <main>
        <section className="px-4 md:px-8 lg:px-16 py-8 lg:py-12" data-testid="section-hero">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row flex-wrap lg:flex-nowrap gap-8 lg:gap-12 items-start">
            <div className="order-1 w-full lg:flex-1">
              <h1 className="font-outfit text-3xl md:text-4xl lg:text-5xl leading-tight text-brand-text">
                <span className="font-semibold">3 a 6 meses </span>
                <span className="font-light">
                  de inadimplência custam
                </span>{" "}
                <span className="font-semibold text-brand-green">
                  muito caro
                </span>
                <br />
                <span className="font-light">
                  para o seu condomínio
                </span>
              </h1>

              <p className="font-inter text-base leading-relaxed text-brand-text-muted max-w-md mt-6" data-testid="section-subtitle">
                O problema não é a inadimplência existir.
                <br />
                O problema é não ter garantia de receita.
              </p>
            </div>

            <div className="order-2 lg:order-3 w-full lg:w-auto lg:flex-shrink-0" id="form-card" data-testid="section-form-card">
              <div className="relative w-full max-w-sm mx-auto lg:mx-0 bg-brand-dark-deep rounded-3xl p-6 pt-8 pb-8">
                <div className="absolute top-6 left-0 w-8 h-6 bg-brand-green rounded-[4px_0px_4px_10px]" />
                <img
                  className="absolute top-7 left-[7px] w-[17px] h-[17px]"
                  alt="Form icon"
                  src="/figmaAssets/mask-group-4.png"
                />

                <h2 className="font-outfit text-xl md:text-2xl text-white text-center leading-snug mb-2 mt-2">
                  <span className="font-bold">Receba</span> uma análise{" "}
                  <span className="font-bold">gratuita</span> da receita do seu condomínio
                </h2>

                <p className="font-inter text-sm text-white text-center leading-relaxed italic mb-6">
                  Leva menos de 1 minuto. Sem compromisso.
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
                  <form className="space-y-4" onSubmit={handleSubmit} data-testid="form-lead-capture">
                    <div>
                      <label htmlFor="nome" className="block font-poppins font-semibold text-brand-gray-light text-xs mb-1">
                        Nome
                      </label>
                      <input
                        type="text"
                        id="nome"
                        name="name"
                        required
                        className="w-full h-10 rounded-md bg-transparent border border-brand-gray-light px-3 text-white text-sm font-inter focus:border-brand-green focus:ring-2 focus:ring-brand-green/50 focus:outline-none transition-colors"
                        data-testid="input-name"
                      />
                    </div>

                    <div>
                      <label htmlFor="telefone" className="block font-poppins font-semibold text-brand-gray-light text-xs mb-1">
                        Telefone/WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="telefone"
                        name="phone"
                        required
                        className="w-full h-10 rounded-md bg-transparent border border-brand-gray-light px-3 text-white text-sm font-inter focus:border-brand-green focus:ring-2 focus:ring-brand-green/50 focus:outline-none transition-colors"
                        data-testid="input-phone"
                      />
                    </div>

                    <div>
                      <label htmlFor="cidade" className="block font-poppins font-semibold text-brand-gray-light text-xs mb-1">
                        Cidade/Estado
                      </label>
                      <input
                        type="text"
                        id="cidade"
                        name="cityState"
                        required
                        className="w-full h-10 rounded-md bg-transparent border border-brand-gray-light px-3 text-white text-sm font-inter focus:border-brand-green focus:ring-2 focus:ring-brand-green/50 focus:outline-none transition-colors"
                        data-testid="input-city"
                      />
                    </div>

                    <fieldset>
                      <legend className="font-poppins font-semibold text-brand-gray-light text-xs mb-2">
                        Você é:
                      </legend>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 font-inter font-light text-white text-sm cursor-pointer hover:text-brand-green-light transition-colors">
                          <input type="checkbox" name="role" value="Síndico profissional" className="accent-brand-green w-4 h-4 rounded focus:ring-2 focus:ring-brand-green/50" data-testid="checkbox-sindico-profissional" />
                          Síndico profissional
                        </label>
                        <label className="flex items-center gap-2 font-inter font-light text-white text-sm cursor-pointer hover:text-brand-green-light transition-colors">
                          <input type="checkbox" name="role" value="Administrador" className="accent-brand-green w-4 h-4 rounded focus:ring-2 focus:ring-brand-green/50" data-testid="checkbox-administrador" />
                          Administrador
                        </label>
                        <label className="flex items-center gap-2 font-inter font-light text-white text-sm cursor-pointer hover:text-brand-green-light transition-colors">
                          <input type="checkbox" name="role" value="Síndico morador" className="accent-brand-green w-4 h-4 rounded focus:ring-2 focus:ring-brand-green/50" data-testid="checkbox-sindico-morador" />
                          Síndico morador
                        </label>
                      </div>
                    </fieldset>

                    <fieldset>
                      <legend className="font-poppins font-semibold text-brand-gray-light text-xs mb-2">
                        Faixa de gestão de condomínios:
                      </legend>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 font-inter font-light text-white text-sm cursor-pointer hover:text-brand-green-light transition-colors">
                          <input type="checkbox" name="revenueRange" value="Até R$ 20.000" className="accent-brand-green w-4 h-4 rounded focus:ring-2 focus:ring-brand-green/50" data-testid="checkbox-range-20k" />
                          Até R$ 20.000
                        </label>
                        <label className="flex items-center gap-2 font-inter font-light text-white text-sm cursor-pointer hover:text-brand-green-light transition-colors">
                          <input type="checkbox" name="revenueRange" value="Até R$ 50.000" className="accent-brand-green w-4 h-4 rounded focus:ring-2 focus:ring-brand-green/50" data-testid="checkbox-range-50k" />
                          Até R$ 50.000
                        </label>
                        <label className="flex items-center gap-2 font-inter font-light text-white text-sm cursor-pointer hover:text-brand-green-light transition-colors">
                          <input type="checkbox" name="revenueRange" value="Acima de R$ 50.000 até R$ 100.000" className="accent-brand-green w-4 h-4 rounded focus:ring-2 focus:ring-brand-green/50" data-testid="checkbox-range-100k" />
                          Acima de R$ 50.000 até R$ 100.000
                        </label>
                      </div>
                    </fieldset>

                    {mutation.isError && (
                      <p className="font-inter text-red-400 text-sm text-center" data-testid="form-error">
                        Erro ao enviar. Verifique os campos e tente novamente.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full h-12 bg-brand-green hover:bg-brand-green-light hover:scale-[1.02] active:scale-[0.98] rounded-full shadow-[0px_4px_4px_#00000040] font-outfit font-bold text-white text-base tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-white/50 focus:outline-none"
                      data-testid="button-submit"
                    >
                      {mutation.isPending ? "ENVIANDO..." : "QUERO MINHA ANÁLISE GRATUITA"}
                    </button>
                  </form>
                )}

                <p className="font-inter font-light text-white text-sm text-center leading-relaxed mt-6">
                  Nosso especialista irá apresentar um cenário financeiro mais seguro, para que sua gestão não fique refém da inadimplência.
                </p>
              </div>
            </div>

            <div className="order-3 lg:order-2 w-full lg:flex-1" data-testid="section-social-proof">
              <div className="flex flex-wrap gap-6">
                <div className="flex gap-5">
                  <div className="text-center">
                    <div className="relative">
                      <img className="w-20 h-40 md:w-[86px] md:h-[180px] object-cover rounded-lg" alt="Carlos Mendes" src="/figmaAssets/mask-group-1.png" />
                      <div className="absolute bottom-0 left-0 w-[15px] h-3 bg-brand-green rounded-[5px_0px_1px_1px]" />
                    </div>
                    <p className="font-inter font-semibold text-brand-text text-sm mt-2" data-testid="text-specialist-1-name">Carlos Mendes</p>
                    <p className="font-inter font-light text-brand-text-muted text-xs" data-testid="text-specialist-1-role">Analista Financeiro</p>
                  </div>

                  <div className="text-center">
                    <div className="relative">
                      <img className="w-20 h-40 md:w-[86px] md:h-[180px] object-cover rounded-lg" alt="Fernanda Lima" src="/figmaAssets/mask-group-2.png" />
                      <div className="absolute top-[70px] md:top-[80px] -left-3 w-6 h-6 bg-white rounded-full" />
                      <div className="absolute top-[73px] md:top-[83px] -left-2 w-4 h-4 bg-brand-green rounded-full" />
                      <div className="absolute bottom-0 left-0 w-[15px] h-3 bg-brand-green rounded-[5px_0px_1px_1px]" />
                    </div>
                    <p className="font-inter font-semibold text-brand-text text-sm mt-2" data-testid="text-specialist-2-name">Fernanda Lima</p>
                    <p className="font-inter font-light text-brand-text-muted text-xs" data-testid="text-specialist-2-role">Consultora Condominial</p>
                  </div>

                  <div className="text-center">
                    <div className="relative">
                      <img className="w-20 h-40 md:w-[86px] md:h-[180px] object-cover rounded-lg" alt="Ricardo Souza" src="/figmaAssets/mask-group-3.png" />
                      <div className="absolute top-[70px] md:top-[80px] -left-3 w-6 h-6 bg-white rounded-full" />
                      <div className="absolute top-[73px] md:top-[83px] -left-2 w-4 h-4 bg-brand-green rounded-full" />
                      <div className="absolute bottom-0 left-0 w-[15px] h-3 bg-brand-green rounded-[5px_0px_1px_1px]" />
                    </div>
                    <p className="font-inter font-semibold text-brand-text text-sm mt-2" data-testid="text-specialist-3-name">Ricardo Souza</p>
                    <p className="font-inter font-light text-brand-text-muted text-xs" data-testid="text-specialist-3-role">Gestor de Receitas</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-8 mt-8">
                <div className="font-inter" data-testid="stat-condominios">
                  <p className="font-bold text-brand-green text-3xl leading-tight">+120</p>
                  <p className="font-light text-sm text-brand-text-muted">condomínios atendidos</p>
                </div>
                <div className="font-inter" data-testid="stat-recuperados">
                  <p className="font-bold text-brand-green text-3xl leading-tight">+R$ 100 mil</p>
                  <p className="font-light text-sm text-brand-text-muted">recuperados</p>
                </div>
                <div className="font-inter" data-testid="stat-especialistas">
                  <p className="font-bold text-brand-green text-3xl leading-tight">3+</p>
                  <p className="font-light text-sm text-brand-text-muted">especialistas em receita</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 md:px-8 lg:px-16 py-8 lg:py-12" data-testid="section-info-cards">
          <div className="max-w-7xl mx-auto">
            <div className="bg-brand-dark rounded-2xl md:rounded-3xl p-6 md:p-8 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-brand-green rounded-full" />
                <h2 className="font-poppins text-lg md:text-xl text-white">
                  <span className="font-semibold">Exemplo</span>
                  <span className="font-light"> rápido</span>
                </h2>
                <div className="ml-auto w-[46px] h-[15px] bg-brand-green rounded-[7.5px]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="relative bg-brand-gray rounded-xl p-4 min-h-[100px]">
                  <p className="font-outfit font-medium text-brand-gray-light text-5xl absolute top-2 left-2 opacity-30">01</p>
                  <p className="font-inter text-white text-sm leading-relaxed relative z-10 mt-6">
                    Condomínio com <span className="font-semibold">100</span> unidades, com uma receita mensal estimada: <span className="font-bold">R$ 100.000</span>.
                  </p>
                </div>

                <div className="relative bg-brand-gray rounded-xl p-4 min-h-[100px]">
                  <p className="font-outfit font-medium text-brand-gray-light text-5xl absolute top-2 left-2 opacity-30">02</p>
                  <p className="font-inter text-white text-sm leading-relaxed relative z-10 mt-6">
                    Apenas <span className="font-semibold">4</span> unidades inadimplentes durante <span className="font-semibold">3</span> meses, resulta <span className="font-bold">R$ 12.000</span> fora do caixa.
                  </p>
                </div>

                <div className="relative bg-brand-gray rounded-xl p-4 min-h-[100px]">
                  <p className="font-outfit font-medium text-brand-gray-light text-5xl absolute top-2 left-2 opacity-30">03</p>
                  <p className="font-inter text-white text-sm leading-relaxed relative z-10 mt-6">
                    Se o atraso chega a <span className="font-semibold">6</span> meses serão <span className="font-bold">R$ 24.000</span> comprometidos.
                  </p>
                </div>

                <div className="relative bg-brand-green rounded-xl p-4 min-h-[100px] flex items-center">
                  <p className="font-inter text-white text-base leading-snug">
                    <span className="font-bold">3 a 6 meses</span> já são suficientes para <span className="font-bold">comprometer</span> decisões importantes
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <img
                  className="hidden md:block w-[120px] lg:w-[136px] h-auto"
                  alt="Dashboard do sistema de gestão condominial"
                  src="/figmaAssets/mask-group-5.png"
                />
                <p className="font-inter text-white text-sm md:text-base leading-relaxed text-center flex-1">
                  A inadimplência <span className="font-semibold">não</span> precisa ser alta para gerar impacto financeiro.
                </p>
                <div className="hidden md:block w-10 h-[15px] bg-brand-green rounded-[7.5px]" />
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 md:px-8 lg:px-16 py-12 lg:py-16 text-center" data-testid="section-bottom-cta">
          <div className="max-w-lg mx-auto">
            <h2 className="font-outfit text-2xl md:text-3xl text-brand-text leading-snug">
              <span className="font-semibold">Descubra </span>
              <span className="font-light">
                quanto seu condomínio pode estar deixando de arrecadar
              </span>
            </h2>

            <p className="font-inter font-light text-brand-text-muted text-base text-center leading-relaxed mt-4">
              Uma análise simples pode revelar valores que estão comprometendo decisões importantes.
            </p>

            <button
              type="button"
              onClick={scrollToForm}
              className="mt-6 w-full max-w-xs h-12 bg-brand-green hover:bg-brand-green-light hover:scale-[1.02] active:scale-[0.98] rounded-full shadow-[0px_4px_4px_#00000040] font-outfit font-bold text-white text-base tracking-wide transition-all duration-200 focus:ring-2 focus:ring-brand-green/50 focus:outline-none"
              data-testid="button-bottom-cta"
            >
              QUERO MINHA ANÁLISE GRATUITA
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
