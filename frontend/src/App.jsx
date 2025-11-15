import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import RoleSelect from "./pages/RoleSelect/RoleSelect";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

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

            {/* FIRST SCREEN = DASHBOARD */}
            <Route path="/" element={<Dashboard />} />

            {/* ROLE SELECT (optional if needed later) */}
            <Route path="/role" element={<RoleSelect />} />

            {/* SIGNUP */}
            <Route
                path="/signup"
                element={
                    <Signup
                        goBack={() => navigate("/login")}
                        onSuccess={() => navigate("/login")}
                    />
                }
            />

            {/* LOGIN */}
            <Route
                path="/login"
                element={
                    <Login
                        onLogin={() => navigate("/")}
                        onForgotPassword={() => navigate("/forgot")}
                        onGoSignup={() => navigate("/signup")}
                    />
                }
            />

            {/* FORGOT PASSWORD (ONE FILE WITH ALL STEPS INSIDE) */}
            <Route
                path="/forgot"
                element={<ForgotPassword />}
            />

            {/* 404 PAGE */}
            <Route
                path="*"
                element={<h2 style={{ padding: 40 }}>404 - Page Not Found</h2>}
            />

        </Routes>
    );
}
