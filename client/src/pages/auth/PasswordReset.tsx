import PasswordIcon from "@mui/icons-material/Password";
import { Avatar, Box, Button, CircularProgress, Container, CssBaseline, TextField, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { performPasswordReset, validatePasswordResetToken } from "@internals/services";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: ["Montserrat", "sans-serif"].join(",")
    }
});

const PasswordReset: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [isValidToken, setIsValidToken] = React.useState(null);
    const [email, setEmail] = React.useState("");

    const navigate = useNavigate();

    validatePasswordResetToken(searchParams.get("token") || "")
        .then((email: any) => {
            setIsValidToken(true);
            setEmail(email);
        })
        .catch(() => setIsValidToken(false));

    let contentBox;
    if (isValidToken === null) {
        contentBox = (
            <Box sx={{ mt: 8 }}>
                <CircularProgress />
            </Box>
        );
    } else if (isValidToken) {
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const newPassword = new FormData(event.currentTarget).get("newPassword") as string;

            performPasswordReset(searchParams.get("token") || "", newPassword)
                .then(() => alert("Password reset successful!"))
                .catch(() => alert("Password reset failed!"));

            navigate("/auth/login");
        };

        contentBox = (
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField margin="normal" disabled fullWidth label="Email" defaultValue={email} variant="outlined" />
                <TextField
                    margin="normal"
                    required
                    type="password"
                    fullWidth
                    id="newPassword"
                    label="New Password"
                    name="newPassword"
                    autoComplete="current-password"
                    autoFocus
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, fontWeight: "bold" }}>
                    Confirm
                </Button>
            </Box>
        );
    } else {
        contentBox = (
            <Box component="form" noValidate sx={{ mt: 10 }}>
                <Typography component="h1" variant="h5" color="red" fontWeight={"bold"}>
                    Invalid Reset Password URL
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
                    <Typography component="h1" variant="h5" fontWeight={"bold"}>
                        Password Reset
                    </Typography>
                    {contentBox}
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default PasswordReset;
