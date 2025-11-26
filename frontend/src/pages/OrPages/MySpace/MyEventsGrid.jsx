import React, { useState, useRef, useEffect } from "react";
import styles from "./MyEvents.module.css";
import { FaEllipsisV } from "react-icons/fa";

export default function MyEventsGrid({ events = [], handlers = {}, placeholderImage }) {
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
    <div className={styles.grid}>
      {events.map((ev) => {
        const status = (ev.status || "").toLowerCase();
        return (
          <div className={styles.card} key={ev.id}>
            <div className={styles.cardImageWrap}>
              <img src={ev.imageUrl} alt={ev.title} className={styles.cardImage} />
              {status && <span className={`${styles.statusTag} ${styles["status_" + status]}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>}
            </div>

            <div className={styles.cardBody}>
              <h4 className={styles.cardTitle}>{ev.title}</h4>
              <div className={styles.cardMeta}>
                <small>{ev.location}</small> • <small>{ev.date}</small>
              </div>

              <div className={styles.cardActions}>
                <button className={styles.ghostBtn}>Edit</button>

                {/* kebab + menu */}
                <div style={{ position: "relative" }}>
                  <button
                    className={styles.kebab}
                    onClick={(e) => { e.stopPropagation(); setOpenMenuFor(openMenuFor === ev.id ? null : ev.id); }}
                    aria-expanded={openMenuFor === ev.id}
                    title="More"
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
          </div>
        );
      })}
    </div>
  );
}
