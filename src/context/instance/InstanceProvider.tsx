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
        numRectangles: 1000,
        minWidth: 10,
        maxWidth: 200,
        minHeight: 20,
        maxHeight: 300,
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
