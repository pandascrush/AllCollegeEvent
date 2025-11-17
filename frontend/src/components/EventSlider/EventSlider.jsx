import React, { useRef } from "react";
import "./EventSlider.css";
import { LOCATION_ICON, SAVEICON, DATEICON } from "../../const/const";

export default function EventCarousel({ title, data }) {
    const sliderRef = useRef(null);

    const slideLeft = () => {
        sliderRef.current.scrollBy({ left: -350, behavior: "smooth" });
    };

    const slideRight = () => {
        sliderRef.current.scrollBy({ left: 350, behavior: "smooth" });
    };

    return (
        <div className="event-section">
            {/* Header Row */}
            <div className="event-header">
                <h3>{title}</h3>
                <button className="see-all-btn">See all</button>
            </div>
            {/* line UI */}

            <div className="event_line"></div>
            {/* Filters Row */}
            <div className="filter-section">
                <div className="filter-row">
                    <button className="chip active">All</button>
                    <button className="chip">Education</button>
                    <button className="chip">Sports</button>
                    <button className="chip">Entertainment</button>
                    <button className="chip">Networking</button>
                </div>
                <div className="slider-btns">
                    <button className="nav-btn" onClick={slideLeft}>❮</button>
                    <button className="nav-btn" onClick={slideRight}>❯</button>
                </div>
            </div>

            {/* Slider Buttons */}


            {/* Card Slider */}
            <div className="event-cards" ref={sliderRef}>
                {data.map((e, i) => (
                    <div className="event-card" key={i}>
                        {e.tag && <span className="tag">{e.tag}</span>}

                        <img src={e.img} alt={e.title} className="event-img" />

                        <h4 className="event-title">
                            <div>{e.title}</div>
                            <div>{SAVEICON}</div>
                        </h4>

                        <div className="event-details" style={{ paddingTop: "10px" }}>
                            <p>{LOCATION_ICON} {e.location}</p>
                            <p>{DATEICON} {e.date}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <div className="price-btn">{e.type}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
