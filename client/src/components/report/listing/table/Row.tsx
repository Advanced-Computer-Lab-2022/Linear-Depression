import { KeyboardArrowRight } from "@mui/icons-material";
import { ListItemButton, ListItemContent, Chip } from "@mui/joy";
import moment from "moment";
import React from "react";

import { ReportStatus } from "@internals/types";

interface RowProps {
    reportId: string;
    subject: string;
    createdAt: string;
    lastActivity: string;
    status: ReportStatus;
}

const Row: React.FC<RowProps> = ({ reportId, subject, createdAt, lastActivity, status }) => {
    return (
        <ListItemButton component="a" href={`/me/reports/${reportId}`}>
            <ListItemContent sx={{ width: "40%" }}>{subject}</ListItemContent>
            <ListItemContent sx={{ textAlign: "center", width: "16%" }}>
                {moment(createdAt).format("MMMM Do, YYYY")}
            </ListItemContent>
            <ListItemContent sx={{ textAlign: "center", width: "20%" }}>
                {moment(lastActivity).fromNow()}
            </ListItemContent>
            <ListItemContent sx={{ textAlign: "center", width: "20%" }}>
                <Chip
                    sx={{ width: "60%" }}
                    variant="soft"
                    color={status === ReportStatus.PENDING ? "warning" : "success"}
                >
                    {status}
                </Chip>
            </ListItemContent>

            <KeyboardArrowRight sx={{ color: "text.tertiary", width: "4%" }} />
        </ListItemButton>
    );
};

export default Row;
