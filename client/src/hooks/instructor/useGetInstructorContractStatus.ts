import { useContext, useEffect } from "react";
import { openModal } from "react-url-modal";

import { UserContext } from "@internals/contexts";
import { getInstructorContractStatus } from "@internals/services";
import { User } from "@internals/types";

const useGetInstructorContractStatus = () => {
    const { userType } = useContext(UserContext);
    useEffect(() => {
        if (userType === User.INSTRUCTOR && !getInstructorContractStatus()) {
            openModal({ name: "viewAndAcceptContract" });
        }
    }, []);
};

export default useGetInstructorContractStatus;
