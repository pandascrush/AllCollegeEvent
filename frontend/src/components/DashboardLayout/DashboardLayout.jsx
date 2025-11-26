import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import "./DashboardLayout.css";
import Navbar from "../../components/Navbar/Navbar";
import ProfileHeader from "../commonCreaterProfile/ProfileHeader";

export default function DashboardLayout() {
  const [hover, setHover] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  // ===============================
  // GET ROLE FROM TOKEN
  // ===============================
  const token = localStorage.getItem("token");
  let userRole = null;


  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRole = decoded.role;
    } catch (error) {
      console.error("Invalid token");
    }
  }

  // ===============================
  // BASE PATH BASED ON ROLE
  // ===============================
  const basePath =
    userRole === "organizer" ? "/organizer/dashboard" : "/user/dashboard";

  // ===============================
  // HEADER HIDE PATHS
  // ===============================
  const hideHeaderPaths = [
    "/organizer/dashboard/my-space/organizer-create-events",
    "/organizer/dashboard/home",
    "/user/dashboard/home",
    "/organizer/dashboard"
  ];

  const hideHeader = hideHeaderPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  // ===============================
  // ACTIVE MENU LOGIC
  // ===============================
  const isProfileActive = location.pathname.includes(`${basePath}/my-profile`);
  const isActivitiesActive = location.pathname.includes(
    `${basePath}/my-activities`
  );
  const isSettingsActive = location.pathname.includes(`${basePath}/setting`);
  const isMySpaceActive =
    userRole === "organizer" &&
    location.pathname.includes(`${basePath}/my-space`);

  const toggleMenu = (menu) =>
    setOpenMenu(openMenu === menu ? null : menu);

  const Arrow = ({ isOpen }) =>
    isOpen ? <FaChevronUp className="arrow-icon" /> : <FaChevronDown className="arrow-icon" />;

  return (
    <>
      <Navbar />
      <div className="dash-container">

        {/* SIDEBAR START */}
        <div
          className={`sidebar ${hover ? "expanded" : ""}`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >

          {/* ---------------- PROFILE MENU ---------------- */}
          <div
            className={`menu-item ${isProfileActive ? "active-menu" : ""}`}
            onClick={() => toggleMenu("profile")}
          >
            <img src="/images/User.png" className="side_nav_img" />
            {hover && (
              <div className="side_nav_content">
                <span className="title">Profile</span>
                <Arrow isOpen={openMenu === "profile"} />
              </div>
            )}
          </div>

          {hover && openMenu === "profile" && (
            <div className="dropdown">

              {/* My Profile */}
              <NavLink
                to={`${basePath}/my-profile/profile`}
                className="sub-link"
              >
                My Profile
              </NavLink>

              {/* Manage Page (Organizer Only) */}
              {userRole === "organizer" && (
                <NavLink
                  to="/organizer/dashboard/my-profile/managepage"
                  className="sub-link"
                >
                  Manage Page
                </NavLink>
              )}

              {/* Delete */}
              <NavLink
                to={`${basePath}/my-profile/delete`}
                className="sub-link"
              >
                Delete
              </NavLink>
            </div>
          )}

          {/* ---------------- ACTIVITIES MENU ---------------- */}
          <div
            className={`menu-item ${isActivitiesActive ? "active-menu" : ""}`}
            onClick={() => toggleMenu("activities")}
          >
            <img src="/images/myactivityes.png" className="side_nav_img" />
            {hover && (
              <div className="side_nav_content">
                <span className="title">My Activities</span>
                <Arrow isOpen={openMenu === "activities"} />
              </div>
            )}
          </div>

          {hover && openMenu === "activities" && (
            <div className="dropdown">
              <NavLink
                to={`${basePath}/my-activities/saved-event`}
                className="sub-link"
              >
                My Saved List
              </NavLink>

              {userRole === "organizer" && (
                <NavLink
                  to="/organizer/dashboard/my-activities/booking-event"
                  className="sub-link"
                >
                  My Bookings
                </NavLink>
              )}
            </div>
          )}

          {/* ---------------- MY SPACE (Organizer Only) ---------------- */}
          {userRole === "organizer" && (
            <>
              <div
                className={`menu-item ${isMySpaceActive ? "active-menu" : ""}`}
                onClick={() => toggleMenu("space")}
              >
                <img src="/images/myspace.png" className="side_nav_img" />
                {hover && (
                  <div className="side_nav_content">
                    <span className="title">My Space</span>
                    <Arrow isOpen={openMenu === "space"} />
                  </div>
                )}
              </div>

              {hover && openMenu === "space" && (
                <div className="dropdown">
                  <NavLink
                    to="/organizer/dashboard/my-space/organizer-create-events"
                    className="sub-link"
                  >
                    Create Event
                  </NavLink>

                  <NavLink
                    to="/organizer/dashboard/my-space/organizer-dashboard"
                    className="sub-link"
                  >
                    Dashboard
                  </NavLink>

                  <NavLink
                    to="/organizer/dashboard/my-space/organizer-my-event"
                    className="sub-link"
                  >
                    My Event
                  </NavLink>
                </div>
              )}
            </>
          )}

          {/* ---------------- SETTINGS MENU ---------------- */}
          <div
            className={`menu-item ${isSettingsActive ? "active-menu" : ""}`}
            onClick={() => toggleMenu("settings")}
          >
            <img src="/images/Settings.png" className="side_nav_img" />
            {hover && (
              <div className="side_nav_content">
                <span className="title">Settings</span>
                <Arrow isOpen={openMenu === "settings"} />
              </div>
            )}
          </div>

          {hover && openMenu === "settings" && (
            <div className="dropdown">
              <NavLink
                to={`${basePath}/setting/notification`}
                className="sub-link"
              >
                Notifications
              </NavLink>

              <NavLink
                to={`${basePath}/setting/email-setting`}
                className="sub-link"
              >
                Email Setting
              </NavLink>
            </div>
          )}
        </div>

        {/* SIDEBAR END */}

        {/* =================== MAIN CONTENT =================== */}
        <div className="right-content role-container">
          
          {!hideHeader && (
            <ProfileHeader
              profileImage="/images/user.jpg"
              name="Vanisree M"
              followers="357"
              following="357"
              rank="12"
              reviews="537"
              role={userRole === "organizer" ? "Organizer" : "User"}
            />
          )}

          <div className="page-wrapper">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
