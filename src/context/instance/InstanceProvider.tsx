import {
    InstanceGenerator,
    type InstanceParams,
    type PackingInstance,
} from "@/types/instance";
import InstanceContext from ".";
import { useState } from "react";

export default function InstanceProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [params, setParams] = useState<InstanceParams>({
        numRectangles: 10000,
        minWidth: 20,
        maxWidth: 300,
        minHeight: 40,
        maxHeight: 400,
        boxSize: 500,
    });
    const [instance, setInstance] = useState<PackingInstance | null>(null);

    const generateInstance = () => {
        const instance = new InstanceGenerator().generate(params);
        setInstance(instance);
    };

    return (
        <InstanceContext
            value={{
                params,
                setParams,
                instance,
                generateInstance,
            }}
        >
            {children}
        </InstanceContext>
    );
}
