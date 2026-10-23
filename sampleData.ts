import { CircuitPreset, BackendCandidate } from '../types';

export const SAMPLE_DATA_NOTICE = {
  isSimulated: true,
  label: "Simulated Backend",
  tooltip: "Connected to Quantum Simulator API. All quantum results and noise profiles are simulated.",
  badgeText: "Quantum Simulator (Backend Connected)"
};

export const PRESET_CIRCUITS: Record<string, CircuitPreset> = {
  coinFlip: {
    id: 'coinFlip',
    exampleKey: 'coin_flip',
    name: 'Quantum Coin Flip (1 Qubit)',
    qubits: 1,
    depth: 2,
    gates: 1,
    measurements: 1,
    code: `from qiskit import QuantumCircuit
# Create a Quantum Circuit with 1 qubit and 1 classical bit
qc = QuantumCircuit(1, 1)

# Apply Hadamard gate to put qubit 0 into superposition
qc.h(0)

# Measure qubit 0 into classical register 0
qc.measure(0, 0)

# Ready for simulation run
# --- EOF ---`
  },
  bellState: {
    id: 'bellState',
    exampleKey: 'bell_state',
    name: 'Bell State (2 Qubits)',
    qubits: 2,
    depth: 3,
    gates: 2,
    measurements: 2,
    code: `from qiskit import QuantumCircuit
# Create a Quantum Circuit with 2 qubits and 2 classical bits
qc = QuantumCircuit(2, 2)

# Create entangled Bell state (|00> + |11>) / sqrt(2)
qc.h(0)
qc.cx(0, 1)

# Measure qubits into classical registers
qc.measure([0, 1], [0, 1])

# Ready for simulation run
# --- EOF ---`
  }
};

export const BEST_RECOMMENDED_BACKEND: BackendCandidate = {
  id: 'ibm_brisbane',
  name: 'ibm_brisbane (Simulated)',
  version: 'QP-v127',
  qubits: 127,
  processor: 'Eagle r3 Architecture (Simulated)',
  description: 'Simulated heavy-hex lattice noise model with single-qubit depolarization.',
  statusText: 'Online (Simulated)',
  queueWait: '< 2s',
  queueCount: 0,
  queueTimeApprox: 'Simulated pipeline ready',
  error1Q: '0.014%',
  readoutFidelity: '98.92%',
  coherenceT1: '284 µs',
  coherenceT2: '198 µs',
  trafficStatus: 'optimal',
  targetQubit: 'Q[41] (Simulated Channel)',
  execTime: 'Simulated Instant',
  isBestMatch: true,
  matchScore: '99.4%'
};

export const ALTERNATIVE_BACKENDS: BackendCandidate[] = [
  {
    id: 'ibm_kyoto',
    name: 'ibm_kyoto (Simulated)',
    qubits: 127,
    processor: 'Eagle r3 simulator',
    location: 'Simulated node',
    description: 'Eagle r3 simulated backend with thermal relaxation noise.',
    statusText: 'Online (Simulated)',
    queueWait: 'Instant',
    queueCount: 0,
    queueTimeApprox: 'Instant response',
    error1Q: '0.018%',
    readoutFidelity: '98.40%',
    trafficStatus: 'normal'
  },
  {
    id: 'ibm_sherbrooke',
    name: 'ibm_sherbrooke (Simulated)',
    qubits: 127,
    processor: 'Eagle r3 simulator',
    location: 'Simulated node',
    description: 'Simulated backend model with depolarization noise.',
    statusText: 'Online (Simulated)',
    queueWait: 'Instant',
    queueCount: 0,
    queueTimeApprox: 'Instant response',
    error1Q: '0.016%',
    readoutFidelity: '98.60%',
    trafficStatus: 'normal'
  },
  {
    id: 'ibmq_qasm_simulator',
    name: 'ibmq_qasm_simulator',
    qubits: 32,
    processor: 'Cloud HPC Aer Matrix Vector engine',
    description: 'Cloud HPC Aer Matrix Vector engine with synthetic noise modeling.',
    statusText: 'Online (Simulated)',
    queueWait: 'Instant < 2s',
    queueCount: 0,
    queueTimeApprox: '0 jobs (Instant < 2s)',
    error1Q: '0.00% (Noise-free)',
    readoutFidelity: '100.0% (Ideal)',
    trafficStatus: 'instant'
  }
];

