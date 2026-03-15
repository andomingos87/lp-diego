export const Web = (): JSX.Element => {
  return (
    <div className="bg-white w-full min-w-[1440px] h-[900px] relative">
      {/* Background center image */}
      <img
        className="absolute top-0 left-[466px] w-[508px] h-[900px]"
        alt="Mask group"
        src="/figmaAssets/mask-group.png"
      />

      {/* Main headline text */}
      <div className="top-[77px] left-[calc(50.00%_-_232px)] w-[250px] h-[86px] [font-family:'Outfit',Helvetica] text-[25px] leading-[25px] absolute font-normal text-transparent tracking-[0]">
        <span className="font-semibold text-[#333333] leading-[22px]">
          3 a 6 meses
        </span>

        <span className="text-[#333333] leading-[22px]">&nbsp;</span>

        <span className="font-light text-[#333333] leading-[22px]">
          de inadimplência
          <br />
          custam
        </span>

        <span className="font-bold text-[#199900] leading-[22px]">&nbsp;</span>

        <span className="font-semibold text-[#21cb00] leading-[22px]">
          muito caro
        </span>

        <span className="font-bold text-[#292929] leading-[22px]">
          {" "}
          <br />
        </span>

        <span className="font-light text-[#333333] leading-[22px]">
          para o seu condomínio
        </span>
      </div>

      {/* Subtitle text */}
      <div className="absolute top-[170px] left-[488px] w-[268px] h-6 flex">
        <div className="flex-1 w-[264.26px] [font-family:'Inter',Helvetica] font-normal text-[#707070] text-[10px] tracking-[0] leading-[11px]">
          O problema não é a inadimplência existir. <br />O problema é não ter
          garantia de receita.
        </div>
      </div>

      {/* Logo / brand badge */}
      <div className="absolute top-11 left-[488px] w-[120px] h-[15px]">
        <div className="absolute top-0 left-0 w-[100px] h-[15px] bg-[#d9d9d9] rounded-[7.5px]" />

        <div className="absolute top-0 left-[103px] w-[15px] h-[15px] bg-[#21cb00] rounded-[7.5px]" />

        <img
          className="absolute w-[5.83%] h-[46.67%] top-[26.67%] left-[89.17%]"
          alt="Vector"
          src="/figmaAssets/vector-3.svg"
        />

        <div className="absolute top-1 left-[9px] w-[82px] h-2 flex items-center [font-family:'Poppins',Helvetica] font-normal text-transparent text-[7px] tracking-[0] leading-[27px] whitespace-nowrap">
          <span className="text-[#333333]">Soluções</span>

          <span className="font-extralight italic text-[#333333]">&nbsp;</span>

          <span className="font-light text-[#333333]">Condominiais</span>
        </div>
      </div>

      {/* Right side form card (phone mockup) */}
      <div className="absolute top-11 left-[778px] w-48 h-[379px]">
        {/* Card shadow/background layers */}
        <div className="absolute top-[114px] left-4 w-[156px] h-[265px] bg-[#2c2c2c] rounded-[17px_20px_30px_30px] opacity-60" />
        <div className="absolute top-0 left-4 w-[156px] h-[379px] bg-black rounded-[30px] opacity-60" />

        {/* Green accent top-left corner */}
        <div className="absolute top-[33px] left-0 w-8 h-[25px] bg-[#21cb00] rounded-[4px_0px_4px_10px]" />

        {/* Icon inside green corner */}
        <img
          className="absolute top-[37px] left-[7px] w-[17px] h-[17px]"
          alt="Mask group"
          src="/figmaAssets/mask-group-4.png"
        />

        {/* Notch */}
        <div className="absolute top-2.5 left-20 w-7 h-2 bg-white rounded" />

        {/* Card title */}
        <div className="absolute top-[33px] left-[37px] w-[113px] h-[52px] flex items-center justify-center [font-family:'Outfit',Helvetica] font-normal text-white text-sm text-center tracking-[0] leading-[14px]">
          <span className="font-bold">Receba</span>

          <span className="[font-family:'Outfit',Helvetica] font-normal text-white text-sm tracking-[0] leading-[14px]">
            {" "}
            uma análise{" "}
          </span>

          <span className="font-bold">gratuita </span>

          <span className="[font-family:'Outfit',Helvetica] font-normal text-white text-sm tracking-[0] leading-[14px]">
            da receita do seu condomínio
          </span>
        </div>

        {/* Subtitle under card title */}
        <div className="absolute top-[89px] left-[59px] h-3.5 [font-family:'Inter',Helvetica] font-normal text-white text-[6px] text-center tracking-[0] leading-[6px]">
          <span className="font-light italic leading-[0.1px]">
            Leva menos de 1 minuto.
            <br />
          </span>

          <span className="italic leading-[7px]">Sem compromisso.</span>
        </div>

        {/* Form field label: Nome */}
        <div className="absolute top-[126px] left-[30px] h-[11px] flex items-center [font-family:'Poppins',Helvetica] font-semibold text-[#b4b4b4] text-[5px] tracking-[0] leading-[11px] whitespace-nowrap">
          Nome
        </div>

        {/* Form field: Nome */}
        <div className="absolute top-[136px] left-[30px] w-[129px] h-3.5 rounded-[3px] border-[0.5px] border-solid border-[#dddddd]" />

        {/* Form field label: Telefone */}
        <div className="absolute top-[153px] left-[30px] h-[11px] flex items-center [font-family:'Poppins',Helvetica] font-semibold text-[#b4b4b4] text-[5px] tracking-[0] leading-[11px] whitespace-nowrap">
          Telefone/WhatsApp
        </div>

        {/* Form field: Telefone */}
        <div className="absolute top-[164px] left-[30px] w-[129px] h-3.5 rounded-[3px] border-[0.5px] border-solid border-[#dddddd]" />

        {/* Form field label: Cidade */}
        <div className="absolute top-[180px] left-[30px] h-[11px] flex items-center [font-family:'Poppins',Helvetica] font-semibold text-[#b4b4b4] text-[5px] tracking-[0] leading-[11px] whitespace-nowrap">
          Cidade/Estado
        </div>

        {/* Form field: Cidade */}
        <div className="absolute top-[190px] left-[30px] w-[129px] h-3.5 rounded-[3px] border-[0.5px] border-solid border-[#dddddd]" />

        {/* Você é label */}
        <div className="absolute top-[210px] left-7 h-[11px] flex items-center [font-family:'Poppins',Helvetica] font-semibold text-[#b4b4b4] text-[5px] tracking-[0] leading-[11px] whitespace-nowrap">
          Você é:
        </div>

        {/* Você é options */}
        <div className="absolute top-56 left-7 w-[78px] h-[27px] [font-family:'Poppins',Helvetica] font-normal text-white text-[7px] tracking-[0] leading-[11px]">
          <span className="font-light">☐ </span>

          <span className="[font-family:'Inter',Helvetica] font-light">
            Síndico profissional
            <br />
          </span>

          <span className="font-light">☐ </span>

          <span className="[font-family:'Inter',Helvetica] font-light">
            Administrador
            <br />
          </span>

          <span className="font-light">☐ </span>

          <span className="[font-family:'Inter',Helvetica] font-light">
            Síndico morador
          </span>
        </div>

        {/* Faixa de gestão label */}
        <div className="absolute top-[258px] left-7 h-[11px] flex items-center [font-family:'Poppins',Helvetica] font-semibold text-[#b4b4b4] text-[5px] tracking-[0] leading-[11px] whitespace-nowrap">
          Faixa de gestão de condomínios:
        </div>

        {/* Faixa de gestão options */}
        <div className="absolute top-[272px] left-7 w-[132px] h-[27px] [font-family:'Poppins',Helvetica] font-normal text-white text-[7px] tracking-[0] leading-[11px]">
          <span className="font-light">☐ </span>

          <span className="[font-family:'Inter',Helvetica] font-light">
            Até R$ 20.000
            <br />
          </span>

          <span className="font-light">☐ </span>

          <span className="[font-family:'Inter',Helvetica] font-light">
            Até R$ 50.000
            <br />
          </span>

          <span className="font-light">☐ </span>

          <span className="[font-family:'Inter',Helvetica] font-light">
            Acima de R$ 50.000 até R$ 100.000
          </span>
        </div>

        {/* CTA Button */}
        <div className="absolute top-[313px] left-8 w-[123px] h-[19px] bg-[#22cb00] rounded-[13px] shadow-[0px_4px_4px_#00000040]" />

        <div className="absolute top-[317px] left-11 h-[11px] flex items-center [font-family:'Outfit',Helvetica] font-normal text-transparent text-[6px] tracking-[0] leading-[11px] whitespace-nowrap">
          <span className="font-bold text-white">QUERO MINHA ANÁLISE</span>

          <span className="font-bold text-white">&nbsp;</span>

          <span className="font-bold text-white">GRATUITA</span>
        </div>
      </div>

      {/* Specialist description text */}
      <div className="absolute top-[383px] left-[819px] w-[106px] h-7 [font-family:'Inter',Helvetica] font-light text-white text-[6px] text-center tracking-[0] leading-[7px]">
        Nosso especialista irá apresentar
        <br />
        um cenário financeiro mais seguro,
        <br />
        para que sua gestão não fique <br />
        refém da inadimplência.
      </div>

      {/* Person image 1 */}
      <img
        className="absolute top-[226px] left-[488px] w-[86px] h-[197px]"
        alt="Mask group"
        src="/figmaAssets/mask-group-1.png"
      />

      {/* Dark bottom section background */}
      <div className="absolute top-[459px] left-[466px] w-[508px] h-[250px] bg-[#333333] rounded-[30px_30px_0px_0px]" />

      {/* Bottom section content */}
      <div className="absolute top-[487px] left-[495px] w-[470px] h-[194px]">
        {/* Laptop image */}
        <img
          className="absolute top-2 left-[299px] w-[136px] h-[186px]"
          alt="Mask group"
          src="/figmaAssets/mask-group-5.png"
        />

        {/* "Exemplo rápido" label */}
        <div className="absolute top-2 left-2.5 h-2 flex items-center [font-family:'Poppins',Helvetica] font-normal text-transparent text-[11px] tracking-[0] leading-[8px] whitespace-nowrap">
          <span className="font-semibold text-white">Exemplo</span>

          <span className="font-light text-white"> rápido</span>
        </div>

        {/* Green dot accent */}
        <div className="absolute top-2 left-0 w-[7px] h-[7px] bg-[#21cb00] rounded-lg" />

        {/* Card 01 - top left (gray) */}
        <div className="absolute top-[26px] left-0 w-[129px] h-[63px] bg-[#5b5b5b] rounded-[10px]" />

        {/* Card 03 - bottom left (gray) */}
        <div className="absolute top-24 left-0 w-[129px] h-[63px] bg-[#5b5b5b] rounded-[10px]" />

        {/* Number 03 */}
        <div className="top-[121px] left-[3px] w-[71px] h-[31px] absolute flex items-center [font-family:'Outfit',Helvetica] font-medium text-[#939393] text-5xl tracking-[0] leading-[8px]">
          03
        </div>

        {/* Card 02 bottom right (green - highlighted) */}
        <div className="absolute top-24 left-[138px] w-[129px] h-[63px] bg-[#22cb00] rounded-[10px]" />

        {/* Card 02 top right (gray) */}
        <div className="absolute top-[26px] left-[138px] w-[129px] h-[63px] bg-[#5b5b5b] rounded-[10px]" />

        {/* Card 01 text content */}
        <div className="absolute top-12 left-[59px] h-7 [font-family:'Inter',Helvetica] font-normal text-white text-[6px] tracking-[0] leading-[6px]">
          <span className="leading-[7px]">
            Condomínio com <br />
          </span>

          <span className="font-semibold leading-[0.1px]">100</span>

          <span className="leading-[7px]">
            {" "}
            unidades, com uma receita mensal <br />
            estimada:{" "}
          </span>

          <span className="font-bold leading-[7px]">R$ 100.000</span>

          <span className="leading-[7px]">.</span>
        </div>

        {/* Card 03 text content */}
        <div className="absolute top-[120px] left-[67px] w-[49px] h-[25px] [font-family:'Inter',Helvetica] font-normal text-white text-[6px] tracking-[0] leading-[6px]">
          <span className="leading-[7px]">
            Se o atraso <br />
            chega a{" "}
          </span>

          <span className="font-semibold leading-[0.1px]">6</span>

          <span className="leading-[7px]">
            {" "}
            meses <br />
            serão{" "}
          </span>

          <span className="font-bold leading-[7px]">R$ 24.000</span>

          <span className="leading-[7px]"> comprometidos.</span>
        </div>

        {/* Card 02 top text content */}
        <div className="absolute top-[50px] left-[206px] w-[55px] h-[31px] [font-family:'Inter',Helvetica] font-normal text-white text-[6px] tracking-[0] leading-[6px]">
          <span className="leading-[7px]">Apenas </span>

          <span className="font-semibold leading-[0.1px]">4</span>

          <span className="leading-[7px]">
            {" "}
            unidades <br />
            inadimplentes <br />
            durante{" "}
          </span>

          <span className="font-semibold leading-[0.1px]">3</span>

          <span className="leading-[7px]">
            {" "}
            meses, <br />
            resulta{" "}
          </span>

          <span className="font-bold leading-[7px]">R$ 12.000</span>

          <span className="leading-[7px]">
            {" "}
            <br />
            fora do caixa.
          </span>
        </div>

        {/* Number 01 */}
        <div className="top-[50px] left-[3px] w-[63px] h-8 absolute flex items-center [font-family:'Outfit',Helvetica] font-medium text-[#939393] text-5xl tracking-[0] leading-[8px]">
          01
        </div>

        {/* Number 02 */}
        <div className="top-[62px] left-[141px] h-2 whitespace-nowrap absolute flex items-center [font-family:'Outfit',Helvetica] font-medium text-[#939393] text-5xl tracking-[0] leading-[8px]">
          02
        </div>

        {/* Arrow vector */}
        <img
          className="absolute w-[5.53%] h-[9.28%] top-[53.61%] left-[31.06%]"
          alt="Vector"
          src="/figmaAssets/vector-5.svg"
        />

        {/* "3 a 6 meses" text in green card */}
        <div className="top-[111px] left-[178px] w-[82px] h-[34px] [font-family:'Inter',Helvetica] text-[8px] leading-[8px] absolute font-normal text-transparent tracking-[0]">
          <span className="font-bold text-white">3 a 6 meses</span>

          <span className="text-white">
            {" "}
            <br />
            já são suficientes para{" "}
          </span>

          <span className="font-bold text-white">
            comprometer <br />
          </span>

          <span className="text-white">decisões importantes</span>
        </div>

        {/* Bottom disclaimer text */}
        <div className="absolute top-[170px] left-[calc(50.00%_-_226px)] h-[9px] flex items-center [font-family:'Inter',Helvetica] font-normal text-white text-[7px] tracking-[0] leading-[9px] whitespace-nowrap">
          <span className="font-light">A inadimplência </span>

          <span className="font-semibold">não</span>

          <span className="font-light">
            {" "}
            precisa ser alta para gerar impacto financeiro.
          </span>
        </div>

        <img
          className="absolute top-[-312px] left-[-416px] w-[7px] h-[7px]"
          alt="Rectangle"
        />

        {/* Green pill top right */}
        <div className="absolute top-0 left-[319px] w-[46px] h-[15px] bg-[#22cb00] rounded-[7.5px]" />

        {/* Green pill bottom right */}
        <div className="absolute top-[159px] left-[412px] w-10 h-[15px] bg-[#22cb00] rounded-[7.5px]" />
      </div>

      {/* Person image 2 */}
      <img
        className="absolute top-[226px] left-[585px] w-[86px] h-[197px]"
        alt="Mask group"
        src="/figmaAssets/mask-group-2.png"
      />

      {/* Person image 3 */}
      <img
        className="absolute top-[226px] left-[682px] w-[86px] h-[197px]"
        alt="Mask group"
        src="/figmaAssets/mask-group-3.png"
      />

      {/* Stat: +R$ 100 mil recuperados */}
      <div className="absolute top-96 left-[593px] w-20 h-[18px] flex items-center [font-family:'Inter',Helvetica] font-normal text-white text-xs tracking-[0] leading-3">
        <span className="font-semibold leading-[0.1px]">+R$ 100 mil</span>

        <span className="font-semibold text-[9px] leading-[8px]">&nbsp;</span>

        <span className="font-light text-[8px] leading-[8px]">recuperados</span>
      </div>

      {/* Stat: Especialistas em receita condominial */}
      <div className="absolute top-96 left-[691px] w-[58px] h-[22px] flex items-center [font-family:'Inter',Helvetica] font-normal text-white text-[9px] tracking-[0] leading-[9px]">
        <span className="font-semibold leading-[8px]">Especialistas </span>

        <span className="font-light text-[8px] leading-[8px]">
          em receita condominial
        </span>
      </div>

      {/* Stat: +120 condomínios atendidos */}
      <div className="absolute top-96 left-[498px] w-[54px] h-[29px] flex items-center [font-family:'Inter',Helvetica] font-normal text-white text-[15px] tracking-[0] leading-[15px]">
        <span className="font-semibold leading-[0.1px]">+120</span>

        <span className="font-semibold text-[9px] leading-[8px]">&nbsp;</span>

        <span className="font-light text-[8px] leading-[8px]">
          condomínios atendidos
        </span>
      </div>

      {/* White circle badge person 2 */}
      <div className="absolute top-[312px] left-[567px] w-[26px] h-[26px] bg-white rounded-[13px]" />

      {/* Green circle badge person 2 */}
      <div className="absolute top-[317px] left-[572px] w-4 h-4 bg-[#21cb00] rounded-lg" />

      {/* White circle badge person 3 */}
      <div className="absolute top-[312px] left-[663px] w-[26px] h-[26px] bg-white rounded-[13px]" />

      {/* Green circle badge person 3 */}
      <div className="absolute top-[317px] left-[668px] w-4 h-4 bg-[#21cb00] rounded-lg" />

      {/* Green tab accent person 1 */}
      <div className="absolute top-[368px] left-[498px] w-[15px] h-3 bg-[#21cb00] rounded-[5px_0px_1px_1px]" />

      {/* Green tab accent person 2 */}
      <div className="absolute top-[368px] left-[593px] w-[15px] h-3 bg-[#21cb00] rounded-[5px_0px_1px_1px]" />

      {/* Green tab accent person 3 */}
      <div className="absolute top-[368px] left-[691px] w-[15px] h-3 bg-[#21cb00] rounded-[5px_0px_1px_1px]" />

      {/* Vector decorations */}
      <img
        className="absolute w-0 h-0 top-[41.22%] left-[34.86%]"
        alt="Vector"
        src="/figmaAssets/vector-1.svg"
      />

      <img
        className="absolute w-0 h-0 top-[41.22%] left-[41.46%]"
        alt="Vector"
        src="/figmaAssets/vector-4.svg"
      />

      <img
        className="absolute w-0 h-0 top-[41.22%] left-[48.19%]"
        alt="Vector"
        src="/figmaAssets/vector.svg"
      />

      {/* Bottom CTA section */}
      <div className="absolute top-[773px] left-[calc(50.00%_-_111px)] w-[222px] h-[22px] [font-family:'Outfit',Helvetica] font-normal text-[#333333] text-sm text-center tracking-[0] leading-[13px]">
        <span className="font-semibold">Descubra </span>

        <span className="font-light">
          quanto seu condomínio <br />
          pode estar deixando de arrecadar
        </span>
      </div>

      {/* Bottom CTA subtitle */}
      <div className="absolute top-[801px] left-[calc(50.00%_-_81px)] h-3.5 [font-family:'Inter',Helvetica] font-light text-[#707070] text-[7px] text-center tracking-[0] leading-[7px]">
        Uma análise simples pode revelar valores <br />
        que estão comprometendo decisões importantes.
      </div>

      {/* Bottom CTA button */}
      <div className="absolute top-[826px] left-[calc(50.00%_-_61px)] w-[125px] h-[19px]">
        <div className="absolute top-0 left-0 w-[123px] h-[19px] bg-[#22cb00] rounded-[13px] shadow-[0px_4px_4px_#00000040]" />

        <div className="absolute top-1 left-3 h-[11px] flex items-center [font-family:'Outfit',Helvetica] font-normal text-transparent text-[6px] tracking-[0] leading-[11px] whitespace-nowrap">
          <span className="font-bold text-white">QUERO MINHA ANÁLISE</span>

          <span className="font-bold text-white">&nbsp;</span>

          <span className="font-bold text-white">GRATUITA</span>
        </div>
      </div>

      {/* Bottom vector decoration */}
      <img
        className="absolute w-0 h-0 top-[73.11%] left-[34.38%]"
        alt="Vector"
        src="/figmaAssets/vector-2.svg"
      />
    </div>
  );
};
