import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import RoleSelect from "./pages/RoleSelect/RoleSelect";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import Home from "./pages/OrPages/Home";
import Profile from "../src/pages/OrPages/MyProfile/Profile";
// import RepresentPage from "./pages/OrPages/RepresentPage";
import CreateEvents from "../src/pages/OrPages/CreateEvent/CreateEvents";

import ProtectedRoute from "./utils/ProtectedRoute";
import Unauthorized from "./pages/UnAuthorized/Unauthorized";
import RoleRoute from "./utils/RoleRoute";
import LocationSelect from "./pages/LocationSelect/LocationSelect";
import ManagePage from "./pages/OrPages/MyProfile/ManagePage";
import DeleteProfile from "./pages/OrPages/MyProfile/DeleteProfile";
import SavedEvent from "./pages/OrPages/Activeties/SavedEvent";
import BookingEvent from "./pages/OrPages/Activeties/BookingEvent";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import OrganizerDashboard from "./pages/OrPages/MySpace/OrganizerDashboard";
import MyEvents from "./pages/OrPages/MySpace/MyEvents";
import Notification from "./pages/OrPages/Settings/Notification";
import EmailSettings from "./pages/OrPages/Settings/EmailSettings";
import YourNetwork from "./pages/OrPages/MyProfile/YourNetwork";
import RatingsAndReviews from "./pages/OrPages/MyProfile/RatingsAndReviews";

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
        <Route path="my-profile/profile" element={<Profile />} />
        <Route path="my-profile/managepage" element={<ManagePage />} />
        <Route path="my-profile/delete" element={<DeleteProfile />} />
        <Route path="my-activities/saved-event" element={<SavedEvent />} />
        <Route path="my-activities/booking-event" element={<BookingEvent />} />
        <Route
          path="my-space/organizer-dashboard"
          element={<OrganizerDashboard />}
        />
        <Route path="my-space/organizer-my-event" element={<MyEvents />} />
        <Route
          path="my-space/organizer-create-events"
          element={<CreateEvents />}
        />
        <Route path="setting/notification" element={<Notification />} />
        <Route path="setting/email-setting" element={<EmailSettings />} />
        <Route
          path="my-profile/followers"
          element={<YourNetwork tab="followers" />}
        />
        <Route
          path="my-profile/following"
          element={<YourNetwork tab="following" />}
        />
        <Route path="my-profile/reviews" element={<RatingsAndReviews />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
