import type { GreedyExtender } from ".";
import { Box } from "../box";
import type { Rectangle } from "../rectangle";
import type { PackingSolution } from "../solution";
import type { PuttingStrategy, TryPutPosition } from "./putting";

export class FirstFitPlacer implements GreedyExtender<
    Rectangle,
    PackingSolution
> {
    private boxSize: number;
    private putting: PuttingStrategy;

    constructor(boxSize: number, putting: PuttingStrategy) {
        this.boxSize = boxSize;
        this.putting = putting;
    }

    extend(solution: PackingSolution, rectangle: Rectangle): PackingSolution {
        // Try existing boxes
        for (const box of solution.boxes) {
            const position = this.putting.tryPut(rectangle, box);
            if (position !== null) {
                box.addRect(
                    position.rotated ? rectangle.rotate() : rectangle,
                    position,
                );
                return solution;
            }
        }
        // Creating new box
        const newBox = new Box(this.boxSize);
        newBox.addRect(rectangle, { x: 0, y: 0 });
        solution.boxes.push(newBox);

        return solution;
    }
}

export class BestFitPlacer implements GreedyExtender<
    Rectangle,
    PackingSolution
> {
    private boxSize: number;
    private putting: PuttingStrategy;

    constructor(boxSize: number, putting: PuttingStrategy) {
        this.boxSize = boxSize;
        this.putting = putting;
    }

    extend(solution: PackingSolution, rectangle: Rectangle): PackingSolution {
        let bestBox: Box | null = null;
        let bestArea: number = Infinity;
        let bestPosition: TryPutPosition | null = null;

        // Try to fit rectangle into existing boxes (tightest fit)
        for (const box of solution.boxes) {
            const position = this.putting.tryPut(rectangle, box);
            if (position !== null) {
                const areaAfterPut = box.area - (box.usedArea + rectangle.area);
                if (areaAfterPut < bestArea) {
                    bestBox = box;
                    bestArea = areaAfterPut;
                    bestPosition = position;
                }
            }
        }

        if (bestBox) {
            bestBox.addRect(
                bestPosition!.rotated ? rectangle.rotate() : rectangle,
                bestPosition!,
            );
            return solution;
        }

        // Creating new box if no existing box can fit the rectangle
        const newBox = new Box(this.boxSize);
        newBox.addRect(rectangle, { x: 0, y: 0 });
        solution.boxes.push(newBox);

        return solution;
    }
}
