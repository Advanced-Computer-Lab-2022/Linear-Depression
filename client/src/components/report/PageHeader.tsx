import { Add, ArrowForwardIosRounded, BugReportTwoTone, ArrowBackRounded } from "@mui/icons-material";
import { Avatar, Typography, Button, Sheet, Box } from "@mui/joy";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const link = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

interface HeaderProps {
    reportSubject?: string;
    newReport?: boolean;
}

const Header: React.FC<HeaderProps> = ({ reportSubject, newReport }) => {
    const navigate = useNavigate();

    return (
        <Sheet
            sx={{
                width: "auto",
                py: 3,
                px: 5,
                display: "flex",
                flexDirection: "row"
            }}
        >
            <Avatar sx={{ bgcolor: "#e3f2fd", width: 50, height: 50, alignSelf: "center", mr: 2 }}>
                <BugReportTwoTone sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography level="h3" component={link} to="/me/profile" sx={{ alignSelf: "center" }}>
                <b>Me</b>
            </Typography>
            <ArrowForwardIosRounded sx={{ fontSize: 15, alignSelf: "center", mx: 1 }} />

            <Typography
                level="h3"
                component={reportSubject || newReport ? link : "h1"}
                to="/me/reports"
                sx={{ alignSelf: "center" }}
            >
                <b>Reports</b>
            </Typography>
            {reportSubject && (
                <>
                    <ArrowForwardIosRounded sx={{ fontSize: 15, alignSelf: "center", mx: 1 }} />
                    <Typography level="h3" component="h1" sx={{ alignSelf: "center" }} color="neutral">
                        <b>{reportSubject}</b>
                    </Typography>
                </>
            )}
            {newReport && (
                <>
                    <ArrowForwardIosRounded sx={{ fontSize: 15, alignSelf: "center", mx: 1 }} />
                    <Typography level="h3" component="h1" sx={{ alignSelf: "center" }}>
                        <b>New</b>
                    </Typography>
                </>
            )}

            <Box sx={{ ml: "auto", display: "flex", gap: 2 }}>
                <Button
                    variant="soft"
                    startDecorator={<ArrowBackRounded />}
                    onClick={() => navigate("/")}
                    sx={{ backgroundColor: "#0000" }}
                >
                    <b>Return to Home</b>
                </Button>

                {!reportSubject && !newReport && (
                    <Button
                        sx={{ ml: "auto" }}
                        variant="soft"
                        color="primary"
                        startDecorator={<Add />}
                        onClick={() => navigate("/me/reports/new")}
                    >
                        <b>Report an Issue</b>
                    </Button>
                )}
            </Box>
        </Sheet>
    );
};

export default Header;
