import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

// Public Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Unauthorized from "./pages/UnAuthorized/Unauthorized";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

// Layout
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";

// Organizer Pages
import Home from "./pages/OrPages/Home";
import Profile from "./pages/OrPages/MyProfile/Profile";
import ManagePage from "./pages/OrPages/MyProfile/ManagePage";
import DeleteProfile from "./pages/OrPages/MyProfile/DeleteProfile";
import SavedEvent from "./pages/OrPages/Activeties/SavedEvent";
import BookingEvent from "./pages/OrPages/Activeties/BookingEvent";
import OrganizerDashboard from "./pages/OrPages/MySpace/OrganizerDashboard";
import MyEvents from "./pages/OrPages/MySpace/MyEvents";
import CreateEvents from "./pages/OrPages/CreateEvent/CreateEvents";
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

      {/* ---------- USER PUBLIC ROUTES ---------- */}
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
            onLogin={() => navigate("/user/dashboard/my-profile/profile")}
            onForgotPassword={() => navigate("/forgot-password")}
            onGoSignup={() => navigate("/signup")}
          />
        }
      />

      <Route path="/forgot-password" element={<ForgotPassword role="user" />} />

      {/* ---------- ORGANIZER PUBLIC ROUTES ---------- */}
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

      {/* ---------- ORGANIZER DASHBOARD ROUTES ---------- */}
      <Route path="/organizer/dashboard" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />

        {/* Organizer Profile */}
        <Route path="my-profile/profile" element={<Profile />} />
        <Route path="my-profile/managepage" element={<ManagePage />} />
        <Route path="my-profile/delete" element={<DeleteProfile />} />
        <Route
          path="my-profile/followers"
          element={<YourNetwork tab="followers" />}
        />
        <Route
          path="my-profile/following"
          element={<YourNetwork tab="following" />}
        />
        <Route
          path="my-profile/reviews"
          element={<RatingsAndReviews />}
        />

        {/* Organizer Activities */}
        <Route
          path="my-activities/saved-event"
          element={<SavedEvent />}
        />
        <Route
          path="my-activities/booking-event"
          element={<BookingEvent />}
        />

        {/* Organizer My Space */}
        <Route
          path="my-space/organizer-dashboard"
          element={<OrganizerDashboard />}
        />
        <Route
          path="my-space/organizer-my-event"
          element={<MyEvents />}
        />
        <Route
          path="my-space/organizer-create-events"
          element={<CreateEvents />}
        />

        {/* Organizer Settings */}
        <Route path="setting/notification" element={<Notification />} />
        <Route path="setting/email-setting" element={<EmailSettings />} />

      </Route>

      {/* ---------- USER DASHBOARD ROUTES ---------- */}
      <Route path="/user/dashboard" element={<DashboardLayout />}>

        {/* User Profile */}
        <Route path="my-profile/profile" element={<Profile />} />
        <Route path="my-profile/delete" element={<DeleteProfile />} />

        {/* User Activities */}
        <Route
          path="my-activities/saved-event"
          element={<SavedEvent />}
        />

        {/* User Settings */}
        <Route path="setting/notification" element={<Notification />} />
        <Route path="setting/email-setting" element={<EmailSettings />} />
      </Route>

      {/* ---------- PAGE NOT FOUND ---------- */}
      <Route path="*" element={<PageNotFound />} />

    </Routes>
  );
}
