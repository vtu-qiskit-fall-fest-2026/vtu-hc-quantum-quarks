import React from 'react';
import { Sparkles, RotateCcw, AlertCircle, HelpCircle, ArrowRightCircle } from 'lucide-react';

interface AIExplanationPanelProps {
  explanation: string | null;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export const AIExplanationPanel: React.FC<AIExplanationPanelProps> = ({
  explanation,
  isLoading,
  error,
  onRetry,
}) => {
  // Parse explanation into 3 sections if possible
  const parseSections = (text: string) => {
    let whatHappened = '';
    let whyDiffers = '';
    let whatToTry = '';

    // Regex to split by section headers like **What happened**, **Why results differ**, **What to try next**
    const whatHappenedMatch = text.match(/\*{0,2}What happened\*{0,2}:?\s*([\s\S]*?)(?=\*{0,2}Why results differ\*{0,2}|\*{0,2}What to try next\*{0,2}|$)/i);
    const whyDiffersMatch = text.match(/\*{0,2}Why results differ\*{0,2}:?\s*([\s\S]*?)(?=\*{0,2}What to try next\*{0,2}|$)/i);
    const whatToTryMatch = text.match(/\*{0,2}What to try next\*{0,2}:?\s*([\s\S]*?)$/i);

    if (whatHappenedMatch && whatHappenedMatch[1]?.trim()) {
      whatHappened = whatHappenedMatch[1].trim();
    }
    if (whyDiffersMatch && whyDiffersMatch[1]?.trim()) {
      whyDiffers = whyDiffersMatch[1].trim();
    }
    if (whatToTryMatch && whatToTryMatch[1]?.trim()) {
      whatToTry = whatToTryMatch[1].trim();
    }

    // Fallback if parsing failed
    if (!whatHappened && !whyDiffers && !whatToTry) {
      return null;
    }

    return { whatHappened, whyDiffers, whatToTry };
  };

  const parsed = explanation ? parseSections(explanation) : null;

  // Format bullet points or lines
  const renderTextContent = (content: string) => {
    const lines = content.split('\n').filter((l) => l.trim().length > 0);
    return (
      <div className="space-y-2 text-xs sm:text-[13px] text-[#A4A8C0] leading-relaxed font-sans">
        {lines.map((line, idx) => {
          const isBullet = line.trim().startsWith('*') || line.trim().startsWith('-') || /^\d+\./.test(line.trim());
          const cleanLine = line.replace(/^[\*\-\d\.]\s*/, '').trim();
          
          if (isBullet) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B7CFF] mt-2 shrink-0" />
                <span className="text-[#F3F4FA]/90">{renderFormattedInline(cleanLine)}</span>
              </div>
            );
          }
          return <p key={idx} className="text-[#F3F4FA]/90">{renderFormattedInline(line)}</p>;
        })}
      </div>
    );
  };

  // Format inline bold tags like **term**
  const renderFormattedInline = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="rounded-2xl bg-[#12152A] border border-white/[0.08] border-l-2 border-l-[#F472B6] shadow-xl overflow-hidden relative">
      {/* Panel Header */}
      <div className="px-5 sm:px-6 py-4 bg-[#171B34] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#8B7CFF]/15 border border-[#8B7CFF]/30 flex items-center justify-center text-[#8B7CFF]">
            <Sparkles className="w-4 h-4 text-[#8B7CFF]" />
          </div>
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-[#F3F4FA] tracking-wide">
              AI Explanation (simulated results)
            </h3>
            <span className="text-[11px] text-[#A4A8C0] font-mono">
              Beginner-friendly breakdown of ideal vs simulated noisy run
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#8B7CFF]/10 border border-[#8B7CFF]/20 text-[11px] font-mono text-[#8B7CFF] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B7CFF]" />
            <span>Simulated Insights</span>
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 sm:p-6">
        {/* Loading state */}
        {isLoading && (
          <div className="py-8 px-4 flex flex-col items-center justify-center text-center space-y-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full border-2 border-[#8B7CFF]/20 border-t-[#8B7CFF] animate-spin" />
              <Sparkles className="w-4 h-4 text-[#F472B6] absolute inset-0 m-auto animate-pulse" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-white font-mono">
                Writing a beginner-friendly explanation...
              </p>
              <p className="text-xs text-[#A4A8C0]">
                Analyzing simulated shots, state frequencies, and noise gap
              </p>
            </div>
          </div>
        )}

        {/* Error state */}
        {!isLoading && error && (
          <div className="p-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  Failed to generate AI explanation
                </p>
                <p className="text-xs text-[#EF4444]">
                  {error}
                </p>
              </div>
            </div>

            <button
              onClick={onRetry}
              className="px-4 py-2 rounded-lg bg-[#12152A] hover:bg-[#171B34] text-[#F3F4FA] border border-white/[0.12] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Loaded explanation state */}
        {!isLoading && !error && explanation && (
          <div>
            {parsed ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Section 1: What happened */}
                <div className="p-4 rounded-xl bg-[#0B0D17] border border-white/[0.06] space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8B7CFF] uppercase tracking-wider">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>WHAT HAPPENED</span>
                  </div>
                  {renderTextContent(parsed.whatHappened)}
                </div>

                {/* Section 2: Why results differ */}
                <div className="p-4 rounded-xl bg-[#0B0D17] border border-white/[0.06] space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F472B6] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>WHY RESULTS DIFFER</span>
                  </div>
                  {renderTextContent(parsed.whyDiffers)}
                </div>

                {/* Section 3: What to try next */}
                <div className="p-4 rounded-xl bg-[#0B0D17] border border-white/[0.06] space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider">
                    <ArrowRightCircle className="w-3.5 h-3.5" />
                    <span>WHAT TO TRY NEXT</span>
                  </div>
                  {renderTextContent(parsed.whatToTry)}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#0B0D17] border border-white/[0.06]">
                {renderTextContent(explanation)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
