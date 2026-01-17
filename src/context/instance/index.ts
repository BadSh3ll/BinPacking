import type { InstanceParams, PackingInstance } from "@/types/instance";
import { createContext } from "react";

export interface InstanceContextProps {
    params: InstanceParams;
    setParams: (params: InstanceParams) => void;

    instance: PackingInstance | null;
    generateInstance: () => void;
}

const InstanceContext = createContext<InstanceContextProps | null>(null);

export default InstanceContext;
