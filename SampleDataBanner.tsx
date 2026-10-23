import React from 'react';
import { Cpu, Info } from 'lucide-react';

interface SampleDataBannerProps {
  onOpenGlossary: () => void;
}

export const SampleDataBanner: React.FC<SampleDataBannerProps> = ({ onOpenGlossary }) => {
  return (
    <div className="w-full bg-[#12152A]/90 border-b border-white/[0.06] px-4 py-1.5 flex items-center justify-between text-xs text-[#A4A8C0]">
      <div className="flex items-center gap-2 max-w-5xl mx-auto w-full justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#8B7CFF]/10 text-[#8B7CFF] font-mono text-[11px] font-semibold border border-[#8B7CFF]/20">
            <Cpu className="w-3 h-3 text-[#8B7CFF]" />
            QUANTUM SIMULATOR
          </span>
          <span className="text-[#F3F4FA]/80">
            Backend: Active · All executions and noise models are simulated
          </span>
        </div>
        <button
          onClick={onOpenGlossary}
          className="text-[#8B7CFF] hover:text-[#A89CFF] hover:underline flex items-center gap-1 text-[11px] shrink-0 font-medium cursor-pointer transition-colors"
        >
          <Info className="w-3 h-3" />
          Quantum Glossary
        </button>
      </div>
    </div>
  );
};
