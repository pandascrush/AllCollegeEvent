import React, { useState, useEffect } from "react";
import styles from "./MyEvents.module.css";
import { FaEllipsisV } from "react-icons/fa";

export default function MyEventsList({ events = [], handlers = {} }) {
  const [openMenuFor, setOpenMenuFor] = useState(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!e.target.closest || !document) return;
      if (!e.target.closest(`.${styles.menuPopup}`) && !e.target.closest(`.${styles.kebab}`)) {
        setOpenMenuFor(null);
      }
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  if (!events.length) return <div className={styles.noResults}>No events match your search / filter.</div>;

  return (
    <div className={styles.list}>
      {events.map((ev) => {
        const status = (ev.status || "").toLowerCase();
        return (
          <div className={styles.listRow} key={ev.id}>
            <div className={styles.listThumb}><img src={ev.imageUrl} alt={ev.title} /></div>

            <div className={styles.listBody}>
              <div className={styles.listTop}>
                <h6>{ev.title}</h6>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button className={styles.ghostBtn}>Edit</button>

                  <div style={{ position: "relative" }}>
                    <button
                      className={styles.kebab}
                      onClick={(e) => { e.stopPropagation(); setOpenMenuFor(openMenuFor === ev.id ? null : ev.id); }}
                    >
                      <FaEllipsisV />
                    </button>

                    {openMenuFor === ev.id && (
                      <div className={styles.menuPopup} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.menuItem} onClick={() => { handlers.onDelete?.(ev.id); setOpenMenuFor(null); }}>Delete</button>
                        <button className={styles.menuItem} onClick={() => { handlers.onCopyUrl?.(ev.id); setOpenMenuFor(null); }}>Copy URL</button>
                        <button className={styles.menuItem} onClick={() => { handlers.onDuplicate?.(ev.id); setOpenMenuFor(null); }}>Duplicate</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.listMeta}>
                <span className={`${styles.smallStatus} ${styles["status_" + status]}`}>{status ? status.charAt(0).toUpperCase() + status.slice(1) : ""}</span>
                <div className={styles.shortMeta}>
                  <span>{ev.location}</span>
                  <span>•</span>
                  <span>{ev.date}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
