import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../OrPages/Home.css";

export default function HomeRoleSelect() {
  const navigate = useNavigate();
  const [pages, setPages] = useState(0);

  const roles = [
    { name: "College", img: "/images/college.png" },
    { name: "University", img: "/images/university.png" },
    { name: "Industry/Corporate", img: "/images/corporat.png" },
    { name: "Freelancer", img: "/images/freelance.png" },
    { name: "Other", img: "/images/freelance.png" },
  ];

  const handleSelect = (name) => {
    localStorage.setItem("selectedEvent", name);
    setPages(1); 
  };

  return (
    <div className="role-container">

      {/* ===================== PAGE 0 ===================== */}
      {pages === 0 && (
        <>
          {/* Back Button */}
          <div className="role-back">
            <button className="back-btn">
              <span className="arrow">←</span> Back
            </button>
          </div>

          <h2 className="role-title">Select who you represent</h2>

          <div className="role-cards">
            {roles.map((item) => (
              <div
                className="role-card"
                key={item.name}
                onClick={() => handleSelect(item.name)}
                style={{ cursor: "pointer" }}
              >
                <div className="role-img">
                  <img src={item.img} alt={item.name} />
                </div>
                <p className="role-name">{item.name}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ===================== PAGE 1 ===================== */}
      {pages === 1 && (
        <div className="event-mode-container">
          <h2 className="mode-event-title">Select Your Mode of Event</h2>
          <p className="event-subtitle">
            Let participants know where and how your event is happening.
          </p>

          <div className="event-card-wrapper">
            {/* Virtual Event */}
            <div
              className="event-card"
              onClick={() => navigate("/organizer/dashboard/events")}
              style={{ cursor: "pointer" }}
            >
              <h3>Virtual Event</h3>
              <p>
                Conduct online events through platforms like Zoom, Google Meet,
                ELEarnix.
              </p>
            </div>

            {/* Physical/Hybrid Event */}
            <div
              className="event-card"
              onClick={() => navigate("/organizer/dashboard/events")}
              style={{ cursor: "pointer" }}
            >
              <h3>Physical/Hybrid event</h3>
              <p>Select if your event is offline or both</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
