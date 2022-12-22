import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate, Link } from "react-router-dom";

import { useAuth } from "@internals/hooks";
import { login } from "@internals/services";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: ["Inter", "sans-serif"].join(",")
    }
});

const Login: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { setAuth } = useAuth();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        login(data.get("email") as string, data.get("password") as string)
            .then((data) => {
                setAuth(data.accessToken, data.userType);
                navigate(from);
            })
            .catch((err) => {
                alert(err.message);
            });
    };

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
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
