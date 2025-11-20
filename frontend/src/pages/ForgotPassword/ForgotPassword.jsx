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

export default function ForgotPassword({ role }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isOrganizer = role === "organizer";
  const userImage = "/images/forgotpassword.png";
  const orgStepImages = {
    1: "/images/or_forgotpassword.png",
    2: "/images/or_forgotpassword.png",
    3: "/images/or_forgotpasswordnextimage.png",
    4: "/images/or_passwordsuccess.png",
  };

  // LABEL & PLACEHOLDERS BASED ON ROLE
  const emailLabel = isOrganizer ? "Domain Mail ID" : "Email";
  const emailPlaceholder = isOrganizer
    ? "Enter your domain mail"
    : "Enter your mail id";

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

  const sideImage = isOrganizer ? orgStepImages[page] : userImage;
  // SEND CODE
  const sendCode = async () => {
    if (!email)
      return setMsg(isOrganizer ? "Enter domain mail" : "Enter email");

    const res = await dispatch(
      sendForgotCode({ email, role: isOrganizer ? 2 : 4 })
    );

    if (res.meta.requestStatus === "fulfilled") {
      setMsg("Code sent successfully");
      setPage(2);
    }
  };

  // VERIFY OTP
  const verifyCode = async () => {
    const code = otp.join("");

    const res = await dispatch(
      verifyForgotCode({ email, otp: code, role: isOrganizer ? 2 : 4 })
    );

    if (res.meta.requestStatus === "fulfilled") {
      setTempToken(res.payload.tempToken);
      setMsg("");
      setPage(3);
    }
  };

  // RESET PASSWORD
  const resetFinal = async () => {
    if (newPassword !== confirmPass) {
      return setMsg("Passwords do not match");
    }

    const res = await dispatch(
      resetForgotPassword({
        tempToken,
        password: newPassword,
        role: isOrganizer ? 2 : 4,
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      setPage(4);
    }
  };

  // OTP INPUT HANDLING
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
    <AuthLayout image={sideImage}>
      {/* STEP 1 — ENTER EMAIL/DOMAIN */}
      {page === 1 && (
        <>
          <div className="fp-title">
            {isOrganizer ? "Organizer Password Reset" : "Forgot Password"}
          </div>

          <div className="fp-sub">
            {isOrganizer
              ? "We’ll send you a verification code"
              : "We’ll send you a code to reset your password"}
          </div>

          <InputBox
            label={emailLabel}
            value={email}
            onChange={setEmail}
            placeholder={emailPlaceholder}
          />

          {msg && <div className="successText">{msg}</div>}
          {error && <div className="errorText">{error}</div>}

          <button className="primaryBtn" onClick={sendCode}>
            {loading ? "Sending..." : "Send Code"}
          </button>
        </>
      )}

      {/* STEP 2 — ENTER OTP */}
      {page === 2 && (
        <>
          <div className="fp-title">Enter Code</div>
          <div className="fp-sub">
            {isOrganizer
              ? "Check your domain mail for the code"
              : "Check your email for the verification code"}
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

      {/* STEP 3 — SET NEW PASSWORD */}
      {page === 3 && (
        <>
          <div className="fp-title">
            {isOrganizer ? "Set New Organizer Password" : "Set New Password"}
          </div>
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

      {/* STEP 4 — SUCCESS */}
      {page === 4 && (
        <div className="successContainer">
          <h1>Password Changed!</h1>
          <p>Your password has been successfully updated</p>

          <button
            className="primaryBtn"
            onClick={() =>
              navigate(isOrganizer ? "/organizer/login" : "/login")
            }
          >
            Sign In
          </button>
        </div>
      )}

      {/* STEP INDICATOR */}
      <div className="pageIndicator">
        <span className={page === 1 ? "active" : ""}>1</span>
        <span className={page === 2 ? "active" : ""}>2</span>
        <span className={page === 3 ? "active" : ""}>3</span>
        <span className={page === 4 ? "active" : ""}>4</span>
      </div>
    </AuthLayout>
  );
}
