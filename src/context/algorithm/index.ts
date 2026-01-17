import { createContext } from "react";

export enum AlgorithmType {
    GREEDY = "greedy",
    LOCAL_SEARCH = "localSearch",
}

// # GREEDY
//
export interface GreedyParams {
    strategy?: GreedyStrategy;
    selection?: SelectionStrategy;
    putting?: PuttingStrategy;
}

export enum GreedyStrategy {
    BEST_FIT = "best-fit",
    FIRST_FIT = "first-fit",
}

export enum SelectionStrategy {
    LARGEST_AREA_FIRST = "largest-area-first",
    LARGEST_HEIGHT_FIRST = "largest-height-first",
}

export enum PuttingStrategy {
    BOTTOM_LEFT = "bottom-left",
    SHELF = "shelf",
}

// # LOCAL SEARCH
export interface LocalSearchParams {
    neighborhood?: LocalSearchNeighborhood;
    maxIterations?: number;
}

export enum LocalSearchNeighborhood {
    GEOMETRY = "geometry",
    PERMUTATION = "permutation",
    OVERLAP = "overlap",
}

export interface AlgorithmParams {
    type: AlgorithmType;
    greedy: GreedyParams;
    localSearch: LocalSearchParams;
}

export interface AlgorithmContextProps {
    params: AlgorithmParams;
    setAlgorithm: (algorithm: AlgorithmType) => void;

    setGreedyStrategy: (strategy: GreedyStrategy) => void;
    setGreedySelection: (selection: SelectionStrategy) => void;
    setGreedyPutting: (putting: PuttingStrategy) => void;

    setLocalSearchNeighborhood: (neighborhood: LocalSearchNeighborhood) => void;
    setLocalSearchMaxIterations: (maxIterations: number) => void;
}

const AlgorithmContext = createContext<AlgorithmContextProps | null>(null);

export default AlgorithmContext;
