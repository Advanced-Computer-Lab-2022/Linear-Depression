import { useEffect, useState } from "react";

import { fetchProfile } from "@internals/services";
import { Instructor } from "@internals/types";

const useFetchProfile = () => {
    const [profile, setProfile] = useState({
        data: null as {
            instructor?: Instructor;
            individualTrainee?: object;
            corporateTrainee?: object;
        } | null,
        loading: true,
        error: null
    });

    useEffect(() => {
        fetchProfile()
            .then((data) => {
                setProfile({
                    data,
                    loading: false,
                    error: null
                });
            })
            .catch((error) => {
                setProfile({
                    data: null,
                    loading: false,
                    error
                });
            });
    }, []);

    return { profile, setProfile };
};

export default useFetchProfile;
