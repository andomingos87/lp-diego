import { useEffect, useState } from "react";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById("form-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-200 ${
        scrolled ? "bg-white/85 border-b border-black/5 shadow-[0_1px_12px_rgba(0,0,0,0.04)]" : "bg-white/0"
      }`}
      data-testid="site-header"
    >
      <div className="max-w-[1200px] mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
        <div className="inline-flex items-center bg-brand-gray-light rounded-full px-3 py-1.5 gap-2">
          <span className="font-outfit font-semibold text-brand-dark text-sm tracking-tight leading-none">
            Soluções
          </span>
          <span className="font-outfit font-light text-brand-dark text-sm tracking-tight leading-none">
            Condominiais
          </span>
          <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0">
            <img className="w-[10px] h-[10px]" alt="" src="/figmaAssets/vector-3.svg" />
          </div>
        </div>

        <button
          type="button"
          onClick={scrollToForm}
          className="hidden sm:inline-flex items-center h-10 px-5 bg-brand-green hover:bg-brand-green-light active:scale-[0.98] rounded-full shadow-md font-outfit font-bold text-white text-sm tracking-wide transition-all duration-200 focus:ring-2 focus:ring-brand-green/50 focus:outline-none"
          data-testid="header-cta"
        >
          Análise gratuita
        </button>
      </div>
    </header>
  );
}
