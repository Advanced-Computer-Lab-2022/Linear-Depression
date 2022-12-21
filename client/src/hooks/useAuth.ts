import { useContext } from "react";

import { AuthContext } from "@internals/contexts";

const useAuth = () => useContext(AuthContext);

export default useAuth;
