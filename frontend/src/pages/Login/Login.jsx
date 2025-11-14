import React, { useState } from "react";
import "./Login.css";
import InputBox from "../../components/InputBox/InputBox";
import AuthLayout from "../../components/Layout/AuthLayout";
import { authService } from "../../services/authService";

export default function Login({ onLogin, onForgotPassword, onGoSignup }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");
        try {
            const res = await authService.login({ email, password });
            onLogin(res.user, res.token);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <AuthLayout image="/images/login.png">
            <h1>Welcome Back</h1>
            <p>Please login to your account</p>

            <InputBox label="Email" value={email} onChange={setEmail} placeholder="Enter your email" />
            <InputBox label="Password" type="password" value={password} onChange={setPassword} placeholder="Enter password" />

            <div className="loginLinks">
                <span></span>
                <button className="forgotLink" onClick={onForgotPassword}>Forgot Password?</button>
            </div>

            {error && <div className="errorText">{error}</div>}

            <button className="primaryBtn" onClick={handleLogin}>Sign In</button>

            <div className="signupRoute">
                Don't have an account? <button className="signupLink" onClick={onGoSignup}>Sign Up</button>
            </div>
        </AuthLayout>
    );
}
