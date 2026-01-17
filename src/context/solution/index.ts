import type { Box } from "@/types/box";
import { createContext } from "react";

interface SolutionContextType {
    boxes: Box[];
    runningTime: number;
    isRunning: boolean;
    RunAlgorithm: () => void;
}

const SolutionContext = createContext<SolutionContextType | null>(null);
export default SolutionContext;
