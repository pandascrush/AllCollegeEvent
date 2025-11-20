import React from "react";
import "../OrPages/Home.css";

export default function HomeRoleSelect() {
  const roles = [
    { name: "College", img: "/images/college.png" },
    { name: "University", img: "/images/university.png" },
    { name: "Industry/Corporate", img: "/images/corporat.png" },
    { name: "Freelancer", img: "/images/freelance.png" },
    { name: "Other", img: "/images/freelance.png" },
  ];

  return (
    <div className="role-container">
      {/* Back button */}
      <div className="role-back">
        <button className="back-btn">
          <span className="arrow">←</span> Back
        </button>
      </div>

      {/* Title */}
      <h2 className="role-title">Select who you represent</h2>

      {/* Cards Section */}
      <div className="role-cards">
        {roles.map((item) => (
          <div className="role-card" key={item.name}>
            <div className="role-img">
              <img src={item.img} alt={item.name} />
            </div>
            <p className="role-name">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
