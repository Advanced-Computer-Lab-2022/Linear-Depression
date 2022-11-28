import PasswordIcon from "@mui/icons-material/Password";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";

import sendForgotPasswordRequest from "../../services/auth/sendForgotPasswordRequest";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: ["Montserrat", "sans-serif"].join(",")
    }
});

const enum PasswordResetState {
    UNSENT,
    LOADING,
    SUCCESS
}

export default function ForgotPassword() {
    const [resetRequestStatus, setResetRequestStatus] = useState(PasswordResetState.UNSENT);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setResetRequestStatus(PasswordResetState.LOADING);

        const email = new FormData(event.currentTarget).get("email") as string;

        sendForgotPasswordRequest(email)
            .then(() => setResetRequestStatus(PasswordResetState.SUCCESS))
            .catch(() => setResetRequestStatus(PasswordResetState.UNSENT));
    };

    let contentBox;
    if (resetRequestStatus === PasswordResetState.UNSENT) {
        contentBox = (
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2, fontWeight: "bold"}}>
                    Send Password Reset Email
                </Button>
            </Box>
        );
    } else if (resetRequestStatus === PasswordResetState.LOADING) {
        contentBox = (
            <Box sx={{ mt: 8 }}>
                <CircularProgress />
            </Box>
        );
    } else {
        contentBox = (
            <Box sx={{ mt: 8 }}>
                <Typography component="h1" variant="h5" color="darkgreen" fontWeight="bold">
                    Password reset email sent!
                </Typography>
            </Box>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                        <PasswordIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
                        Reset Password
                    </Typography>
                    {contentBox}
                </Box>
            </Container>
        </ThemeProvider>
    );
}
