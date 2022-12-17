import { List, ListItem } from "@mui/joy";
import React from "react";

interface BodyContainerProps {
    children: React.ReactNode;
}

const BodyContainer: React.FC<BodyContainerProps> = ({ children }) => {
    return (
        <ListItem nested>
            <List sx={{ mb: 1 }}>{children}</List>
        </ListItem>
    );
};

export default BodyContainer;
