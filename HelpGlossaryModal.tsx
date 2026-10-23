import React from 'react';
import { X, BookOpen, Atom, Cpu, Zap, Activity, Waves } from 'lucide-react';

interface HelpGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GLOSSARY_ITEMS = [
  {
    term: "Qubit (Quantum Bit)",
    icon: Atom,
    description: "The fundamental unit of quantum information. Unlike a classical bit which is either 0 or 1, a qubit can exist in a superposition of both states simultaneously."
  },
  {
    term: "Hadamard Gate (H-Gate)",
    icon: Zap,
    description: "A single-qubit quantum gate that creates an equal superposition of |0⟩ and |1⟩ states from a pure state. Essential for genuine quantum coin flips and quantum randomness."
  },
  {
    term: "Superposition",
    icon: Waves,
    description: "A quantum phenomenon where a physical system can be in multiple states at once until measured, which forces it to collapse into a definite classical value."
  },
  {
    term: "Shots (Repetitions)",
    icon: Activity,
    description: "The number of times a quantum circuit is executed and measured in the simulator to build a statistical probability distribution."
  },
  {
    term: "Readout Fidelity",
    icon: Cpu,
    description: "The probability that a measured state (|0⟩ or |1⟩) matches the simulated quantum state without simulated measurement error."
  },
  {
    term: "Coherence Time (T1 & T2)",
    icon: Activity,
    description: "T1 (thermal relaxation time) measures how long a qubit retains state before decaying. T2 (dephasing time) measures how long simulated quantum phase relations persist."
  }
];

export const HelpGlossaryModal: React.FC<HelpGlossaryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#12152A] border border-white/[0.08] rounded-2xl p-6 shadow-2xl text-[#F3F4FA] max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#8B7CFF]/15 text-[#8B7CFF] border border-[#8B7CFF]/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#F3F4FA] tracking-tight">Quantum Computing Glossary</h2>
              <p className="text-xs text-[#A4A8C0]">Essential concepts for beginners exploring QuantumPilot</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A4A8C0] hover:text-[#F3F4FA] hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {GLOSSARY_ITEMS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-xl bg-[#0B0D17] border border-white/[0.06] hover:border-[#8B7CFF]/30 transition-all flex flex-col"
              >
                <div className="flex items-center gap-2 mb-2 text-[#8B7CFF]">
                  <IconComponent className="w-4 h-4 shrink-0" />
                  <h3 className="font-semibold text-sm text-[#F3F4FA]">{item.term}</h3>
                </div>
                <p className="text-xs text-[#A4A8C0] leading-relaxed flex-1">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-xs text-[#6E7391] font-mono">
            Quantum Simulator Educational Reference
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#171B34] hover:bg-[#1D2140] text-[#F3F4FA] border border-white/[0.08] transition-colors"
          >
            Close Glossary
          </button>
        </div>
      </div>
    </div>
  );
};
