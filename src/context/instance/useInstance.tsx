import { useContext } from "react";
import InstanceContext from ".";

export default function useInstance() {
    const context = useContext(InstanceContext);

    if (!context) {
        throw new Error("useInstance must be used within an InstanceProvider");
    }

    return context;
}
