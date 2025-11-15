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

    const handleGoogleLogin = async () => {
        setError("");
        try {
            // Implement Google OAuth here
            console.log("Google login clicked");
            // You can integrate with Google OAuth service
            // For example: await authService.googleLogin();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <AuthLayout image="/images/login.png">
            <div>
                <div className="login-title">Welcome Back</div>
                <div className="login-para">Please login to your account</div>
            </div>

            <InputBox 
                label="Email" 
                value={email} 
                onChange={setEmail} 
                placeholder="Enter your email" 
            />
            <InputBox 
                label="Password" 
                type="password" 
                value={password} 
                onChange={setPassword} 
                placeholder="Enter password" 
            />

            <div className="loginLinks">
                <button className="forgotLink" onClick={onForgotPassword}>
                    Forgot Password?
                </button>
            </div>

            {error && <div className="errorText">{error}</div>}

            <button className="primaryBtn" onClick={handleLogin}>
                Sign In
            </button>

            {/* Google Login Button */}
            <button className="googleBtn" onClick={handleGoogleLogin}>
                <svg className="googleIcon" viewBox="0 0 24 24" width="18" height="18">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Connect with Google
            </button>

            <div className="form-line">
                <div className="line"></div>
                <p>Or</p>
                <div className="line"></div>
            </div>

            <div className="signupRoute">
                Don't have an account? 
                <button className="signupLink" onClick={onGoSignup}>
                    Sign Up
                </button>
            </div>
        </AuthLayout>
    );
}