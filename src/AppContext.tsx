//@ts-nocheck
import Cookies from "js-cookie";
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useNavigate } from "react-router";

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

    const [user, setUser] = useState(() => {
        const storedUser = Cookies.get("authUser");
        if (storedUser) {
            return (JSON.parse(storedUser));
        }
        else {
            return null;
        }
    });
    const navigate = useNavigate();

    const login = (username, password) => {
        if (username === "invop@luminaisystems.com" && password === "LuminAISystems@#9090") {
            setUser({ username });

            // Set a cookie that expires in 1 hour
            Cookies.set("authUser", JSON.stringify({ username }), { expires: 1, secure: true, sameSite: "Strict" });

            navigate("/"); // Redirect after login
        } else {
            alert("Invalid credentials");
        }
    };


    const logout = () => {
        setUser(null);
        Cookies.remove("authUser"); // Remove cookie on logout
        navigate("/login");
    };

    return (
        <AppContext.Provider
            value={{
                materialGRN,
                forecastData,
                materialCData,
                setMaterialGRN,
                setForecastData,
                setMaterialCData,

                user,
                login,
                logout,
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
