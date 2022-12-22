import { useEffect } from "react";

import useAuth from "./useAuth";
import { getProfile, useAppDispatch } from "@internals/redux";

const useFetchProfile = () => {
    const dispatch = useAppDispatch();
    const { auth } = useAuth();

    useEffect(() => {
        if (auth.isLoggedIn) {
            dispatch(getProfile());
        }
    }, []);
};

export default useFetchProfile;
