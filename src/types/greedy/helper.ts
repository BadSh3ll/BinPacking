import { GreedyStrategy, SelectionStrategy } from "@/context/algorithm";
import type { GreedyExtender, OrderingStrategy } from ".";
import type { Rectangle } from "../rectangle";
import { LargestAreaFirst, LargestHeightFirst } from "./ordering";
import { BottomLeftPutting, ShelfPutting, type PuttingStrategy } from "./putting";
import { PuttingStrategy as PuttingStrategyParams } from "@/context/algorithm";
import { BestFitPlacer, FirstFitPlacer } from "./extender";
import type { PackingSolution } from "../solution";

export function getGreedyOrdering(
    type: SelectionStrategy,
): OrderingStrategy<Rectangle> {
    switch (type) {
        case SelectionStrategy.LARGEST_AREA_FIRST:
            return new LargestAreaFirst();
        case SelectionStrategy.LARGEST_HEIGHT_FIRST:
            return new LargestHeightFirst();
        default:
            throw new Error("Invalid ordering type");
    }
}

export function getGreedyPutting(type: PuttingStrategyParams): PuttingStrategy {
    switch (type) {
        case PuttingStrategyParams.BOTTOM_LEFT:
            return new BottomLeftPutting();
        case PuttingStrategyParams.SHELF:
            return new ShelfPutting();
        default:
            throw new Error("Invalid putting type");
    }
}

export function getGreedyExtender(
    type: GreedyStrategy,
    boxSize: number,
    putting: PuttingStrategy,
): GreedyExtender<Rectangle, PackingSolution> {
    switch (type) {
        case GreedyStrategy.BEST_FIT:
            return new BestFitPlacer(boxSize, putting);
        case GreedyStrategy.FIRST_FIT:
            return new FirstFitPlacer(boxSize, putting);
        default:
            throw new Error("Invalid extender type");
    }
}
