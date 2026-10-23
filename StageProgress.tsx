import React from 'react';
import { Check, Atom } from 'lucide-react';
import { StageId } from '../types';

interface StageProgressProps {
  currentStage: StageId;
  onSelectStage: (stage: StageId) => void;
  circuitTitle?: string;
}

export const StageProgress: React.FC<StageProgressProps> = ({ currentStage, onSelectStage, circuitTitle }) => {
  if (currentStage === 3) {
    // Stage 3 top Flight Pipeline bar
    return (
      <div className="w-full bg-[#12152A] border border-white/[0.08] rounded-2xl p-3.5 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          {/* Left badge: SIMULATION: circuit title */}
          <div className="flex items-center gap-2 text-[#8B7CFF]">
            <Atom className="w-4 h-4 text-[#8B7CFF]" />
            <span className="font-semibold tracking-wider uppercase text-[#F3F4FA]">
              SIMULATION: {circuitTitle || 'COIN FLIP (1 QUBIT)'}
            </span>
          </div>

          {/* Stepper tracker */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectStage(1)}
              className="flex items-center gap-1.5 text-[#10B981] hover:text-[#34D399] transition-colors cursor-pointer"
            >
              <span className="w-4 h-4 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center text-[10px]">
                <Check className="w-2.5 h-2.5 text-[#10B981]" />
              </span>
              <span className="font-medium">1. Circuit</span>
            </button>

            <span className="w-8 h-[1px] bg-[#10B981]/40" />

            <button
              onClick={() => onSelectStage(2)}
              className="flex items-center gap-1.5 text-[#10B981] hover:text-[#34D399] transition-colors cursor-pointer"
            >
              <span className="w-4 h-4 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center text-[10px]">
                <Check className="w-2.5 h-2.5 text-[#10B981]" />
              </span>
              <span className="font-medium">2. Backend</span>
            </button>

            <span className="w-8 h-[1px] bg-[#8B7CFF]/50" />

            <div className="flex items-center gap-1.5 text-[#8B7CFF]">
              <span className="w-4 h-4 rounded-full bg-gradient-to-r from-[#8B7CFF] to-[#F472B6] text-white font-bold flex items-center justify-center text-[10px]">
                3
              </span>
              <span className="font-semibold text-white">3. Results</span>
            </div>
          </div>

          {/* Right badge: Simulated only, no unbacked claims */}
          <div className="flex items-center gap-2 text-[#A4A8C0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span>Simulated</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#12152A] border border-white/[0.08] rounded-2xl p-4 sm:p-5 mb-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Step 1 */}
        <button
          onClick={() => onSelectStage(1)}
          className={`flex items-center gap-3 text-left transition-all cursor-pointer group ${
            currentStage === 1
              ? 'opacity-100'
              : currentStage > 1
              ? 'opacity-90 hover:opacity-100'
              : 'opacity-50'
          }`}
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-mono font-bold text-sm transition-all ${
              currentStage === 1
                ? 'bg-gradient-to-r from-[#8B7CFF] to-[#F472B6] text-white shadow-sm ring-4 ring-[#8B7CFF]/20'
                : currentStage > 1
                ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40'
                : 'bg-[#171B34] text-[#A4A8C0] border border-white/[0.08]'
            }`}
          >
            {currentStage > 1 ? <Check className="w-4 h-4 text-[#10B981]" /> : '1'}
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#6E7391]">
              {currentStage > 1 ? 'STEP 01 · COMPLETED' : 'STAGE 01'}
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-semibold truncate ${
                  currentStage === 1 ? 'text-white' : 'text-[#A4A8C0]'
                }`}
              >
                1. Circuit Pre-flight
              </span>
            </div>
          </div>
        </button>

        {/* Step 2 */}
        <button
          onClick={() => onSelectStage(2)}
          className={`flex items-center gap-3 text-left transition-all cursor-pointer group border-t md:border-t-0 md:border-l border-white/[0.08] pt-3 md:pt-0 md:pl-6 ${
            currentStage === 2
              ? 'opacity-100'
              : currentStage > 2
              ? 'opacity-90 hover:opacity-100'
              : 'opacity-60 hover:opacity-80'
          }`}
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-mono font-bold text-sm transition-all ${
              currentStage === 2
                ? 'bg-gradient-to-r from-[#8B7CFF] to-[#F472B6] text-white shadow-sm ring-4 ring-[#8B7CFF]/20'
                : currentStage > 2
                ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40'
                : 'bg-[#171B34] text-[#A4A8C0] border border-white/[0.08]'
            }`}
          >
            {currentStage > 2 ? <Check className="w-4 h-4 text-[#10B981]" /> : '2'}
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#6E7391]">
              {currentStage === 2 ? 'ACTIVE PHASE' : 'STAGE 02'}
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-semibold truncate ${
                  currentStage === 2 ? 'text-white' : 'text-[#A4A8C0]'
                }`}
              >
                2. Backend Recommendation
              </span>
            </div>
          </div>
        </button>

        {/* Step 3 */}
        <button
          onClick={() => onSelectStage(3)}
          className="flex items-center gap-3 text-left transition-all cursor-pointer group border-t md:border-t-0 md:border-l border-white/[0.08] pt-3 md:pt-0 md:pl-6 opacity-60 hover:opacity-80"
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-mono font-bold text-sm bg-[#171B34] text-[#A4A8C0] border border-white/[0.08]">
            3
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#6E7391]">
              {currentStage === 2 ? 'STEP 03 · NEXT' : 'STAGE 03'}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold truncate text-[#A4A8C0]">
                3. Results
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
