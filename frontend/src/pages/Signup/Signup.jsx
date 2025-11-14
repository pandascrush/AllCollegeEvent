import React, { useState } from "react";
import "./Signup.css";
import InputBox from "../../components/InputBox/InputBox";
import AuthLayout from "../../components/Layout/AuthLayout";
import { authService } from "../../services/authService";

export default function Signup({ role, goBack, onSuccess }) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async () => {
        setError("");

        if (pass !== confirm) return setError("Passwords do not match.");

        try {
            const res = await authService.register({ email, password: pass, role });
            onSuccess(res.user);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <AuthLayout image="/images/signup.png">
            <h1>Join us Now!!</h1>
            <p>Let’s Create your account</p>

            <InputBox label="Email" value={email} onChange={setEmail} placeholder="Enter mail" />
            <InputBox label="Password" type="password" value={pass} onChange={setPass} placeholder="Enter password" />
            <InputBox label="Confirm Password" type="password" value={confirm} onChange={setConfirm} placeholder="Re-enter password" />

            {error && <div className="errorMsg">{error}</div>}

            <button className="primaryBtn" onClick={handleSignup}>Sign Up</button>
            <button className="backBtn" onClick={goBack}>Back</button>
        </AuthLayout>
    );
}
