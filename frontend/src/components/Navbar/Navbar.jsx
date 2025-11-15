import React from "react";
import "./Navbar.css";
import Logo from "../../../public/images/logo.png";

export default function Navbar() {
  return (
    <nav className="nav-container">

      {/* LEFT */}
      <div className="nav-left">
        <img src={Logo} alt="logo" className="nav-logo" />

        <button className="nav-explore">
          Explore <span className="down-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="9" viewBox="0 0 15 9" fill="none" style={{marginLeft:"8px" , marginTop:"2px"}}>
            <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#1C1C1C" stroke-width="2" stroke-linecap="round" />
          </svg></span>
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="nav-search-box">
        <div className="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M14.603 15.7925L11.1644 12.3538C10.6238 12.8224 9.99301 13.1874 9.27215 13.4487C8.55128 13.71 7.78536 13.8406 6.97438 13.8406C5.02804 13.8406 3.37906 13.1648 2.02744 11.8132C0.675812 10.4616 0 8.83061 0 6.92032C0 5.01002 0.675812 3.37906 2.02744 2.02744C3.37906 0.675812 5.01903 0 6.94735 0C8.85765 0 10.4841 0.675812 11.8267 2.02744C13.1693 3.37906 13.8406 5.01002 13.8406 6.92032C13.8406 7.69525 13.7145 8.44315 13.4622 9.16401C13.2099 9.88488 12.8314 10.5607 12.3268 11.1915L15.8195 14.6301C15.9817 14.7742 16.0628 14.959 16.0628 15.1842C16.0628 15.4095 15.9727 15.6122 15.7925 15.7925C15.6303 15.9546 15.432 16.0357 15.1977 16.0357C14.9635 16.0357 14.7652 15.9546 14.603 15.7925ZM6.94735 12.2187C8.40711 12.2187 9.6506 11.7006 10.6778 10.6643C11.7051 9.62807 12.2187 8.38007 12.2187 6.92032C12.2187 5.46056 11.7051 4.21256 10.6778 3.17632C9.6506 2.14007 8.40711 1.62195 6.94735 1.62195C5.46957 1.62195 4.21256 2.14007 3.17632 3.17632C2.14007 4.21256 1.62195 5.46056 1.62195 6.92032C1.62195 8.38007 2.14007 9.62807 3.17632 10.6643C4.21256 11.7006 5.46957 12.2187 6.94735 12.2187Z" fill="#3D3D3D" />
          </svg>
        </div>

        <input type="text" placeholder="Search anything" className="search-input" />

        <div className="location-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="25" viewBox="0 0 20 30" fill="none">
            <path d="M0.84375 11.0004C0.8438 17.9896 7.04696 26.3384 9.22268 28.4999C9.56538 28.8403 10.0652 28.7897 10.4186 28.4603C10.4186 28.4603 18.8438 18.8688 18.8438 11.0004C18.8438 2.46075 13.2115 0.845703 9.83218 0.845703C5.88965 0.845703 0.843695 3.32739 0.84375 11.0004Z" stroke="black" stroke-width="1.68967" />
            <circle cx="9.83534" cy="10.4193" r="4.78739" stroke="black" stroke-width="1.68967" />
          </svg>
        </div>
      </div>

      {/* RIGHT BUTTONS */}
      <div className="nav-right">
        <button className="nav-create">Create Event +</button>
        <button className="nav-login">Sign In</button>
      </div>

    </nav>
  );
}
