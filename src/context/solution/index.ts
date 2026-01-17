import type { Box } from "@/types/box";
import { createContext } from "react";

interface SolutionContextType {
    boxes: Box[];
    setBoxes: React.Dispatch<React.SetStateAction<Box[]>>;
    RunAlgorithm: () => void;
}

const SolutionContext = createContext<SolutionContextType | null>(null);
export default SolutionContext;
