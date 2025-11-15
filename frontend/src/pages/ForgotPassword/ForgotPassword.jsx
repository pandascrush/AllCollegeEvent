import React, { useState } from "react";
import "./ForgotPassword.css";
import InputBox from "../../components/InputBox/InputBox";
import AuthLayout from "../../components/Layout/AuthLayout";
import { authService } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    // =============== SEND CODE =================
    const sendCode = async () => {
        if (!email) return setError("Enter email");
        setError("");
        try {
            await authService.forgot({ email });
            setMsg("Code sent to your email");
            setPage(2);
        } catch (err) {
            setError(err.message);
        }
    };

    // =============== VERIFY OTP =================
    const verifyCode = async () => {
        const code = otp.join("");
        if (code.length !== 4) return setError("Enter complete code");

        try {
            await authService.verifyCode({ email, code });
            setPage(3);
        } catch (err) {
            setError(err.message);
        }
    };

    // =============== RESET PASSWORD =================
    const resetFinal = async () => {
        if (newPassword !== confirmPass)
            return setError("Passwords do not match");

        try {
            await authService.resetPassword({ email, password: newPassword });
            setPage(4);
        } catch (err) {
            setError(err.message);
        }
    };

    // ========== HANDLE OTP INPUT ==========
    const handleOtpInput = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    // ===============  UI SCREENS =================
    return (
        <AuthLayout image="/images/forgotpassword.png">

            {/* =========== SCREEN 1: ENTER EMAIL =========== */}
            {page === 1 && (
                <>
                    <div className="fp-title">Forgot Password</div>
                    <div className="fp-sub">
                        No worries, we’ll send you a code <br /> to reset the password
                    </div>

                    <InputBox
                        label="Email"
                        value={email}
                        onChange={setEmail}
                        placeholder="Enter your mail id"
                    />

                    {error && <div className="errorText">{error}</div>}
                    {msg && <div className="successText">{msg}</div>}

                    <button className="primaryBtn" onClick={sendCode}>
                        Send Code
                    </button>
                </>
            )}

            {/* =========== SCREEN 2: OTP =========== */}
            {page === 2 && (
                <>
                    <div className="fp-title">Forgot Password</div>
                    <div className="fp-sub">
                        Enter the verification code sent to your email
                    </div>

                    <div className="codeBoxes">
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                maxLength="1"
                                value={value}
                                onChange={(e) => handleOtpInput(e.target.value, index)}
                                className="codeBox"
                            />
                        ))}
                    </div>

                    {error && <div className="errorText">{error}</div>}

                    <button className="primaryBtn" onClick={verifyCode} style={{marginTop:"60px"}}>
                        Continue
                    </button>
                </>
            )}

            {/* =========== SCREEN 3: SET NEW PASSWORD =========== */}
            {page === 3 && (
                <>
                    <div className="fp-title">Set New Password</div>
                    <div className="fp-sub">Must be at least 8 characters</div>

                    <InputBox
                        type="password"
                        label="Set new password"
                        value={newPassword}
                        onChange={setNewPassword}
                        placeholder="Enter your new password"
                    />

                    <InputBox
                        type="password"
                        label="Confirm password"
                        value={confirmPass}
                        onChange={setConfirmPass}
                        placeholder="Re-enter password"
                    />

                    {error && <div className="errorText">{error}</div>}

                    <button className="primaryBtn" onClick={resetFinal}>
                        Continue
                    </button>
                </>
            )}

            {/* =========== SCREEN 4: PASSWORD SUCCESS =========== */}
            {page === 4 && (
                <div className="successContainer">
                    <h1>Password Changed!</h1>
                    <p>Your password has been successfully updated</p>
{/* 
                    <button className="primaryBtn" onClick={() => navigate("/login")}>
                        Sign In
                    </button> */}
                </div>
            )}

            {/* ============ PAGE INDICATOR ============ */}
            <div className="pageIndicator">
                <span className={page === 1 ? "active" : ""}>1</span>
                <span className={page === 2 ? "active" : ""}>2</span>
                <span className={page === 3 ? "active" : ""}>3</span>
                <span className={page === 4 ? "active" : ""}>4</span>
            </div>
        </AuthLayout>
    );
}
