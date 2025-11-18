import React from "react";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">

            {/* -------- Skyline Top Image -------- */}
            <div className="footer-top-image">
                <img src="/images/footer.png" alt="skyline" />
            </div>

            {/* -------- Footer Main Content -------- */}
            <div className="footer--section">

                <div className="footer-content">

                    {/* LEFT SECTION */}
                    <div className="footer-left">
                        <h2 className="footer-logo">ACE</h2>
                        <p className="footer-tagline">ALL COLLEGE EVENT</p>

                        <div className="footer-socials">
                            <a><i className="fab fa-facebook"></i></a>
                            <a><i className="fab fa-instagram"></i></a>
                            <a><i className="fab fa-x-twitter"></i></a>
                            <a><i className="fab fa-linkedin"></i></a>
                        </div>

                        <p className="footer-copy">© 2025 ACE. All rights reserved.</p>
                    </div>

                    {/* CENTER SECTION - COMPANY */}
                    <div className="footer-col">
                        <h3>Company</h3>
                        <a>About us</a>
                        <a>FAQ’s</a>
                        <a>Feedback</a>
                        <a>Contact us</a>
                    </div>

                    {/* CENTER SECTION - EVENTS */}
                    <div className="footer-col">
                        <h3>Events</h3>
                        <a>Education</a>
                        <a>Sports</a>
                        <a>Entertainment</a>
                        <a>Networking</a>
                    </div>

                    {/* RIGHT SECTION – QUERY */}
                    <div className="footer-col">
                        <h3>Send Your Query</h3>
                        <p className="footer-email">
                            <span className="email-icon">@</span> info@ace.com
                        </p>
                    </div>

                </div>

                {/* -------- Bottom Links -------- */}
                <div className="footer-bottom">
                    <div>
                        <div>© 2025 ACE. All rights reserved.</div>
                    </div>
                    <div style={{display:"flex" , gap:"30px"}}>
                        <a>Privacy Policy</a>
                        <a>Terms of Use</a>
                        <a>Legal</a>
                        <a>Site Map</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
