import { useEffect, useState } from "react";

import { useAuth } from "@internals/hooks";
import { fetchMyRefundRequest } from "@internals/services";
import { RefundRequest, User } from "@internals/types";

const useFetchMyRefundRequest = (enrollmentId: string) => {
    const [refundRequest, setRefundRequest] = useState({
        data: null as RefundRequest | null,
        loading: true,
        error: null
    });

    const {
        auth: { userType }
    } = useAuth();

    const updateRefundRequest = () => {
        fetchMyRefundRequest(enrollmentId)
            .then((res) => {
                setRefundRequest({
                    data: res,
                    loading: false,
                    error: null
                });
            })
            .catch((err) => {
                setRefundRequest({
                    data: null,
                    loading: false,
                    error: err
                });
            });
    };

    useEffect(() => {
        if (userType === User.INDIVIDUAL_TRAINEE) {
            updateRefundRequest();
        } else {
            setRefundRequest({
                data: null,
                loading: false,
                error: null
            });
        }
    }, [enrollmentId]);

    return { refundRequest, updateRefundRequest };
};

export default useFetchMyRefundRequest;
