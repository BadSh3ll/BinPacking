import type { Box } from "../box";
import { Rectangle } from "../rectangle";

export interface TryPutPosition {
    x: number;
    y: number;
    rotated: boolean;
}

export interface PuttingStrategy {
    tryPut(rectangle: Rectangle, box: Box): TryPutPosition | null;
}

export class BottomLeftPutting implements PuttingStrategy {
    tryPut(rectangle: Rectangle, box: Box): TryPutPosition | null {
        const positions: { x: number; y: number }[] = [{ x: 0, y: 0 }];

        for (const rect of box.rectangles) {
            const { x, y } = rect.position;
            positions.push({ x: x! + rect.width, y: y! });
            positions.push({ x: x!, y: y! + rect.height });
        }

        positions.sort((a, b) => {
            if (a.y === b.y) {
                return a.x - b.x;
            }
            return a.y - b.y;
        });

        const rotating = [false, true];

        for (const rotated of rotating) {
            for (const { x, y } of positions) {
                const testRect = rotated ? rectangle.rotate() : rectangle;
                testRect.position = { x, y };

                let overlapping = false;
                let overflow = false;

                // Check overflow
                if (box.isOverflowed(testRect)) {
                    overflow = true;
                }

                // Check overlapping
                for (const placedRect of box.rectangles) {
                    if (box.isOverlapping(testRect, placedRect)) {
                        overlapping = true;
                        break;
                    }
                }

                if (!overlapping && !overflow) {
                    return { x, y, rotated };
                }
            }
        }
        return null;
    }
}
