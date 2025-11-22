import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  FaUser,
  FaHome,
  FaCog,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import "./DashboardLayout.css";
import Navbar from "../../components/Navbar/Navbar";
import ProfileHeader from "../commonCreaterProfile/ProfileHeader";

export default function DashboardLayout() {
  const [hover, setHover] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  const hideHeaderPaths = [
    "/organizer/dashboard/events",
    "organizer/dashboard/home",
    "/organizer/dashboard/create-event",
    "/organizer/dashboard/event-dashboard",
    "/organizer/dashboard/event-edit",
    "/organizer/dashboard/event-view",
  ];

  const hideHeader = hideHeaderPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  const isMySpaceActive =
    location.pathname === "/organizer/dashboard/home" ||
    location.pathname.startsWith("/organizer/dashboard/events") ||
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/my-event") ||
    location.pathname.startsWith("/organizer/dashboard");

  const isProfileActive =
    location.pathname.includes("my-profile/profile") ||
    location.pathname.includes("my-profile/managepage") ||
    location.pathname.includes("manage-team");

  const isActivitiesActive =
    location.pathname.includes("saved-list") ||
    location.pathname.includes("bookings");

  const isSettingsActive =
    location.pathname.includes("notifications") ||
    location.pathname.includes("email-setting");

  const toggleMenu = (menu) => setOpenMenu(openMenu === menu ? null : menu);

  const Arrow = ({ isOpen }) =>
    isOpen ? (
      <FaChevronUp className="arrow-icon" />
    ) : (
      <FaChevronDown className="arrow-icon" />
    );

  return (
    <>
      <Navbar />
      <div className="dash-container">
        <div
          className={`sidebar ${hover ? "expanded" : ""}`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* PROFILE */}
          <div
            className={`menu-item ${isProfileActive ? "active-menu" : ""}`}
            onClick={() => toggleMenu("profile")}
          >
            <img
              src="/images/User.png"
              alt="no image"
              className="side_nav_img"
            />
            <div className="side_nav_content">
              {hover && (
                <>
                  <span className="title">Profile</span>
                  <Arrow isOpen={openMenu === "profile"} />
                </>
              )}
            </div>
          </div>

          {hover && openMenu === "profile" && (
            <div className="dropdown">
              <NavLink
                to="/organizer/dashboard/my-profile/profile"
                className={`sub-link ${
                  location.pathname.includes("/my-profile/profile") ? "sub-active" : ""
                }`}
              >
                My Profile
              </NavLink>
              <NavLink
                to="/organizer/dashboard/my-profile/managepage"
                className={`sub-link ${
                  location.pathname.includes("/my-profile/managepage") ? "sub-active" : ""
                }`}
              >
                Manage Page
              </NavLink>
              <NavLink
                to="/organizer/dashboard/my-profile/delete"
                className={`sub-link ${
                  location.pathname.includes("/delete") ? "sub-active" : ""
                }`}
              >
                Delete
              </NavLink>
            </div>
          )}

          {/* ACTIVITIES */}
          <div
            className={`menu-item ${isActivitiesActive ? "active-menu" : ""}`}
            onClick={() => toggleMenu("activities")}
          >
            <img
              src="/images/myactivityes.png"
              alt="no image"
              className="side_nav_img"
            />
            <div className="side_nav_content">
              {hover && (
                <>
                  <span className="title">My Activities</span>
                  <Arrow isOpen={openMenu === "activities"} />
                </>
              )}
            </div>
          </div>

          {hover && openMenu === "activities" && (
            <div className="dropdown">
              <NavLink
                to="/organizer/dashboard/my-activities/saved-event"
                className={`sub-link ${
                  location.pathname.includes("my-activities/saved-event") ? "sub-active" : ""
                }`}
              >
                My Saved List
              </NavLink>
              <NavLink
                to="/organizer/dashboard/my-activities/booking-event"
                className={`sub-link ${
                  location.pathname.includes("my-activities/booking-event") ? "sub-active" : ""
                }`}
              >
                My Bookings
              </NavLink>
            </div>
          )}

          {/* MY SPACE */}
          <div
            className={`menu-item ${isMySpaceActive ? "active-menu" : ""}`}
            onClick={() => toggleMenu("space")}
          >
            <img
              src="/images/myspace.png"
              alt="no image"
              className="side_nav_img"
            />
            <div className="side_nav_content">
              {hover && (
                <>
                  <span className="title">My Space</span>
                  <Arrow isOpen={openMenu === "space"} />
                </>
              )}
            </div>
          </div>

          {hover && openMenu === "space" && (
            <div className="dropdown">
              <NavLink
                to="/organizer/dashboard/events"
                className={`sub-link ${
                  location.pathname.includes("/organizer/dashboard/events")
                    ? "sub-active"
                    : ""
                }`}
              >
                Create Event
              </NavLink>
              <NavLink
                to="/organizer/dashboard/my-space/organizer-dashboard"
                className={`sub-link ${
                  location.pathname.includes("/my-space/organizer-dashboard")
                    ? "sub-active"
                    : ""
                }`}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/organizer/dashboard/my-space/my-event"
                className={`sub-link ${
                  location.pathname.includes("/my-space/my-event") ? "sub-active" : ""
                }`}
              >
                My Event
              </NavLink>
            </div>
          )}

          {/* SETTINGS */}
          <div
            className={`menu-item ${isSettingsActive ? "active-menu" : ""}`}
            onClick={() => toggleMenu("settings")}
          >
            <img
              src="/images/Settings.png"
              alt="no image"
              className="side_nav_img"
            />
            <div className="side_nav_content">
              {hover && (
                <>
                  <span className="title">Settings</span>
                  <Arrow isOpen={openMenu === "settings"} />
                </>
              )}
            </div>
          </div>

          {hover && openMenu === "settings" && (
            <div className="dropdown">
              <NavLink
                to="/notifications"
                className={`sub-link ${
                  location.pathname.includes("/notifications")
                    ? "sub-active"
                    : ""
                }`}
              >
                Notifications
              </NavLink>
              <NavLink
                to="/email-setting"
                className={`sub-link ${
                  location.pathname.includes("/email-setting")
                    ? "sub-active"
                    : ""
                }`}
              >
                Email Setting
              </NavLink>
            </div>
          )}
        </div>

        <div className="right-content role-container">
          {!hideHeader && (
            <ProfileHeader
              profileImage="/images/user.jpg"
              name="Vanisree M"
              followers="357"
              following="357"
              rank="12"
              reviews="537"
              role="Organizer"
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
