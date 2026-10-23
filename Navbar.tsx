import React from 'react';
import { BookOpen } from 'lucide-react';
import { StageId } from '../types';

interface NavbarProps {
  currentStage: StageId;
  onSelectStage: (stage: StageId) => void;
  onOpenGlossary: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStage,
  onSelectStage,
  onOpenGlossary,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0D17]/85 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-[#12152A] border border-[#8B7CFF]/30 flex items-center justify-center shadow-sm">
            <svg
              className="w-5 h-5 text-[#8B7CFF]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" fill="#8B7CFF" />
              <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)" />
              <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(-30 12 12)" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-[#F3F4FA] tracking-tight">QuantumPilot</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-[#171B34] text-[#A4A8C0] border border-white/[0.08]">
                v1.4
              </span>
            </div>
            <span className="text-[11px] text-[#A4A8C0] font-normal leading-none mt-0.5">
              Beginner Cloud Studio · Quantum Simulator
            </span>
          </div>
        </div>

        {/* Center Navigation Stage Steps - Clean Segmented Control */}
        <nav className="hidden md:flex items-center bg-[#12152A] p-1 rounded-xl border border-white/[0.08]">
          {/* Step 1 */}
          <button
            onClick={() => onSelectStage(1)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs transition-all duration-150 cursor-pointer ${
              currentStage === 1
                ? 'bg-gradient-to-r from-[#8B7CFF] to-[#F472B6] text-white font-semibold shadow-sm'
                : 'text-[#A4A8C0] hover:text-[#F3F4FA] hover:bg-white/[0.04] font-medium'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                currentStage === 1
                  ? 'bg-black/20 text-white'
                  : 'bg-white/10 text-[#A4A8C0]'
              }`}
            >
              1
            </span>
            <span className="whitespace-nowrap">Circuit Pre-flight</span>
          </button>

          {/* Step 2 */}
          <button
            onClick={() => onSelectStage(2)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs transition-all duration-150 cursor-pointer ${
              currentStage === 2
                ? 'bg-gradient-to-r from-[#8B7CFF] to-[#F472B6] text-white font-semibold shadow-sm'
                : 'text-[#A4A8C0] hover:text-[#F3F4FA] hover:bg-white/[0.04] font-medium'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                currentStage === 2
                  ? 'bg-black/20 text-white'
                  : 'bg-white/10 text-[#A4A8C0]'
              }`}
            >
              2
            </span>
            <span className="whitespace-nowrap">Backend &amp; Run</span>
          </button>

          {/* Step 3 */}
          <button
            onClick={() => onSelectStage(3)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs transition-all duration-150 cursor-pointer ${
              currentStage === 3
                ? 'bg-gradient-to-r from-[#8B7CFF] to-[#F472B6] text-white font-semibold shadow-sm'
                : 'text-[#A4A8C0] hover:text-[#F3F4FA] hover:bg-white/[0.04] font-medium'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                currentStage === 3
                  ? 'bg-black/20 text-white'
                  : 'bg-white/10 text-[#A4A8C0]'
              }`}
            >
              3
            </span>
            <span className="whitespace-nowrap">Results Analysis</span>
          </button>
        </nav>

        {/* Right Action / Status Zone */}
        <div className="flex items-center gap-3">
          {/* Cloud Status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#12152A] border border-white/[0.08] text-[11px] font-mono text-[#A4A8C0]">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#10B981]"></span>
            <span>Simulator:</span>
            <span className="text-[#10B981] font-semibold">Online (Simulated)</span>
          </div>

          {/* Help & Glossary Button */}
          <button
            onClick={onOpenGlossary}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#12152A] hover:bg-[#171B34] text-[#F3F4FA] text-xs font-medium border border-white/[0.08] hover:border-[#8B7CFF]/40 transition-colors duration-150 cursor-pointer"
            title="Open Quantum Glossary"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#8B7CFF]" />
            <span className="hidden xs:inline">Help &amp; Glossary</span>
          </button>

          {/* User profile avatar */}
          <div className="w-8 h-8 rounded-full ring-2 ring-[#8B7CFF]/30 overflow-hidden bg-gradient-to-tr from-[#8B7CFF] to-[#F472B6] flex items-center justify-center text-xs font-bold text-white shadow-sm">
            <span>QP</span>
          </div>
        </div>
      </div>
    </header>
  );
};
