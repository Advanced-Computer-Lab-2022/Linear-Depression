import { Sheet } from "@mui/joy";
import React from "react";

interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <Sheet
            sx={{
                width: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}
        >
            {children}
        </Sheet>
    );
};

export default Container;
