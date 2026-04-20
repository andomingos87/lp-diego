import { useEffect, useId, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { submitLeadToBrevo } from "@/lib/brevo";
import type { LeadPayload } from "@/lib/brevo";
import { SiteHeader } from "@/components/SiteHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UF_NAMES: Record<string, string> = {
  AC: "Acre",
  AL: "Alagoas",
  AP: "Amapá",
  AM: "Amazonas",
  BA: "Bahia",
  CE: "Ceará",
  DF: "Distrito Federal",
  ES: "Espírito Santo",
  GO: "Goiás",
  MA: "Maranhão",
  MT: "Mato Grosso",
  MS: "Mato Grosso do Sul",
  MG: "Minas Gerais",
  PA: "Pará",
  PB: "Paraíba",
  PR: "Paraná",
  PE: "Pernambuco",
  PI: "Piauí",
  RJ: "Rio de Janeiro",
  RN: "Rio Grande do Norte",
  RS: "Rio Grande do Sul",
  RO: "Rondônia",
  RR: "Roraima",
  SC: "Santa Catarina",
  SP: "São Paulo",
  SE: "Sergipe",
  TO: "Tocantins",
};

function parseAllowedUfs(rawValue: string | undefined): string[] {
  const validUfs = new Set(Object.keys(UF_NAMES));

  const parsed = (rawValue ?? "")
    .split(",")
    .map((uf) => uf.trim().toUpperCase())
    .filter((uf) => validUfs.has(uf));

  if (parsed.length > 0) {
    return Array.from(new Set(parsed));
  }

  return Object.keys(UF_NAMES);
}

const ALLOWED_UFS = parseAllowedUfs(import.meta.env.VITE_ALLOWED_UFS as string | undefined);

const AVATAR_PALETTES: Array<[string, string]> = [
  ["#123a22", "#1e8d3d"],
  ["#0b3a5e", "#2b7cb8"],
  ["#4a1d7a", "#8b3fc4"],
  ["#7a1d25", "#c43f4f"],
  ["#7a4a1d", "#c48a3f"],
];

function avatarGradient(initials: string): [string, string] {
  const code = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
  return AVATAR_PALETTES[code % AVATAR_PALETTES.length];
}

const TESTIMONIALS = [
  {
    name: "Ana C.",
    initials: "AC",
    role: "Síndica profissional",
    city: "Florianópolis/SC",
    quote: "Em poucas semanas, saímos da reação para um planejamento com caixa previsível e muito mais clareza nas decisões.",
    highlight: "Caixa mais previsível",
  },
  {
    name: "Marcelo R.",
    initials: "MR",
    role: "Administrador",
    city: "Joinville/SC",
    quote: "O diagnóstico deixou visível onde a receita estava travando e nos deu segurança para agir antes do problema crescer.",
    highlight: "Ação mais rápida",
  },
  {
    name: "Patrícia L.",
    initials: "PL",
    role: "Síndica moradora",
    city: "Blumenau/SC",
    quote: "Conseguimos organizar prioridades do condomínio sem adiar decisões importantes por falta de visibilidade financeira.",
    highlight: "Menos decisões no escuro",
  },
  {
    name: "Eduardo F.",
    initials: "EF",
    role: "Administrador",
    city: "Itajaí/SC",
    quote: "A leitura do caixa ficou muito mais objetiva e isso ajudou a reduzir atrasos em aprovações e manutenções essenciais.",
    highlight: "Mais controle operacional",
  },
  {
    name: "Renata V.",
    initials: "RV",
    role: "Síndica profissional",
    city: "São José/SC",
    quote: "Hoje temos uma visão mais estável da arrecadação e conseguimos antecipar conversas que antes só aconteciam em cima da hora.",
    highlight: "Antecipação de decisões",
  },
  {
    name: "Felipe T.",
    initials: "FT",
    role: "Administrador",
    city: "Balneário Camboriú/SC",
    quote: "O processo trouxe previsibilidade para o caixa e melhorou a confiança dos envolvidos na hora de definir próximos passos.",
    highlight: "Mais confiança no caixa",
  },
  {
    name: "Simone A.",
    initials: "SA",
    role: "Síndica moradora",
    city: "Chapecó/SC",
    quote: "Ficou claro o impacto da inadimplência no fluxo mensal e isso mudou completamente a forma como passamos a priorizar ações.",
    highlight: "Prioridades mais claras",
  },
] as const;

