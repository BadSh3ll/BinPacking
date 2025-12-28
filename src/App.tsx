import { useState } from 'react';
import './App.css';
import { InstanceParameters } from './components/InstanceParameters';
import { AlgorithmControl } from './components/AlgorithmControl';
import { Visualization } from './components/Visualization';
import { MetricsStatus } from './components/MetricsStatus';
import type {
  AlgorithmParams,
  SolutionMetrics,
} from './types';
import { InstanceGenerator, type InstanceParams } from './types/instance';
import type { Box } from './types/box';

function App() {
  const [instanceParams, setInstanceParams] = useState<InstanceParams>({
    numRectangles: 200,
    minWidth: 5,
    maxWidth: 40,
    minHeight: 5,
    maxHeight: 30,
    boxSize: 100,
  });

  const [algorithmParams, setAlgorithmParams] = useState<AlgorithmParams>({
    type: 'greedy',
    strategy: 'largest-first',
    maxIterations: 1000,
  });

  const [boxes, setBoxes] = useState<Box[]>([]);
  
  const [metrics, setMetrics] = useState<SolutionMetrics>({
    boxesUsed: 0,
    iteration: 0,
    objective: 0,
    runtime: 0,
    efficiency: 0,
    status: 'idle',
  });

  const [isRunning, setIsRunning] = useState(false);

  const handleGenerateInstance = () => {
    // TODO: Implement instance generation
    console.log('Generating instance with params:', instanceParams);
    const instance = new InstanceGenerator().generate(instanceParams);
    console.log('Generated instance:', instance);
    // Reset solution and metrics
    setBoxes([]);
    setMetrics({
      boxesUsed: 0,
      iteration: 0,
      objective: 0,
      runtime: 0,
      efficiency: 0,
      status: 'idle',
    });
  };

  const handleRunAlgorithm = () => {
    // TODO: Implement algorithm execution
    console.log('Running algorithm with params:', algorithmParams);
    setIsRunning(true);
    setMetrics({ ...metrics, status: 'running' });

    // Simulated algorithm run
    setTimeout(() => {
      setIsRunning(false);
      setMetrics({
        boxesUsed: 12,
        iteration: 53,
        objective: 12,
        runtime: 1.24,
        efficiency: 85.3,
        status: 'complete',
      });
    }, 2000);
  };

  const handleResetSolution = () => {
    setBoxes([]);
    setMetrics({
      boxesUsed: 0,
      iteration: 0,
      objective: 0,
      runtime: 0,
      efficiency: 0,
      status: 'idle',
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight">
            2D Bin Packing Solver
          </h1>
          <p className="text-muted-foreground text-lg">
            Greedy and Local Search Algorithms
          </p>
        </header>

        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InstanceParameters
              params={instanceParams}
              onParamsChange={setInstanceParams}
              onGenerate={handleGenerateInstance}
              disabled={isRunning}
            />

            <AlgorithmControl
              params={algorithmParams}
              onParamsChange={setAlgorithmParams}
              onRun={handleRunAlgorithm}
              onReset={handleResetSolution}
              disabled={boxes.length === 0}
              running={isRunning}
            />
          </div>

          <Visualization boxes={boxes} />

          <MetricsStatus metrics={metrics} />
        </div>
      </div>
    </div>
  );
}

export default App;
