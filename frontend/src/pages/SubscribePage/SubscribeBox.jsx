import React, { useState } from "react";
import "./SubscribeBox.css"; 
import {
  BROWSEEVENTS,
  TRENDINGEVENTS,
  CATEGORIES,
  PHONEICON,
  EMAILICON,
  EMAILTEXT,
  WHATSAPP,
} from "../../const/const";

export default function SubscribeBox() {
  const [active, setActive] = useState("whatsapp");

  return (
    <section className="subscribe-section">
      {/* WHATSAPP BLOCK */}
      {active === "whatsapp" && (
        <div className="subscribe-card whatsapp">
          <div className="subscribe-left">
            <img src="/images/whatsapp.png" className="sub-img" />
          </div>

          <div className="subscribe-right">
            <h4 className="sub-title">
              Subscribe to Our Newsletter for the Latest Updates.
            </h4>

            <div className="sub-flex">
              <div className="sub-input-wrap">
                <div className="sub-input-icon">{PHONEICON}</div>
                <input
                  type="tel"
                  placeholder="123-456-7890"
                  className="sub-input"
                />
                <button className="sub-btn">Subscribe</button>
              </div>

              <div className="switch-icon" onClick={() => setActive("email")}>
                 {EMAILICON}
              </div>
            </div>

            <p className="sub-desc">
              Stay ahead with the latest updates from AllCollegeEvent.
            </p>
          </div>
        </div>
      )}

      {/* EMAIL BLOCK */}
      {active === "email" && (
        <div className="subscribe-card email">
          <div className="subscribe-left">
            <img src="/images/email.png" className="sub-img-email" />
          </div>

          <div className="subscribe-right">
            <h4 className="sub-title sub-title-email">
              Subscribe to Our Newsletter for the Latest Updates.
            </h4>

            <div className="sub-flex">
              <div className="sub-input-wrap-email">
                <div className="sub-input-icon">{EMAILTEXT}</div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="sub-input"
                />
                <button className="sub-btn">Subscribe</button>
              </div>

              <div
                className="switch-icon email-switch"
                onClick={() => setActive("whatsapp")}
              >
                {WHATSAPP}
              </div>
            </div>

            <p className="sub-desc">
              Stay ahead with the latest updates and events.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
