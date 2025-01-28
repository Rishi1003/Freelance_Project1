import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define the types for your context's values
interface AppContextType {
    materialGRN: any;  // Replace with your actual data structure
    forecastData: any;  // Replace with your actual data structure
    materialCData: any;  // Replace with your actual data structure
    setMaterialGRN: React.Dispatch<React.SetStateAction<any>>;
    setForecastData: React.Dispatch<React.SetStateAction<any>>;
    setMaterialCData: React.Dispatch<React.SetStateAction<any>>;
}

// Create the context with default values
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [materialGRN, setMaterialGRN] = useState<any>(null);  // Replace `any` with your actual type
    const [forecastData, setForecastData] = useState<any>(null);
    const [materialCData, setMaterialCData] = useState<any>(null);

    return (
        <AppContext.Provider
            value={{
                materialGRN,
                forecastData,
                materialCData,
                setMaterialGRN,
                setForecastData,
                setMaterialCData,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the context
export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
