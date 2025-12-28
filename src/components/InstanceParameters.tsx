import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Package, RefreshCw } from 'lucide-react';
import type { InstanceParams } from '../types/instance';

interface InstanceParametersProps {
  params: InstanceParams;
  onParamsChange: (params: InstanceParams) => void;
  onGenerate: () => void;
  disabled?: boolean;
}

export function InstanceParameters({
  params,
  onParamsChange,
  onGenerate,
  disabled = false,
}: InstanceParametersProps) {
  const handleChange = (field: keyof InstanceParams, value: number) => {
    onParamsChange({ ...params, [field]: value });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Package className="size-5 text-blue-600 dark:text-blue-400" />
          Instance Parameters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="numRectangles">Number of Rectangles</Label>
          <Input
            id="numRectangles"
            type="number"
            value={params.numRectangles}
            onChange={(e) => handleChange('numRectangles', parseInt(e.target.value) || 0)}
            disabled={disabled}
            min={1}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="minWidth">Min Width</Label>
            <Input
              id="minWidth"
              type="number"
              value={params.minWidth}
              onChange={(e) => handleChange('minWidth', parseInt(e.target.value) || 0)}
              disabled={disabled}
              min={1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxWidth">Max Width</Label>
            <Input
              id="maxWidth"
              type="number"
              value={params.maxWidth}
              onChange={(e) => handleChange('maxWidth', parseInt(e.target.value) || 0)}
              disabled={disabled}
              min={params.minWidth}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="minHeight">Min Height</Label>
            <Input
              id="minHeight"
              type="number"
              value={params.minHeight}
              onChange={(e) => handleChange('minHeight', parseInt(e.target.value) || 0)}
              disabled={disabled}
              min={1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxHeight">Max Height</Label>
            <Input
              id="maxHeight"
              type="number"
              value={params.maxHeight}
              onChange={(e) => handleChange('maxHeight', parseInt(e.target.value) || 0)}
              disabled={disabled}
              min={params.minHeight}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="boxSize">Box Size (L)</Label>
          <Input
            id="boxSize"
            type="number"
            value={params.boxSize}
            onChange={(e) => handleChange('boxSize', parseInt(e.target.value) || 0)}
            disabled={disabled}
            min={1}
          />
        </div>

        <Button
          onClick={onGenerate}
          disabled={disabled}
          className="w-full"
        >
          <RefreshCw className="size-4" />
          Generate New Instance
        </Button>
      </CardContent>
    </Card>
  );
}
