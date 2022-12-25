import { useEffect, useState } from "react";

import { useAuth } from "@internals/hooks";
import { fetchMyAccessRequest } from "@internals/services";
import { AccessRequest, User } from "@internals/types";

const useFetchMyAccessRequest = (courseId: string) => {
    const [accessRequest, setAccessRequest] = useState({
        data: null as AccessRequest | null,
        loading: true,
        error: null
    });

    const {
        auth: { userType }
    } = useAuth();

    const updateAccessRequest = () => {
        fetchMyAccessRequest(courseId)
            .then((res) => {
                setAccessRequest({
                    data: res,
                    loading: false,
                    error: null
                });
            })
            .catch((err) => {
                setAccessRequest({
                    data: null,
                    loading: false,
                    error: err
                });
            });
    };

    useEffect(() => {
        if (userType === User.CORPORATE_TRAINEE) {
            updateAccessRequest();
        } else {
            setAccessRequest({
                data: null,
                loading: false,
                error: null
            });
        }
    }, [courseId]);

    return { accessRequest, updateAccessRequest };
};

export default useFetchMyAccessRequest;
