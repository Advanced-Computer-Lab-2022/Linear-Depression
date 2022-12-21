import { KeyboardArrowRight } from "@mui/icons-material";
import { ListItem, ListItemContent } from "@mui/joy";
import React from "react";

const TableHeader: React.FC = () => {
    return (
        <ListItem sx={{ fontWeight: "bold" }}>
            <ListItemContent sx={{ width: "40%" }}>Subject</ListItemContent>
            <ListItemContent sx={{ textAlign: "center", width: "16%" }}>Created At</ListItemContent>
            <ListItemContent sx={{ textAlign: "center", width: "20%" }}>Last Activity</ListItemContent>
            <ListItemContent sx={{ textAlign: "center", width: "20%" }}>Status</ListItemContent>

            <KeyboardArrowRight sx={{ width: "4%", visibility: "hidden" }} />
        </ListItem>
    );
};

export default TableHeader;
