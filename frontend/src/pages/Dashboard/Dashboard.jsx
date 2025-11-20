import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import CardCarousel from "../Dashboard/CardCarousel";
import Navbar from "../../components/Navbar/Navbar";
import EventCarousel from "../../components/EventSlider/EventSlider";
import SpotlightSlider from "../../components/SpotlightSlider/SpotlightSlider";
import OrganizersSlider from "../../components/OrganizersSlider/OrganizersSlider";
import LeaderboardModal from "../../components/LeaderboardModal/LeaderboardModal";
import {
  BROWSEEVENTS,
  TRENDINGEVENTS,
  CATEGORIES,
  TRENDINGEVENTSTOP,
  BROWSEEVENTSTOP,
  PHONEICON,
  EMAILICON,
  EMAILTEXT,
  WHATSAPP,
} from "../../const/const";

import RoleSelect from "../RoleSelect/RoleSelect";

// posters
import poster1 from "../../../public/images/Firstscreen.png";
import poster2 from "../../../public/images/login.png";
import poster3 from "../../../public/images/signup.png";
import poster4 from "../../../public/images/forgotpassword.png";
import poster5 from "../../../public/images/Firstscreen.png";
import poster6 from "../../../public/images/login.png";
import poster7 from "../../../public/images/signup.png";

import WhyChooseACE from "../../components/WhyChooseACE/WhyChooseACE";
import PopularLocations from "../../components/PopularLocations/PopularLocations";
import Footer from "../../components/Footer/Footer";
import AnimatedTitle from "../../components/AnimatedTitle/AnimatedTitle";

export default function Dashboard() {
  const posters = [
    poster1,
    poster2,
    poster3,
    poster4,
    poster5,
    poster6,
    poster7,
  ];

  const [activeChip, setActiveChip] = useState("Education");
  const [openLB, setOpenLB] = useState(false);
  const [active, setActive] = useState("whatsapp");

  const [showRoleModal, setShowRoleModal] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("userRoleSelect");

    if (!role) {
      const timer = setTimeout(() => {
        setShowRoleModal(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleRoleSelected = () => {
    setShowRoleModal(false);
  };

  const apiText = "What Event would you like to go to?";

  return (
    <>
      {showRoleModal && (
        <div className="role-modal-overlay">
          <RoleSelect onSelect={handleRoleSelected} />
        </div>
      )}

      {/* Navbar */}
      <Navbar />

      <div className="dashboard-root">
        <main className="dash-hero">
          <AnimatedTitle text={apiText} />

          {/* USER Explore Events */}
          <button className="btn-explore">Explore Events</button>

          <div className="hero-carousel-area">
            <CardCarousel images={posters} />
          </div>

          {/* SEARCH CARD */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="search-card">
              <div className="search-top">
                {/* Category Chips */}
                <button
                  className={`chip ${
                    activeChip === "Education" ? "active" : ""
                  }`}
                  onClick={() => setActiveChip("Education")}
                >
                  <span className="chip-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.4121 2.56169C11.2533 1.92816..."
                        fill="#040404"
                      />
                    </svg>
                  </span>
                  Education
                </button>

                <button
                  className={`chip ${activeChip === "Sports" ? "active" : ""}`}
                  onClick={() => setActiveChip("Sports")}
                >
                  <span className="chip-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                    />
                  </span>
                  Sports
                </button>

                <button
                  className={`chip ${
                    activeChip === "Entertainment" ? "active" : ""
                  }`}
                  onClick={() => setActiveChip("Entertainment")}
                >
                  <span className="chip-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                    />
                  </span>
                  Entertainment
                </button>

                <button
                  className={`chip ${
                    activeChip === "Networking" ? "active" : ""
                  }`}
                  onClick={() => setActiveChip("Networking")}
                >
                  <span className="chip-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                    />
                  </span>
                  Networking
                </button>
              </div>

              {/* Search bottom */}
              <div className="search-bottom">
                <div className="filter-col">
                  {/* WHAT */}
                  <div className="filter-info">
                    <div className="filter-title">What</div>
                    <div className="filter-sub">Event Type</div>
                  </div>
                </div>

                <div className="filter-col">
                  {/* WHERE */}
                  <div className="filter-info">
                    <div className="filter-title">Where</div>
                    <div className="filter-sub">Location</div>
                  </div>
                </div>

                <div className="filter-col">
                  {/* WHEN */}
                  <div className="filter-info">
                    <div className="filter-title">When</div>
                    <div className="filter-sub">Date</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* CATEGORY SECTION */}
        <div className="Choose-Category-title">
          <h3>Choose Your Category</h3>
        </div>

        <div className="category-wrapper">
          {CATEGORIES.map((c) => (
            <div key={c.name} className={`category-card ${c.class}`}>
              <div className="card-left">
                <img src={c.img} alt={c.name} />
              </div>
              <div className="card-right">{c.name}</div>
            </div>
          ))}
        </div>

        <EventCarousel title="Trending Events" data={TRENDINGEVENTS} />
        <EventCarousel title="Browse Events" data={BROWSEEVENTS} />

        <SpotlightSlider />
        <OrganizersSlider onOpenLeaderboard={() => setOpenLB(true)} />
        <LeaderboardModal open={openLB} onClose={() => setOpenLB(false)} />

        <EventCarousel title="Upcoming Events" data={BROWSEEVENTS} />

        {/* HOW IT WORKS */}
        <div className="college-event-works-section">
          <h2 className="college-event-works-section-title">
            How All College Event Works
          </h2>
          <img
            src="/images/animationImage.png"
            className="animation"
            alt="animation"
          />
        </div>

        <WhyChooseACE />
        <PopularLocations />

        {/* SUBSCRIBE SECTION */}
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

                <div style={{ display: "flex" }}>
                  <div className="sub-input-wrap">
                    <div className="sub-input-icon">{PHONEICON}</div>
                    <input
                      type="tel"
                      placeholder="123-456-7890"
                      className="sub-input"
                    />
                    <button className="sub-btn">Subscribe</button>
                  </div>

                  <div
                    className="switch-icon"
                    onClick={() => setActive("email")}
                  >
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
                <h4 className="sub-title" style={{ paddingTop: "30px" }}>
                  Subscribe to Our Newsletter for the Latest Updates.
                </h4>

                <div style={{ display: "flex", marginTop: "30px" }}>
                  <div className="sub-input-wrap-email email-style">
                    <div className="sub-input-icon">{EMAILTEXT}</div>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="sub-input"
                    />
                    <button className="sub-btn">Subscribe</button>
                  </div>

                  <div
                    className="switch-icon"
                    onClick={() => setActive("whatsapp")}
                    style={{ background: "#28315D" }}
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

        <Footer />
      </div>
    </>
  );
}
