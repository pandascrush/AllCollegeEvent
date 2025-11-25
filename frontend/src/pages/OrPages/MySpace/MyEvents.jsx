import React, { useState } from "react";
import styles from "./MyEvents.module.css";
import MyEventsGrid from "./MyEventsGrid";
import MyEventsList from "./MyEventsList";
import { FaThLarge, FaListUl } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const EMPTY_ILLU = "https://img.freepik.com/free-photo/professional-equipment-camera-tripod-stand-field-front-prepared-table-evening-time_146671-14420.jpg?semt=ais_hybrid&w=740&q=80";

// STATIC SAMPLE EVENTS (Later replace with API)
const STATIC_EVENTS = [
  {
    id: 1,
    title: "Faculty Development Program (FDP)",
    imageUrl: "https://img.freepik.com/free-photo/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space_637285-559.jpg?semt=ais_hybrid&w=740&q=80",
    status: "published",
    location: "Chennai",
    date: "Dec 25, 2025",
  },
  {
    id: 2,
    title: "Faculty Development Program (FDP)",
    imageUrl: "https://img.freepik.com/free-photo/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space_637285-559.jpg?semt=ais_hybrid&w=740&q=80",
    status: "draft",
    location: "Coimbatore",
    date: "Dec 29, 2025",
  },
  {
    id: 3,
    title: "Faculty Development Program (FDP)",
    imageUrl: "https://img.freepik.com/free-photo/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space_637285-559.jpg?semt=ais_hybrid&w=740&q=80",
    status: "completed",
    location: "Bangalore",
    date: "Jan 2, 2026",
  },
  {
    id: 4,
    title: "Faculty Development Program (FDP)",
    imageUrl: "https://img.freepik.com/free-photo/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space_637285-559.jpg?semt=ais_hybrid&w=740&q=80",
    status: "pending",
    location: "Hyderabad",
    date: "Jan 5, 2026",
  },
  {
    id: 5,
    title: "Faculty Development Program (FDP)",
    imageUrl: "https://img.freepik.com/free-photo/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space_637285-559.jpg?semt=ais_hybrid&w=740&q=80",
    status: "rejected",
    location: "Chennai",
    date: "Jan 10, 2026",
  },
];

export default function MyEvents() {
  const navigate = useNavigate();

  const [events] = useState(STATIC_EVENTS); 
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("grid");

  const statusOptions = ["all", "published", "draft", "pending", "completed", "rejected"];

  const filtered = events.filter((ev) => {
    if (filter !== "all" && ev.status !== filter) return false;
    if (search && !ev.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const onCreate = () => navigate("/organizer/dashboard/my-space/organizer-create-events");

  // EMPTY STATE
  if (events.length === 0) {
    return (
      <div className={styles.wrapper}>
        <h2>My Events</h2>
        <div className={styles.emptyBox}>
          <img src={EMPTY_ILLU} className={styles.emptyImg} />
          <h3>No Events Found</h3>
          <p>Create your first event and unlock the full event-creator experience.</p>
          <button className={styles.primaryBtn} onClick={onCreate}>
            Create Event
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h2>My Events</h2>

      {/* Search + Filter + Toggle Row */}
      <div className={styles.controlsRow}>
        <div className={styles.leftControls}>
          <div className={styles.searchBox}>
            <input
              placeholder="Search your events"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.rightControls}>
          <label className={styles.filterLabel}>Filter by</label>
          <select
            className={styles.filterSelect}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "All Events" : s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>

          <button className={styles.iconBtn}>
            <IoCalendarOutline />
          </button>

          {/* 🔥 NEW VIEW TOGGLE — ONLY ONE ICON SHOWS */}
          <div className={styles.viewToggle}>
            {view === "grid" ? (
              <button
                className={styles.iconBtn}
                onClick={() => setView("list")}
              >
                <FaListUl />
              </button>
            ) : (
              <button
                className={styles.iconBtn}
                onClick={() => setView("grid")}
              >
                <FaThLarge />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* GRID or LIST VIEW */}
      {view === "grid" ? (
        <MyEventsGrid events={filtered} />
      ) : (
        <MyEventsList events={filtered} />
      )}
    </div>
  );
}
