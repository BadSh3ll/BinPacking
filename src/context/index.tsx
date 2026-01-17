import type { ReactNode } from "react";
import AlgorithmProvider from "./algorithm/AlgorithmProvider";
import InstanceProvider from "./instance/InstanceProvider";
import SolutionProvider from "./solution/SolutionProvider";

export default function GlobalProvider({ children }: { children: ReactNode }) {
    return (
        <InstanceProvider>
            <AlgorithmProvider>
                <SolutionProvider>{children}</SolutionProvider>
            </AlgorithmProvider>
        </InstanceProvider>
    );
}
