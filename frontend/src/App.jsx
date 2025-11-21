import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import RoleSelect from "./pages/RoleSelect/RoleSelect";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import Home from "./pages/OrPages/Home";
import Profile from "./pages/OrPages/Profile";
// import RepresentPage from "./pages/OrPages/RepresentPage";
import CreateEvents from "./pages/OrPages/CreateEvents";

import ProtectedRoute from "./utils/ProtectedRoute";
import Unauthorized from "./pages/UnAuthorized/Unauthorized";
import RoleRoute from "./utils/RoleRoute";
import LocationSelect from "./pages/LocationSelect/LocationSelect";

export default function App() {
  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  );
}

function MainRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* ----- Public user routes ----- */}
      {/* <Route path="/" element={<LocationSelect/>} /> */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/signup"
        element={
          <Signup
            role="user"
            goBack={() => navigate("/login")}
            onSuccess={() => navigate("/login")}
          />
        }
      />

      <Route
        path="/login"
        element={
          <Login
            role="user"
            onLogin={() => navigate("/")}
            onForgotPassword={() => navigate("/forgot-password")}
            onGoSignup={() => navigate("/signup")}
          />
        }
      />

      <Route path="/forgot-password" element={<ForgotPassword role="user" />} />

      {/* ------- ORGANIZER AUTH (Public) ------- */}
      <Route
        path="/organizer/signup"
        element={
          <Signup
            role="organizer"
            goBack={() => navigate("/organizer/login")}
            onSuccess={() => navigate("/organizer/login")}
          />
        }
      />

      <Route
        path="/organizer/login"
        element={
          <Login
            role="organizer"
            onLogin={() => navigate("/organizer/dashboard/home")}
            onForgotPassword={() => navigate("/organizer/forgot-password")}
            onGoSignup={() => navigate("/organizer/signup")}
          />
        }
      />

      <Route
        path="/organizer/forgot-password"
        element={<ForgotPassword role="organizer" />}
      />

      {/* ------- ORGANIZER DASHBOARD (PROTECTED) ------- */}
      <Route
        path="/organizer/dashboard"
        element={
          // <RoleRoute allowed={["organizer"]}>
            <DashboardLayout />
          // </RoleRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="events" element={<CreateEvents />} />
        

      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={<h2 style={{ padding: 40 }}>404 - Page Not Found</h2>}
      />
    </Routes>
  );
}
