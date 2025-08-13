import { useContext } from "react";
import { Context } from "./AppContext";

export const useGlobalState = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useGlobalState must be used within a GlobalProvider");
    }
    return context;
} 