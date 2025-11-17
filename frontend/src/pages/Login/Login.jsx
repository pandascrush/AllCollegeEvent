import React, { useEffect, useState } from "react";
import "./Login.css";
import InputBox from "../../components/InputBox/InputBox";
import AuthLayout from "../../components/Layout/AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { GoogleLogin } from "@react-oauth/google";

export default function Login({ onGoSignup, onForgotPassword }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GL_CL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  // -------------------------
  // Google One Tap
  // -------------------------
  useEffect(() => {
    const checkGoogleLoaded = () => {
      console.log("BEfore Enetr");
      
      if (window.google?.accounts?.id) {
        // One Tap initialization
        console.log("After Enter");
        
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

        window.google.accounts.id.prompt(() => {
          sessionStorage.setItem("oneTapShown", "true");
        });

        return true;
      }
      return false;
    };

    const interval = setInterval(() => {
      const loaded = checkGoogleLoaded();
      if (loaded) clearInterval(interval);
    }, 100); // check every 100ms

    return () => clearInterval(interval);
  }, [dispatch]);

  // -------------------------
  // Manual Email/Password Login
  // -------------------------
  const handleLogin = async () => {
    setLocalError("");

    if (!email || !password) {
      return setLocalError("All fields are required.");
    }

    const result = await dispatch(loginUser({ email, password }));

    if (result.meta.requestStatus === "fulfilled") {
      // Handle success: navigate or store token
    }
  };

  // -------------------------
  // Manual Google Login Button
  // -------------------------
  const handleGoogleButtonLogin = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    const res = await dispatch(
      loginUser({ google: true, googleToken: idToken })
    );
    if (res.meta.requestStatus === "fulfilled") {
      console.log("Logged in via Google button");
    }
  };

  return (
    <AuthLayout image="/images/login.png">
      <div>
        <div className="login-title">Welcome Back</div>
        <div className="login-para">Please login to your account</div>
      </div>

      <InputBox
        label="Email"
        value={email}
        onChange={setEmail}
        placeholder="Enter your email"
      />
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
        {loading ? "Signing in..." : "Sign In"}
      </button>

      {/* Manual Google Login Button */}
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
        Don't have an account?
        <button className="signupLink" onClick={onGoSignup}>
          Sign Up
        </button>
      </div>
    </AuthLayout>
  );
}
