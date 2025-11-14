import React from "react";
import "./RoleSelect.css";
import RoleButton from "../../components/RoleButton/RoleButton";
import FirstScreenImage from "../../../public/images/Firstscreen.png"

export default function RoleSelect({ onSelect }) {

    return (
        <div className="role-page">

            {/* LEFT SECTION IMAGE */}
            <div className="role-left">
                <img src={FirstScreenImage} alt="character" className="role-character" />
            </div>

            {/* RIGHT SECTION */}
            <div className="role-right">

                <h1 className="role-title">
                    <span>Select your vibe!</span> Start your journey!
                </h1>

                <p className="role-subtitle">Click & enjoy your events vibe !</p>

                <div className="role-buttons">

                    <div className="btn-row row1">
                        <RoleButton label="Student" color="#D6F4FB" icon="student" />
                    </div>

                    <div className="btn-row row2">
                        <RoleButton label="Faculty" color="#FCEFD4" icon="faculty" />
                    </div>

                    <div className="btn-row row3">
                        <RoleButton label="Professional" color="#E8DEFF" icon="professional" />
                    </div>

                    <div className="btn-row row4">
                        <RoleButton label="General User" color="#FFDADF" icon="user" />
                    </div>

                </div>
            </div>
        </div>
    );
}
