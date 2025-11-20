import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./DashboardLayout.css";
import { FaUser, FaHome, FaCog, FaQrcode } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import Navbar from "../Navbar/Navbar";

export default function DashboardLayout() {
  return (
    <>
      <Navbar />

      <div className="dash-container">

        {/* Sidebar */}
        <div className="sidebar">
          <NavLink to="/organizer/dashboard/profile" className="side-icon">
            <FaUser />
          </NavLink>

          <NavLink to="/organizer/dashboard/events" className="side-icon">
            <MdEvent />
          </NavLink>

          <NavLink to="/organizer/dashboard/home" className="side-icon">
            <FaHome />
          </NavLink>

          <NavLink to="/organizer/dashboard/settings" className="side-icon">
            <FaCog />
          </NavLink>

          <NavLink to="/organizer/dashboard/qr" className="side-icon">
            <FaQrcode />
          </NavLink>
        </div>

        {/* Right Content */}
        <div className="right-content">
          <Outlet />   {/* ← LOADS CHILD ROUTES HERE */}
        </div>

      </div>
    </>
  );
}
