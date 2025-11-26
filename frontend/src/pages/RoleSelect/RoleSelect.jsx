import React from "react";
import "./RoleSelect.css";
import RoleButton from "../../components/RoleButton/RoleButton";
import FirstScreenImage from "../../../public/images/Firstscreen.png";

export default function RoleSelect({ onSelect }) {

  const handleSelectRole = (role) => {
    localStorage.setItem("userRoleSelect", role);
    if (onSelect) onSelect(); 

  };

  return (
    <div className="role-page">
      <div className="role-left">
        <img
          src={FirstScreenImage}
          alt="character"
          className="role-character"
        />
      </div>

      <div className="role-right">
        <h1 className="role-title1">
          <span>Select your vibe!</span> Start your journey!
        </h1>

        <p className="text-center role-subtitle">Click & enjoy your events vibe !</p>

        <div className="role-buttons">
          <div className="btn-row row1">
            <RoleButton
              label="Student"
              color="#D6F4FB"
              icon="student"
              onClick={() => handleSelectRole("Student")}
            />
          </div>

          <div className="btn-row row2">
            <RoleButton
              label="Faculty"
              color="#FCEFD4"
              icon="faculty"
              onClick={() => handleSelectRole("faculty")}
            />
          </div>

          <div className="btn-row row3">
            <RoleButton
              label="Professional"
              color="#E8DEFF"
              icon="professional"
              onClick={() => handleSelectRole("professional")}
            />
          </div>

          <div className="btn-row row4">
            <RoleButton
              label="General User"
              color="#FFDADF"
              icon="user"
              onClick={() => handleSelectRole("general-user")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}