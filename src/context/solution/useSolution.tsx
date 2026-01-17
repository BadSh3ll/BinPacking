import { useContext } from "react";
import SolutionContext from ".";

const useSolution = () => {
    const context = useContext(SolutionContext);
    if (!context) {
        throw new Error(
            "useSolution must be used within a SolutionContextProvider",
        );
    }
    return context;
};

export default useSolution;
