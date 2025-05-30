"use client";

import { createContext, useContext, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 

    const login = (username, password) => {
        if (username === "admin" && password === "password") {
            setUser({ username, role: "admin" });
            return true;
        } else if (username === "user" && password === "password") {
            setUser({ username, role: "user" });
            return true;
        } else {
            return false;
        }
    };

    const logout = () => setUser(null);

return (
    <AuthContext.Provider value={{ user, login, logout }}>
        {children}
    </AuthContext.Provider>
);
};

export const useAuth = () => useContext(AuthContext);
