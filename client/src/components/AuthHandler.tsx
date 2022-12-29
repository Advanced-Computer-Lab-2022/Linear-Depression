import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "@internals/hooks";
import { logout, refresh } from "@internals/services";
import { User } from "@internals/types";

const AuthHandler: React.FC<{
    roles?: User[];
}> = ({ roles = [] }) => {
    const { auth, setAuth } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        refresh()
            .then((data) => {
                setAuth(data.accessToken, data.userType);
            })
            .catch((err) => {
                console.log(err);
                logout();
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const userType = auth.userType;

    return (
        <>
            {isLoading ? (
                <CircularProgress style={{ position: "absolute", top: "50%", left: "50%" }} />
            ) : roles.includes(userType) || roles.length === 0 ? (
                <Outlet />
            ) : (
                <Navigate to="/auth/login" state={{ from: location }} replace />
            )}
        </>
    );
};

export default AuthHandler;