export const Web = (): JSX.Element => {
  const SUBMIT_COOLDOWN_MS = 15000;
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [selectedUf, setSelectedUf] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [cityLoading, setCityLoading] = useState(false);
  const [cityError, setCityError] = useState<string | null>(null);
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
    if (!selectedUf || !selectedCity) {
      setFormError("Selecione UF e cidade para continuar.");
      return;
    }

    mutation.mutate({
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      uf: selectedUf,
      city: selectedCity,
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
    if (ALLOWED_UFS.length === 1) {
      setSelectedUf(ALLOWED_UFS[0]);
    }
  }, []);

  useEffect(() => {
    if (!selectedUf) {
      setCities([]);
      setSelectedCity("");
      setCityError(null);
      return;
    }

    const controller = new AbortController();
    setCityLoading(true);
    setCityError(null);
    setCities([]);
    setSelectedCity("");

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Não foi possível carregar as cidades.");
        }

        const data = (await response.json()) as Array<{ nome: string }>;
        setCities(data.map((item) => item.nome).sort((a, b) => a.localeCompare(b, "pt-BR")));
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setCityError("Não foi possível carregar as cidades dessa UF.");
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setCityLoading(false);
        }
      });

    return () => controller.abort();
  }, [selectedUf]);

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
      <SiteHeader />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col md:flex-row gap-8 items-start lg:items-center scroll-mt-20">

        {/* ── LEFT COLUMN ── */}
        <div className="w-full md:w-[55%] flex flex-col bg-gradient-to-br from-white to-gray-50/60 rounded-2xl p-3 sm:p-4">

          {/* Logo badge */}
          <header
            data-testid="header-logo"
            className="md:hidden mb-8 animate-fade-in opacity-0"
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
              className="font-outfit text-[2.15rem] sm:text-[2.6rem] md:text-[3rem] lg:text-[3.2rem] leading-[1.08] text-brand-text mb-5 animate-fade-up opacity-0 break-words max-w-[17ch]"
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
            <div className="flex gap-3 sm:gap-4 w-full" data-testid="section-social-proof">

              {/* Card 1 */}
              <div
                className="group relative flex-1 min-w-0 min-h-[300px] md:min-h-[340px] rounded-[1.6rem] overflow-hidden bg-brand-dark/40 ring-1 ring-white/5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] animate-fade-up opacity-0"
                style={{ aspectRatio: "0.78/1", "--animation-delay": "0.3s" } as React.CSSProperties}
              >
                <img
                  src="/figmaAssets/mask-group-1.png"
                  alt="Condomínios atendidos"
                  width={260}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/95" />
                <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-brand-dark-deep/90 via-brand-dark-deep/55 to-transparent backdrop-blur-[2px]" />
                <div className="absolute inset-x-0 top-0 p-4 sm:p-5">
                  <p className="font-outfit font-semibold text-[3rem] sm:text-[3.5rem] leading-none tracking-[-0.08em] text-white/35 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" data-testid="stat-condominios-index">
                    01
                  </p>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 bg-brand-green rounded-[10px] flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-green/40 ring-1 ring-white/20">
                      <img src="/figmaAssets/vector-1.svg" alt="" className="w-[13px] h-[13px]" />
                    </div>
                  </div>
                  <div className="max-w-[15ch]">
                    <p className="font-outfit font-bold text-white text-[1.5rem] leading-[0.95] mb-1.5 tracking-[-0.04em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]" data-testid="stat-condominios-value">
                      +120
                    </p>
                    <p className="font-inter font-medium text-white text-[0.9rem] leading-[1.35] max-w-[13ch] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" data-testid="stat-condominios-label">
                      condomínios atendidos
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div
                className="group relative flex-1 min-w-0 min-h-[300px] md:min-h-[340px] rounded-[1.6rem] overflow-hidden bg-brand-dark/40 ring-1 ring-white/5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] animate-fade-up opacity-0"
                style={{ aspectRatio: "0.78/1", "--animation-delay": "0.4s" } as React.CSSProperties}
              >
                <img
                  src="/figmaAssets/mask-group-2.png"
                  alt="Receita recuperada"
                  width={260}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/95" />
                <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-brand-dark-deep/90 via-brand-dark-deep/55 to-transparent backdrop-blur-[2px]" />
                {/* Green connector dot between card 1 and 2 */}
                <div aria-hidden="true" className="absolute top-[44%] -left-[7px] w-[14px] h-[14px] bg-brand-green rounded-full z-10 shadow-sm" />
                <div className="absolute inset-x-0 top-0 p-4 sm:p-5">
                  <p className="font-outfit font-semibold text-[3rem] sm:text-[3.5rem] leading-none tracking-[-0.08em] text-white/35 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" data-testid="stat-recuperados-index">
                    02
                  </p>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 bg-brand-green rounded-[10px] flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-green/40 ring-1 ring-white/20">
                      <img src="/figmaAssets/vector-4.svg" alt="" className="w-[13px] h-[13px]" />
                    </div>
                  </div>
                  <div className="max-w-[15ch]">
                    <p className="font-outfit font-bold text-white text-[1.5rem] leading-[0.95] mb-1.5 tracking-[-0.04em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]" data-testid="stat-recuperados-value">
                      +R$500 mil/mês
                    </p>
                    <p className="font-inter font-medium text-white text-[0.9rem] leading-[1.35] max-w-[13ch] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" data-testid="stat-recuperados-label">
                      antecipados
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div
                className="group relative flex-1 min-w-0 min-h-[300px] md:min-h-[340px] rounded-[1.6rem] overflow-hidden bg-brand-dark/40 ring-1 ring-white/5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] animate-fade-up opacity-0"
                style={{ aspectRatio: "0.78/1", "--animation-delay": "0.5s" } as React.CSSProperties}
              >
                <img
                  src="/figmaAssets/mask-group-3.png"
                  alt="Especialistas em receita condominial"
                  width={260}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/95" />
                <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-brand-dark-deep/90 via-brand-dark-deep/55 to-transparent backdrop-blur-[2px]" />
                {/* Green connector dot between card 2 and 3 */}
                <div aria-hidden="true" className="absolute top-[44%] -left-[7px] w-[14px] h-[14px] bg-brand-green rounded-full z-10 shadow-sm" />
                <div className="absolute inset-x-0 top-0 p-4 sm:p-5">
                  <p className="font-outfit font-semibold text-[3rem] sm:text-[3.5rem] leading-none tracking-[-0.08em] text-white/35 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" data-testid="stat-especialistas-index">
                    03
                  </p>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 bg-brand-green rounded-[10px] flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-green/40 ring-1 ring-white/20">
                      <img src="/figmaAssets/vector-5.svg" alt="" className="w-[13px] h-[13px]" />
                    </div>
                  </div>
                  <div className="max-w-[15ch]">
                    <p className="font-outfit font-bold text-white text-[1.5rem] leading-[0.95] mb-1.5 tracking-[-0.04em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]" data-testid="stat-especialistas-value">
                      Especialistas
                    </p>
                    <p className="font-inter font-medium text-white text-[0.9rem] leading-[1.35] max-w-[13ch] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" data-testid="stat-especialistas-label">
                      em receita condominial
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>

        {/* ── RIGHT COLUMN — Phone mockup form card ── */}
        <div className="w-full md:w-[45%] flex justify-center md:justify-end" id="form-card" data-testid="section-form-card">
          {/* Phone frame */}
          <div className="relative w-full max-w-[420px] lg:max-w-[440px] bg-brand-dark rounded-2xl lg:rounded-[2.8rem] px-6 sm:px-7 pt-6 lg:pt-8 pb-7 shadow-2xl">

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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="uf" className="block font-inter text-xs text-white/80 mb-1">
                      UF <span className="text-red-400">*</span>
                    </label>
                    <Select value={selectedUf} onValueChange={setSelectedUf}>
                      <SelectTrigger
                        className="h-11 w-full rounded-md border border-white/30 bg-transparent px-3 text-sm font-inter text-white focus:ring-1 focus:ring-brand-green/50"
                        data-testid="select-uf"
                      >
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {ALLOWED_UFS.map((uf) => (
                          <SelectItem key={uf} value={uf}>
                            {uf} - {UF_NAMES[uf]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="city" className="block font-inter text-xs text-white/80 mb-1">
                      Cidade <span className="text-red-400">*</span>
                    </label>
                    <Select
                      value={selectedCity}
                      onValueChange={setSelectedCity}
                      disabled={!selectedUf || cityLoading || cities.length === 0}
                    >
                      <SelectTrigger
                        className="h-11 w-full rounded-md border border-white/30 bg-transparent px-3 text-sm font-inter text-white focus:ring-1 focus:ring-brand-green/50 disabled:opacity-60"
                        data-testid="select-city"
                      >
                        <SelectValue placeholder={!selectedUf ? "Selecione a UF" : cityLoading ? "Carregando..." : "Selecione"} />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {cityError ? (
                      <p className="mt-1 text-[0.7rem] text-red-300 font-inter">{cityError}</p>
                    ) : null}
                  </div>
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
        <div className="relative overflow-hidden rounded-[2rem] border border-brand-gray-light/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(243,248,244,0.98))] px-5 py-7 md:px-8 md:py-9 shadow-[0_24px_80px_rgba(12,42,22,0.08)]">
          <div aria-hidden="true" className="absolute -top-20 left-12 w-56 h-56 rounded-full bg-brand-green/10 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-24 right-6 w-64 h-64 rounded-full bg-brand-dark/6 blur-3xl" />

          <div className="relative text-center mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/15 bg-white/80 px-3 py-1 text-[0.72rem] font-inter uppercase tracking-[0.2em] text-brand-green shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
              Santa Catarina
            </div>
            <h2 className="font-outfit text-[1.95rem] md:text-[2.75rem] text-brand-text leading-[1.06] tracking-[-0.04em] mt-4 max-w-4xl mx-auto">
              Quem já tomou essa decisão sente o impacto no caixa
            </h2>
            <p className="font-inter text-brand-text-muted text-sm md:text-[1.05rem] leading-relaxed mt-3 max-w-3xl mx-auto">
              Relatos de síndicos e administradores de Santa Catarina que ganharam mais previsibilidade, clareza e ritmo de decisão.
            </p>
          </div>

          <div className="relative">
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-16 bg-gradient-to-r from-white via-white/90 to-transparent md:block" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-16 bg-gradient-to-l from-white via-white/90 to-transparent md:block" />

            <div className="marquee-pause group overflow-hidden rounded-[1.75rem]">
              <div className="flex w-max gap-4 [--duration:55s] [--gap:1rem] md:[--gap:1.25rem]">
                {[0, 1].map((track) => (
                  <div
                    key={track}
                    aria-hidden={track === 1}
                    className="flex shrink-0 gap-4 md:gap-5 animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none"
                    style={{ "--duration": "55s", "--gap": "1rem" } as React.CSSProperties}
                  >
                    {TESTIMONIALS.map((testimonial) => (
                      <article
                        key={`${track}-${testimonial.name}`}
                        className="relative overflow-hidden flex w-[300px] sm:w-[340px] md:w-[360px] min-h-[268px] flex-col justify-between rounded-[1.5rem] border border-white/80 bg-white/92 p-7 shadow-[0_16px_40px_rgba(9,35,19,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(9,35,19,0.14)]"
                      >
                        <span aria-hidden="true" className="pointer-events-none absolute -top-5 -right-2 font-outfit text-[8rem] leading-none text-brand-green/10 select-none">
                          &ldquo;
                        </span>
                        <div className="relative">
                          <div className="flex items-center gap-2 mb-5">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/20 bg-brand-green/10 px-3 py-1 font-inter text-[0.72rem] font-semibold tracking-[0.1em] text-brand-green uppercase">
                              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                                <path d="M20 10c0 7-8 13-8 13s-8-6-8-13a8 8 0 0 1 16 0z" />
                                <circle cx="12" cy="10" r="3" />
                              </svg>
                              {testimonial.city}
                            </span>
                          </div>

                          <p className="font-inter text-[1rem] md:text-[1.05rem] leading-[1.65] text-brand-text">
                            "{testimonial.quote}"
                          </p>
                        </div>

                        <div className="relative mt-6 pt-4 border-t border-brand-gray-light/80">
                          <div className="flex items-center gap-3">
                            <div
                              className="flex h-11 w-11 items-center justify-center rounded-[1rem] font-outfit text-sm font-bold tracking-[0.08em] text-white shadow-[0_12px_24px_rgba(18,58,34,0.22)]"
                              style={{ background: `linear-gradient(145deg, ${avatarGradient(testimonial.initials)[0]}, ${avatarGradient(testimonial.initials)[1]})` }}
                            >
                              {testimonial.initials}
                            </div>
                            <div className="min-w-0">
                              <p className="font-outfit text-brand-text font-semibold text-[1.02rem] leading-tight">
                                {testimonial.name}
                              </p>
                              <p className="font-inter text-brand-text-muted text-[0.84rem] leading-snug">
                                {testimonial.role}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 inline-flex items-center rounded-full bg-brand-dark/5 px-3 py-1 font-inter text-[0.76rem] font-medium text-brand-dark">
                            {testimonial.highlight}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 md:py-24"
        data-testid="section-how-it-works"
        aria-labelledby="how-heading"
      >
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 border border-brand-green/20 px-3 py-1 font-inter text-[0.72rem] font-semibold tracking-[0.12em] text-brand-green uppercase mb-4">
            Como funciona
          </span>
          <h2 id="how-heading" className="font-outfit text-[1.8rem] sm:text-[2.2rem] md:text-[2.6rem] leading-tight text-brand-text max-w-[22ch] mx-auto">
            <span className="font-light">Do diagnóstico à </span>
            <span className="font-bold">ação em 3 passos</span>
          </h2>
          <p className="font-inter text-[0.95rem] md:text-[1rem] text-brand-text-muted mt-4 max-w-[48ch] mx-auto">
            Um caminho simples para entender o risco de inadimplência e proteger a receita do seu condomínio.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div aria-hidden="true" className="hidden md:block absolute top-[44px] left-[16%] right-[16%] h-px border-t border-dashed border-brand-green/30" />
          {[
            { n: "01", title: "Preencha o formulário", desc: "Leva menos de 1 minuto. Sem compromisso e sem custo.", icon: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 1 0 4 0 2 2 0 0 0-4 0M9 5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2M9 12h6M9 16h6" },
            { n: "02", title: "Receba sua análise", desc: "Em até 24h úteis, um retorno consultivo com cenário financeiro claro.", icon: "M3 3v18h18M7 15l4-4 4 4 5-6" },
            { n: "03", title: "Implemente com nosso time", desc: "Colocamos em prática as ações que protegem seu caixa mês a mês.", icon: "M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m6-3.13a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm6 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" },
          ].map((step) => (
            <div
              key={step.n}
              className="relative bg-white rounded-2xl border border-brand-gray-light p-7 text-center shadow-[0_6px_28px_rgba(9,35,19,0.05)] hover:shadow-[0_14px_40px_rgba(9,35,19,0.1)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative z-10 w-[56px] h-[56px] rounded-2xl bg-brand-green text-white font-outfit font-bold text-lg flex items-center justify-center mx-auto mb-5 shadow-lg shadow-brand-green/30 ring-4 ring-white">
                {step.n}
              </div>
              <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d={step.icon} />
                </svg>
              </div>
              <h3 className="font-outfit font-bold text-brand-text text-[1.15rem] mb-2">{step.title}</h3>
              <p className="font-inter text-[0.9rem] text-brand-text-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
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
          <div className="absolute inset-0 bg-white/70" />

          <div className="relative z-10 py-16 md:py-24 max-w-xl mx-auto text-center px-6">
            <h2 className="font-outfit text-2xl md:text-3xl text-brand-text leading-snug">
              <span className="font-bold">Descubra </span>
              <span className="font-light">quanto seu condomínio pode estar deixando de arrecadar</span>
            </h2>

            <p className="font-inter text-brand-text text-sm md:text-base text-center leading-relaxed mt-4">
              Uma análise simples pode revelar valores que estão comprometendo decisões importantes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-7">
              <button
                type="button"
                onClick={scrollToForm}
                className="px-8 h-12 bg-brand-green border border-brand-green hover:bg-brand-green-light active:scale-[0.98] rounded-full shadow-md font-outfit font-bold text-white text-sm tracking-wide transition-all duration-200 focus:ring-2 focus:ring-brand-green/50 focus:outline-none"
                data-testid="button-bottom-cta"
              >
                QUERO MINHA ANÁLISE GRATUITA
              </button>
              <a
                href="https://wa.me/5547999999999"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 px-6 h-12 bg-white border border-brand-gray-light hover:border-brand-green/60 hover:text-brand-green rounded-full font-outfit font-semibold text-brand-text text-sm tracking-wide transition-colors"
                data-testid="button-bottom-whatsapp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-brand-green">
                  <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2s-.8.9-1 1.1c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1.1 1.1-1.1 2.6 1.1 3 1.3 3.2c.1.2 2.2 3.4 5.4 4.7 3.1 1.3 3.1.9 3.7.8.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.4zM12.1 21c-1.6 0-3.1-.4-4.4-1.1l-.3-.2-3.3.9.9-3.2-.2-.3c-.8-1.3-1.2-2.9-1.2-4.5 0-4.7 3.8-8.5 8.5-8.5 2.3 0 4.4.9 6 2.5 1.6 1.6 2.5 3.7 2.5 6 0 4.7-3.8 8.4-8.5 8.4zm7.2-15.7C17.4 3.4 14.8 2.4 12 2.4c-5.7 0-10.4 4.7-10.4 10.4 0 1.8.5 3.6 1.4 5.2L1.5 23l5.2-1.4c1.5.8 3.3 1.3 5 1.3h.1c5.7 0 10.4-4.7 10.4-10.4 0-2.8-1.1-5.4-3-7.2z" />
                </svg>
                Fale pelo WhatsApp
              </a>
            </div>

            <p className="font-inter text-brand-text text-xs md:text-[0.82rem] mt-5">
              <span className="font-semibold text-brand-green">+120 condomínios</span> já fizeram sua análise · Retorno em 24h úteis · 100% gratuito
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-brand-dark-deep text-white mt-4" data-testid="site-footer">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="inline-flex items-center bg-white/10 rounded-full px-3 py-1.5 gap-2 mb-4">
              <span className="font-outfit font-semibold text-white text-sm tracking-tight leading-none">Soluções</span>
              <span className="font-outfit font-light text-white text-sm tracking-tight leading-none">Condominiais</span>
              <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                <img className="w-[10px] h-[10px]" alt="" src="/figmaAssets/vector-3.svg" />
              </div>
            </div>
            <p className="font-inter text-white/80 text-sm leading-relaxed max-w-md">
              Consultoria especializada em receita condominial. Ajudamos síndicos e administradoras a proteger o caixa e reduzir o impacto da inadimplência.
            </p>
            <div className="flex items-center gap-2 mt-5 text-xs text-white/70">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-brand-green">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Dados protegidos · LGPD
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-outfit font-semibold text-white text-sm mb-3">Contato</h3>
            <ul className="space-y-2 font-inter text-sm text-white/80">
              <li>
                <a href="https://wa.me/5547999999999" target="_blank" rel="noreferrer noopener" className="hover:text-brand-green transition-colors inline-flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12.1 21c-1.6 0-3.1-.4-4.4-1.1l-.3-.2-3.3.9.9-3.2-.2-.3c-.8-1.3-1.2-2.9-1.2-4.5 0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5-3.8 8.4-8.5 8.4z" /></svg>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:contato@solucoescondominiais.com.br" className="hover:text-brand-green transition-colors inline-flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M4 6h16v12H4z M4 6l8 7 8-7" /></svg>
                  E-mail
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-white/70">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M20 10c0 7-8 13-8 13s-8-6-8-13a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
                Santa Catarina, Brasil
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-outfit font-semibold text-white text-sm mb-3">Informações</h3>
            <ul className="space-y-2 font-inter text-sm text-white/80">
              <li><a href="/privacidade" className="hover:text-brand-green transition-colors">Política de privacidade</a></li>
              <li><button type="button" onClick={scrollToForm} className="hover:text-brand-green transition-colors text-left">Análise gratuita</button></li>
              <li><a href="#how-heading" className="hover:text-brand-green transition-colors">Como funciona</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="font-inter text-white/60 text-xs">© 2026 Soluções Condominiais. Todos os direitos reservados.</p>
            <p className="font-inter text-white/50 text-xs">Feito com cuidado para proteger o caixa do seu condomínio.</p>
          </div>
        </div>
      </footer>

    </main>
  );
};
