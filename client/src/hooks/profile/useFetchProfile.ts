import { useEffect } from "react";

import { useAuth } from "@internals/hooks";
import { getProfile, useAppDispatch } from "@internals/redux";
import { User } from "@internals/types";

const useFetchProfile = () => {
    const dispatch = useAppDispatch();
    const { auth } = useAuth();

    useEffect(() => {
        if (auth.userType !== User.GUEST) {
            dispatch(getProfile(auth.accessToken));
        }
    }, []);
};

export default useFetchProfile;
