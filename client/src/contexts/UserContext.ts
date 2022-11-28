import { createContext, Dispatch, SetStateAction } from "react";

import { User } from "@internals/types";

const UserContext = createContext({
    userType: User.GUEST,
    setUserType: {} as Dispatch<SetStateAction<User>>
});

export default UserContext;
