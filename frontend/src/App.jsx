import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import RoleSelect from "./pages/RoleSelect/RoleSelect";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import Home from "./pages/OrPages/Home";
import Profile from "./pages/OrPages/Profile";
import Events from "./pages/OrPages/Events";
import RepresentPage from "./pages/OrPages/RepresentPage";

export default function App() {
    return (
        <BrowserRouter>
            <MainRoutes />
        </BrowserRouter>
    );
}


function MainRoutes() {
  const navigate = useNavigate();
  const [resetEmail, setResetEmail] = useState("");

  return (
    <Routes>
      {/* ----- Public user routes ----- */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/signup" element={
        <Signup role="user" goBack={() => navigate("/login")} onSuccess={() => navigate("/login")} />
      }/>
      <Route path="/login" element={
        <Login role="user" onLogin={() => navigate("/")} onForgotPassword={() => navigate("/forgot-password")} onGoSignup={() => navigate("/signup")} />
      }/>
      <Route path="/forgot-password" element={<ForgotPassword role="user" />} />

      {/* ------- ORGANIZER AUTH ------- */}
      <Route path="/organizer/signup" element={
        <Signup role="organizer" goBack={() => navigate("/organizer/login")} onSuccess={() => navigate("/organizer/login")} />
      }/>

      <Route path="/organizer/login" element={
        <Login role="organizer" onLogin={() => navigate("/organizer/dashboard/home")} onForgotPassword={() => navigate("/organizer/forgot-password")} onGoSignup={() => navigate("/organizer/signup")} />
      }/>

      <Route path="/organizer/forgot-password" element={<ForgotPassword role="organizer" />} />

      {/* ------- ORGANIZER DASHBOARD WITH SIDEBAR ------- */}
      <Route path="/organizer/dashboard" element={<DashboardLayout />}>

        {/* default page */}
        <Route index element={<Home />} />

        {/* sidebar pages */}
        <Route path="representPage" element={<RepresentPage />} />
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="events" element={<Events />} />
        

      </Route>

      {/* 404 */}
      <Route path="*" element={<h2 style={{ padding: 40 }}>404 - Page Not Found</h2>} />
    </Routes>
  );
}

