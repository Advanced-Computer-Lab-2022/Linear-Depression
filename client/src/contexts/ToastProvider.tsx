import { Alert, Snackbar } from "@mui/material";
import { createContext, useState } from "react";

interface ToastData {
    type: "success" | "error" | "info" | "warning";
    message: string;
}

interface ToastContextType {
    toast: ToastData | null;
    showToast: (toast: ToastData) => void;
}

const ToastContext = createContext<ToastContextType>(null);

export const ToastProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [toast, setToast] = useState<ToastData>({
        type: "success",
        message: ""
    });
    const [open, setOpen] = useState(false);

    const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const showToast = (toast: ToastData) => {
        setToast(toast);
        setOpen(true);
    };

    return (
        <ToastContext.Provider
            value={{
                toast,
                showToast
            }}
        >
            <>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert severity={toast.type} sx={{ width: "100%" }}>
                        {toast.message}
                    </Alert>
                </Snackbar>
                {children}
            </>
        </ToastContext.Provider>
    );
};

export default ToastContext;
