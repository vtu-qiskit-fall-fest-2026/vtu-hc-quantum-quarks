import React, { useState } from 'react';
import {
  Code,
  Copy,
  Check,
  FlaskConical,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Download,
  Server,
  Zap,
  Loader2
} from 'lucide-react';
import { PRESET_CIRCUITS } from '../../data/sampleData';
import { BackendAnalyzeResponse } from '../../types';

interface Stage1Props {
  onAnalyze: () => void;
  onOpenGlossary: () => void;
  selectedExample: 'coin_flip' | 'bell_state';
  setSelectedExample: (ex: 'coin_flip' | 'bell_state') => void;
  shots?: number;
  setShots?: (shots: number) => void;
  isLoading: boolean;
  apiResult: BackendAnalyzeResponse | null;
}

export const Stage1CircuitPreflight: React.FC<Stage1Props> = ({
  onAnalyze,
  onOpenGlossary,
  selectedExample,
  setSelectedExample,
  isLoading,
  apiResult
}) => {
  const currentPresetKey = selectedExample === 'bell_state' ? 'bellState' : 'coinFlip';
  const [circuitCode, setCircuitCode] = useState<string>(PRESET_CIRCUITS[currentPresetKey].code);
  const [copied, setCopied] = useState<boolean>(false);
  const [formatNotice, setFormatNotice] = useState<boolean>(false);

  const handleSelectPreset = (exampleKey: 'coin_flip' | 'bell_state') => {
    setSelectedExample(exampleKey);
    const key = exampleKey === 'bell_state' ? 'bellState' : 'coinFlip';
    setCircuitCode(PRESET_CIRCUITS[key].code);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(circuitCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormatCode = () => {
    setFormatNotice(true);
    setTimeout(() => setFormatNotice(false), 1500);
  };

  const handleResetCode = () => {
    const key = selectedExample === 'bell_state' ? 'bellState' : 'coinFlip';
    setCircuitCode(PRESET_CIRCUITS[key].code);
  };

  const handleExportSvg = () => {
    const activeDiagram = apiResult && apiResult.id === selectedExample
      ? apiResult.diagram_text
      : selectedExample === 'coin_flip'
      ? "     ┌───┐┌─┐\n  q: ┤ H ├┤M├\n     └───┘└╥┘\nc: 1/══════╩═\n           0 "
      : "     ┌───┐     ┌─┐   \nq_0: ┤ H ├──■──┤M├───\n     └───┘┌─┴─┐└╥┘┌─┐\nq_1: ─────┤ X ├─╫─┤M├\n          └───┘ ║ └╥┘\nc: 2/═══════════╩══╩═\n                0  1 ";

    const blob = new Blob([activeDiagram], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quantumpilot_${selectedExample}_circuit.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentDiagram = apiResult && apiResult.id === selectedExample
    ? apiResult.diagram_text
    : selectedExample === 'coin_flip'
    ? "     ┌───┐┌─┐\n  q: ┤ H ├┤M├\n     └───┘└╥┘\nc: 1/══════╩═\n           0 "
    : "     ┌───┐     ┌─┐   \nq_0: ┤ H ├──■──┤M├───\n     └───┘┌─┴─┐└╥┘┌─┐\nq_1: ─────┤ X ├─╫─┤M├\n          └───┘ ║ └╥┘\nc: 2/═══════════╩══╩═\n                0  1 ";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumb & Target Node */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#A4A8C0]">
        <div className="flex items-center gap-2">
          <span>Workspace</span>
          <span>&gt;</span>
          <span className="text-[#F3F4FA]">New Experiment</span>
          <span>·</span>
          <span className="px-2 py-0.5 rounded-md bg-[#171B34] text-[#8B7CFF] border border-[#8B7CFF]/20">
            Quantum Simulator (Backend Connected)
          </span>
        </div>
        <div className="px-3 py-1 rounded-full bg-[#12152A] border border-white/[0.08] text-[11px] text-[#A4A8C0] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          <span>Simulated Session</span>
        </div>
      </div>

      {/* Hero Title & Provider Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F4FA] mb-2">
            Run your first quantum circuit
          </h1>
          <p className="text-sm text-[#A4A8C0] max-w-2xl leading-relaxed">
            Write or paste Qiskit code, inspect measurement shots, and preview your quantum circuit before submitting to the quantum simulator.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#12152A] border border-white/[0.08] text-xs font-mono shadow-sm">
          <FlaskConical className="w-4 h-4 text-[#8B7CFF]" />
          <div>
            <div className="text-[10px] text-[#6E7391] uppercase tracking-wider">Provider</div>
            <div className="text-[#F3F4FA] font-medium">Quantum Simulator</div>
          </div>
        </div>
      </div>

      {/* 2-Column Main Layout: 7 cols left, 5 cols right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Code editor & shots control (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Preset Experiments Bar */}
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-[#12152A] border border-white/[0.08]">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#A4A8C0] mr-2">
              <Sparkles className="w-3.5 h-3.5 text-[#8B7CFF]" />
              <span className="font-semibold uppercase tracking-wider text-[11px]">PRESET EXPERIMENTS:</span>
            </div>

            <button
              onClick={() => handleSelectPreset('coin_flip')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer ${
                selectedExample === 'coin_flip'
                  ? 'bg-[#8B7CFF] text-white font-semibold shadow-sm'
                  : 'bg-[#171B34] text-[#A4A8C0] hover:text-[#F3F4FA] hover:bg-[#1D2140] border border-white/[0.08]'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>Quantum Coin Flip (1 Qubit)</span>
            </button>

            <button
              onClick={() => handleSelectPreset('bell_state')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer ${
                selectedExample === 'bell_state'
                  ? 'bg-[#8B7CFF] text-white font-semibold shadow-sm'
                  : 'bg-[#171B34] text-[#A4A8C0] hover:text-[#F3F4FA] hover:bg-[#1D2140] border border-white/[0.08]'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>Bell State (2 Qubits)</span>
            </button>
          </div>

          {/* Qiskit Code Editor Window */}
          <div className="rounded-2xl bg-[#0B0D17] border border-white/[0.08] shadow-xl overflow-hidden font-mono">
            {/* Window Clean Header (no fake OS dots) */}
            <div className="px-4 py-2.5 bg-[#12152A] border-b border-white/[0.08] flex items-center justify-between text-xs text-[#A4A8C0]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-[#F3F4FA] font-medium">
                  <span className="text-[#8B7CFF] font-mono">&lt;&gt;</span>
                  <span>{selectedExample === 'bell_state' ? 'bell_state.py' : 'coin_flip.py'}</span>
                </div>
                <span className="text-[#6E7391] text-[11px] px-2 py-0.5 rounded bg-[#171B34] border border-white/[0.06]">
                  Qiskit 1.0 · Python
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#171B34] hover:bg-[#1D2140] text-[#F3F4FA] text-[11px] transition-colors duration-150 cursor-pointer border border-white/[0.08]"
                  title="Copy code to clipboard"
                >
                  {copied ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleFormatCode}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#171B34] hover:bg-[#1D2140] text-[#F3F4FA] text-[11px] transition-colors duration-150 cursor-pointer border border-white/[0.08]"
                  title="Format Qiskit code"
                >
                  <Code className="w-3 h-3" />
                  <span>{formatNotice ? 'Formatted' : 'Format'}</span>
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-4 overflow-x-auto text-xs leading-relaxed bg-[#0B0D17]">
              <pre className="font-mono text-xs text-[#F3F4FA] whitespace-pre leading-relaxed">
                {circuitCode.split('\n').map((line, idx) => (
                  <div key={idx} className="flex">
                    <span className="w-8 select-none text-[#6E7391] shrink-0 text-right pr-4">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className={line.startsWith('#') ? 'text-[#6E7391] italic' : 'text-[#F3F4FA]'}>
                      {line}
                    </span>
                  </div>
                ))}
              </pre>
            </div>

            {/* Editor Footer Banner */}
            <div className="px-4 py-2 bg-[#0E1020] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#A4A8C0]">
              <div className="flex items-center gap-1.5">
                <span className="text-[#8B7CFF]">ℹ</span>
                <span>Select a preset above to load Qiskit code for analysis.</span>
              </div>
              <div className="text-[#6E7391]">
                UTF-8 · Python 3.11
              </div>
            </div>
          </div>

          {/* Shots (Repetitions) Fixed Card */}
          <div className="p-5 rounded-2xl bg-[#12152A] border border-white/[0.08] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-[#F3F4FA]">
                <RotateCcw className="w-4 h-4 text-[#8B7CFF]" />
                <span>Shots (Repetitions)</span>
                <HelpCircle className="w-3.5 h-3.5 text-[#6E7391] hover:text-[#8B7CFF] transition-colors cursor-pointer" onClick={onOpenGlossary} />
              </div>
              <div className="px-3 py-1 rounded-lg bg-[#171B34] border border-white/[0.08] font-mono text-sm font-bold text-[#8B7CFF]">
                1,000 <span className="text-xs font-normal text-[#A4A8C0]">shots</span>
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <p className="text-sm font-medium text-[#F3F4FA]">
                1,000 shots (fixed for this demo)
              </p>
              <p className="text-xs text-[#A4A8C0]">
                How many times the circuit runs
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handleResetCode}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#12152A] hover:bg-[#171B34] text-[#F3F4FA] text-xs font-semibold border border-white/[0.08] hover:border-white/20 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#A4A8C0]" />
              <span>Reset Code</span>
            </button>

            {/* Main Analyze Button - Primary Gradient Pill with soft shadow */}
            <button
              onClick={onAnalyze}
              disabled={isLoading}
              className="w-full sm:flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B7CFF] to-[#F472B6] hover:from-[#9D90FF] hover:to-[#F687C2] text-white text-xs sm:text-sm font-bold tracking-wide transition-all duration-150 shadow-[0_4px_20px_rgba(139,124,255,0.25)] hover:shadow-[0_4px_24px_rgba(139,124,255,0.35)] flex items-center justify-center gap-2 cursor-pointer group disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Connecting to Backend...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Analyze</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Circuit Preview & Guide (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Live Circuit Preview Card */}
          <div className="p-5 rounded-2xl bg-[#12152A] border border-white/[0.08] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-[#F3F4FA]">
                <Code className="w-4 h-4 text-[#8B7CFF]" />
                <span>Live Circuit Preview (Simulated)</span>
              </div>
              <button
                onClick={handleExportSvg}
                className="flex items-center gap-1 text-[11px] font-mono text-[#A4A8C0] hover:text-[#8B7CFF] transition-colors duration-150 cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>Export Diagram</span>
              </button>
            </div>

            {/* Metrics Separators (Clean Unboxed) */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#A4A8C0]">
              <span className="text-[#F3F4FA]">
                {selectedExample === 'bell_state' ? '2 Qubits' : '1 Qubit'}
              </span>
              <span>·</span>
              <span>{selectedExample === 'bell_state' ? 'Depth 3' : 'Depth 2'}</span>
              <span>·</span>
              <span>{selectedExample === 'bell_state' ? '2 Gates' : '1 Gate'}</span>
              <span>·</span>
              <span>{selectedExample === 'bell_state' ? '2 Measurements' : '1 Measurement'}</span>
            </div>

            {/* Monospace Circuit Diagram with preserved line breaks */}
            <div className="p-4 rounded-xl bg-[#0B0D17] border border-white/[0.06] overflow-x-auto">
              <pre className="font-mono text-xs sm:text-[13px] text-[#7C9CFF] whitespace-pre leading-relaxed select-all">
                {currentDiagram}
              </pre>
            </div>

            {/* Superposition Description */}
            <div className="pt-2">
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-[#A4A8C0]">Simulated Ideal Output:</span>
                <span className="text-[#F3F4FA] font-semibold">
                  {selectedExample === 'bell_state' ? '|00⟩: 50% · |11⟩: 50%' : '|0⟩: 50% · |1⟩: 50%'}
                </span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden flex bg-[#171B34]">
                <div className="w-1/2 h-full bg-[#7C9CFF]" />
                <div className="w-1/2 h-full bg-[#8B7CFF]" />
              </div>
            </div>
          </div>

          {/* Educational Beginner Guide Card */}
          <div className="p-5 rounded-2xl bg-[#12152A] border border-white/[0.08] shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#F3F4FA]">
              <Sparkles className="w-4 h-4 text-[#8B7CFF]" />
              <span className="tracking-tight">
                {selectedExample === 'bell_state' ? 'Understanding Entangled Bell State' : 'New to quantum? Start with Coin Flip'}
              </span>
            </div>

            <p className="text-xs text-[#A4A8C0] leading-relaxed">
              {selectedExample === 'bell_state'
                ? 'Two entangled qubits create quantum correlations: when measured, they will agree (|00⟩ or |11⟩). The Hadamard and CNOT gates create the maximally entangled Bell state.'
                : 'In classical computing, a bit is strictly 0 or 1. A quantum bit (qubit) can exist in superposition — both 0 and 1 simultaneously. The Hadamard gate creates a fair 50/50 coin flip in quantum state space.'}
            </p>

            {/* Comparison Visual */}
            <div className="p-4 rounded-xl bg-[#0B0D17] border border-white/[0.06] flex items-center justify-between text-center">
              {/* Classical Bit */}
              <div className="flex flex-col items-center">
                <div className="text-[10px] font-mono text-[#6E7391] uppercase mb-1">Classical State</div>
                <div className="w-12 h-10 rounded-lg bg-[#171B34] border border-white/[0.08] flex items-center justify-center font-mono font-bold text-sm text-[#F3F4FA]">
                  {selectedExample === 'bell_state' ? '00 / 11' : '0 / 1'}
                </div>
                <span className="text-[10px] text-[#6E7391] mt-1">Definite</span>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center px-2">
                <span className="text-[10px] font-mono text-[#8B7CFF] font-semibold mb-0.5">⇄</span>
                <span className="text-[10px] font-mono text-[#8B7CFF] font-bold">
                  {selectedExample === 'bell_state' ? 'H + CNOT' : 'H Gate'}
                </span>
              </div>

              {/* Qubit in Superposition */}
              <div className="flex flex-col items-center">
                <div className="text-[10px] font-mono text-[#8B7CFF] uppercase mb-1">Superposition</div>
                <div className="w-16 h-10 rounded-lg bg-[#8B7CFF]/10 border border-[#8B7CFF]/40 flex items-center justify-center font-mono font-bold text-sm text-[#8B7CFF]">
                  |ψ⟩
                </div>
                <span className="text-[10px] text-[#8B7CFF] font-mono mt-1">
                  {selectedExample === 'bell_state' ? '50% |00⟩ + 50% |11⟩' : '50% |0⟩ + 50% |1⟩'}
                </span>
              </div>
            </div>

            {/* Concept Glossary Buttons */}
            <div className="pt-2 border-t border-white/[0.08]">
              <div className="text-[10px] font-mono uppercase text-[#6E7391] mb-2 font-bold tracking-wider">
                CONCEPT GLOSSARY:
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <button
                  onClick={onOpenGlossary}
                  className="px-2.5 py-1 rounded-lg bg-[#171B34] hover:bg-[#1D2140] text-[#F3F4FA] border border-white/[0.08] transition-colors duration-150 cursor-pointer text-[11px]"
                >
                  ⦿ Qubit: Quantum Bit
                </button>
                <button
                  onClick={onOpenGlossary}
                  className="px-2.5 py-1 rounded-lg bg-[#171B34] hover:bg-[#1D2140] text-[#F3F4FA] border border-white/[0.08] transition-colors duration-150 cursor-pointer text-[11px]"
                >
                  ⁝ Superposition: Multiple states
                </button>
                <button
                  onClick={onOpenGlossary}
                  className="px-2.5 py-1 rounded-lg bg-[#171B34] hover:bg-[#1D2140] text-[#F3F4FA] border border-white/[0.08] transition-colors duration-150 cursor-pointer text-[11px]"
                >
                  ↺ Shots: Repetitions
                </button>
              </div>
            </div>
          </div>

          {/* Target Backend Recommendation Preview Card */}
          <div className="p-4 rounded-2xl bg-[#12152A] border border-white/[0.08] flex items-center justify-between text-xs font-mono shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <div>
                <span className="text-[#A4A8C0]">Simulated Backend Engine:</span>
                <div className="text-[#F3F4FA] font-semibold">
                  Quantum Simulator
                </div>
              </div>
            </div>
            <Server className="w-4 h-4 text-[#A4A8C0]" />
          </div>
        </div>
      </div>
    </div>
  );
};
