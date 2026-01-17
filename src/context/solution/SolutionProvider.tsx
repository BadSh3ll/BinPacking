import { useState, type ReactNode } from "react";
import SolutionContext from ".";
import type { Box } from "@/types/box";
import useInstance from "../instance/useInstance";
import useAlgorithm from "../algorithm/useAlgorithm";
import { AlgorithmType } from "../algorithm";
import { GreedySolver } from "@/types/greedy";
import { Rectangle } from "@/types/rectangle";
import { PackingSolution } from "@/types/solution";
import {
    getGreedyExtender,
    getGreedyOrdering,
    getGreedyPutting,
} from "@/types/greedy/helper";

const SolutionProvider = ({ children }: { children: ReactNode }) => {
    const [boxes, setBoxes] = useState<Box[]>([]);
    const [runningTime, setRunningTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const { instance } = useInstance();
    const {
        params: { type, greedy },
    } = useAlgorithm();

    const RunAlgorithm = () => {
        if (isRunning) return;

        setBoxes([]);
        setRunningTime(0);
        setIsRunning(true);

        // just to ensure the reset state is visible
        setTimeout(() => {
            try {
                switch (type) {
                    case AlgorithmType.GREEDY:
                        RunGreedy();
                        break;
                    case AlgorithmType.LOCAL_SEARCH:
                        RunLocalSearch();
                        break;
                    default:
                        console.error("Invalid algorithm type");
                }
            } finally {
                setIsRunning(false);
            }
        }, 0);
    };

    const RunGreedy = () => {
        if (!instance) {
            console.error("No instance provided");
            return;
        }

        const ordering = getGreedyOrdering(greedy.selection);

        const putting = getGreedyPutting(greedy.putting);

        const extender = getGreedyExtender(
            greedy.strategy,
            instance.boxSize,
            putting,
        );

        const solver = new GreedySolver<Rectangle, PackingSolution>(
            ordering,
            extender,
        );

        const initial = new PackingSolution(instance.boxSize);

        const startTime = new Date().getTime();
        const solution = solver.solve(initial, instance.rectangles);
        const endTime = new Date().getTime();

        setRunningTime(endTime - startTime);
        setBoxes(solution.boxes);
    };

    const RunLocalSearch = () => {};

    return (
        <SolutionContext.Provider
            value={{ boxes, runningTime, isRunning, RunAlgorithm }}
        >
            {children}
        </SolutionContext.Provider>
    );
};

export default SolutionProvider;
