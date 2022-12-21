import { Sheet } from "@mui/joy";
import React from "react";

interface ThreadCardContainerProps {
    children: React.ReactNode;
}

const ThreadCardContainer: React.FC<ThreadCardContainerProps> = ({ children }) => {
    return (
        <Sheet
            sx={{
                width: "100%",
                p: 3,
                mb: 2,
                display: "flex",
                flexDirection: "column",
                borderRadius: "sm",
                boxShadow: "0 0 0 0px rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)"
            }}
            variant="plain"
        >
            {children}
        </Sheet>
    );
};

export default ThreadCardContainer;
