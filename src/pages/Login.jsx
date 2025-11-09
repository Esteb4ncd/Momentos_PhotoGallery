import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Typography,
    Box,
    Grid,
    TextField,
    Checkbox,
    FormControlLabel,
    Link,
    Button,
    CircularProgress,
} from "@mui/material";
import { findUser, setCurrentUser } from "../utils/auth";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Load saved credentials on component mount
    useEffect(() => {
        const savedCredentials = localStorage.getItem("momentosRememberMe");
        if (savedCredentials) {
            const { email: savedEmail, rememberMe: savedRememberMe } =
                JSON.parse(savedCredentials);
            setEmail(savedEmail || "");
            setRememberMe(savedRememberMe || false);
        }
    }, []);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email/Username is required";
        } else if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (validateForm()) {
            setIsLoading(true);

            try {
                // Simulate authentication delay
                await new Promise((resolve) => setTimeout(resolve, 1500));

                // Try to find the user
                const user = findUser(email, password);

                if (!user) {
                    // Account not found or incorrect password
                    setErrors({
                        general:
                            "Account not found. Please check your email and password.",
                    });
                    setIsLoading(false);
                    return;
                }

                // Set as current user
                setCurrentUser(user);

                // Handle remember me functionality
                if (rememberMe) {
                    localStorage.setItem(
                        "momentosRememberMe",
                        JSON.stringify({
                            email: email,
                            rememberMe: true,
                        })
                    );
                } else {
                    localStorage.removeItem("momentosRememberMe");
                }

                console.log("Login successful:", user.fullName);

                // Navigate to profile page
                navigate("/profilepage");
            } catch (error) {
                console.error("Login error:", error);
                setErrors({ general: "Login failed. Please try again." });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
            }}
        >
            {/* Left Section - Branding */}
            <Box
                sx={{
                    flex: { xs: "0 0 30%", md: "0 0 50%" },
                    backgroundImage: "url(/momentos_loginpic2.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "left center",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    padding: {
                        xs: "40px 20px 20px 20px",
                        md: "120px 60px 0 60px",
                    },
                }}
            >
                <Box
                    sx={{
                        textAlign: "center",
                        width: "100%",
                        maxWidth: "400px",
                    }}
                >
                    <img
                        src='/Momentos_Wordmark.png'
                        alt='Momentos'
                        style={{
                            height: "auto",
                            width: "100%",
                            maxWidth: "350px",
                            filter: "brightness(0) invert(1)",
                            marginBottom: "16px",
                        }}
                    />
                    <Typography
                        variant='h5'
                        sx={{
                            fontWeight: "bold",
                            color: "white",
                            letterSpacing: "0.08em",
                            fontSize: {
                                xs: "1rem",
                                sm: "1.2rem",
                                md: "1.4rem",
                            },
                        }}
                    >
                        Connect with Photos
                    </Typography>
                </Box>
            </Box>

            {/* Right Section - Login Form */}
            <Box
                sx={{
                    flex: { xs: "1 1 auto", md: "0 0 50%" },
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: { xs: "40px 20px", sm: "40px 40px", md: "0 60px" },
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: { xs: "100%", sm: 450, md: 500 },
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant='h3'
                        component='h1'
                        sx={{
                            fontWeight: "bold",
                            color: "black",
                            fontSize: {
                                xs: "2rem",
                                sm: "2.2rem",
                                md: "2.5rem",
                            },
                            mb: 2,
                        }}
                    >
                        LOGIN
                    </Typography>
                    <Typography
                        variant='h6'
                        sx={{
                            fontWeight: "bold",
                            color: "black",
                            fontSize: {
                                xs: "0.9rem",
                                sm: "1rem",
                                md: "1.1rem",
                            },
                            mb: 4,
                        }}
                    >
                        Welcome back! Please login to your account
                    </Typography>

                    {/* Input Fields */}
                    <Box sx={{ textAlign: "left", mb: 3 }}>
                        <Typography
                            variant='body2'
                            sx={{
                                fontWeight: "bold",
                                color: "black",
                                mb: 1,
                            }}
                        >
                            EMAIL/USERNAME
                        </Typography>
                        <TextField
                            fullWidth
                            variant='outlined'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                    border:
                                        errors.email ? "1px solid #f44336" : (
                                            "1px solid black"
                                        ),
                                    "& fieldset": {
                                        border: "none",
                                    },
                                    "&:hover fieldset": {
                                        border: "none",
                                    },
                                    "&.Mui-focused fieldset": {
                                        border: "none",
                                    },
                                },
                                "& .MuiOutlinedInput-input": {
                                    padding: "12px 14px",
                                },
                                "& .MuiFormHelperText-root": {
                                    color: "#f44336",
                                    fontWeight: "bold",
                                    marginLeft: 0,
                                },
                            }}
                        />
                    </Box>

                    <Box sx={{ textAlign: "left", mb: 3 }}>
                        <Typography
                            variant='body2'
                            sx={{
                                fontWeight: "bold",
                                color: "black",
                                mb: 1,
                            }}
                        >
                            PASSWORD
                        </Typography>
                        <TextField
                            fullWidth
                            type='password'
                            variant='outlined'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                    border:
                                        errors.password ? "1px solid #f44336"
                                        :   "1px solid black",
                                    "& fieldset": {
                                        border: "none",
                                    },
                                    "&:hover fieldset": {
                                        border: "none",
                                    },
                                    "&.Mui-focused fieldset": {
                                        border: "none",
                                    },
                                },
                                "& .MuiOutlinedInput-input": {
                                    padding: "12px 14px",
                                },
                                "& .MuiFormHelperText-root": {
                                    color: "#f44336",
                                    fontWeight: "bold",
                                    marginLeft: 0,
                                },
                            }}
                        />
                    </Box>

                    {/* Remember Me and Forgot Password */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 4,
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={rememberMe}
                                    onChange={(e) =>
                                        setRememberMe(e.target.checked)
                                    }
                                    sx={{
                                        color: "black",
                                        "&.Mui-checked": {
                                            color: "black",
                                        },
                                        padding: "4px 8px 4px 0",
                                    }}
                                />
                            }
                            label={
                                <Typography
                                    variant='body2'
                                    sx={{
                                        fontWeight: "bold",
                                        color: "black",
                                    }}
                                >
                                    Remember me
                                </Typography>
                            }
                        />
                        <Link
                            href='#'
                            sx={{
                                color: "black",
                                textDecoration: "none",
                                fontWeight: "bold",
                                fontSize: "0.875rem",
                                "&:hover": {
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            Forgot password?
                        </Link>
                    </Box>

                    {/* General Error Display */}
                    {errors.general && (
                        <Typography
                            variant='body2'
                            sx={{
                                color: "#f44336",
                                fontWeight: "bold",
                                textAlign: "center",
                                mb: 2,
                                p: 1,
                                backgroundColor: "#ffebee",
                                borderRadius: "5px",
                                border: "1px solid #f44336",
                            }}
                        >
                            {errors.general}
                        </Typography>
                    )}

                    {/* Login Button */}
                    <Button
                        fullWidth
                        variant='contained'
                        color='primary'
                        onClick={handleLogin}
                        disabled={isLoading}
                        sx={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            py: 1.5,
                            mb: 3,
                            borderRadius: "10px",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#3d2f9e",
                            },
                            "&:disabled": {
                                backgroundColor: "#cccccc",
                                color: "#666666",
                            },
                        }}
                    >
                        {isLoading ?
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <CircularProgress
                                    size={20}
                                    sx={{ color: "#666666" }}
                                />
                                <span>Logging in...</span>
                            </Box>
                        :   "LOGIN"}
                    </Button>

                    {/* Sign Up Link */}
                    <Typography
                        variant='body2'
                        sx={{
                            fontWeight: "bold",
                            color: "black",
                            textAlign: "center",
                        }}
                    >
                        Don't have an account?{" "}
                        <Link
                            onClick={() => navigate("/signup")}
                            sx={{
                                color: "black",
                                textDecoration: "none",
                                cursor: "pointer",
                                "&:hover": {
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            SIGN UP
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
