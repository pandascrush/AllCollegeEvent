import React from "react";
import "./PasswordSuccess.css";
import AuthLayout from "../../components/Layout/AuthLayout";

export default function PasswordSuccess({ onGoLogin }) {
    return (
        <AuthLayout image="/images/success.png">
            <div className="successContainer">
                <h1>Password Changed!</h1>
                <p>Your password has been successfully updated</p>

                <button className="primaryBtn" onClick={onGoLogin}>Sign In</button>
            </div>
        </AuthLayout>
    );
}
