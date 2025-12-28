import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp } from 'lucide-react';
import type { SolutionMetrics } from '../types';

interface MetricsStatusProps {
  metrics: SolutionMetrics;
}

export function MetricsStatus({ metrics }: MetricsStatusProps) {
  const getStatusColor = () => {
    switch (metrics.status) {
      case 'complete':
        return 'text-green-600 dark:text-green-400';
      case 'running':
        return 'text-blue-600 dark:text-blue-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = () => {
    switch (metrics.status) {
      case 'complete':
        return '✓';
      case 'running':
        return '⏳';
      case 'error':
        return '✗';
      default:
        return '○';
    }
  };

  const getStatusText = () => {
    switch (metrics.status) {
      case 'complete':
        return 'Complete';
      case 'running':
        return 'Running';
      case 'error':
        return 'Error';
      default:
        return 'Idle';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <TrendingUp className="size-5 text-emerald-600 dark:text-emerald-400" />
          Metrics & Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <div className="text-sm text-muted-foreground mb-1">
            Boxes Used
          </div>
          <div className="text-2xl font-semibold text-foreground">{metrics.boxesUsed}</div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground mb-1">
            Iteration
          </div>
          <div className="text-2xl font-semibold text-foreground">{metrics.iteration}</div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground mb-1">
            Objective
          </div>
          <div className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{metrics.objective}</div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground mb-1">
            Runtime
          </div>
          <div className="text-2xl font-semibold text-foreground">
            {metrics.runtime.toFixed(2)} <span className="text-base text-muted-foreground">s</span>
          </div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground mb-1">
            Efficiency
          </div>
          <div className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
            {metrics.efficiency.toFixed(1)}%
          </div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground mb-1">
            Status
          </div>
          <div className={`text-2xl font-semibold ${getStatusColor()}`}>
            {getStatusIcon()} {getStatusText()}
          </div>
        </div>
        </div>
      </CardContent>
    </Card>
  );
}
