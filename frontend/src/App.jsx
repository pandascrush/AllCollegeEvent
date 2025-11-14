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
    const [resetEmail, setResetEmail] = useState("");

    return (
        <Routes>

            {/* -------- ROLE SELECT SCREEN -------- */}
            <Route
                path="/" element={ <RoleSelect />}/>
            {/* -------- SIGNUP -------- */}
            <Route
                path="/signup"
                element={
                    <Signup
                        goBack={() => navigate("/")}
                        onSuccess={() => navigate("/login")}
                    />
                }
            />

            {/* -------- LOGIN -------- */}
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

            {/* -------- FORGOT PASSWORD -------- */}
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

            {/* -------- VERIFY + RESET PASSWORD -------- */}
            <Route
                path="/verify"
                element={
                    <ResetPassword
                        email={resetEmail}
                        onPasswordReset={() => navigate("/password-success")}
                    />
                }
            />

            {/* -------- SUCCESS -------- */}
            <Route
                path="/password-success"
                element={
                    <PasswordSuccess
                        onGoLogin={() => navigate("/login")}
                    />
                }
            />

            {/* -------- 404 -------- */}
            <Route
                path="*"
                element={<h2 style={{ padding: 40 }}>404 - Page Not Found</h2>}
            />

        </Routes>
    );
}
