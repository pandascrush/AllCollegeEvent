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
            <Route path="/" element={ <RoleSelect />}/>
            <Route path="/signup" element={<Signup goBack={() => navigate("/login")} onSuccess={() => navigate("/login")} />}/>
            <Route path="/login" element={<Login onLogin={() => navigate("/home")} onForgotPassword={() => navigate("/forgot")} onGoSignup={() => navigate("/signup")} />}/>
            <Route path="/forgot" element={ <ForgotPassword onContinueVerify={(email) => {setResetEmail(email); navigate("/verify");}}/>}/>
            <Route path="/verify" element={<ResetPassword email={resetEmail} onPasswordReset={() => navigate("/password-success")}/>}/>
            <Route path="/password-success" element={<PasswordSuccess onGoLogin={() => navigate("/login")}/>}/>
            <Route path="*" element={<h2 style={{ padding: 40 }}>404 - Page Not Found</h2>}/>
        </Routes>
    );
}
