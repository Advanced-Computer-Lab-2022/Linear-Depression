import { BugReportTwoTone } from "@mui/icons-material";
import { Avatar, Typography } from "@mui/joy";
import React from "react";

const PageHeader: React.FC = () => {
    return (
        <>
            <Avatar sx={{ m: 1, bgcolor: "#e3f2fd", width: 70, height: 70, alignSelf: "center" }}>
                <BugReportTwoTone sx={{ fontSize: 50 }} />
            </Avatar>
            <Typography level="h4" component="h1" sx={{ alignSelf: "center" }}>
                <b>Report an Issue</b>
            </Typography>
        </>
    );
};

export default PageHeader;
