import { useContext } from "react";

import { ToastContext } from "@internals/contexts";

const useToast = () => useContext(ToastContext);

export default useToast;
