import React from "react";
import "./AuthLayout.css";

const AuthLayout = ({ image, children }) => {
    return (
        <div className="authContainer">
            <div className="authLeft">
                <img src={image} alt="illustration" />
            </div>

            <div className="authRight">
                <div className="authContent">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;