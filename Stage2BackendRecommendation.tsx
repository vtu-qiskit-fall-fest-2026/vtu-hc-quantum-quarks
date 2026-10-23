import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Cpu,
  HelpCircle,
  RotateCw,
  Sparkles,
  Zap,
  Clock,
  Activity
} from 'lucide-react';

interface Stage2Props {
  onBack: () => void;
  onNext: () => void;
  onOpenGlossary: () => void;
  shots: number;
}

export const Stage2BackendRecommendation: React.FC<Stage2Props> = ({
  onBack,
  onNext,
  onOpenGlossary,
  shots
}) => {
  const [hardwareMode, setHardwareMode] = useState<'noisy' | 'ideal'>('noisy');
  const [selectedBackend, setSelectedBackend] = useState<string>('ibm_brisbane');

  const handleSelectAlternative = (backendId: string) => {
    setSelectedBackend(backendId);
  };

  const handleSelectBestMatch = () => {
    setSelectedBackend('ibm_brisbane');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumb & Flow Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#A4A8C0]">
        <div className="flex items-center gap-2">
          <span>Experiment</span>
          <span>/</span>
          <span>Simulated Circuit</span>
          <span>/</span>
          <span className="text-[#8B7CFF]">Backend Selection (Simulated)</span>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#12152A] p-1 rounded-xl border border-white/[0.08]">
            <button
              onClick={() => setHardwareMode('noisy')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                hardwareMode === 'noisy'
                  ? 'bg-[#8B7CFF] text-white font-semibold shadow-sm'
                  : 'text-[#A4A8C0] hover:text-[#F3F4FA]'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Simulated QPU</span>
            </button>
            <button
              onClick={() => setHardwareMode('ideal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                hardwareMode === 'ideal'
                  ? 'bg-[#8B7CFF] text-white font-semibold shadow-sm'
                  : 'text-[#A4A8C0] hover:text-[#F3F4FA]'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Ideal Simulator</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#12152A] border border-white/[0.08] text-[11px] font-mono text-[#A4A8C0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span>Simulator Connected</span>
          </div>
        </div>
      </div>

      {/* Hero Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F4FA] mb-2">
          Simulated execution profile for your circuit
        </h1>
        <p className="text-sm text-[#A4A8C0] max-w-3xl leading-relaxed">
          QuantumPilot configured your <strong className="text-white font-semibold">circuit</strong> (shots: {shots.toLocaleString()}) to run on simulated noise models for quantum distribution analysis.
        </p>
      </div>

      {/* Top 2 Cards: Recommended Best Match (Left) + AI Recommendation (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Best Match Recommended Card (7 cols) */}
        <div
          onClick={handleSelectBestMatch}
          className={`lg:col-span-7 p-6 rounded-2xl bg-[#12152A] border transition-all duration-150 cursor-pointer shadow-xl relative flex flex-col justify-between ${
            selectedBackend === 'ibm_brisbane'
              ? 'border-[#8B7CFF] ring-1 ring-[#8B7CFF]/40'
              : 'border-white/[0.08] hover:border-white/20'
          }`}
        >
          <div>
            {/* Top Badge Row */}
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-xs font-semibold">
                <span>☆</span>
                <span>Recommended Simulation Profile</span>
              </span>
              <span className="text-xs font-mono text-[#A4A8C0] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#8B7CFF]" />
                <span>Eagle r3 Simulated Model · 127 Simulated Qubits</span>
              </span>
            </div>

            {/* Machine Name & Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl sm:text-3xl font-mono font-bold text-[#F3F4FA] tracking-tight">
                  ibm_brisbane
                </h2>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-[#171B34] text-[#8B7CFF] border border-white/[0.08]">
                  SIM-v127
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#A4A8C0] px-2.5 py-1 rounded-lg bg-[#171B34] border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <span>Active Simulated Profile</span>
              </div>
            </div>

            <p className="text-xs text-[#A4A8C0] mb-5">
              Heavy-hex lattice topology simulated with depolarization noise model.
            </p>

            {/* 4 Metrics Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              <div className="p-3 rounded-xl bg-[#0B0D17] border border-white/[0.06]">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#6E7391] mb-1">
                  <span>Execution</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                </div>
                <div className="text-lg font-mono font-bold text-[#F3F4FA]">Simulated</div>
                <div className="text-[10px] font-mono text-[#6E7391] mt-0.5">Remote API</div>
              </div>

              <div className="p-3 rounded-xl bg-[#0B0D17] border border-white/[0.06]">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#6E7391] mb-1">
                  <span>Noise Model</span>
                  <HelpCircle className="w-3 h-3 text-[#6E7391] hover:text-[#8B7CFF] cursor-pointer" onClick={onOpenGlossary} />
                </div>
                <div className="text-lg font-mono font-bold text-[#8B7CFF]">Depolarizing</div>
                <div className="text-[10px] font-mono text-[#6E7391] mt-0.5">Simulated noise</div>
              </div>

              <div className="p-3 rounded-xl bg-[#0B0D17] border border-white/[0.06]">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#6E7391] mb-1">
                  <span>Readout</span>
                  <HelpCircle className="w-3 h-3 text-[#6E7391] hover:text-[#8B7CFF] cursor-pointer" onClick={onOpenGlossary} />
                </div>
                <div className="text-lg font-mono font-bold text-[#F3F4FA]">Sampled</div>
                <div className="text-[10px] font-mono text-[#6E7391] mt-0.5">1,000 shots</div>
              </div>

              <div className="p-3 rounded-xl bg-[#0B0D17] border border-white/[0.06]">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#6E7391] mb-1">
                  <span>Ideal Model</span>
                  <HelpCircle className="w-3 h-3 text-[#6E7391] hover:text-[#8B7CFF] cursor-pointer" onClick={onOpenGlossary} />
                </div>
                <div className="text-lg font-mono font-bold text-[#F3F4FA]">Noiseless</div>
                <div className="text-[10px] font-mono text-[#6E7391] mt-0.5">Exact baseline</div>
              </div>
            </div>

            {/* Recommendation callout */}
            <div className="p-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-start gap-2.5 text-xs text-[#F3F4FA]">
              <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                Optimal simulated configuration profile for shallow superposition and entanglement circuits.
              </span>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="mt-5 pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#A4A8C0]">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-[#8B7CFF]/15 text-[#8B7CFF] font-bold text-[10px]">
                Simulated
              </span>
              <span>Target Allocation: <strong className="text-white">Simulated Qubits [0..1]</strong></span>
            </div>
            <div>
              <span>Execution: </span>
              <span className="text-[#8B7CFF] font-bold">1,000 shots (Simulated)</span>
            </div>
          </div>
        </div>

        {/* Right: Simulation Profile Guide Card (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#12152A] border border-white/[0.08] shadow-xl flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-white font-semibold text-base">
                <Sparkles className="w-4 h-4 text-[#8B7CFF]" />
                <span>Simulation Profile Guide</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#8B7CFF]/15 text-[#8B7CFF] border border-[#8B7CFF]/30 text-[10px] font-mono font-semibold uppercase">
                Beginner Guide
              </span>
            </div>

            {/* Explanation Prose */}
            <div className="text-xs text-[#A4A8C0] leading-relaxed space-y-3 mb-5">
              <p>
                We recommend the <strong className="text-[#F3F4FA]">ibm_brisbane</strong> profile because it pairs an ideal state baseline with an imperfect machine simulation model.
              </p>
              <p>
                This allows beginners to compare the theoretical mathematical outcome with simulated noise where gates and measurement channels experience realistic imperfection.
              </p>
            </div>

            {/* 2 Callout Cards */}
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-[#0B0D17] border border-white/[0.06] flex flex-col">
                <span className="text-[11px] font-mono font-semibold text-[#8B7CFF] mb-1 flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-[#8B7CFF]" />
                  Simulated Readout
                </span>
                <span className="text-xs text-[#A4A8C0] leading-relaxed">
                  Compares theoretical state predictions with simulated noisy measurements.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#0B0D17] border border-white/[0.06] flex flex-col">
                <span className="text-[11px] font-mono font-semibold text-[#7C9CFF] mb-1 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#7C9CFF]" />
                  Shot Repetition
                </span>
                <span className="text-xs text-[#A4A8C0] leading-relaxed">
                  Executing 1,000 simulated shots provides statistical distributions for analysis.
                </span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#A4A8C0]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8B7CFF]" />
              <span>Simulated Profile · Standard noise model</span>
            </span>
            <span className="text-[#F3F4FA] font-bold">Profile Ready (Simulated)</span>
          </div>
        </div>
      </div>

      {/* Alternative Hardware Candidates Section */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h3 className="text-lg font-semibold text-[#F3F4FA] tracking-tight">
              Alternative Simulated Profiles
            </h3>
            <p className="text-xs text-[#A4A8C0]">
              Compare different simulated machine architectures and noise profiles.
            </p>
          </div>
          <span className="text-xs font-mono text-[#6E7391]">
            Click &apos;Select&apos; to reassign profile
          </span>
        </div>

        {/* 3 Alternative Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: ibm_kyoto */}
          <div
            onClick={() => handleSelectAlternative('ibm_kyoto')}
            className={`p-4 rounded-2xl bg-[#12152A] border transition-all duration-150 cursor-pointer flex flex-col justify-between ${
              selectedBackend === 'ibm_kyoto'
                ? 'border-[#8B7CFF] ring-1 ring-[#8B7CFF]/40 shadow-sm'
                : 'border-white/[0.08] hover:border-white/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-sm text-[#F3F4FA]">ibm_kyoto</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                </div>
                <span className="text-[11px] font-mono text-[#A4A8C0]">127 Simulated Qubits</span>
              </div>

              <p className="text-xs text-[#A4A8C0] mb-4">
                Eagle r3 simulated backend with thermal relaxation noise model.
              </p>

              <div className="space-y-2 text-xs font-mono mb-4">
                <div className="flex justify-between text-[#A4A8C0]">
                  <span>Execution:</span>
                  <span className="text-white font-semibold">Simulated Run</span>
                </div>
                <div className="flex justify-between text-[#A4A8C0]">
                  <span>Noise Model:</span>
                  <span className="text-[#8B7CFF] font-semibold">Thermal Relaxation</span>
                </div>
                <div className="flex justify-between text-[#A4A8C0]">
                  <span>Readout:</span>
                  <span className="text-white font-semibold">Sampled</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#6E7391]">Standard Simulation</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectAlternative('ibm_kyoto');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  selectedBackend === 'ibm_kyoto'
                    ? 'bg-[#8B7CFF] text-white'
                    : 'bg-[#171B34] text-[#F3F4FA] hover:bg-[#1D2140] border border-white/[0.08]'
                }`}
              >
                {selectedBackend === 'ibm_kyoto' ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>

          {/* Card 2: ibm_sherbrooke */}
          <div
            onClick={() => handleSelectAlternative('ibm_sherbrooke')}
            className={`p-4 rounded-2xl bg-[#12152A] border transition-all duration-150 cursor-pointer flex flex-col justify-between ${
              selectedBackend === 'ibm_sherbrooke'
                ? 'border-[#8B7CFF] ring-1 ring-[#8B7CFF]/40 shadow-sm'
                : 'border-white/[0.08] hover:border-white/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-sm text-[#F3F4FA]">ibm_sherbrooke</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                </div>
                <span className="text-[11px] font-mono text-[#A4A8C0]">127 Simulated Qubits</span>
              </div>

              <p className="text-xs text-[#A4A8C0] mb-4">
                Simulated backend model with depolarization noise.
              </p>

              <div className="space-y-2 text-xs font-mono mb-4">
                <div className="flex justify-between text-[#A4A8C0]">
                  <span>Execution:</span>
                  <span className="text-white font-semibold">Simulated Run</span>
                </div>
                <div className="flex justify-between text-[#A4A8C0]">
                  <span>Noise Model:</span>
                  <span className="text-[#8B7CFF] font-semibold">Depolarizing</span>
                </div>
                <div className="flex justify-between text-[#A4A8C0]">
                  <span>Readout:</span>
                  <span className="text-white font-semibold">Sampled</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#6E7391]">Standard Simulation</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectAlternative('ibm_sherbrooke');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  selectedBackend === 'ibm_sherbrooke'
                    ? 'bg-[#8B7CFF] text-white'
                    : 'bg-[#171B34] text-[#F3F4FA] hover:bg-[#1D2140] border border-white/[0.08]'
                }`}
              >
                {selectedBackend === 'ibm_sherbrooke' ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>

          {/* Card 3: ibmq_qasm_simulator */}
          <div
            onClick={() => handleSelectAlternative('ibmq_qasm_simulator')}
            className={`p-4 rounded-2xl bg-[#12152A] border transition-all duration-150 cursor-pointer flex flex-col justify-between ${
              selectedBackend === 'ibmq_qasm_simulator'
                ? 'border-[#8B7CFF] ring-1 ring-[#8B7CFF]/40 shadow-sm'
                : 'border-white/[0.08] hover:border-white/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-sm text-[#F3F4FA]">ibmq_qasm_simulator</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B7CFF]" />
                </div>
                <span className="text-[11px] font-mono text-[#A4A8C0]">32 Simulated Qubits</span>
              </div>

              <p className="text-xs text-[#A4A8C0] mb-4">
                Cloud matrix vector engine with synthetic noise modeling.
              </p>

              <div className="space-y-2 text-xs font-mono mb-4">
                <div className="flex justify-between text-[#A4A8C0]">
                  <span>Execution:</span>
                  <span className="text-[#10B981] font-semibold">Simulated Run</span>
                </div>
                <div className="flex justify-between text-[#A4A8C0]">
                  <span>Noise Model:</span>
                  <span className="text-[#8B7CFF] font-semibold">Aer Simulator</span>
                </div>
                <div className="flex justify-between text-[#A4A8C0]">
                  <span>Readout:</span>
                  <span className="text-white font-semibold">Ideal / Sampled</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#10B981]">Instant Response</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectAlternative('ibmq_qasm_simulator');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  selectedBackend === 'ibmq_qasm_simulator'
                    ? 'bg-[#8B7CFF] text-white'
                    : 'bg-[#171B34] text-[#F3F4FA] hover:bg-[#1D2140] border border-white/[0.08]'
                }`}
              >
                {selectedBackend === 'ibmq_qasm_simulator' ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Execution Status & QPU Pipeline Box */}
      <div className="p-5 rounded-2xl bg-[#12152A] border border-white/[0.08] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#F3F4FA]">
              <RotateCw className="w-4 h-4 text-[#8B7CFF]" />
              <span>Simulated Execution Pipeline</span>
            </div>
            <div className="text-xs font-mono text-[#A4A8C0] mt-0.5">
              Simulated Execution Pipeline · Pipeline Ready
            </div>
          </div>

          <div className="px-3 py-1 rounded-full bg-[#8B7CFF]/15 border border-[#8B7CFF]/30 text-xs font-mono text-[#8B7CFF] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B7CFF]" />
            <span>Ready to simulate on {selectedBackend}</span>
          </div>
        </div>

        {/* 4 Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {/* Step 1 */}
          <div className="p-3 rounded-xl bg-[#0B0D17] border border-white/[0.06] flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-[#10B981]" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#F3F4FA]">1. Transpiling Circuit</div>
              <div className="text-[10px] font-mono text-[#6E7391]">Simulated representation</div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-3 rounded-xl bg-[#0B0D17] border border-white/[0.06] flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-[#10B981]" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#F3F4FA]">2. Prepare Simulator</div>
              <div className="text-[10px] font-mono text-[#10B981]">State vector allocated</div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-3 rounded-xl bg-[#8B7CFF]/10 border border-[#8B7CFF]/30 flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#8B7CFF] text-white flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-3 h-3 fill-current" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#8B7CFF]">3. Apply Quantum Gates</div>
              <div className="text-[10px] font-mono text-[#A4A8C0]">Unitary transformations</div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-3 rounded-xl bg-[#0B0D17] border border-white/[0.06] flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-0.5 text-[#A4A8C0] text-[10px] font-mono">
              4
            </div>
            <div>
              <div className="text-xs font-semibold text-[#A4A8C0]">4. Sample Readouts</div>
              <div className="text-[10px] font-mono text-[#6E7391]">1,000 simulated shots</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation & Action Strip */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
        <button
          onClick={onBack}
          className="w-full md:w-auto px-5 py-3 rounded-xl bg-[#12152A] hover:bg-[#171B34] text-[#F3F4FA] text-xs font-semibold border border-white/[0.08] hover:border-white/20 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#A4A8C0]" />
          <span>Back to Circuit</span>
        </button>

        <div className="text-center text-xs font-mono text-[#A4A8C0]">
          <div>Execution mode: <span className="text-[#F3F4FA] font-semibold">Quantum Simulator (Simulated)</span></div>
          <div className="text-[#6E7391] text-[11px]">Turnaround: Remote API response</div>
        </div>

        <button
          onClick={onNext}
          className="w-full md:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-[#8B7CFF] to-[#F472B6] hover:from-[#9D90FF] hover:to-[#F687C2] text-white text-xs sm:text-sm font-bold tracking-wide transition-all duration-150 shadow-[0_4px_20px_rgba(139,124,255,0.25)] flex items-center justify-center gap-2 cursor-pointer group"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>Run Circuit on {selectedBackend}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
