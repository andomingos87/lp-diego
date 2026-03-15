export const Web = (): JSX.Element => {
  return (
    <div className="bg-white w-full min-h-screen overflow-x-hidden">
      <header className="px-4 py-4 md:px-8 lg:px-16" data-testid="header-logo">
        <div className="relative inline-flex items-center h-[20px]">
          <div className="w-[100px] h-[18px] bg-brand-gray-light rounded-[9px]" />
          <div className="w-[18px] h-[18px] bg-brand-green rounded-full -ml-1 relative">
            <img
              className="absolute top-[4px] left-[4px] w-[10px] h-[10px]"
              alt="Checkmark icon"
              src="/figmaAssets/vector-3.svg"
            />
          </div>
          <p className="absolute left-[9px] font-poppins text-brand-text text-xs whitespace-nowrap">
            <span>Soluções</span>
            <span className="font-extralight italic">&nbsp;</span>
            <span className="font-light">Condominiais</span>
          </p>
        </div>
      </header>

      <main>
        <section className="px-4 md:px-8 lg:px-16 py-8 lg:py-12" data-testid="section-hero">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            <div className="flex-1 flex flex-col gap-6">
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

              <p className="font-inter text-base leading-relaxed text-brand-text-muted max-w-md" data-testid="section-subtitle">
                O problema não é a inadimplência existir.
                <br />
                O problema é não ter garantia de receita.
              </p>

              <div className="flex flex-wrap gap-4 mt-4" data-testid="section-social-proof">
                <div className="flex gap-3">
                  <div className="relative">
                    <img className="w-20 h-40 md:w-[86px] md:h-[180px] object-cover rounded-lg" alt="Especialista 1" src="/figmaAssets/mask-group-1.png" />
                    <div className="absolute bottom-0 left-0 w-[15px] h-3 bg-brand-green rounded-[5px_0px_1px_1px]" />
                  </div>
                  <div className="relative">
                    <img className="w-20 h-40 md:w-[86px] md:h-[180px] object-cover rounded-lg" alt="Especialista 2" src="/figmaAssets/mask-group-2.png" />
                    <div className="absolute top-[70px] md:top-[80px] -left-3 w-6 h-6 bg-white rounded-full" />
                    <div className="absolute top-[73px] md:top-[83px] -left-2 w-4 h-4 bg-brand-green rounded-full" />
                    <div className="absolute bottom-0 left-0 w-[15px] h-3 bg-brand-green rounded-[5px_0px_1px_1px]" />
                  </div>
                  <div className="relative">
                    <img className="w-20 h-40 md:w-[86px] md:h-[180px] object-cover rounded-lg" alt="Especialista 3" src="/figmaAssets/mask-group-3.png" />
                    <div className="absolute top-[70px] md:top-[80px] -left-3 w-6 h-6 bg-white rounded-full" />
                    <div className="absolute top-[73px] md:top-[83px] -left-2 w-4 h-4 bg-brand-green rounded-full" />
                    <div className="absolute bottom-0 left-0 w-[15px] h-3 bg-brand-green rounded-[5px_0px_1px_1px]" />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mt-2">
                <div className="font-inter text-brand-text" data-testid="stat-condominios">
                  <p className="font-semibold text-2xl leading-tight">+120</p>
                  <p className="font-light text-sm text-brand-text-muted">condomínios atendidos</p>
                </div>
                <div className="font-inter text-brand-text" data-testid="stat-recuperados">
                  <p className="font-semibold text-2xl leading-tight">+R$ 100 mil</p>
                  <p className="font-light text-sm text-brand-text-muted">recuperados</p>
                </div>
                <div className="font-inter text-brand-text" data-testid="stat-especialistas">
                  <p className="font-semibold text-base leading-tight">Especialistas</p>
                  <p className="font-light text-sm text-brand-text-muted">em receita condominial</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto lg:flex-shrink-0" data-testid="section-form-card">
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

                <form className="space-y-4" data-testid="form-lead-capture">
                  <div>
                    <label htmlFor="nome" className="block font-poppins font-semibold text-brand-gray-light text-xs mb-1">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="name"
                      className="w-full h-10 rounded-md bg-transparent border border-brand-gray-light px-3 text-white text-sm font-inter focus:border-brand-green focus:outline-none"
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
                      className="w-full h-10 rounded-md bg-transparent border border-brand-gray-light px-3 text-white text-sm font-inter focus:border-brand-green focus:outline-none"
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
                      className="w-full h-10 rounded-md bg-transparent border border-brand-gray-light px-3 text-white text-sm font-inter focus:border-brand-green focus:outline-none"
                      data-testid="input-city"
                    />
                  </div>

                  <fieldset>
                    <legend className="font-poppins font-semibold text-brand-gray-light text-xs mb-2">
                      Você é:
                    </legend>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 font-inter font-light text-white text-sm cursor-pointer">
                        <input type="checkbox" name="role" value="Síndico profissional" className="accent-brand-green w-4 h-4" data-testid="checkbox-sindico-profissional" />
                        Síndico profissional
                      </label>
                      <label className="flex items-center gap-2 font-inter font-light text-white text-sm cursor-pointer">
                        <input type="checkbox" name="role" value="Administrador" className="accent-brand-green w-4 h-4" data-testid="checkbox-administrador" />
                        Administrador
                      </label>
                      <label className="flex items-center gap-2 font-inter font-light text-white text-sm cursor-pointer">
                        <input type="checkbox" name="role" value="Síndico morador" className="accent-brand-green w-4 h-4" data-testid="checkbox-sindico-morador" />
                        Síndico morador
                      </label>
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="font-poppins font-semibold text-brand-gray-light text-xs mb-2">
                      Faixa de gestão de condomínios:
                    </legend>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 font-inter font-light text-white text-sm cursor-pointer">
                        <input type="checkbox" name="revenueRange" value="Até R$ 20.000" className="accent-brand-green w-4 h-4" data-testid="checkbox-range-20k" />
                        Até R$ 20.000
                      </label>
                      <label className="flex items-center gap-2 font-inter font-light text-white text-sm cursor-pointer">
                        <input type="checkbox" name="revenueRange" value="Até R$ 50.000" className="accent-brand-green w-4 h-4" data-testid="checkbox-range-50k" />
                        Até R$ 50.000
                      </label>
                      <label className="flex items-center gap-2 font-inter font-light text-white text-sm cursor-pointer">
                        <input type="checkbox" name="revenueRange" value="Acima de R$ 50.000 até R$ 100.000" className="accent-brand-green w-4 h-4" data-testid="checkbox-range-100k" />
                        Acima de R$ 50.000 até R$ 100.000
                      </label>
                    </div>
                  </fieldset>

                  <button
                    type="submit"
                    className="w-full h-12 bg-brand-green hover:bg-brand-green-light rounded-full shadow-[0px_4px_4px_#00000040] font-outfit font-bold text-white text-base tracking-wide transition-colors"
                    data-testid="button-submit"
                  >
                    QUERO MINHA ANÁLISE GRATUITA
                  </button>
                </form>

                <p className="font-inter font-light text-white text-sm text-center leading-relaxed mt-6">
                  Nosso especialista irá apresentar um cenário financeiro mais seguro, para que sua gestão não fique refém da inadimplência.
                </p>
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
              className="mt-6 w-full max-w-xs h-12 bg-brand-green hover:bg-brand-green-light rounded-full shadow-[0px_4px_4px_#00000040] font-outfit font-bold text-white text-base tracking-wide transition-colors"
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
