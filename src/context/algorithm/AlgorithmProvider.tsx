import { useState } from "react";
import AlgorithmContext, {
    AlgorithmType,
    GreedyStrategy,
    LocalSearchNeighborhood,
    PuttingStrategy,
    SelectionStrategy,
    type AlgorithmParams,
} from ".";

export default function AlgorithmProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [params, setParams] = useState<AlgorithmParams>({
        type: AlgorithmType.GREEDY,
        greedy: {
            strategy: GreedyStrategy.FIRST_FIT,
            selection: SelectionStrategy.LARGEST_AREA_FIRST,
            putting: PuttingStrategy.BOTTOM_LEFT,
        },
        localSearch: {
            neighborhood: LocalSearchNeighborhood.GEOMETRY,
            maxIterations: 1000,
        },
    });

    const setAlgorithm = (algo: AlgorithmType) => {
        setParams({
            type: algo,
            greedy: { ...params.greedy },
            localSearch: { ...params.localSearch },
        });
    };

    const setGreedyStrategy = (strategy: GreedyStrategy) => {
        setParams({
            type: AlgorithmType.GREEDY,
            greedy: {
                strategy,
                selection: params.greedy?.selection,
                putting: params.greedy?.putting,
            },
            localSearch: { ...params.localSearch },
        });
    };

    const setGreedySelection = (selection: SelectionStrategy) => {
        setParams({
            type: AlgorithmType.GREEDY,
            greedy: {
                strategy: params.greedy?.strategy,
                selection,
                putting: params.greedy?.putting,
            },
            localSearch: { ...params.localSearch },
        });
    };

    const setGreedyPutting = (putting: PuttingStrategy) => {
        setParams({
            type: AlgorithmType.GREEDY,
            greedy: {
                strategy: params.greedy?.strategy,
                selection: params.greedy?.selection,
                putting,
            },
            localSearch: { ...params.localSearch },
        });
    };

    const setLocalSearchNeighborhood = (
        neighborhood: LocalSearchNeighborhood,
    ) => {
        setParams({
            type: AlgorithmType.LOCAL_SEARCH,
            greedy: { ...params.greedy },
            localSearch: {
                neighborhood,
                maxIterations: params.localSearch?.maxIterations,
            },
        });
    };

    const setLocalSearchMaxIterations = (maxIterations: number) => {
        setParams({
            type: AlgorithmType.LOCAL_SEARCH,
            greedy: { ...params.greedy },
            localSearch: {
                neighborhood: params.localSearch?.neighborhood,
                maxIterations,
            },
        });
    };

    return (
        <AlgorithmContext
            value={{
                params,
                setAlgorithm,
                setGreedyStrategy,
                setGreedySelection,
                setGreedyPutting,
                setLocalSearchNeighborhood,
                setLocalSearchMaxIterations,
            }}
        >
            {children}
        </AlgorithmContext>
    );
}
