import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "../types/User";

export const UserContext = createContext({
    userId: "",
    userType: User.GUEST,
    setUserId: {} as Dispatch<SetStateAction<string>>,
    setUserType: {} as Dispatch<SetStateAction<User>>
});
