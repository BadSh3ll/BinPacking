import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Settings, Play, RotateCcw } from 'lucide-react';
import type { AlgorithmParams, AlgorithmType, GreedyStrategy, LocalSearchNeighborhood } from '../types';

interface AlgorithmControlProps {
  params: AlgorithmParams;
  onParamsChange: (params: AlgorithmParams) => void;
  onRun: () => void;
  onReset: () => void;
  disabled?: boolean;
  running?: boolean;
}

export function AlgorithmControl({
  params,
  onParamsChange,
  onRun,
  onReset,
  disabled = false,
  running = false,
}: AlgorithmControlProps) {
  const handleAlgorithmChange = (type: AlgorithmType) => {
    onParamsChange({
      ...params,
      type,
      strategy: type === 'greedy' ? 'largest-first' : undefined,
      neighborhood: type === 'localSearch' ? 'geometry' : undefined,
    });
  };

  const greedyStrategies: { value: GreedyStrategy; label: string }[] = [
    { value: 'largest-first', label: 'Largest-First' },
    { value: 'best-fit', label: 'Best-Fit' },
    { value: 'first-fit', label: 'First-Fit' },
  ];

  const localSearchNeighborhoods: { value: LocalSearchNeighborhood; label: string }[] = [
    { value: 'geometry', label: 'Geometry-based' },
    { value: 'permutation', label: 'Permutation-based' },
    { value: 'overlap', label: 'Overlap-based' },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Settings className="size-5 text-purple-600 dark:text-purple-400" />
          Algorithm Control
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Algorithm</Label>
          <RadioGroup
            value={params.type}
            onValueChange={(value) => handleAlgorithmChange(value as AlgorithmType)}
            disabled={disabled || running}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="greedy" id="greedy" />
              <Label htmlFor="greedy" className="font-normal cursor-pointer">
                Greedy
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="localSearch" id="localSearch" />
              <Label htmlFor="localSearch" className="font-normal cursor-pointer">
                Local Search
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="strategy">Strategy / Neighborhood</Label>
          {params.type === 'greedy' ? (
            <Select
              value={params.strategy}
              onValueChange={(value) =>
                onParamsChange({ ...params, strategy: value as GreedyStrategy })
              }
              disabled={disabled || running}
            >
              <SelectTrigger id="strategy">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {greedyStrategies.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Select
              value={params.neighborhood}
              onValueChange={(value) =>
                onParamsChange({
                  ...params,
                  neighborhood: value as LocalSearchNeighborhood,
                })
              }
              disabled={disabled || running}
            >
              <SelectTrigger id="strategy">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {localSearchNeighborhoods.map((n) => (
                  <SelectItem key={n.value} value={n.value}>
                    {n.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {params.type === 'localSearch' && (
          <div className="space-y-2">
            <Label htmlFor="maxIterations">Max Iterations</Label>
            <Input
              id="maxIterations"
              type="number"
              value={params.maxIterations || 1000}
              onChange={(e) =>
                onParamsChange({
                  ...params,
                  maxIterations: parseInt(e.target.value) || 1000,
                })
              }
              disabled={disabled || running}
              min={1}
            />
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={onRun} disabled={disabled || running} className="flex-1">
            <Play className="size-4" />
            <span>{running ? 'Running...' : 'Run Algorithm'}</span>
          </Button>
          <Button
            onClick={onReset}
            disabled={disabled || running}
            variant="outline"
            className="flex-1"
          >
            <RotateCcw className="size-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
