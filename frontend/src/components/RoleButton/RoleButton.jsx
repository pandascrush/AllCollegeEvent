import React from "react";
import "./RoleButton.css";

export default function RoleButton({ label, color, icon, onClick }) {

    const icons = {
        graduation: `
            <svg width="28" height="22" viewBox="0 0 24 24" fill="#444">
                <path d="M12 3L1 9l11 6 9-5.1V17h2V9L12 3z"/>
            </svg>
        `,
        faculty: `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#444">
                <circle cx="12" cy="7" r="4"/>
                <path d="M4 21v-2c0-3.3 3.1-6 8-6s8 2.7 8 6v2H4z"/>
            </svg>
        `,
        briefcase: `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#444">
                <path d="M9 2h6v3h5v4H4V5h5V2z"/>
                <path d="M4 10h16v10H4V10z"/>
            </svg>
        `,
        user: `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#444">
                <circle cx="12" cy="7" r="4"/>
                <path d="M4 21v-2c0-3.3 3-6 8-6s8 2.7 8 6v2H4z"/>
            </svg>
        `
    };

    return (
        <button className="role-btn" style={{ backgroundColor: color }} onClick={onClick}>
            <div
                className="role-icon"
                dangerouslySetInnerHTML={{ __html: icons[icon] }}
            />
            <span className="role-text">{label}</span>
        </button>
    );
}
