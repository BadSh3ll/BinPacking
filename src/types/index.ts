export type AlgorithmType = 'greedy' | 'localSearch';

export type GreedyStrategy = 'largest-first' | 'best-fit' | 'first-fit';

export type LocalSearchNeighborhood = 'geometry' | 'permutation' | 'overlap';

export interface AlgorithmParams {
  type: AlgorithmType;
  strategy?: GreedyStrategy;
  neighborhood?: LocalSearchNeighborhood;
  maxIterations?: number;
}

export interface SolutionMetrics {
  boxesUsed: number;
  iteration: number;
  objective: number;
  runtime: number;
  efficiency: number;
  status: 'idle' | 'running' | 'complete' | 'error';
}
