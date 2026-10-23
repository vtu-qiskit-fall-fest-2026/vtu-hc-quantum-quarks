import React, { useState } from 'react';
import {
  ArrowRight,
  RotateCcw,
  Download,
  CheckCircle,
  Cpu,
  BarChart2,
  ChevronDown,
  ChevronUp,
  Scale,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { BackendAnalyzeResponse } from '../../types';
import { AIExplanationPanel } from '../AIExplanationPanel';

interface Stage3Props {
  data: BackendAnalyzeResponse | null;
  isLoading: boolean;
  error: string | null;
  explanation: string | null;
  isExplanationLoading: boolean;
  explanationError: string | null;
  onAnalyze: () => void;
  onRestart: () => void;
  onOpenGlossary: () => void;
  onRetryExplanation: () => void;
}

export const Stage3ResultsAnalysis: React.FC<Stage3Props> = ({
  data,
  isLoading,
  error,
  explanation,
  isExplanationLoading,
  explanationError,
  onAnalyze,
  onRestart,
  onRetryExplanation
}) => {
  const [detailsCollapsed, setDetailsCollapsed] = useState<boolean>(false);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState<boolean>(false);

  // Status badge styling helper
  const getStatusBadgeStyle = (label: string) => {
    const lower = (label || '').toLowerCase();
    if (lower.includes('low')) {
      return 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30';
    }
    if (lower.includes('med')) {
      return 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30';
    }
    return 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30';
  };

  const getStatusDotColor = (label: string) => {
    const lower = (label || '').toLowerCase();
    if (lower.includes('low')) return 'bg-[#10B981]';
    if (lower.includes('med')) return 'bg-[#F59E0B]';
    return 'bg-[#EF4444]';
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="p-12 sm:p-16 rounded-2xl bg-[#12152A] border border-white/[0.08] text-center space-y-6 shadow-2xl">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-[#8B7CFF]/20" />
            <div className="absolute inset-0 rounded-full border-4 border-[#8B7CFF] border-t-transparent animate-spin" />
            <Cpu className="absolute inset-0 m-auto w-6 h-6 text-[#8B7CFF] animate-pulse" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#F3F4FA] tracking-tight">
              Connecting to the quantum backend... the first request can take up to a minute
            </h2>
            <p className="text-xs sm:text-sm text-[#A4A8C0] font-mono">
              Calling remote quantum simulator API...
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171B34] border border-white/[0.08] text-xs font-mono text-[#A4A8C0]">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#8B7CFF]" />
            <span>Simulating quantum circuit on remote backend...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#12152A] border border-[#EF4444]/30 text-center space-y-5 shadow-2xl">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] flex items-center justify-center">
            <AlertCircle className="w-7 h-7" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-[#F3F4FA] tracking-tight">
              Backend is not reachable
            </h2>
            <p className="text-xs sm:text-sm text-[#A4A8C0]">
              The quantum backend could not be reached. Please check your connection or retry.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onAnalyze}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B7CFF] to-[#F472B6] text-white text-xs font-bold transition-all duration-150 shadow-[0_4px_20px_rgba(139,124,255,0.25)] flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Analysis</span>
            </button>
            <button
              onClick={onRestart}
              className="px-5 py-3 rounded-xl bg-[#171B34] hover:bg-[#1D2140] text-[#F3F4FA] text-xs font-semibold border border-white/[0.08] transition-colors cursor-pointer"
            >
              Back to Circuit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty State
  if (!data) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="p-12 rounded-2xl bg-[#12152A] border border-white/[0.08] text-center space-y-5 shadow-xl">
          <Cpu className="w-12 h-12 text-[#8B7CFF] mx-auto opacity-70" />
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-[#F3F4FA]">No Analysis Data Yet</h2>
            <p className="text-xs text-[#A4A8C0] max-w-md mx-auto">
              Click &quot;Analyze&quot; from the Circuit Pre-flight page to simulate your circuit on the quantum backend.
            </p>
          </div>
          <button
            onClick={onAnalyze}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B7CFF] to-[#F472B6] text-white text-xs font-bold transition-all shadow-[0_4px_20px_rgba(139,124,255,0.25)] inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Analyze Circuit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Data Loaded State
  const shots = data.shots;

  // Combine unique bitstring keys from both ideal and noisy counts
  const allStates = Array.from(
    new Set([...Object.keys(data.ideal_counts || {}), ...Object.keys(data.noisy_counts || {})])
  ).sort();

  const handleDownloadReport = (format: 'json' | 'csv' | 'txt') => {
    setDownloadMenuOpen(false);
    let content = '';
    let mimeType = 'text/plain';
    const filename = `quantumpilot_${data.id}_${shots}shots.${format}`;

    if (format === 'json') {
      content = JSON.stringify({ ...data, ai_explanation: explanation || null }, null, 2);
      mimeType = 'application/json';
    } else if (format === 'csv') {
      content = `Quantum State,Classical Bitstring,Noisy Counts,Noisy Probability,Ideal Counts,Ideal Probability\n` +
        allStates.map((st) => {
          const noisy = data.noisy_counts[st] || 0;
          const ideal = data.ideal_counts[st] || 0;
          const noisyP = ((noisy / shots) * 100).toFixed(1);
          const idealP = ((ideal / shots) * 100).toFixed(1);
          return `|${st}>,${st},${noisy},${noisyP}%,${ideal},${idealP}%`;
        }).join('\n') + `\n\nTotal Shots,${shots},100.0%,${shots},100.0%\nNoise Gap,${data.gap_percent}%,${data.label}\n`;
      mimeType = 'text/csv';
    } else {
      content = `QUANTUMPILOT SIMULATED EXECUTION REPORT\n======================================\nTitle: ${data.title}\nDescription: ${data.description}\nShots: ${shots} (Simulated)\nQubits: ${data.qubits}\nNoise Gap: ${data.gap_percent}% (${data.label})\nNoise Source: ${data.noise_source}\n\nAI EXPLANATION (SIMULATED):\n${explanation || 'N/A'}\n\nCIRCUIT DIAGRAM:\n${data.diagram_text}\n\nIDEAL COUNTS: ${JSON.stringify(data.ideal_counts)}\nNOISY COUNTS: ${JSON.stringify(data.noisy_counts)}\n`;
      mimeType = 'text/plain';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumb & Navigation History */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#A4A8C0]">
        <div className="flex items-center gap-2">
          <span>Experiment</span>
          <span>/</span>
          <span>{data.title}</span>
          <span>/</span>
          <span className="text-[#8B7CFF]">Execution Results (Simulated)</span>
        </div>

        <div className="px-3 py-1 rounded-full bg-[#12152A] border border-white/[0.08] text-[11px] text-[#A4A8C0] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          <span>Simulated Results</span>
        </div>
      </div>

      {/* Hero Title & Backend Card: Fill title and description from response */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F4FA] mb-2">
            {data.title}
          </h1>
          <p className="text-sm text-[#A4A8C0] max-w-2xl leading-relaxed">
            {data.description}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#12152A] border border-white/[0.08] text-xs font-mono shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-[#8B7CFF]/15 border border-[#8B7CFF]/30 flex items-center justify-center text-[#8B7CFF]">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#F3F4FA] font-bold">{data.id}</span>
              <span className="text-[#10B981] font-semibold text-[10px]">Simulated QPU</span>
            </div>
            <div className="text-[#A4A8C0] text-[11px]">
              {shots.toLocaleString()} Shots (Simulated)
            </div>
          </div>
        </div>
      </div>

      {/* 3 Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Noise Gap card - gap_percent as percentage and label as badge */}
        <div className="p-5 rounded-2xl bg-[#12152A] border border-white/[0.08] shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono tracking-wider text-[#6E7391] uppercase font-semibold">
                SIMULATED NOISE GAP
              </span>
              {/* Badge: label from response with semantic color */}
              <span className={`flex items-center gap-1.5 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full border ${getStatusBadgeStyle(data.label)}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(data.label)}`} />
                <span>{data.label}</span>
              </span>
            </div>

            {/* Value: gap_percent as a percentage */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-[#F3F4FA]">
                {data.gap_percent}%
              </span>
              <span className="text-xs font-mono text-[#A4A8C0]">Simulated Gap</span>
            </div>

            {/* Progress bar representing gap */}
            <div className="w-full h-1.5 rounded-full bg-[#171B34] overflow-hidden mb-3">
              <div
                className="h-full bg-[#8B7CFF] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(10, 100 - data.gap_percent * 5))}%` }}
              />
            </div>
          </div>

          <p className="text-xs text-[#A4A8C0] leading-relaxed">
            Deviation between ideal and simulated noisy quantum execution. Noise rating: <strong className="text-white">{data.label}</strong>.
          </p>
        </div>

        {/* Card 2: Circuit diagram in monospace font keeping line breaks */}
        <div className="p-5 rounded-2xl bg-[#12152A] border border-white/[0.08] shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono tracking-wider text-[#6E7391] uppercase font-semibold">
                CIRCUIT ARCHITECTURE
              </span>
              <span className="text-[11px] font-mono text-[#A4A8C0]">
                {data.qubits} Qubit{data.qubits > 1 ? 's' : ''} (Simulated)
              </span>
            </div>

            {/* Circuit diagram text with line breaks preserved */}
            <div className="p-3 rounded-xl bg-[#0B0D17] border border-white/[0.06] my-2 overflow-x-auto">
              <pre className="font-mono text-xs sm:text-[13px] text-[#7C9CFF] whitespace-pre leading-snug select-all">
                {data.diagram_text}
              </pre>
            </div>
          </div>
        </div>

        {/* Card 3: Observed Split / Summary from response */}
        <div className="p-5 rounded-2xl bg-[#12152A] border border-white/[0.08] shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono tracking-wider text-[#6E7391] uppercase font-semibold">
                SIMULATED SHOTS SUMMARY
              </span>
              <span className="text-[11px] font-mono text-[#10B981] flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Simulated</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mb-3">
              {allStates.slice(0, 4).map((st) => {
                const count = data.noisy_counts[st] || 0;
                const pct = ((count / shots) * 100).toFixed(1);
                return (
                  <div key={st} className="p-2.5 rounded-xl bg-[#171B34] border border-white/[0.06] font-mono">
                    <div className="text-xs text-[#8B7CFF] font-bold">|{st}⟩</div>
                    <div className="text-base font-bold text-[#F3F4FA]">{count}</div>
                    <div className="text-[10px] text-[#A4A8C0]">{pct}%</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-[#10B981]">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{shots.toLocaleString()} / {shots.toLocaleString()} valid simulated readouts</span>
          </div>
        </div>
      </div>

      {/* Comparative State Distribution Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-lg font-semibold text-[#F3F4FA]">
              <BarChart2 className="w-5 h-5 text-[#8B7CFF]" />
              <span>Comparative State Distribution</span>
            </div>
            <p className="text-xs text-[#A4A8C0]">
              Identical Y-axis scale calibrated from ideal mathematical simulation to simulated noisy QPU output.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#7C9CFF]" />
              <span className="text-[#A4A8C0]">Ideal Simulator</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#F472B6]" />
              <span className="text-[#A4A8C0]">Noisy Simulator</span>
            </div>
          </div>
        </div>

        {/* 2 Comparison Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Panel 1: Ideal Simulator (ideal_counts) */}
          <div className="p-6 rounded-2xl bg-[#12152A] border border-white/[0.08] shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-base text-[#F3F4FA]">Ideal Simulator</h3>
                  <span className="text-xs font-mono text-[#A4A8C0] px-2 py-0.5 rounded-md bg-[#171B34] border border-white/[0.06]">
                    Ideal Run
                  </span>
                </div>
                <span className="text-base font-serif text-[#6E7391]">∑</span>
              </div>
              <p className="text-xs text-[#A4A8C0] mb-6">
                Simulated run with no noise (sampled)
              </p>

              {/* Chart Grid */}
              <div className="relative h-56 flex items-end justify-around pb-6 pt-4 px-8 border-b border-white/[0.08]">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] font-mono text-[#6E7391]">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>

                {/* Horizontal gridlines */}
                <div className="absolute left-8 right-0 top-0 h-[1px] bg-white/[0.04]" />
                <div className="absolute left-8 right-0 top-[25%] h-[1px] bg-white/[0.04]" />
                <div className="absolute left-8 right-0 top-[50%] h-[1px] bg-white/[0.08] border-t border-dashed border-white/[0.08]" />
                <div className="absolute left-8 right-0 top-[75%] h-[1px] bg-white/[0.04]" />

                {/* Bars from data.ideal_counts - Cool Indigo Blue (#7C9CFF) */}
                {allStates.map((st) => {
                  const count = data.ideal_counts[st] || 0;
                  const pct = ((count / shots) * 100).toFixed(1);
                  const heightPercent = Math.max(8, Math.min(100, (count / shots) * 100));

                  return (
                    <div key={st} className="flex flex-col items-center gap-2 z-10 min-w-16">
                      <span className="text-xs font-mono font-bold text-[#F3F4FA]">{pct}%</span>
                      <div
                        className="w-14 sm:w-16 bg-[#7C9CFF] rounded-t-xl transition-all duration-150 hover:brightness-110 shadow-sm"
                        style={{ height: `${heightPercent * 1.8}px` }}
                      />
                      <div className="text-center mt-1">
                        <div className="text-sm font-mono font-bold text-[#F3F4FA]">|{st}⟩</div>
                        <div className="text-[11px] font-mono text-[#6E7391]">{count} counts</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-2 flex items-center gap-2 text-xs font-mono text-[#7C9CFF]">
              <Scale className="w-3.5 h-3.5" />
              <span>Ideal simulator run (no noise, sampled)</span>
            </div>
          </div>

          {/* Panel 2: Noisy Simulator (noisy_counts) + noise_source */}
          <div className="p-6 rounded-2xl bg-[#12152A] border border-white/[0.08] shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-base text-[#F3F4FA]">Noisy Simulator</h3>
                  <span className="text-xs font-mono text-[#F472B6] px-2 py-0.5 rounded-md bg-[#171B34] border border-white/[0.06]">
                    Simulated Noise Model
                  </span>
                </div>
                <Cpu className="w-4 h-4 text-[#F472B6]" />
              </div>
              <p className="text-xs text-[#A4A8C0] mb-6">
                Simulated noisy quantum measurements with depolarization / thermal noise
              </p>

              {/* Chart Grid */}
              <div className="relative h-56 flex items-end justify-around pb-6 pt-4 px-8 border-b border-white/[0.08]">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] font-mono text-[#6E7391]">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>

                {/* Horizontal gridlines */}
                <div className="absolute left-8 right-0 top-0 h-[1px] bg-white/[0.04]" />
                <div className="absolute left-8 right-0 top-[25%] h-[1px] bg-white/[0.04]" />
                <div className="absolute left-8 right-0 top-[50%] h-[1px] bg-white/[0.08] border-t border-dashed border-white/[0.08]" />
                <div className="absolute left-8 right-0 top-[75%] h-[1px] bg-white/[0.04]" />

                {/* Bars from data.noisy_counts - Pink (#F472B6) */}
                {allStates.map((st) => {
                  const count = data.noisy_counts[st] || 0;
                  const pct = ((count / shots) * 100).toFixed(1);
                  const heightPercent = Math.max(8, Math.min(100, (count / shots) * 100));

                  return (
                    <div key={st} className="flex flex-col items-center gap-2 z-10 min-w-16">
                      <span className="text-xs font-mono font-bold text-[#F3F4FA]">{pct}%</span>
                      <div
                        className="w-14 sm:w-16 bg-[#F472B6] rounded-t-xl transition-all duration-150 hover:brightness-110 shadow-sm"
                        style={{ height: `${heightPercent * 1.8}px` }}
                      />
                      <div className="text-center mt-1">
                        <div className="text-sm font-mono font-bold text-[#F3F4FA]">|{st}⟩</div>
                        <div className="text-[11px] font-mono text-[#6E7391]">{count} counts</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Small text under the noisy chart: noise_source */}
            <div className="mt-4 pt-2 border-t border-white/[0.08] flex flex-wrap items-center justify-between text-xs font-mono text-[#A4A8C0] gap-2">
              <div>
                Noise source: <span className="text-[#F472B6] font-semibold">{data.noise_source}</span>
              </div>
              <div className="text-[11px] text-[#6E7391]">
                (Simulated Noise)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Explanation Panel (Simulated Results) */}
      <AIExplanationPanel
        explanation={explanation}
        isLoading={isExplanationLoading}
        error={explanationError}
        onRetry={onRetryExplanation}
      />

      {/* Raw Execution Counts & Bitstrings Table */}
      <div className="rounded-2xl bg-[#12152A] border border-white/[0.08] shadow-xl overflow-hidden font-mono">
        <div
          onClick={() => setDetailsCollapsed(!detailsCollapsed)}
          className="px-5 py-4 bg-[#171B34] border-b border-white/[0.08] flex items-center justify-between text-xs cursor-pointer select-none"
        >
          <div className="flex items-center gap-2 font-semibold text-[#F3F4FA] text-sm font-sans">
            <span>☰</span>
            <span>Raw Execution Counts &amp; Bitstrings (Simulated)</span>
          </div>

          <div className="flex items-center gap-1 text-[#A4A8C0] hover:text-[#F3F4FA] transition-colors">
            <span>{detailsCollapsed ? 'Expand details' : 'Collapse details'}</span>
            {detailsCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </div>
        </div>

        {!detailsCollapsed && (
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-white/[0.08] text-[11px] text-[#6E7391] uppercase">
                  <th className="py-2.5 px-4 font-semibold">QUANTUM STATE |Ψ⟩</th>
                  <th className="py-2.5 px-4 font-semibold">CLASSICAL BITSTRING</th>
                  <th className="py-2.5 px-4 font-semibold">MEASURED SHOTS (NOISY)</th>
                  <th className="py-2.5 px-4 font-semibold">NOISY PROBABILITY</th>
                  <th className="py-2.5 px-4 font-semibold text-right">IDEAL RUN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-[#F3F4FA]">
                {allStates.map((st) => {
                  const noisy = data.noisy_counts[st] || 0;
                  const ideal = data.ideal_counts[st] || 0;
                  const noisyP = ((noisy / shots) * 100).toFixed(1);
                  const idealP = ((ideal / shots) * 100).toFixed(1);

                  return (
                    <tr key={st} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-bold text-[#8B7CFF]">|{st}⟩</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-[#171B34] text-[#F3F4FA] border border-white/[0.06]">{st}</span>
                      </td>
                      <td className="py-3 px-4 text-[#F3F4FA] font-medium">
                        {noisy} / {shots.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-[#F3F4FA] min-w-12">{noisyP}%</span>
                          <div className="w-24 h-1.5 rounded-full bg-[#171B34] overflow-hidden">
                            <div
                              className="h-full bg-[#F472B6]"
                              style={{ width: `${Math.min(100, Math.max(4, Number(noisyP)))}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right text-[#A4A8C0]">{idealP}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="mt-3 pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between text-[11px] text-[#6E7391]">
              <span>
                Total Valid Readouts: <strong className="text-[#F3F4FA]">{(Object.values(data.noisy_counts || {}).reduce((a, b) => a + b, 0) || shots).toLocaleString()} / {shots.toLocaleString()} (100.0%)</strong>
              </span>
              <span>·</span>
              <span className="text-[#10B981]">Simulated Run</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
        <div className="flex items-center gap-3 w-full sm:w-auto relative">
          <button
            onClick={onAnalyze}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-[#12152A] hover:bg-[#171B34] text-[#F3F4FA] text-xs font-semibold border border-white/[0.08] hover:border-white/20 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#A4A8C0]" />
            <span>Analyze Again</span>
          </button>

          {/* Download Dropdown */}
          <div className="relative flex-1 sm:flex-initial">
            <button
              onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
              className="w-full px-5 py-3 rounded-xl bg-[#12152A] hover:bg-[#171B34] text-[#F3F4FA] text-xs font-semibold border border-white/[0.08] hover:border-[#8B7CFF]/40 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#8B7CFF]" />
              <span>Download Report</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#A4A8C0]" />
            </button>

            {downloadMenuOpen && (
              <div className="absolute left-0 bottom-full mb-2 w-48 rounded-xl bg-[#12152A] border border-white/[0.12] shadow-2xl p-1 z-50 text-xs font-mono">
                <button
                  onClick={() => handleDownloadReport('json')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#171B34] text-[#F3F4FA] flex items-center justify-between transition-colors"
                >
                  <span>JSON Payload</span>
                  <span className="text-[#8B7CFF]">.json</span>
                </button>
                <button
                  onClick={() => handleDownloadReport('csv')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#171B34] text-[#F3F4FA] flex items-center justify-between transition-colors"
                >
                  <span>CSV Dataset</span>
                  <span className="text-[#10B981]">.csv</span>
                </button>
                <button
                  onClick={() => handleDownloadReport('txt')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#171B34] text-[#F3F4FA] flex items-center justify-between transition-colors"
                >
                  <span>Text Summary</span>
                  <span className="text-[#F472B6]">.txt</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-[#8B7CFF] to-[#F472B6] hover:from-[#9D90FF] hover:to-[#F687C2] text-white text-xs sm:text-sm font-bold tracking-wide transition-all duration-150 shadow-[0_4px_20px_rgba(139,124,255,0.25)] flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>Try Another Circuit</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
