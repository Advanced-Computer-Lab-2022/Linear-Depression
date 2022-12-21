import { Box, Avatar, Typography, Chip } from "@mui/joy";
import React from "react";

interface AuthorProps {
    name: string;
    type: string;
    date: string;
}

const Author: React.FC<AuthorProps> = ({ name, type, date }) => {
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
        </Box>
    );
};

export default Author;
