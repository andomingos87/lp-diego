export const Web = (): JSX.Element => {
  return (
    <div className="bg-white w-full min-w-[1440px] h-[900px] relative">
      <img
        className="absolute top-0 left-[466px] w-[508px] h-[900px]"
        alt="Background visual"
        src="/figmaAssets/mask-group.png"
      />

      <header className="absolute top-11 left-[488px] w-[120px] h-[15px]" data-testid="header-logo">
        <div className="absolute top-0 left-0 w-[100px] h-[15px] bg-brand-gray-light rounded-[7.5px]" />
        <div className="absolute top-0 left-[103px] w-[15px] h-[15px] bg-brand-green rounded-[7.5px]" />
        <img
          className="absolute w-[5.83%] h-[46.67%] top-[26.67%] left-[89.17%]"
          alt="Checkmark icon"
          src="/figmaAssets/vector-3.svg"
        />
        <p className="absolute top-1 left-[9px] flex items-center font-poppins text-brand-text text-xs leading-[27px] whitespace-nowrap">
          <span>Soluções</span>
          <span className="font-extralight italic">&nbsp;</span>
          <span className="font-light">Condominiais</span>
        </p>
      </header>

      <main>
        <section className="absolute top-[77px] left-[calc(50.00%_-_232px)] w-[280px]" data-testid="section-hero">
          <h1 className="font-outfit text-2xl leading-[26px] text-brand-text">
            <span className="font-semibold">3 a 6 meses </span>
            <span className="font-light">
              de inadimplência
              <br />
              custam
            </span>{" "}
            <span className="font-semibold text-brand-green">
              muito caro
            </span>
            <br />
            <span className="font-light">
              para o seu condomínio
            </span>
          </h1>
        </section>

        <section className="absolute top-[170px] left-[488px] w-[268px]" data-testid="section-subtitle">
          <p className="font-inter text-sm leading-[16px] text-brand-text-muted">
            O problema não é a inadimplência existir.
            <br />
            O problema é não ter garantia de receita.
          </p>
        </section>

        <section className="absolute top-11 left-[778px] w-[220px]" data-testid="section-form-card">
          <div className="absolute top-[114px] left-4 w-[188px] h-[420px] bg-brand-dark-deep rounded-[17px_20px_30px_30px] opacity-60" />
          <div className="absolute top-0 left-4 w-[188px] h-[530px] bg-brand-dark-deep rounded-[30px] opacity-60" />

          <div className="absolute top-[33px] left-0 w-8 h-[25px] bg-brand-green rounded-[4px_0px_4px_10px]" />
          <img
            className="absolute top-[37px] left-[7px] w-[17px] h-[17px]"
            alt="Form icon"
            src="/figmaAssets/mask-group-4.png"
          />

          <div className="absolute top-2.5 left-24 w-7 h-2 bg-white rounded" />

          <h2 className="absolute top-[33px] left-[37px] w-[150px] font-outfit text-base text-white text-center leading-[18px]">
            <span className="font-bold">Receba</span> uma análise{" "}
            <span className="font-bold">gratuita</span> da receita do seu condomínio
          </h2>

          <p className="absolute top-[89px] left-[50px] font-inter text-sm text-white text-center leading-[16px] italic">
            Leva menos de 1 minuto.
            <br />
            Sem compromisso.
          </p>

          <form className="absolute top-[120px] left-[30px] w-[155px] space-y-2" data-testid="form-lead-capture">
            <div>
              <label htmlFor="nome" className="block font-poppins font-semibold text-brand-gray-light text-xs mb-1">
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="name"
                className="w-full h-8 rounded bg-transparent border border-brand-gray-light px-2 text-white text-sm font-inter"
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
                className="w-full h-8 rounded bg-transparent border border-brand-gray-light px-2 text-white text-sm font-inter"
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
                className="w-full h-8 rounded bg-transparent border border-brand-gray-light px-2 text-white text-sm font-inter"
                data-testid="input-city"
              />
            </div>

            <fieldset>
              <legend className="font-poppins font-semibold text-brand-gray-light text-xs mb-1">
                Você é:
              </legend>
              <div className="space-y-1">
                <label className="flex items-center gap-2 font-inter font-light text-white text-sm cursor-pointer">
                  <input type="checkbox" name="role" value="Síndico profissional" className="accent-brand-green" data-testid="checkbox-sindico-profissional" />
                  Síndico profissional
                </label>
                <label className="flex items-center gap-2 font-inter font-light text-white text-sm cursor-pointer">
                  <input type="checkbox" name="role" value="Administrador" className="accent-brand-green" data-testid="checkbox-administrador" />
                  Administrador
                </label>
                <label className="flex items-center gap-2 font-inter font-light text-white text-sm cursor-pointer">
                  <input type="checkbox" name="role" value="Síndico morador" className="accent-brand-green" data-testid="checkbox-sindico-morador" />
                  Síndico morador
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-poppins font-semibold text-brand-gray-light text-xs mb-1">
                Faixa de gestão de condomínios:
              </legend>
              <div className="space-y-1">
                <label className="flex items-center gap-2 font-inter font-light text-white text-sm cursor-pointer">
                  <input type="checkbox" name="revenueRange" value="Até R$ 20.000" className="accent-brand-green" data-testid="checkbox-range-20k" />
                  Até R$ 20.000
                </label>
                <label className="flex items-center gap-2 font-inter font-light text-white text-sm cursor-pointer">
                  <input type="checkbox" name="revenueRange" value="Até R$ 50.000" className="accent-brand-green" data-testid="checkbox-range-50k" />
                  Até R$ 50.000
                </label>
                <label className="flex items-center gap-2 font-inter font-light text-white text-sm cursor-pointer">
                  <input type="checkbox" name="revenueRange" value="Acima de R$ 50.000 até R$ 100.000" className="accent-brand-green" data-testid="checkbox-range-100k" />
                  Acima de R$ 50.000 até R$ 100.000
                </label>
              </div>
            </fieldset>

            <button
              type="submit"
              className="w-full h-9 bg-brand-green rounded-full shadow-[0px_4px_4px_#00000040] font-outfit font-bold text-white text-sm tracking-wide"
              data-testid="button-submit"
            >
              QUERO MINHA ANÁLISE GRATUITA
            </button>
          </form>

          <p className="absolute top-[480px] left-[24px] w-[160px] font-inter font-light text-white text-sm text-center leading-[16px]">
            Nosso especialista irá apresentar um cenário financeiro mais seguro, para que sua gestão não fique refém da inadimplência.
          </p>
        </section>

        <section className="absolute top-[226px] left-[488px] w-[300px]" data-testid="section-social-proof">
          <div className="flex gap-4">
            <div className="relative w-[86px]">
              <img className="w-[86px] h-[197px] object-cover" alt="Especialista 1" src="/figmaAssets/mask-group-1.png" />
              <div className="absolute bottom-[-12px] left-0 w-[15px] h-3 bg-brand-green rounded-[5px_0px_1px_1px]" />
            </div>

            <div className="relative w-[86px]">
              <img className="w-[86px] h-[197px] object-cover" alt="Especialista 2" src="/figmaAssets/mask-group-2.png" />
              <div className="absolute top-[86px] left-[-19px] w-[26px] h-[26px] bg-white rounded-full" />
              <div className="absolute top-[91px] left-[-14px] w-4 h-4 bg-brand-green rounded-full" />
              <div className="absolute bottom-[-12px] left-0 w-[15px] h-3 bg-brand-green rounded-[5px_0px_1px_1px]" />
            </div>

            <div className="relative w-[86px]">
              <img className="w-[86px] h-[197px] object-cover" alt="Especialista 3" src="/figmaAssets/mask-group-3.png" />
              <div className="absolute top-[86px] left-[-19px] w-[26px] h-[26px] bg-white rounded-full" />
              <div className="absolute top-[91px] left-[-14px] w-4 h-4 bg-brand-green rounded-full" />
              <div className="absolute bottom-[-12px] left-0 w-[15px] h-3 bg-brand-green rounded-[5px_0px_1px_1px]" />
            </div>
          </div>

          <div className="flex gap-6 mt-6">
            <div className="font-inter text-white" data-testid="stat-condominios">
              <p className="font-semibold text-lg leading-tight">+120</p>
              <p className="font-light text-sm">condomínios atendidos</p>
            </div>
            <div className="font-inter text-white" data-testid="stat-recuperados">
              <p className="font-semibold text-lg leading-tight">+R$ 100 mil</p>
              <p className="font-light text-sm">recuperados</p>
            </div>
            <div className="font-inter text-white" data-testid="stat-especialistas">
              <p className="font-semibold text-sm leading-tight">Especialistas</p>
              <p className="font-light text-sm">em receita condominial</p>
            </div>
          </div>
        </section>

        <section className="absolute top-[459px] left-[466px] w-[508px]" data-testid="section-info-cards">
          <div className="bg-brand-dark rounded-[30px_30px_0px_0px] p-8 pt-6 min-h-[250px] relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-[7px] h-[7px] bg-brand-green rounded-full" />
              <h2 className="font-poppins text-base text-white">
                <span className="font-semibold">Exemplo</span>
                <span className="font-light"> rápido</span>
              </h2>
              <div className="ml-auto w-[46px] h-[15px] bg-brand-green rounded-[7.5px]" />
            </div>

            <div className="flex gap-3 mb-3">
              <div className="relative flex-1 bg-brand-gray rounded-[10px] p-3 min-h-[63px]">
                <p className="font-outfit font-medium text-brand-gray text-4xl absolute top-1 left-1 opacity-40">01</p>
                <p className="font-inter text-white text-sm leading-[16px] relative z-10 mt-4">
                  Condomínio com <span className="font-semibold">100</span> unidades, com uma receita mensal estimada: <span className="font-bold">R$ 100.000</span>.
                </p>
              </div>
              <div className="relative flex-1 bg-brand-gray rounded-[10px] p-3 min-h-[63px]">
                <p className="font-outfit font-medium text-brand-gray text-4xl absolute top-1 left-1 opacity-40">02</p>
                <p className="font-inter text-white text-sm leading-[16px] relative z-10 mt-4">
                  Apenas <span className="font-semibold">4</span> unidades inadimplentes durante <span className="font-semibold">3</span> meses, resulta <span className="font-bold">R$ 12.000</span> fora do caixa.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="relative flex-1 bg-brand-gray rounded-[10px] p-3 min-h-[63px]">
                <p className="font-outfit font-medium text-brand-gray text-4xl absolute top-1 left-1 opacity-40">03</p>
                <p className="font-inter text-white text-sm leading-[16px] relative z-10 mt-4">
                  Se o atraso chega a <span className="font-semibold">6</span> meses serão <span className="font-bold">R$ 24.000</span> comprometidos.
                </p>
              </div>
              <div className="relative flex-1 bg-brand-green rounded-[10px] p-3 min-h-[63px]">
                <p className="font-inter text-white text-sm leading-[16px] mt-2">
                  <span className="font-bold">3 a 6 meses</span> já são suficientes para <span className="font-bold">comprometer</span> decisões importantes
                </p>
              </div>
            </div>

            <img
              className="absolute top-2 right-6 w-[136px] h-[186px]"
              alt="Dashboard do sistema de gestão condominial"
              src="/figmaAssets/mask-group-5.png"
            />

            <img
              className="absolute top-[53%] left-[31%] w-[26px] h-[18px]"
              alt="Arrow indicator"
              src="/figmaAssets/vector-5.svg"
            />

            <div className="ml-auto w-10 h-[15px] bg-brand-green rounded-[7.5px] mt-3" />

            <p className="font-inter text-white text-sm leading-[16px] text-center mt-3">
              A inadimplência <span className="font-semibold">não</span> precisa ser alta para gerar impacto financeiro.
            </p>
          </div>
        </section>

        <section className="absolute top-[773px] left-[calc(50.00%_-_160px)] w-[320px] text-center" data-testid="section-bottom-cta">
          <h2 className="font-outfit text-lg text-brand-text leading-[20px]">
            <span className="font-semibold">Descubra </span>
            <span className="font-light">
              quanto seu condomínio
              <br />
              pode estar deixando de arrecadar
            </span>
          </h2>

          <p className="font-inter font-light text-brand-text-muted text-sm text-center leading-[16px] mt-2">
            Uma análise simples pode revelar valores
            <br />
            que estão comprometendo decisões importantes.
          </p>

          <button
            type="button"
            className="mt-4 w-[200px] h-10 bg-brand-green rounded-full shadow-[0px_4px_4px_#00000040] font-outfit font-bold text-white text-sm tracking-wide"
            data-testid="button-bottom-cta"
          >
            QUERO MINHA ANÁLISE GRATUITA
          </button>
        </section>
      </main>

      <img
        className="absolute w-4 h-4 top-[41%] left-[35%]"
        alt="Decorative element"
        src="/figmaAssets/vector-1.svg"
        aria-hidden="true"
      />
      <img
        className="absolute w-4 h-4 top-[41%] left-[41%]"
        alt="Decorative element"
        src="/figmaAssets/vector-4.svg"
        aria-hidden="true"
      />
      <img
        className="absolute w-4 h-4 top-[41%] left-[48%]"
        alt="Decorative element"
        src="/figmaAssets/vector.svg"
        aria-hidden="true"
      />
      <img
        className="absolute w-4 h-4 top-[73%] left-[34%]"
        alt="Decorative element"
        src="/figmaAssets/vector-2.svg"
        aria-hidden="true"
      />
    </div>
  );
};
