import React, { useState } from "react";
import "./ForgotPassword.css";
import InputBox from "../../components/InputBox/InputBox";
import AuthLayout from "../../components/Layout/AuthLayout";
import { authService } from "../../services/authService";

export default function ForgotPassword({ onContinueVerify }) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    const sendCode = async () => {
        setError("");
        try {
            await authService.forgot({ email });
            setMsg("Code sent to your mail");
            onContinueVerify(email);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <AuthLayout image="/images/login.png">
             <div>
                <div className="login-title">Forgot Password</div>
                <div className="login-para" style={{marginTop:"23px"}}>No worries, we’ll send you a code <br></br>to reset the password</div>
            </div>
            <InputBox label="Email" value={email} onChange={setEmail} placeholder="Enter your mail id" />

            {error && <div className="errorText">{error}</div>}
            {msg && <div className="successText">{msg}</div>}

            <button className="primaryBtn" onClick={sendCode}>Send Code</button>
        </AuthLayout>
    );
}
