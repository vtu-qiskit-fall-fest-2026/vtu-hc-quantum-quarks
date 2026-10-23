import React from 'react';

interface FooterProps {
  onOpenGlossary?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGlossary }) => {
  return (
    <footer className="w-full mt-16 border-t border-white/[0.08] py-8 text-xs text-[#6E7391] font-mono">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-center md:text-left text-[#A4A8C0]">
          <span>© 2026 QuantumPilot Studio</span>
          <span>·</span>
          <span>Quantum Simulation Studio</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={onOpenGlossary}
            className="hover:text-[#8B7CFF] transition-colors cursor-pointer text-xs text-[#A4A8C0]"
          >
            Quick Start &amp; Glossary
          </button>
        </div>
      </div>
    </footer>
  );
};
