import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

interface PortfolioPageProps {
  onNavigate: (path: string) => void;
}

export function PortfolioPage({ onNavigate }: PortfolioPageProps) {
  useEffect(() => {
    document.title = "SS Solution Portfolio";
    return () => {
      document.title = "SS Solution - Luxury Digital Growth Studio";
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-[#050505] overflow-hidden flex flex-col pt-20">
      {/* Top Bar / Header */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-[#050505]/80 backdrop-blur-md z-50 flex items-center justify-between px-6 border-b border-white/10">
        <button
          onClick={() => onNavigate("/")}
          className="flex items-center gap-2 text-white/80 hover:text-[#00D4FF] transition-colors group cursor-pointer"
        >
          <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold uppercase tracking-wider text-xs">Back to Home</span>
        </button>
        <span className="text-white/40 text-xs font-semibold uppercase tracking-widest">SS Solution Portfolio</span>
        <a 
          href="/portfolio.pdf" 
          download="SS_Solution_Portfolio.pdf"
          className="bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#00D4FF] hover:text-black transition-all cursor-pointer"
        >
          Download PDF
        </a>
      </div>

      {/* PDF View Container */}
      <div className="flex-1 w-full h-full relative">
        <iframe
          src="/portfolio.pdf#toolbar=1"
          className="w-full h-full border-none"
          title="SS Solution Portfolio"
        />
      </div>
    </div>
  );
}
