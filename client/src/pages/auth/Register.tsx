import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import {
    Alert,
    AlertTitle,
    Avatar,
    Box,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { useAuth } from "@internals/hooks";
import { login, register } from "@internals/services";
import { RegistrationData } from "@internals/types";
import { validateFormData } from "@internals/utils";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: ["Inter", "sans-serif"].join(",")
    }
});

const Register: React.FC = () => {
    const navigate = useNavigate();

    const { auth, setAuth } = useAuth();

    const [formErrors, setFormErrors] = useState(new Map());
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setFormErrors(new Map());
        setShowAlert(false);

        const formData = getFormData(event);

        validateFormData(formData, validationRules)
            .then(async (data) => {
                const validatedData = data as unknown as RegistrationData;

                await register(validatedData)
                    .then(() => {
                        return login(validatedData.email, validatedData.passwordHash);
                    })
                    .then((data) => {
                        setAuth(data.accessToken, data.userType);
                        navigate("/privacy-policy");
                    })
                    .catch((err) => {
                        if (err.response?.status === 400 && err.response?.data?.error?.code === 11000) {
                            const field = Object.entries(err.response.data.error.keyPattern)[0][0].toLowerCase();
                            setFormErrors(
                                "username" === field
                                    ? new Map([["userName", "Username already taken"]])
                                    : new Map([["email", "Email already taken"]])
                            );
                        } else {
                            setShowAlert(true);
                        }
                    });
            })
            .catch((errors) => {
                setFormErrors(errors);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getFormData = (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const data = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            userName: formData.get("username") as string,
            passwordHash: formData.get("password") as string,
            gender: formData.get("gender-radio-buttons-group") as string
        };
        return data;
    };

    const validationRules = {
        firstName: Yup.string().max(255).required("First name is required"),
        lastName: Yup.string().max(255).required("Last name is required"),
        email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
        userName: Yup.string().max(255).required("Username is required"),
        passwordHash: Yup.string().max(255).required("Password is required")
    };

    if (auth.isLoggedIn) {
        return <Navigate to="/" />;
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
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    error={formErrors.has("firstName")}
                                    helperText={formErrors.get("firstName")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    error={formErrors.has("lastName")}
                                    helperText={formErrors.get("lastName")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    error={formErrors.has("email")}
                                    helperText={formErrors.get("email")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    error={formErrors.has("userName")}
                                    helperText={formErrors.get("userName")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    error={formErrors.has("passwordHash")}
                                    helperText={formErrors.get("passwordHash")}
                                />
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-start">
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="male"
                                name="gender-radio-buttons-group"
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                            </RadioGroup>
                        </Grid>

                        <LoadingButton
                            loading={loading}
                            type="submit"
                            sx={{ mt: 3, mb: 2, width: "100%" }}
                            variant="contained"
                        >
                            Sign up
                        </LoadingButton>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/auth/login">Already have an account? Sign in</Link>
                            </Grid>
                        </Grid>
                        {showAlert && (
                            <Box sx={{ mt: 3 }}>
                                <Alert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    Something went wrong — <strong>please try again!</strong>
                                </Alert>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Register;
