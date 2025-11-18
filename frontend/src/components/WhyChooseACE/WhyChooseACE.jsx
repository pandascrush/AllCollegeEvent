import React from "react";
import "./WhyChooseACE.css";

export default function WhyChoose() {
  return (
    <section className="why-section">

      <h2 className="why-title">Why Choose AllCollegeEvent ?</h2>
      <p className="why-subtitle">
        Enjoy a seamless and delightful ticketing experience with these powerful benefits
      </p>

      <div className="why-container">

        {/* LEFT COLUMN */}
        <div className="left-column">

          {/* CARD 1 */}
          <div className="why-card left-card">
            <img src="/images/fastPayment.png" className="why-img" alt="Secure Payments" />

            <div className="why-text">
              <h3>Fast & Secure Payments</h3>
              <p>
                Experience quick transactions with advanced security to protect your data.
                Pay in minutes with seamless processing and instant confirmation.
              </p>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="why-card left-card">
            <img src="/images/smartdeals.png" className="why-img" alt="Smart Deals" />

            <div className="why-text">
              <h3>Smart Deals</h3>
              <p>
                Unlock exclusive offers and discounts. Save more while enjoying premium event
                experiences.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="right-column">
          <div className="right-card">

            <h3 className="right-title">Book Anytime!</h3>

            <p className="right-desc">
              Enjoy 24/7 booking flexibility reserve your tickets at your convenience
              with no time restrictions. Access events anytime with a hassle-free
              booking experience.
            </p>

            <img src="/images/bookingAnytime.png" className="right-img" alt="Book Anytime" />
          </div>
        </div>

      </div>
    </section>
  );
}
