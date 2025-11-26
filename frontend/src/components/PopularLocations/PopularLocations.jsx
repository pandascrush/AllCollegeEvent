
import React from "react";
import "./PopularLocations.css";

export default function PopularLocations() {
  const cities = [
    { img: "/images/coimbatore.png", name: "Coimbatore", events: "1725 Events" },
    { img: "/images/chennai.png", name: "Chennai", events: "1710 Events" },
    { img: "/images/bangalore.png", name: "Bangalore", events: "500 Events" },
    { img: "/images/cochin.png", name: "Cochin", events: "475 Events" },
    { img: "/images/delhi.png", name: "Delhi", events: "450 Events" },
    { img: "/images/mumbai.png", name: "Mumbai", events: "400 Events" },
  ];

  const countries = [
    { img: "/images/india.png", name: "India", events: "1725 Events" },
    { img: "/images/australia.png", name: "Australia", events: "1710 Events" },
    { img: "/images/usa.png", name: "USA", events: "500 Events" },
    { img: "/images/uk.png", name: "UK", events: "200 Events" },
    { img: "/images/uae.png", name: "UAE", events: "300 Events" },
    { img: "/images/singapore.png", name: "Singapore", events: "400 Events" },
  ];

  return (
    <section className="popular-loc-section">
      {/* ------------------ Cities ------------------ */}
      <h2 className="loc-title">Popular Cities</h2>
      <p className="loc-sub">Cities That Never Stop Celebrating</p>

      <div className="loc-grid">
        {cities.map((item, i) => (
          <div key={i} className="loc-card">
            <img src={item.img} className="loc-img" alt={item.name} />
            <div style={{textAlign:"start"}}>
              <h3 className="loc-name">{item.name}</h3>
              <p className="loc-events">{item.events}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ------------------ Countries ------------------ */}
      <h2 className="loc-title countries-mt">Popular Countries</h2>
      <p className="loc-sub">Where Every Continent Comes Alive with Events</p>

      <div className="loc-grid">
        {countries.map((item, i) => (
          <div key={i} className="loc-card">
            <img src={item.img} className="loc-img" alt={item.name} />
            <div style={{textAlign:"start"}}>
              <h3 className="loc-name">{item.name}</h3>
              <p className="loc-events">{item.events}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
