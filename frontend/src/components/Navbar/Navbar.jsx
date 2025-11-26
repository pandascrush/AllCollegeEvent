import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Logo from "../../../public/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { fetchSingleUser } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoNotificationsOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import LocationSelect from "../../pages/LocationSelect/LocationSelect";
import { IoSearchOutline } from "react-icons/io5";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openExplore, setOpenExplore] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const notifications = [
    { title: "Your event registration is confirmed", time: "2h ago" },
    { title: "New event from top organizer", time: "5h ago" },
  ];

  const uid = localStorage.getItem("UU");
  const isLoggedIn = localStorage.getItem("ILI");

  useEffect(() => {
    if (uid) dispatch(fetchSingleUser(uid));
  }, [uid]);

  return (
    <>
      <nav className="nav-container">
        {/* LEFT */}
        <div className="nav-left">
          <img src={Logo} alt="logo" className="nav-logo" />

          <button
            className="nav-explore"
            onClick={() => {
              setOpenExplore(!openExplore);
              setOpenNotify(false);
            }}
          >
            Explore
            <svg
              width="10"
              height="9"
              viewBox="0 0 15 9"
              style={{ marginLeft: 8 }}
            >
              <path
                d="M1 1L6.79 6.79C7.18 7.18 7.82 7.18 8.21 6.79L14 1"
                stroke="#1C1C1C"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* EXPLORE DROPDOWN */}
        {openExplore && (
          <div className="explore-dropdown">
            <button onClick={() => navigate("/")}>All Events</button>
            <button onClick={() => navigate("/top-organizers")}>
              Top Organizers
            </button>
            <button onClick={() => navigate("/organizer/signup")}>
              Create Event
            </button>
          </div>
        )}

        {/* CENTER */}
        <div className="nav-center">
          <div className="nav-search-box">
            <div className="search-icon">
              <IoSearchOutline size={18} color="#3D3D3D" />
            </div>

            <input
              type="text"
              placeholder="Search anything"
              className="search-input"
            />
          </div>

          {/* LOCATION BUTTON */}
          <button
            className="nav-location-btn"
            onClick={() => setShowLocation(true)}
          >
            <SlLocationPin size={20} className="location-icon-react" />
          </button>

          {/* CREATE EVENT */}
          <button
            className="nav-create"
            onClick={() => navigate("/organizer/signup")}
          >
            Create Event +
          </button>
        </div>

        {/* RIGHT */}
        <div className={`nav-right ${open ? "open" : ""}`}>
          {!isLoggedIn ? (
            <Link className="nav-login" to="/login">
              Sign In
            </Link>
          ) : (
            <>
              <button
                className="nav-bell"
                onClick={() => {
                  setOpenNotify(!openNotify);
                  setOpenExplore(false);
                }}
              >
                <IoNotificationsOutline size={22} />
                <span className="nav-bell-dot" />
              </button>

              {/* NOTIFICATIONS DROPDOWN */}
              {openNotify && (
                <div className="notify-dropdown">
                  <h4>Notifications</h4>

                  {notifications.length === 0 ? (
                    <p className="notify-empty">No notifications</p>
                  ) : (
                    notifications.map((n, i) => (
                      <div key={i} className="notify-item">
                        <p>{n.title}</p>
                        <span>{n.time}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
              <button
                className="nav-avatar-btn"
                onClick={() => {
                  setOpenProfile(!openProfile);
                  setOpenNotify(false);
                  setOpenExplore(false);
                }}
              >
                <img src={user?.profileImg} className="nav-avatar-img" />
              </button>

              {/* PROFILE DROPDOWN */}
              {openProfile && (
                <div className="profile-dropdown">
                  <p className="profile-name">{user?.name}</p>

                  <button
                    className="logout-btn"
                    onClick={() => {
                      localStorage.clear();
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* HAMBURGER */}
        <button
          className={`nav-hamburger ${open ? "is-open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </nav>

      {/* ⭐ LOCATION MODAL ⭐ */}
      {showLocation && (
        <div
          className="location-modal-overlay"
          onClick={() => setShowLocation(false)}
        >
          <div
            className="location-modal"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <LocationSelect closeModal={() => setShowLocation(false)} />
          </div>
        </div>
      )}
    </>
  );
}