import React, { useState } from "react";
import "./Signup.css";
import InputBox from "../../components/InputBox/InputBox";
import AuthLayout from "../../components/Layout/AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signup({ role, goBack, onSuccess }) {
  const dispatch = useDispatch();
  const isOrganizer = role === "organizer";

  const sideImage = isOrganizer
    ? "/images/or_signup.png" 
    : "/images/signup.png";       

  // Field labels (dynamic)
  const labelName = isOrganizer ? "Organization Name" : "Name";
  const labelEmail = isOrganizer ? "Domain Mail ID" : "Email";
  const placeName = isOrganizer ? "Enter organization name" : "Enter your name";
  const placeEmail = isOrganizer ? "Enter your domain mail" : "Enter your mail id";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [localError, setLocalError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { loading, error } = useSelector((state) => state.auth);

  const handleSignup = async () => {
    setLocalError("");

    if (!name || !email || !pass || !confirm) {
      return setLocalError("All fields are required.");
    }

    if (pass.length < 8) {
      return setLocalError("Password must be at least 8 characters.");
    }

    if (pass !== confirm) {
      return setLocalError("Passwords do not match.");
    }

    const userData = {
      name,
      email,
      password: pass,
      role: role, 
    };

    const result = await dispatch(registerUser(userData));

    if (registerUser.fulfilled.match(result)) {
      onSuccess(result.payload.user);
    } else if (registerUser.rejected.match(result)) {
      setLocalError(result.payload || "Registration failed.");
    } else {
      setLocalError("Unexpected error. Try again.");
    }
  };

  return (
    <AuthLayout image={sideImage}>
      <div>
        <div className="login-title">
          {isOrganizer ? "Join as Organizer" : "Join us Now!!"}
        </div>

        <div className="login-para">
          {isOrganizer ? "Create your organizer account" : "Let’s Create your account"}
        </div>
      </div>

      <InputBox
        label={labelName}
        value={name}
        onChange={setName}
        placeholder={placeName}
      />

      <InputBox
        label={labelEmail}
        value={email}
        onChange={setEmail}
        placeholder={placeEmail}
      />

      <div className="password-wrapper">
        <InputBox
          label="Password"
          type={showPass ? "text" : "password"}
          value={pass}
          onChange={setPass}
          placeholder="Enter your password"
        />
        <span className="eye-icon" onClick={() => setShowPass(!showPass)}>
          {showPass ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <div className="password-wrapper">
        <InputBox
          label="Confirm Password"
          type={showConfirm ? "text" : "password"}
          value={confirm}
          onChange={setConfirm}
          placeholder="Enter your password"
        />
        <span className="eye-icon" onClick={() => setShowConfirm(!showConfirm)}>
          {showConfirm ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {(localError || error) && (
        <div className="errorMsg">{localError || error}</div>
      )}

      <button className="primaryBtn" onClick={handleSignup} disabled={loading}>
        {loading ? "Creating..." : isOrganizer ? "Organizer Sign Up" : "Sign Up"}
      </button>

      <div className="form-line">
        <div className="line"></div>
        <p>Or</p>
        <div className="line"></div>
      </div>

      <div className="signupRoute">
        Already have an Account!?{" "}
        <button className="signupLink" onClick={goBack}>
          Sign In
        </button>
      </div>
    </AuthLayout>
  );
}
