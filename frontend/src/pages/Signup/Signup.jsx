import React, { useState } from "react";
import "./Signup.css";
import InputBox from "../../components/InputBox/InputBox";
import AuthLayout from "../../components/Layout/AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signup({ role, goBack, onSuccess }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [localError, setLocalError] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ⭐ Redux auth state
  const { loading, error } = useSelector((state) => state.auth);

  const handleSignup = async () => {
    setLocalError("");

    // Required validation
    if (!name || !email || !pass || !confirm) {
      return setLocalError("All fields are required.");
    }

    // Password length
    if (pass.length < 8) {
      return setLocalError("Password must be at least 8 characters.");
    }

    // Confirm password
    if (pass !== confirm) {
      return setLocalError("Passwords do not match.");
    }

    const userData = { name, email, password: pass, role: 4 };
    // console.log(userData);

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
    <AuthLayout image="/images/signup.png">
      <div>
        <div className="login-title">Join us Now!!</div>
        <div className="login-para">Let’s Create your account</div>
      </div>

      <InputBox
        label="Name"
        value={name}
        onChange={setName}
        placeholder="Enter your name"
      />

      <InputBox
        label="Email"
        value={email}
        onChange={setEmail}
        placeholder="Enter your mail id"
      />

      {/* PASSWORD FIELD */}
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

      {/* CONFIRM PASSWORD FIELD */}
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
        {loading ? "Creating..." : "Sign Up"}
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
