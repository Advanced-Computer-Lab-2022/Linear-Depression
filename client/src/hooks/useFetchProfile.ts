import { useEffect } from "react";

import { getProfile, useAppDispatch } from "@internals/redux";

const useFetchProfile = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProfile());
    }, []);
};

export default useFetchProfile;
