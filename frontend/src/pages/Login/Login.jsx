import React, { useEffect, useState } from "react";
import "./Login.css";
import InputBox from "../../components/InputBox/InputBox";
import AuthLayout from "../../components/Layout/AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Login({ role, onGoSignup, onForgotPassword }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const isOrganizer = role === "organizer";

  const sideImage = isOrganizer ? "/images/or_login.png" : "/images/login.png";
  const emailLabel = isOrganizer ? "Domain Mail ID" : "Email";
  const emailPlaceholder = isOrganizer
    ? "Enter your domain mail"
    : "Enter your email";

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GL_CL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    const checkGoogleLoaded = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async (response) => {
            const idToken = response.credential;
            const res = await dispatch(
              loginUser({ google: true, googleToken: idToken })
            );
            if (res.meta.requestStatus === "fulfilled") {
              console.log("Logged in via Google One Tap");
            }
          },
          auto_select: true,
          cancel_on_tap_outside: false,
        });

        window.google.accounts.id.prompt(() => {});
        return true;
      }
      return false;
    };

    const interval = setInterval(() => {
      const loaded = checkGoogleLoaded();
      if (loaded) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, [dispatch]);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLocalError("");

    if (!email || !password) {
      return setLocalError("All fields are required.");
    }

    const result = await dispatch(loginUser({ email: email, password }));
    console.log("==== Login Result ====", result);

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Successfully Logged In");

      const data = result.payload.account;
      console.log("sdfsdf", data);

      if (data.roleId === "organizer") {
        navigate("/organizer/dashboard");
      } else {
        navigate("/");
      }
    }
  };

  const handleGoogleButtonLogin = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    console.log(idToken);
    const res = await dispatch(
      loginUser({ google: true, googleToken: idToken })
    );
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Successfully Logged In");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <AuthLayout image={sideImage}>
      <ToastContainer />
      <div>
        <div className="login-title">
          {isOrganizer ? "Organizer Login" : "Welcome Back"}
        </div>
        <div className="login-para">
          {isOrganizer
            ? "Login to manage your events"
            : "Please login to your account"}
        </div>
      </div>

      {/* EMAIL / DOMAIN FIELD */}
      <InputBox
        label={emailLabel}
        value={email}
        onChange={setEmail}
        placeholder={emailPlaceholder}
      />

      {/* PASSWORD FIELD */}
      <InputBox
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="Enter password"
      />

      <div className="loginLinks">
        <button className="forgotLink" onClick={onForgotPassword}>
          Forgot Password?
        </button>
      </div>

      {(localError || error) && (
        <div className="errorText">{localError || error}</div>
      )}

      <button className="primaryBtn" onClick={handleLogin} disabled={loading}>
        {loading
          ? "Signing in..."
          : isOrganizer
          ? "Organizer Sign In"
          : "Sign In"}
      </button>

      {/* Manual Google Login */}
      <div style={{ marginTop: "10px" }}>
        <GoogleLogin
          onSuccess={handleGoogleButtonLogin}
          onError={() => console.log("Manual Google Login Failed")}
        />
      </div>

      <div className="form-line">
        <div className="line"></div>
        <p>Or</p>
        <div className="line"></div>
      </div>

      <div className="signupRoute">
        {isOrganizer
          ? "Don't have an organizer account?"
          : "Don't have an account?"}
        <button className="signupLink" onClick={onGoSignup}>
          {isOrganizer ? "Organizer Sign Up" : "Sign Up"}
        </button>
      </div>
    </AuthLayout>
  );
}
