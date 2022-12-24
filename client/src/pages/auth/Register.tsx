import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
    Avatar,
    Box,
    Button,
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
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { Copyright } from "@internals/components";
import { useAuth } from "@internals/hooks";
import { login, register } from "@internals/services";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const Register: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { auth, setAuth } = useAuth();

    const from = location.state?.from?.pathname || "/";

    const [formErrors, setFormErrors] = useState(new Map());

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = getFormData(event);

        validateFormData(formData)
            .then((data) => {
                setFormErrors(new Map());

                register(data)
                    .then(() => {
                        return login(data.email, data.passwordHash);
                    })
                    .then((data) => {
                        setAuth(data.accessToken, data.userType);
                        navigate(from);
                    })
                    .catch((err) => {
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
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            userName: formData.get("username") as string,
            passwordHash: formData.get("password") as string,
            gender: formData.get("gender-radio-buttons-group") as string
        };
        return data;
    };

    const validateFormData = (
        data: any
    ): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        userName: string;
        passwordHash: string;
        gender: string;
    }> => {
        const validationSchema = Yup.object().shape({
            firstName: Yup.string().max(255).required("First name is required"),
            lastName: Yup.string().max(255).required("Last name is required"),
            email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
            userName: Yup.string().max(255).required("Username is required"),
            passwordHash: Yup.string().max(255).required("Password is required")
        });

        return new Promise((resolve, reject) => {
            validationSchema
                .validate(data, { abortEarly: false })
                .then(() => {
                    resolve(data);
                })
                .catch((errors) => {
                    const validationErrors = new Map();
                    errors.inner.forEach((error: any) => {
                        validationErrors.set(error.path, error.message);
                    });
                    reject(validationErrors);
                });
        });
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

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/auth/login">Already have an account? Sign in</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
};

export default Register;
