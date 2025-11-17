import React, { useState } from "react";
import "./ForgotPassword.css";
import InputBox from "../../components/InputBox/InputBox";
import AuthLayout from "../../components/Layout/AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  sendForgotCode,
  verifyForgotCode,
  resetForgotPassword,
} from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [msg, setMsg] = useState("");

  const [tempToken, setTempToken] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // SEND CODE
  const sendCode = async () => {
    if (!email) return setMsg("Enter email");

    const res = await dispatch(sendForgotCode({ email }));

    if (res.meta.requestStatus === "fulfilled") {
      setMsg("Code sent to your email");
      setPage(2);
    }
  };

  // VERIFY CODE
  const verifyCode = async () => {
    const code = otp.join(""); // ← use the state variable "otp" safely

    const res = await dispatch(verifyForgotCode({ email, otp: code }));

    if (res.meta.requestStatus === "fulfilled") {
      setTempToken(res.payload.tempToken);
      setMsg("")
      setPage(3);
    }
  };

  // RESET PASSWORD
  const resetFinal = async () => {
    if (newPassword !== confirmPass) {
      return setMsg("Passwords do not match");
    }

    const res = await dispatch(
      resetForgotPassword({ tempToken, password: newPassword })
    );

    if (res.meta.requestStatus === "fulfilled") {
      setPage(4);
    }
  };

  // OTP input
  const handleOtpInput = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <AuthLayout image="/images/forgotpassword.png">
      {/* SCREEN 1 */}
      {page === 1 && (
        <>
          <div className="fp-title">Forgot Password</div>
          <div className="fp-sub">
            No worries, we’ll send you a code <br /> to reset your password
          </div>

          <InputBox
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="Enter your mail id"
          />

          {msg && <div className="successText">{msg}</div>}
          {error && <div className="errorText">{error}</div>}

          <button className="primaryBtn" onClick={sendCode}>
            {loading ? "Sending..." : "Send Code"}
          </button>
        </>
      )}

      {/* SCREEN 2: OTP */}
      {page === 2 && (
        <>
          <div className="fp-title">Enter Code</div>
          <div className="fp-sub">
            Check your email for the verification code
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

          <button className="primaryBtn" onClick={verifyCode}>
            {loading ? "Verifying..." : "Continue"}
          </button>
        </>
      )}

      {/* SCREEN 3: NEW PASSWORD */}
      {page === 3 && (
        <>
          <div className="fp-title">Set New Password</div>
          <div className="fp-sub">Must be at least 8 characters</div>

          {/* NEW PASSWORD */}
          <div className="passwordWrapper">
            <InputBox
              type={showNewPass ? "text" : "password"}
              label="New Password"
              value={newPassword}
              onChange={setNewPassword}
              placeholder="Enter new password"
            />

            <span
              className="eyeIcon"
              onClick={() => setShowNewPass(!showNewPass)}
            >
              {showNewPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="passwordWrapper">
            <InputBox
              type={showConfirmPass ? "text" : "password"}
              label="Confirm Password"
              value={confirmPass}
              onChange={setConfirmPass}
              placeholder="Re-enter password"
            />

            <span
              className="eyeIcon"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            >
              {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {msg && <div className="errorText">{msg}</div>}
          {error && <div className="errorText">{error}</div>}

          <button className="primaryBtn" onClick={resetFinal}>
            {loading ? "Saving..." : "Continue"}
          </button>
        </>
      )}

      {/* SCREEN 4: SUCCESS */}
      {page === 4 && (
        <div className="successContainer">
          <h1>Password Changed!</h1>
          <p>Your password has been successfully updated</p>

          <button className="primaryBtn" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      )}

      {/* PAGE STEPS */}
      <div className="pageIndicator">
        <span className={page === 1 ? "active" : ""}>1</span>
        <span className={page === 2 ? "active" : ""}>2</span>
        <span className={page === 3 ? "active" : ""}>3</span>
        <span className={page === 4 ? "active" : ""}>4</span>
      </div>
    </AuthLayout>
  );
}
