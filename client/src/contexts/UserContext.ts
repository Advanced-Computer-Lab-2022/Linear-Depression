import { createContext, Dispatch, SetStateAction } from "react";

import { User } from "@internals/types";

const UserContext = createContext({
    userId: "",
    userType: User.GUEST,
    setUserId: {} as Dispatch<SetStateAction<string>>,
    setUserType: {} as Dispatch<SetStateAction<User>>
});

export default UserContext;
