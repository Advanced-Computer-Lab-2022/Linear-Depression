import { useEffect } from "react";
import { openModal } from "react-url-modal";

import { useAuth } from "@internals/hooks";
import { getInstructorContractStatus } from "@internals/services";
import { User } from "@internals/types";

const useGetInstructorContractStatus = () => {
    const {
        auth: { userType }
    } = useAuth();
    useEffect(() => {
        if (userType === User.INSTRUCTOR && !getInstructorContractStatus()) {
            openModal({ name: "viewAndAcceptContract" });
        }
    }, []);
};

export default useGetInstructorContractStatus;
