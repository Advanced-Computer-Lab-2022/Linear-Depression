import { useState } from "react";

import { fetchUserType } from "@internals/services";
import { User } from "@internals/types";

const useGetUserType = () => {
    const [userType, setUserType] = useState(User.GUEST);

    fetchUserType()
        .then((res) => {
            console.log(res);
            setUserType(res);
        })
        .catch((err) => {
            console.log(err);
        });

    return { userType, setUserType };
};

export default useGetLocalizationData;
