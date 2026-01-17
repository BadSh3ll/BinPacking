import { useContext } from "react";
import AlgorithmContext from ".";

const useAlgorithm = () => {
    const context = useContext(AlgorithmContext);
    if (!context) {
        throw new Error("useAlgorithm must be used within an AlgorithmContext");
    }
    return context;
};

export default useAlgorithm;
