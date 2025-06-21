import React from "react";
import { createContext, useContext,useState } from "react";

const PlanContext = createContext();

// 2. Create a custom hook for easy access to the context data.
export const usePlan = () => {
    return useContext(PlanContext);
}

// 3. Create a Provider component to wrap our app and manage the state.
const PlanProviderContext = ({ children }) => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isYearly, setIsYearly] = useState(true);

    // The value that will be supplied to all consuming components.
    const value = {
        selectedPlan,
        setSelectedPlan,
        isYearly,
        setIsYearly,
    };

    return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};

export default PlanProviderContext;