import { useState, type ReactNode } from "react";
import SolutionContext from ".";
import type { Box } from "@/types/box";
import useInstance from "../instance/useInstance";
import useAlgorithm from "../algorithm/useAlgorithm";
import {
    AlgorithmType,
    GreedyStrategy,
    PuttingStrategy as PuttingStrategyParams,
    SelectionStrategy,
} from "../algorithm";
import {
    GreedySolver,
    type GreedyExtender,
    type OrderingStrategy,
} from "@/types/greedy";
import { Rectangle } from "@/types/rectangle";
import { PackingSolution } from "@/types/solution";
import { LargestAreaFirst, LargestHeightFirst } from "@/types/greedy/ordering";
import { FirstFitPlacer } from "@/types/greedy/extender";
import {
    BottomLeftPutting,
    type PuttingStrategy,
} from "@/types/greedy/putting";

const SolutionProvider = ({ children }: { children: ReactNode }) => {
    const [boxes, setBoxes] = useState<Box[]>([]);

    const { instance } = useInstance();
    const { params } = useAlgorithm();

    const RunAlgorithm = () => {
        switch (params.type) {
            case AlgorithmType.GREEDY:
                RunGreedy();
                break;
            case AlgorithmType.LOCAL_SEARCH:
                RunLocalSearch();
                break;
            default:
                console.error("Invalid algorithm type");
        }
    };

    const RunGreedy = () => {
        if (!instance) {
            console.error("No instance provided");
            return;
        }

        let ordering: OrderingStrategy<Rectangle>;

        switch (params.greedy.selection) {
            case SelectionStrategy.LARGEST_AREA_FIRST:
                ordering = new LargestAreaFirst();
                break;
            case SelectionStrategy.LARGEST_HEIGHT_FIRST:
                ordering = new LargestHeightFirst();
                break;
            default:
                throw new Error("Invalid ordering type");
        }

        let putting: PuttingStrategy;
        switch (params.greedy.putting) {
            case PuttingStrategyParams.BOTTOM_LEFT:
                putting = new BottomLeftPutting();
                break;
            default:
                throw new Error("Invalid putting type");
        }

        let extender: GreedyExtender<Rectangle, PackingSolution>;

        switch (params.greedy.strategy) {
            case GreedyStrategy.FIRST_FIT:
                extender = new FirstFitPlacer(instance.boxSize, putting!);
                break;
            default:
                throw new Error("Invalid extender type");
        }

        const solver = new GreedySolver<Rectangle, PackingSolution>(
            ordering,
            extender,
        );

        const initial = new PackingSolution(instance.boxSize);

        const solution = solver.solve(initial, instance.rectangles);
        setBoxes(solution.boxes);
    };

    const RunLocalSearch = () => {};

    return (
        <SolutionContext.Provider value={{ boxes, setBoxes, RunAlgorithm }}>
            {children}
        </SolutionContext.Provider>
    );
};

export default SolutionProvider;
