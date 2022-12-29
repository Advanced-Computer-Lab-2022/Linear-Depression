import axios from "axios";
import React, { createContext, useState } from "react";

import { refresh } from "@internals/services";
import { User } from "@internals/types";

interface Auth {
    accessToken: string | null;
    userType: User;
    isLoggedIn: boolean;
}

interface AuthContextValue {
    auth: Auth;
    setAuth: (accessToken: string, userType: User) => void;
    logout: () => void;
    refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextValue>({
    auth: {
        accessToken: null,
        userType: User.GUEST,
        isLoggedIn: localStorage.getItem("logged") === "true"
    },
    setAuth: () => {},
    logout: () => {},
    refreshAuth: () => {}
});

export const AuthProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [authState, setAuthState] = useState<Auth>({
        accessToken: null,
        userType: User.GUEST,
        isLoggedIn: localStorage.getItem("logged") === "true"
    });

    const setAuth = (accessToken: string, userType: User) => {
        setAuthState({
            accessToken,
            userType,
            isLoggedIn: true
        });
        localStorage.setItem("logged", "true");

        axios.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${accessToken}`;
            return config;
        });
    };

    const logout = () => {
        setAuthState({
            accessToken: null,
            userType: User.GUEST,
            isLoggedIn: false
        });
        localStorage.removeItem("logged");

        axios.interceptors.request.use((config) => {
            config.headers.Authorization = null;
            return config;
        });
    };

    const refreshAuth = async () => {
        refresh()
            .then((data) => {
                setAuthState({
                    accessToken: data.accessToken,
                    userType: data.userType,
                    isLoggedIn: true
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <AuthContext.Provider
            value={{
                auth: authState,
                setAuth: setAuth,
                logout,
                refreshAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export default AuthContext;
