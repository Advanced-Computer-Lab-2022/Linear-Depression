import { ArrowForwardIosRounded } from "@mui/icons-material";
import { Box, Avatar, Typography, Chip } from "@mui/joy";
import React from "react";

interface AuthorProps {
    name: string;
    type: string;
    date: string;
    isOwner?: boolean;
    courseId?: string;
}

const Author: React.FC<AuthorProps> = ({ name, type, date, isOwner, courseId }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Avatar sx={{ width: 60, height: 60 }} color={type === "Admin" ? "info" : "primary"}>
                {name[0].toUpperCase()}
                {name[1].toUpperCase()}
            </Avatar>

            <Box sx={{ display: "flex", flexDirection: "column", mt: 0.5 }}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                    <Typography level="h5" sx={{ alignSelf: "flex-start" }}>
                        <b>{name}</b>
                    </Typography>
                    <Chip
                        sx={{
                            alignSelf: "center"
                        }}
                        variant="outlined"
                        size="sm"
                        color={type === "Admin" ? "info" : "primary"}
                        onClick={() => {}}
                    >
                        <b>{type}</b>
                    </Chip>
                </Box>
                <Typography level="body2" sx={{ alignSelf: "flex-start" }} color="neutral">
                    {date}
                </Typography>
            </Box>

            {isOwner && courseId && (
                <Chip
                    sx={{ ml: "auto", maxHeight: 40, alignSelf: "center" }}
                    variant="soft"
                    color="neutral"
                    onClick={() => window.open(`/courses/${courseId}`, "_blank")} // Inorder to open in new tab
                    endDecorator={<ArrowForwardIosRounded />}
                >
                    View reported course
                </Chip>
            )}
        </Box>
    );
};

export default Author;
