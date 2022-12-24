import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
    Alert,
    AlertTitle,
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate, Link, Navigate } from "react-router-dom";
import * as Yup from "yup";

import { useAuth } from "@internals/hooks";
import { login } from "@internals/services";
import { LoginData } from "@internals/types";
import { validateFormData } from "@internals/utils";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: ["Inter", "sans-serif"].join(",")
    }
});

const Login: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { auth, setAuth } = useAuth();

    const from = location.state?.from?.pathname || "/";

    const [formErrors, setFormErrors] = useState(new Map());
    const [alertMsg, setAlertMsg] = useState(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = getFormData(event);

        validateFormData(formData, validationRules)
            .then((data) => {
                setFormErrors(new Map());
                setAlertMsg(null);

                const validatedData = data as unknown as LoginData;

                login(validatedData.email, validatedData.password)
                    .then((data) => {
                        setAuth(data.accessToken, data.userType);
                        navigate(from);
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
                            setAlertMsg("Invalid email or password");
                        } else {
                            setAlertMsg("Something went wrong, please try again later");
                        }
                        console.log(err);
                    });
            })
            .catch((errors) => {
                setFormErrors(errors);
            });
    };

    const getFormData = (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get("email") as string,
            password: formData.get("password") as string
        };
        return data;
    };

    const validationRules = {
        email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
        password: Yup.string().max(255).required("Password is required")
    };

    if (auth.isLoggedIn) {
        return <Navigate to={from} />;
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
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={formErrors.has("email")}
                            helperText={formErrors.get("email")}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={formErrors.has("password")}
                            helperText={formErrors.get("password")}
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, fontWeight: "bold" }}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/auth/forgot">Forgot password?</Link>
                            </Grid>
                            <Grid item>
                                <Link to={"/auth/register"}>{"Don't have an account? Sign Up"}</Link>
                            </Grid>
                        </Grid>
                        {alertMsg && (
                            <Box sx={{ mt: 3 }}>
                                <Alert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    {alertMsg}
                                </Alert>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
