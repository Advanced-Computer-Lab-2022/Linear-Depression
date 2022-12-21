import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "@internals/hooks";
import { refresh } from "@internals/services";
import { User } from "@internals/types";

const RequireAuth: React.FC<{
    roles?: User[];
}> = ({ roles = [User.GUEST] }) => {
    const { auth, setAuth } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const persistLogin = localStorage.getItem("rememberMe");

        if (persistLogin && auth.userType === User.GUEST) {
            refresh()
                .then((data) => {
                    setAuth(data.accessToken, data.userType);
                })
                .catch((err) => {
                    console.log(err);
                    localStorage.removeItem("rememberMe");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, []);

    const userType = auth.userType;

    return (
        <>
            {isLoading ? (
                <CircularProgress style={{ position: "absolute", top: "50%", left: "50%" }} />
            ) : roles?.includes(userType) ? (
                <Outlet />
            ) : (
                <Navigate to="/auth/login" state={{ from: location }} replace />
            )}
        </>
    );
};

export default RequireAuth;
