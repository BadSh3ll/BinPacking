import type { GreedyExtender } from ".";
import { Box } from "../box";
import type { Rectangle } from "../rectangle";
import type { PackingSolution } from "../solution";
import type { PuttingStrategy } from "./putting";

export class FirstFitPlacer implements GreedyExtender<
    Rectangle,
    PackingSolution
> {
    private boxSize: number;
    private puttingStrategy: PuttingStrategy;

    constructor(boxSize: number, puttingStrategy: PuttingStrategy) {
        this.boxSize = boxSize;
        this.puttingStrategy = puttingStrategy;
    }

    extend(solution: PackingSolution, rectangle: Rectangle): PackingSolution {
        // Try existing boxes
        for (const box of solution.boxes) {
            if (this.puttingStrategy.tryPut(rectangle, box)) {
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
