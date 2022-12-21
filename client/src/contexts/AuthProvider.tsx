import axios from "axios";
import React, { createContext, useState } from "react";

import { refresh } from "@internals/services";
import { User } from "@internals/types";

interface Auth {
    accessToken: string | null;
    userType: number;
}

interface AuthContextValue {
    auth: Auth;
    setAuth: (accessToken: string, userType: number) => void;
    logout: () => void;
    refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextValue>({
    auth: {
        accessToken: null,
        userType: User.GUEST
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
        userType: User.GUEST
    });

    const setAuth = (accessToken: string, userType: number) => {
        setAuthState({
            accessToken,
            userType
        });

        axios.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${accessToken}`;
            return config;
        });
    };

    const logout = () => {
        setAuthState({
            accessToken: null,
            userType: User.GUEST
        });
        localStorage.removeItem("rememberMe");
    };

    const refreshAuth = async () => {
        refresh()
            .then((data) => {
                setAuthState({
                    accessToken: data.accessToken,
                    userType: data.userType
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
