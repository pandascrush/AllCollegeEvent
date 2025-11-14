import React from "react";
import "./InputBox.css";

const InputBox = ({ label, value, onChange, type = "text", placeholder }) => {
    return (
        <div className="inputBoxContainer">
            {label && <label>{label}</label>}
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default InputBox;
