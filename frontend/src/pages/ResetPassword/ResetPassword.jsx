import React, { useState } from "react";
import "./ResetPassword.css";
import InputBox from "../../components/InputBox/InputBox";
import AuthLayout from "../../components/Layout/AuthLayout";
import { authService } from "../../services/authService";

export default function ResetPassword({ email, onPasswordReset }) {
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [tempToken, setTempToken] = useState("");
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");

    const verifyCode = async () => {
        try {
            const res = await authService.verifyCode({ email, code });
            setTempToken(res.tempToken);
            setStep(2);
        } catch (err) {
            setError(err.message);
        }
    };

    const resetFinal = async () => {
        if (newPassword !== confirmPass) return setError("Passwords do not match");

        try {
            await authService.resetPassword({ tempToken, password: newPassword });
            onPasswordReset();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <AuthLayout image="/images/login.png">
            {step === 1 && (
                <>
                    <div>
                        <div className="login-title">Forgot Password</div>
                        <div className="login-para" style={{ marginTop: "23px" }}>No worries, we’ll send you a code <br></br>to reset the password</div>
                    </div>

                    <div className="codeBoxes">
                        <div className="codeBox">{code[0] || ""}</div>
                        <div className="codeBox">{code[1] || ""}</div>
                        <div className="codeBox">{code[2] || ""}</div>
                        <div className="codeBox">{code[3] || ""}</div>
                    </div>

                    {error && <div className="errorText">{error}</div>}

                    <button className="primaryBtn" onClick={verifyCode}>Continue</button>
                </>
            )}

            {step === 2 && (
                <>
                    <h1>Set New Password</h1>
                    <p>Must be minimum 8 characters</p>

                    <InputBox type="password" label="New password" value={newPassword} onChange={setNewPassword} placeholder="Enter new password" />
                    <InputBox type="password" label="Confirm password" value={confirmPass} onChange={setConfirmPass} placeholder="Re-enter password" />

                    {error && <div className="errorText">{error}</div>}

                    <button className="primaryBtn" onClick={resetFinal}>Continue</button>
                </>
            )}
        </AuthLayout>
    );
}
