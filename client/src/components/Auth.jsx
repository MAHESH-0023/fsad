import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthPage = () => {
    const [isRegisterMode, setIsRegisterMode] = useState(true);
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [authToken, setAuthToken] = useState(localStorage.getItem("jwt") || null);
    const [currentUsername, setCurrentUsername] = useState(localStorage.getItem("username") || null);
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setCurrentUsername(localStorage.getItem("username"));
    }, []);

    const handleInputChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const endpoint = isRegisterMode ? "/auth/register" : "/auth/login";
        setIsLoading(true);
        setAuthError("");

        try {
            const response = await axios.post(`http://localhost:9090${endpoint}`, credentials);
            if (!isRegisterMode) {
                localStorage.setItem("jwt", response.data.token);
                localStorage.setItem("username", credentials.username);
                setAuthToken(response.data.token);
                setCurrentUsername(credentials.username);
                navigate("/cars");
            }
            alert(`${isRegisterMode ? "Registration" : "Login"} successful!`);
        } catch (error) {
            setAuthError(error.response?.data?.message || "Something went wrong, please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogoutAction = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("username");
        setAuthToken(null);
        setCurrentUsername(null);
        navigate("/auth");
        alert("Logged out successfully!");
    };

    return (
        <div style={authPageStyles.wrapper}>
            <div style={authPageStyles.cardWrapper}>
                {authToken ? (
                    <>
                        <h2 style={authPageStyles.heading}>Hello, {currentUsername}!</h2>
                        <button onClick={handleLogoutAction} style={authPageStyles.logoutButton}>Logout</button>
                    </>
                ) : (
                    <>
                        <h2 style={authPageStyles.heading}>{isRegisterMode ? "Create Account" : "Sign In"}</h2>
                        <form onSubmit={handleFormSubmit} style={authPageStyles.formWrapper}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={handleInputChange}
                                required
                                style={authPageStyles.inputField}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleInputChange}
                                required
                                style={authPageStyles.inputField}
                            />
                            {authError && <p style={authPageStyles.errorMessage}>{authError}</p>}
                            <button type="submit" style={authPageStyles.submitButton} disabled={isLoading}>
                                {isLoading ? "Processing..." : isRegisterMode ? "Register" : "Login"}
                            </button>
                        </form>
                        <button onClick={() => setIsRegisterMode(!isRegisterMode)} style={authPageStyles.toggleLink}>
                            {isRegisterMode ? "Already have an account? Log in" : "New here? Register"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

// Updated styling
const authPageStyles = {
    wrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #4CAF50, #8BC34A)",
    },
    cardWrapper: {
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        width: "320px",
    },
    heading: {
        marginBottom: "25px",
        color: "#333",
        fontSize: "24px",
    },
    formWrapper: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    inputField: {
        padding: "14px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        fontSize: "16px",
        outline: "none",
        transition: "border-color 0.3s ease",
    },
    submitButton: {
        padding: "14px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        fontSize: "16px",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    toggleLink: {
        marginTop: "20px",
        background: "none",
        border: "none",
        color: "#4CAF50",
        cursor: "pointer",
        fontSize: "15px",
        textDecoration: "underline",
    },
    errorMessage: {
        color: "red",
        fontSize: "14px",
        textAlign: "center",
    },
    logoutButton: {
        padding: "10px 20px",
        backgroundColor: "#f44336",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
    }
};

export default AuthPage;
