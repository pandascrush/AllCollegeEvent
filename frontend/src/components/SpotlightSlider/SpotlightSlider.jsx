import React, { useEffect, useState } from "react";
import "./SpotlightSlider.css";
import { LOCATION_ICON, DATEICON, SHAREICON } from "../../const/const";

const slidesData = [
    {
        id: 1,
        img: "/images/event.png",
        title: "Quick Solvathon Innovation Challenge",
        location: "KCT Tech Park, Coimbatore",
        datetime: "2025-10-19T17:00:00",
        theme: "purple",
    },
    {
        id: 2,
        img: "/images/event.png",
        title: "International Conference on Design",
        location: "Coimbatore Convention Center",
        datetime: "2025-11-18T10:00:00",
        theme: "blue",
    },
    {
        id: 3,
        img: "/images/event.png",
        title: "Startup Pitch Night",
        location: "Innovation Hub, Coimbatore",
        datetime: "2025-12-01T18:30:00",
        theme: "green",
    },
    {
        id: 4,
        img: "/images/event.png",
        title: "Annual Music Fest",
        location: "City Arena",
        datetime: "2025-12-20T19:00:00",
        theme: "yellow",
    },
    {
        id: 5,
        img: "/images/event.png",
        title: "Developer Summit 2025",
        location: "Tech Park Auditorium",
        datetime: "2026-01-15T09:00:00",
        theme: "teal",
    }
];

function useCountdown(targetIso) {
    const [diff, setDiff] = useState(() => Math.max(new Date(targetIso) - new Date(), 0));

    useEffect(() => {
        const timer = setInterval(() => {
            setDiff(Math.max(new Date(targetIso) - new Date(), 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [targetIso]);

    const secs = Math.floor(diff / 1000) % 60;
    const mins = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return { days, hours, mins, secs };
}

export default function SpotlightSlider({ slides = slidesData }) {
    const [current, setCurrent] = useState(0);
    const total = slides.length;

    // Auto slide every 8 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % total);
        }, 8000);

        return () => clearInterval(timer);
    }, [total]);

    const goto = (i) => setCurrent((i + total) % total);
    const prev = () => goto(current - 1);
    const next = () => goto(current + 1);

    return (
        <section className="spotlight-root">
            <h2 className="spotlight-title">Top Spotlights</h2>

            <div className="spotlight-slider-wrapper">
                <div
                    className="spotlight-slider-track"
                    style={{
                        transform: `translateX(-${current * 100}%)`,
                    }}
                >
                    {slides.map((s) => {
                        const { days, hours, mins, secs } = useCountdown(s.datetime);

                        return (
                            <article className="spotlight-slide" key={s.id}>
                                <div className="slide-left">
                                    <img src={s.img} alt={s.title} className="slide-image" />
                                </div>

                                <div className="slide-right">
                                    <div className="slide-header">
                                        <h3 className="slide-title">{s.title}</h3>
                                        <button className="share-btn">{SHAREICON}</button>
                                    </div>

                                    <div className="meta">
                                        <div className="meta-row">
                                            <span className="meta-icon">{LOCATION_ICON}</span>
                                            <span className="meta-text">{s.location}</span>
                                        </div>
                                        <div className="meta-row">
                                            <span className="meta-icon">{DATEICON}</span>
                                            <span className="meta-text">
                                                {new Date(s.datetime).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="starts-in">Event Starts In</div>

                                    <div className="countdown-row">
                                        <div className={`count-pill ${s.theme}-pill`} id="days">
                                            <div className="count-num">{String(days).padStart(2, "0")}</div>
                                            <div className="count-label">Days</div>
                                        </div>
                                        <div className={`count-pill ${s.theme}-pill`} id="hours">
                                            <div className="count-num">{String(hours).padStart(2, "0")}</div>
                                            <div className="count-label">Hours</div>
                                        </div>
                                        <div className={`count-pill ${s.theme}-pill`} id="mins">
                                            <div className="count-num">{String(mins).padStart(2, "0")}</div>
                                            <div className="count-label">Mins</div>
                                        </div>
                                        <div className={`count-pill ${s.theme}-pill`} id="sec">
                                            <div className="count-num">{String(secs).padStart(2, "0")}</div>
                                            <div className="count-label">Sec</div>
                                        </div>
                                        <div className="" style={{padding:"0 0 0 10%"}}>

                                        <button className="btn-get">Get Ticket</button>
                                        </div>
                                    </div>

                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>

            {/* Arrow Controls */}
            <div className="spotlight-controls">
                <button className="arrow" onClick={prev}>❮</button>

                <div className="dots">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            className={`dot ${i === current ? "active" : ""}`}
                            onClick={() => goto(i)}
                        ></button>
                    ))}
                </div>

                <button className="arrow" onClick={next}>❯</button>
            </div>
        </section>
    );
}
