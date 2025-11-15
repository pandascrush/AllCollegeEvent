import React, { useState } from "react";
import "./Signup.css";
import InputBox from "../../components/InputBox/InputBox";
import AuthLayout from "../../components/Layout/AuthLayout";
import { authService } from "../../services/authService";

export default function Signup({ role, goBack, onSuccess }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async () => {
        setError("");

        if (pass !== confirm) return setError("Passwords do not match.");

        try {
            const res = await authService.register({ name , email, password: pass, role });
            onSuccess(res.user);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <AuthLayout image="/images/signup.png">
             <div>
                <div className="login-title">Join us Now!!</div>
                <div className="login-para">Let’s Create your account</div>
            </div>

            <InputBox label="Name" value={name} onChange={setName} placeholder="Enter your name" />
            <InputBox label="Email" value={email} onChange={setEmail} placeholder="Enter your mail id" />
            <InputBox label="Password" type="password" value={pass} onChange={setPass} placeholder="Enter your password" />
            <InputBox label="Confirm Password" type="password" value={confirm} onChange={setConfirm} placeholder="Enter your password" />

            {error && <div className="errorMsg">{error}</div>}

            <button className="primaryBtn" onClick={handleSignup}>Sign Up</button>
            <div className="form-line">
                <div className="line"></div>
                <p>Or</p>
                <div className="line"></div>
            </div>
            <div className="signupRoute">
                Already have an Account!? <button className="signupLink" onClick={goBack}>Sign In</button>
            </div>
        </AuthLayout>
    );
}
