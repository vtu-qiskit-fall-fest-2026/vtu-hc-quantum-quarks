/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const API_URL = "https://quantum-pilot-api.onrender.com";

import React, { useState, useRef } from 'react';
import { StageId, BackendAnalyzeResponse } from './types';
import { Navbar } from './components/Navbar';
import { StageProgress } from './components/StageProgress';
import { SampleDataBanner } from './components/SampleDataBanner';
import { Stage1CircuitPreflight } from './components/stages/Stage1CircuitPreflight';
import { Stage2BackendRecommendation } from './components/stages/Stage2BackendRecommendation';
import { Stage3ResultsAnalysis } from './components/stages/Stage3ResultsAnalysis';
import { HelpGlossaryModal } from './components/HelpGlossaryModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentStage, setCurrentStage] = useState<StageId>(1);
  const shots = 1000;
  const [selectedExample, setSelectedExample] = useState<'coin_flip' | 'bell_state'>('coin_flip');
  const [apiResult, setApiResult] = useState<BackendAnalyzeResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isExplanationLoading, setIsExplanationLoading] = useState<boolean>(false);
  const [explanationError, setExplanationError] = useState<string | null>(null);

  const analyzeReqIdRef = useRef<number>(0);
  const explainReqIdRef = useRef<number>(0);

  const fetchExplanation = async (resultData: BackendAnalyzeResponse) => {
    const thisExplainId = ++explainReqIdRef.current;
    setIsExplanationLoading(true);
    setExplanationError(null);
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: resultData.title,
          description: resultData.description,
          shots: resultData.shots,
          noise_source: resultData.noise_source,
          ideal_counts: resultData.ideal_counts,
          noisy_counts: resultData.noisy_counts,
          gap_percent: resultData.gap_percent,
          label: resultData.label,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `HTTP ${response.status}`);
      }

      const json = await response.json();
      if (thisExplainId === explainReqIdRef.current) {
        setExplanation(json.explanation || '');
      }
    } catch (err: unknown) {
      if (thisExplainId === explainReqIdRef.current) {
        console.error('Explanation generation failed:', err);
        setExplanationError('Unable to generate beginner AI explanation. Please click Retry.');
      }
    } finally {
      if (thisExplainId === explainReqIdRef.current) {
        setIsExplanationLoading(false);
      }
    }
  };

  const handleAnalyze = async () => {
    const thisReqId = ++analyzeReqIdRef.current;
    setIsLoading(true);
    setErrorMessage(null);
    setExplanation(null);
    setExplanationError(null);
    setCurrentStage(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const response = await fetch(`${API_URL}/analyze/${selectedExample}?shots=1000`);
      if (!response.ok) {
        throw new Error(`Backend error: ${response.status} ${response.statusText}`);
      }
      const data: BackendAnalyzeResponse = await response.json();
      if (thisReqId === analyzeReqIdRef.current) {
        setApiResult(data);
        // Generate beginner AI explanation via Gemini API
        fetchExplanation(data);
      }
    } catch (err: unknown) {
      if (thisReqId === analyzeReqIdRef.current) {
        console.error('Backend connection failed:', err);
        setErrorMessage('The quantum backend is not reachable. Please verify the server connection.');
      }
    } finally {
      if (thisReqId === analyzeReqIdRef.current) {
        setIsLoading(false);
      }
    }
  };

  const handleRetryExplanation = () => {
    if (apiResult) {
      fetchExplanation(apiResult);
    }
  };

  const handleSelectStage = (stage: StageId) => {
    setCurrentStage(stage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromStage2 = () => {
    setCurrentStage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextFromStage2 = () => {
    if (!apiResult && !isLoading) {
      handleAnalyze();
    } else {
      setCurrentStage(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestartFromStage3 = () => {
    setCurrentStage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0D17] text-[#F3F4FA] flex flex-col relative selection:bg-[#8B7CFF]/30 selection:text-white">
      {/* Quiet ambient radial glows: deep violet top-left, faint pink bottom-right */}
      <div className="fixed top-0 left-0 w-[550px] h-[400px] bg-[#8B7CFF]/[0.06] rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[450px] bg-[#F472B6]/[0.03] rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Simulated backend banner */}
      <SampleDataBanner onOpenGlossary={() => setIsGlossaryOpen(true)} />

      {/* Main navigation header */}
      <Navbar
        currentStage={currentStage}
        onSelectStage={handleSelectStage}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Stage Journey Stepper Header */}
        <StageProgress
          currentStage={currentStage}
          onSelectStage={handleSelectStage}
          circuitTitle={apiResult?.title}
        />

        {/* Stage Content */}
        {currentStage === 1 && (
          <Stage1CircuitPreflight
            onAnalyze={handleAnalyze}
            onOpenGlossary={() => setIsGlossaryOpen(true)}
            selectedExample={selectedExample}
            setSelectedExample={setSelectedExample}
            isLoading={isLoading}
            apiResult={apiResult}
          />
        )}

        {currentStage === 2 && (
          <Stage2BackendRecommendation
            onBack={handleBackFromStage2}
            onNext={handleNextFromStage2}
            onOpenGlossary={() => setIsGlossaryOpen(true)}
            shots={shots}
          />
        )}

        {currentStage === 3 && (
          <Stage3ResultsAnalysis
            data={apiResult}
            isLoading={isLoading}
            error={errorMessage}
            explanation={explanation}
            isExplanationLoading={isExplanationLoading}
            explanationError={explanationError}
            onAnalyze={handleAnalyze}
            onRestart={handleRestartFromStage3}
            onOpenGlossary={() => setIsGlossaryOpen(true)}
            onRetryExplanation={handleRetryExplanation}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onOpenGlossary={() => setIsGlossaryOpen(true)} />

      {/* Educational Glossary Modal */}
      <HelpGlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </div>
  );
}
