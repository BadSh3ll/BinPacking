import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart3 } from 'lucide-react';
import type { Box } from '../types/box';

interface VisualizationProps {
  boxes: Box[];
  maxBoxesToShow?: number;
}

export function Visualization({ boxes, maxBoxesToShow = 10 }: VisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const displayBoxes = boxes.slice(0, maxBoxesToShow);
    const boxSize = 200; // Fixed size for each box visualization
    const margin = 10;
    const padding = 20;
    const boxesPerRow = Math.floor((canvas.width - padding * 2) / (boxSize + margin));

    displayBoxes.forEach((box, index) => {
      const row = Math.floor(index / boxesPerRow);
      const col = index % boxesPerRow;
      const x = padding + col * (boxSize + margin);
      const y = padding + row * (boxSize + margin);

      // Draw box outline
      ctx.strokeStyle = '#6b7280';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, boxSize, boxSize);

      // Draw box label
      ctx.fillStyle = '#374151';
      ctx.font = '12px sans-serif';
      
      // Draw rectangles inside the box
      box.rectangles.forEach((rect) => {
        const {x: xRect, y: yRect} = rect.position
        if (xRect !== null && yRect !== null) {
          const scale = boxSize / box.size;
          const rectX = x + xRect * scale;
          const rectY = y + yRect * scale;
          const rectW = rect.width * scale;
          const rectH = rect.height * scale;

          // Fill rectangle with color
          ctx.fillStyle = rect.rotated ? '#f97316' : '#3b82f6';
          ctx.fillRect(rectX, rectY, rectW, rectH);

          // Draw rectangle border
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 1;
          ctx.strokeRect(rectX, rectY, rectW, rectH);
        }
      });

      // Draw utilization percentage
      ctx.fillStyle = 'red';
      ctx.font = '10px sans-serif';
      ctx.fillText(`${box.utilization.toFixed(1)}%`, x + 5, y + boxSize - 5);
    });

    // If there are more boxes, show indicator
    if (boxes.length > maxBoxesToShow) {
      ctx.fillStyle = '#6b7280';
      ctx.font = '14px sans-serif';
      const text = `... and ${boxes.length - maxBoxesToShow} more boxes`;
      ctx.fillText(text, padding, canvas.height - padding);
    }
  }, [boxes, maxBoxesToShow]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BarChart3 className="size-5 text-orange-600 dark:text-orange-400" />
          Visualization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted rounded-lg p-4 overflow-auto">
          <canvas
            ref={canvasRef}
            width={1000}
            height={1000}
            className="w-full h-auto"
          />
        </div>

        {boxes.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            No solution to display. Generate an instance and run an algorithm.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
