export type StageId = 1 | 2 | 3;

export interface BackendAnalyzeResponse {
  id: string; // "coin_flip" | "bell_state"
  title: string;
  description: string;
  qubits: number;
  shots: number;
  noise_source: string;
  diagram_text: string;
  ideal_counts: Record<string, number>;
  noisy_counts: Record<string, number>;
  gap_percent: number;
  label: string;
}

export interface CircuitPreset {
  id: string;
  exampleKey: 'coin_flip' | 'bell_state';
  name: string;
  qubits: number;
  depth: number;
  gates: number;
  measurements: number;
  code: string;
}

export interface BackendCandidate {
  id: string;
  name: string;
  version?: string;
  qubits: number;
  processor: string;
  location?: string;
  description: string;
  statusText: string;
  queueWait: string;
  queueCount: number;
  queueTimeApprox: string;
  error1Q: string;
  readoutFidelity: string;
  coherenceT1?: string;
  coherenceT2?: string;
  trafficStatus: 'optimal' | 'normal' | 'delayed' | 'instant';
  targetQubit?: string;
  pulseChannel?: string;
  execTime?: string;
  isBestMatch?: boolean;
  matchScore?: string;
}

