import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import RoleSelect from "./pages/RoleSelect/RoleSelect";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import PasswordSuccess from "./pages/PasswordSuccess/PasswordSuccess";

export default function App() {
    return (
        <BrowserRouter>
            <MainRoutes />
        </BrowserRouter>
    );
}

function MainRoutes() {
    const navigate = useNavigate();

    // Shared states (for email + role during flow)
    const [selectedRole, setSelectedRole] = useState(null);
    const [resetEmail, setResetEmail] = useState("");

    return (
        <Routes>
            {/* Role Select */}
            <Route
                path="/"
                element={
                    <RoleSelect
                        onSelect={(role) => {
                            setSelectedRole(role);
                            navigate("/signup");
                        }}
                    />
                }
            />

            {/* Signup */}
            <Route
                path="/signup"
                element={
                    <Signup
                        role={selectedRole}
                        goBack={() => navigate("/")}
                        onSuccess={() => navigate("/login")}
                    />
                }
            />

            {/* Login */}
            <Route
                path="/login"
                element={
                    <Login
                        onLogin={() => navigate("/home")}
                        onForgotPassword={() => navigate("/forgot")}
                        onGoSignup={() => navigate("/signup")}
                    />
                }
            />

            {/* Forgot Password */}
            <Route
                path="/forgot"
                element={
                    <ForgotPassword
                        onContinueVerify={(email) => {
                            setResetEmail(email);
                            navigate("/verify");
                        }}
                    />
                }
            />

            {/* Enter Code + Reset Password */}
            <Route
                path="/verify"
                element={
                    <ResetPassword
                        email={resetEmail}
                        onPasswordReset={() => navigate("/password-success")}
                    />
                }
            />

            {/* Final Success Screen */}
            <Route
                path="/password-success"
                element={<PasswordSuccess onGoLogin={() => navigate("/login")} />}
            />

            {/* Fallback Route */}
            <Route
                path="*"
                element={<h2 style={{ padding: 40 }}>404 - Page Not Found</h2>}
            />
        </Routes>
    );
}
