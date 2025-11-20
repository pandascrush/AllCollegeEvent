import React, { useState, useRef, useEffect } from "react";
import styles from "./CreateEvents.module.css";
import {
  ADDICON,
  DELETICON,
  INSTAGRAMICON,
  LINKEDINICON,
  VIDEOICON,
  WEBSITEICON,
  WHATSAPPICON,
} from "../../const/const";

export default function CreateEvents() {
  /* ============================
     ALL STATES
  ============================ */

  // BASIC
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [about, setAbout] = useState("");

  // CALENDAR
  const [calendarRows, setCalendarRows] = useState([
    { startDate: "", startTime: "", endDate: "", endTime: "" },
  ]);
  const [multiDates, setMultiDates] = useState(false);

  // LOCATION & FILES
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [files, setFiles] = useState([]);
  const fileRef = useRef(null);

  // SOCIALS
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");

  // MISC
  const [sponsorship, setSponsorship] = useState(false);
  const [accommodation, setAccommodation] = useState("");

  // MODE, EVENT FOR, CERTIFICATE
  const [gender, setGender] = useState({
    male: false,
    female: false,
    others: false,
  });

  const [eventFor, setEventFor] = useState({
    nonParticipants: false,
    creativeWinners: false,
    international: false,
  });

  const [certificate, setCertificate] = useState({
    nonParticipants: false,
    exclusiveWinners: false,
    nonRefundable: false,
  });

  // ORGANIZER
  const [organizer, setOrganizer] = useState({
    orgType: "",
    name: "",
    email: "",
    mobile: "",
    altMobile: "",
    coordinators: [],
  });

  // TICKETS
  const [tickets, setTickets] = useState({
    external: false,
    externalUrl: "",
    list: [],
  });

  const [perks, setPerks] = useState({
    cash: false,
    awards: false,
    medal: false,
  });

  const [cert, setCert] = useState({
    forAll: false,
    exclusiveWinners: false,
    notProvided: false,
  });

  // FINAL MODAL
  const [final, setFinal] = useState({ showModal: false });
  const [hybrid, setHybrid] = useState(false);
  // ACTIVE STEPPER
  const [activeSection, setActiveSection] = useState("basic");

  /* ============================
     TAG HANDLERS
  ============================ */
  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setTagInput("");
    }
  };

  const removeTag = (t) => {
    setTags(tags.filter((x) => x !== t));
  };

  /* ============================
     FILE UPLOAD
  ============================ */
  const onFilesChange = (e) => {
    let selected = Array.from(e.target.files).slice(0, 6);
    setFiles(selected);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const dtFiles = Array.from(e.dataTransfer.files).slice(0, 6);
    setFiles(dtFiles);
  };

  /* ============================
     CALENDAR HANDLERS
  ============================ */
  const addCalendarRow = () => {
    setCalendarRows([
      ...calendarRows,
      { startDate: "", startTime: "", endDate: "", endTime: "" },
    ]);
  };

  const removeCalendarRow = (i) => {
    setCalendarRows(calendarRows.filter((_, idx) => idx !== i));
  };

  const updateCalendarRow = (i, key, val) => {
    const updated = [...calendarRows];
    updated[i][key] = val;
    setCalendarRows(updated);
  };

  /* ============================
     SCROLL TO SECTION
  ============================ */
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ============================
     TRACK ACTIVE SECTION ON SCROLL
  ============================ */
  useEffect(() => {
    const handleScroll = () => {
      const basic = document.getElementById("basicSection");
      const creator = document.getElementById("creatorSection");
      const ticket = document.getElementById("ticketSection");
      const final = document.getElementById("finalSection");

      const y = window.scrollY + window.innerHeight / 4;

      if (basic && y >= basic.offsetTop && y < creator.offsetTop)
        setActiveSection("basic");
      else if (creator && y >= creator.offsetTop && y < ticket.offsetTop)
        setActiveSection("creator");
      else if (ticket && y >= ticket.offsetTop && y < final.offsetTop)
        setActiveSection("ticket");
      else if (final && y >= final.offsetTop) setActiveSection("final");
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  /* ============================
     SAVE BASIC DETAILS
  ============================ */
  const saveBasicDetails = () => {
    alert("Basic details saved!");
  };

  /* ============================================================
     UI START
  ============================================================ */
  return (
    <div className={styles.ceWrapper}>
      {/* ===================== STEPPER ===================== */}
      <div className={styles.ceStepper}>
        <div
          className={`${styles.ceStepItem} ${
            activeSection === "basic" ? styles.ceStepItemActive : ""
          }`}
          onClick={() => scrollTo("basicSection")}
        >
          <img src="/images/basicdetails.png" className={styles.ceStepIcon} />
          <p>BASIC DETAILS</p>
        </div>

        <div
          className={`${styles.ceStepItem} ${
            activeSection === "creator" ? styles.ceStepItemActive : ""
          }`}
          onClick={() => scrollTo("creatorSection")}
        >
          <img src="/images/creatordetails.png" className={styles.ceStepIcon} />
          <p>CREATOR DETAILS</p>
        </div>

        <div
          className={`${styles.ceStepItem} ${
            activeSection === "final" ? styles.ceStepItemActive : ""
          }`}
          onClick={() => scrollTo("finalSection")}
        >
          <img src="/images/finaldetails.png" className={styles.ceStepIcon} />
          <p>FINAL DETAILS</p>
        </div>
      </div>

      {/* ============================================================
         SECTION 1: BASIC DETAILS
      ============================================================ */}
      <div className={styles.ceCard} id="basicSection">
        <h2 className={styles.ceSectionTitle}>Primary Details</h2>

        {/* Title + Type */}
        <div className={styles.ceGrid3}>
          <div className={styles.ceField}>
            <label className={styles.ceLabel}>Event Title *</label>
            <input
              className={styles.ceInput}
              placeholder="Enter event name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.ceField}>
            <label className={styles.ceLabel}>Type of Event</label>
            <select
              className={styles.ceInput}
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              <option value="">Select type</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div className={styles.ceField}>
            <label className={styles.ceLabel}>Target Category</label>
            <select
              className={styles.ceInput}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="tech">Tech</option>
              <option value="art">Art</option>
              <option value="business">Business</option>
            </select>
          </div>
        </div>

        {/* Category + Tags */}
        <div className={styles.ceGrid2} style={{ marginTop: "30px" }}>
          <div className={styles.ceField}>
            <label className={styles.ceLabel}>Tags</label>
            <div className={styles.ceTagRow}>
              <input
                className={styles.ceInput}
                placeholder="Add tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTag()}
              />
              <button
                type="button"
                className={styles.ceBtnSmall}
                onClick={addTag}
              >
                Add
              </button>
            </div>

            <div className={styles.ceTagList}>
              {tags.map((t, i) => (
                <span className={styles.ceTag} key={i}>
                  {t}
                  <button
                    className={styles.ceTagClose}
                    onClick={() => removeTag(t)}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className={styles.ceField}>
            <label className={styles.ceLabel}>Offer</label>
            <input
              className={styles.ceInput}
              placeholder="Enter Offers"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        {/* About */}
        <div className={styles.ceField}>
          <label className={styles.ceLabel}>About the event</label>
          <textarea
            className={styles.ceTextarea}
            placeholder="About the event"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </div>
      </div>
      {/* ================================
      FINAL CALENDAR FLOW
================================ */}
      <div className={styles.ceCard}>
        <h3 className={styles.ceSubtitle}>Create Calendar</h3>
        <div
          className={`${styles.ceGrid4} ${styles.ceCalendarRow}`}
          style={{
            opacity: multiDates ? 0.5 : 1,
            pointerEvents: multiDates ? "none" : "auto",
            marginTop: "30px",
          }}
        >
          <div className={styles.ceField}>
            <label className={styles.ceLabelSmall}>Start Date</label>
            <input
              type="date"
              className={styles.ceInput}
              value={calendarRows[0]?.startDate || ""}
              onChange={(e) =>
                updateCalendarRow(0, "startDate", e.target.value)
              }
            />
          </div>

          <div className={styles.ceField}>
            <label className={styles.ceLabelSmall}>Start Time</label>
            <input
              type="time"
              className={styles.ceInput}
              value={calendarRows[0]?.startTime || ""}
              onChange={(e) =>
                updateCalendarRow(0, "startTime", e.target.value)
              }
            />
          </div>

          <div className={styles.ceField}>
            <label className={styles.ceLabelSmall}>End Date</label>
            <input
              type="date"
              className={styles.ceInput}
              value={calendarRows[0]?.endDate || ""}
              onChange={(e) => updateCalendarRow(0, "endDate", e.target.value)}
            />
          </div>

          <div className={styles.ceField}>
            <label className={styles.ceLabelSmall}>End Time</label>
            <input
              type="time"
              className={styles.ceInput}
              value={calendarRows[0]?.endTime || ""}
              onChange={(e) => updateCalendarRow(0, "endTime", e.target.value)}
            />
          </div>
        </div>

        {/* =====================================
        2) TOGGLE – ALWAYS UNDER FIRST ROW
      ===================================== */}
        <label
          className={styles.ceSwitchContainer}
          style={{ marginTop: "30px" }}
        >
          <input
            type="checkbox"
            checked={multiDates}
            onChange={() => {
              const val = !multiDates;
              setMultiDates(val);

              // Turning ON → create one extra row
              if (val) {
                if (calendarRows.length === 1) {
                  setCalendarRows([
                    calendarRows[0],
                    { startDate: "", startTime: "", endDate: "", endTime: "" },
                  ]);
                }
              }

              // Turning OFF → collapse rows to only the first
              if (!val) {
                setCalendarRows([{ ...calendarRows[0] }]);
              }
            }}
          />

          <span className={styles.ceSwitch}></span>
          <span className={styles.ceSwitchText}>
            Schedule on Multiple Dates
          </span>
        </label>

        {/* =====================================
        3) MULTIPLE DATE ROWS (below toggle)
      ===================================== */}
        {multiDates && (
          <div style={{ marginTop: "30px" }}>
            {calendarRows.slice(1).map((row, idx) => {
              const i = idx + 1;

              return (
                <div
                  key={i}
                  className={`${styles.ceGrid5} ${styles.ceCalendarRow}`}
                  // style={{ position: "relative", marginBottom: "15px" }}
                >
                  {/* START DATE */}
                  <div className={styles.ceField}>
                    <label className={styles.ceLabelSmall}>Start Date</label>
                    <input
                      type="date"
                      className={styles.ceInput}
                      value={row.startDate}
                      onChange={(e) =>
                        updateCalendarRow(i, "startDate", e.target.value)
                      }
                    />
                  </div>

                  {/* START TIME */}
                  <div className={styles.ceField}>
                    <label className={styles.ceLabelSmall}>Start Time</label>
                    <input
                      type="time"
                      className={styles.ceInput}
                      value={row.startTime}
                      onChange={(e) =>
                        updateCalendarRow(i, "startTime", e.target.value)
                      }
                    />
                  </div>

                  {/* END DATE */}
                  <div className={styles.ceField}>
                    <label className={styles.ceLabelSmall}>End Date</label>
                    <input
                      type="date"
                      className={styles.ceInput}
                      value={row.endDate}
                      onChange={(e) =>
                        updateCalendarRow(i, "endDate", e.target.value)
                      }
                    />
                  </div>

                  {/* END TIME */}
                  <div className={styles.ceField}>
                    <label className={styles.ceLabelSmall}>End Time</label>
                    <input
                      type="time"
                      className={styles.ceInput}
                      value={row.endTime}
                      onChange={(e) =>
                        updateCalendarRow(i, "endTime", e.target.value)
                      }
                    />
                  </div>

                  {/* DELETE BUTTON (only for multi rows) */}
                  <div
                    className={styles.ceField}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "end",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      onClick={() =>
                        setCalendarRows(
                          calendarRows.filter((_, index) => index !== i)
                        )
                      }
                    >
                      {DELETICON}
                    </div>
                    {/* <button
                      type="button"
                      className={styles.ceDelete}
                     
                    >
                      
                    </button> */}
                    {i === calendarRows.length - 1 && (
                      <div
                        onClick={() =>
                          setCalendarRows([
                            ...calendarRows,
                            {
                              startDate: "",
                              startTime: "",
                              endDate: "",
                              endTime: "",
                            },
                          ])
                        }
                      >
                        {ADDICON}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* LOCATION */}
      <div className={styles.ceCard}>
        <h3 className={styles.ceSubtitle}>Location</h3>
        <div className={styles.ceGrid2} style={{ marginTop: "30px" }}>
          <div className={styles.ceField}>
            <label className={styles.ceLabel}>Venue</label>
            <input
              className={styles.ceInput}
              placeholder="Enter venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
          </div>

          <div className={styles.ceField}>
            <label className={styles.ceLabel}>City</label>
            <input
              className={styles.ceInput}
              placeholder="Location"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.ceField} style={{ marginBottom: "30px" }}>
          <label className={styles.ceLabel}>Google Map Link</label>
          <input
            className={styles.ceInput}
            placeholder="Map link"
            value={mapLink}
            onChange={(e) => setMapLink(e.target.value)}
          />
        </div>
      </div>

      {/* FILES + SOCIAL */}
      <div className={styles.ceCard}>
        <div className={`${styles.ceGrid2}`} style={{ gap: "35px" }}>
          {/* Files */}
          <div className={styles.ceField} style={{ gap: "40px" }}>
            <label className={styles.ceLabel}>Files</label>

            {/* FILE UPLOAD */}
            <div
              className={styles.ceDropzone}
              onClick={() => fileRef.current.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
            >
              <p className={styles.ceDropHint}>
                Drag & drop or click to upload files (max 6)
              </p>

              <input
                type="file"
                multiple
                accept="image/*"
                ref={fileRef}
                onChange={onFilesChange}
                style={{ display: "none" }}
              />

              <div className={styles.cePreviewRow}>
                {files.length === 0 && (
                  <div className={styles.cePreviewEmpty}>No files uploaded</div>
                )}

                {files.map((f, i) => (
                  <div className={styles.ceFileChip} key={i}>
                    {f.name}
                    <button
                      type="button"
                      className={styles.ceFileRemove}
                      onClick={() =>
                        setFiles(files.filter((_, idx) => idx !== i))
                      }
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* VIDEO LINK INPUT */}
            <div className={styles.ceInputIconWrapper}>
              <span className={styles.ceInputIcon}>
                {/* Video Icon */}
                {VIDEOICON}
              </span>

              <input
                className={styles.ceInputWithIcon}
                placeholder="Event Video Link"
                value=""
                onChange={(e) => setVideoLink(e.target.value)}
              />
            </div>

            {/* WEBSITE LINK INPUT */}
            <div className={styles.ceInputIconWrapper}>
              <span className={styles.ceInputIcon}>
                {/* Website Icon */}
                {WEBSITEICON}
              </span>

              <input
                className={styles.ceInputWithIcon}
                placeholder="Website Link"
                value=""
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>

          {/* Social */}
          <div
            className={styles.ceField}
            style={{ paddingTop: "18%", gap: "20px" }}
          >
            <label className={styles.ceLabel}>Social Media Links</label>

            {/* WHATSAPP */}
            <div className={styles.ceInputIconWrapper}>
              <span className={styles.ceInputIcon}>
                {/* WhatsApp SVG */}
                {WHATSAPPICON}
              </span>

              <input
                className={styles.ceInputWithIcon}
                placeholder="Whatsapp channel link"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>

            {/* INSTAGRAM */}
            <div className={styles.ceInputIconWrapper}>
              <span className={styles.ceInputIcon}>
                {/* Instagram SVG */}
                {INSTAGRAMICON}
              </span>

              <input
                className={styles.ceInputWithIcon}
                placeholder="Instagram link"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>

            {/* LINKEDIN */}
            <div className={styles.ceInputIconWrapper}>
              <span className={styles.ceInputIcon}>
                {/* LinkedIn SVG */}
                {LINKEDINICON}
              </span>

              <input
                className={styles.ceInputWithIcon}
                placeholder="LinkedIn link"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MISC */}
      {/* ===============================
    PERKS & CERTIFICATION SECTION
================================ */}
      <div className={styles.ceCard}>
        {/* HYBRID EVENT TOGGLE */}
        <div className={styles.ceField}>
          <label className={styles.ceLabel}>
            Would you like to make this a hybrid event?
          </label>

          <label className={styles.ceSwitchLine}>
            <input
              type="checkbox"
              checked={hybrid}
              onChange={() => setHybrid(!hybrid)}
            />
            <span>No</span>
          </label>
        </div>

        {/* PERKS */}
        <div className={styles.ceField} style={{ marginTop: "20px" }}>
          <label className={styles.ceLabel}>Perks</label>

          <div className={styles.cePerkBox} style={{marginTop:"15px"}}>
            <label className={styles.cePerkItem}>
              <input
                type="checkbox"
                checked={perks.cash}
                onChange={() => setPerks({ ...perks, cash: !perks.cash })}
              />
              Cash
            </label>

            <label className={styles.cePerkItem}>
              <input
                type="checkbox"
                checked={perks.awards}
                onChange={() => setPerks({ ...perks, awards: !perks.awards })}
              />
              Awards
            </label>

            <label className={styles.cePerkItem}>
              <input
                type="checkbox"
                checked={perks.medal}
                onChange={() => setPerks({ ...perks, medal: !perks.medal })}
              />
              Medal
            </label>
          </div>
        </div>

        {/* CERTIFICATION */}
        <div className={styles.ceField} style={{ marginTop: "15px" }}>
          <label className={styles.ceLabel}>Certification *</label>

          <div className={styles.cePerkBox} style={{marginTop:"30px"}}>
            <label className={styles.cePerkItem}>
              <input
                type="checkbox"
                checked={cert.forAll}
                onChange={() => setCert({ ...cert, forAll: !cert.forAll })}
              />
              For all participants
            </label>

            <label className={styles.cePerkItem}>
              <input
                type="checkbox"
                checked={cert.exclusiveWinners}
                onChange={() =>
                  setCert({ ...cert, exclusiveWinners: !cert.exclusiveWinners })
                }
              />
              Exclusive Winners
            </label>

            <label className={styles.cePerkItem}>
              <input
                type="checkbox"
                checked={cert.notProvided}
                onChange={() =>
                  setCert({ ...cert, notProvided: !cert.notProvided })
                }
              />
              Not Provided
            </label>
          </div>
        </div>

        {/* ACCOMMODATION */}
        <div className={styles.ceField} style={{ marginTop: "25px" }}>
          <label className={styles.ceLabel}>Accommodations</label>
          <select
            className={styles.ceInput}
            value={accommodation}
            onChange={(e) => setAccommodation(e.target.value)}
          >
            <option value="">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      {/* SAVE BUTTON */}
      <div className={styles.ceEndActions}>
        {/* <button className={styles.ceBtnOutline} style={{display:"none"}}>Back</button> */}

        <button className={styles.ceBtnPrimary} onClick={saveBasicDetails}>
          Save Basic Details
        </button>
      </div>

      {/* ============================================================
         SECTION 2: ORGANIZER DETAILS
      ============================================================ */}
      <div className={styles.ceCard} id="creatorSection">
        <h2 className={styles.ceSectionTitle}>Organizer Details</h2>

        {/* Organizer Type + Email */}
        <div className={styles.ceGrid2}>
          <div className={styles.ceField}>
            <label className={styles.ceLabel}>Organizer Type *</label>
            <select
              className={styles.ceInput}
              value={organizer.orgType}
              onChange={(e) =>
                setOrganizer({ ...organizer, orgType: e.target.value })
              }
            >
              <option value="">Select organizer</option>
              <option value="College">College</option>
              <option value="University">University</option>
              <option value="Company">Company</option>
              <option value="Club">Club / Team</option>
            </select>
          </div>

          <div className={styles.ceField}>
            <label className={styles.ceLabel}>Email *</label>
            <input
              className={styles.ceInput}
              placeholder="Enter Mail ID"
              value={organizer.email}
              onChange={(e) =>
                setOrganizer({ ...organizer, email: e.target.value })
              }
            />
          </div>
        </div>

        {/* Organizer Name + Mobile */}
        {/* Organizer Name + Mobile */}
        <div className={styles.ceGrid2}>
          <div className={styles.ceField}>
            <label className={styles.ceLabel}>Organizer Name *</label>
            <input
              className={styles.ceInput}
              placeholder="Enter organization name"
              value={organizer.name}
              onChange={(e) =>
                setOrganizer({ ...organizer, name: e.target.value })
              }
            />
          </div>

          <div className={styles.ceField}>
            <label className={styles.ceLabel}>Mobile Number *</label>
            <input
              className={styles.ceInput}
              placeholder="+91 - 98765 43210"
              value={organizer.mobile}
              onChange={(e) =>
                setOrganizer({ ...organizer, mobile: e.target.value })
              }
            />
          </div>
        </div>

        {/* Alternate Number + Add Coordinator */}
        <div className={styles.ceGrid2}>
          <div className={styles.ceField}>
            <label className={styles.ceLabel}>Alternate Mobile Number</label>
            <input
              className={styles.ceInput}
              placeholder="+91 - 98765 43210"
              value={organizer.altMobile}
              onChange={(e) =>
                setOrganizer({ ...organizer, altMobile: e.target.value })
              }
            />
          </div>

          <div className={`${styles.ceField} ${styles.ceFlexEnd}`}>
            <button
              className={styles.ceBtnOutline}
              type="button"
              onClick={() =>
                setOrganizer({
                  ...organizer,
                  coordinators: [
                    ...(organizer.coordinators || []),
                    { name: "", email: "", phone: "" },
                  ],
                })
              }
            >
              + Coordinator Details
            </button>
          </div>
        </div>

        {/* Coordinator Dynamic Rows */}
        <div className={styles.ceCoordSection}>
          {(organizer.coordinators || []).map((c, i) => (
            <div className={styles.ceCoordRow} key={i}>
              <input
                className={styles.ceInput}
                placeholder="Coordinator Name"
                value={c.name}
                onChange={(e) => {
                  let rows = [...organizer.coordinators];
                  rows[i].name = e.target.value;
                  setOrganizer({ ...organizer, coordinators: rows });
                }}
              />

              <input
                className={styles.ceInput}
                placeholder="Coordinator Email"
                value={c.email}
                onChange={(e) => {
                  let rows = [...organizer.coordinators];
                  rows[i].email = e.target.value;
                  setOrganizer({ ...organizer, coordinators: rows });
                }}
              />

              <input
                className={styles.ceInput}
                placeholder="Coordinator Phone"
                value={c.phone}
                onChange={(e) => {
                  let rows = [...organizer.coordinators];
                  rows[i].phone = e.target.value;
                  setOrganizer({ ...organizer, coordinators: rows });
                }}
              />

              <button
                type="button"
                className={styles.ceDelete}
                onClick={() => {
                  let rows = organizer.coordinators.filter(
                    (_, idx) => idx !== i
                  );
                  setOrganizer({ ...organizer, coordinators: rows });
                }}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================
          SECTION 3: Ticket Information
      ============================================================ */}
      <div className={styles.ceCard} id="ticketSection">
        <h2 className={styles.ceSectionTitle}>Ticket Information</h2>

        {/* External Payment */}
        <div className={styles.ceGrid2}>
          <div className={styles.ceField}>
            <label className={styles.ceLabel}>
              Buy ticket at (External Payment)
            </label>

            <label className={styles.ceSwitchLine}>
              <input
                type="checkbox"
                checked={tickets.external}
                onChange={() =>
                  setTickets({ ...tickets, external: !tickets.external })
                }
              />
              <span>{tickets.external ? "External" : "Internal"}</span>
            </label>
          </div>

          <div className={styles.ceField}>
            <label className={styles.ceLabel}>Paste Payment URL</label>
            <input
              className={styles.ceInput}
              placeholder="https://example.com"
              value={tickets.externalUrl}
              onChange={(e) =>
                setTickets({ ...tickets, externalUrl: e.target.value })
              }
            />
          </div>
        </div>

        {/* Add Ticket */}
        <div className={styles.ceTicketAddRow}>
          <button
            type="button"
            className={styles.ceBtnOutline}
            onClick={() =>
              setTickets({
                ...tickets,
                list: [
                  ...(tickets.list || []),
                  { name: "", price: "", total: "", totalTicket: "" },
                ],
              })
            }
          >
            + Add Ticket
          </button>
        </div>

        {/* Empty */}
        {(!tickets.list || tickets.list.length === 0) && (
          <div className={styles.ceEmptyTicket}>
            Ticket is empty! Click to create ticket
          </div>
        )}

        {/* Ticket List */}
        <div className={styles.ceTicketList}>
          {(tickets.list || []).map((t, i) => (
            <div className={styles.ceTicketRow} key={i}>
              <input
                className={styles.ceInput}
                placeholder="Ticket Name"
                value={t.name}
                onChange={(e) => {
                  let rows = [...tickets.list];
                  rows[i].name = e.target.value;
                  setTickets({ ...tickets, list: rows });
                }}
              />

              <input
                className={styles.ceInput}
                placeholder="Price"
                value={t.price}
                onChange={(e) => {
                  let rows = [...tickets.list];
                  rows[i].price = e.target.value;
                  setTickets({ ...tickets, list: rows });
                }}
              />

              <input
                className={styles.ceInput}
                placeholder="Total"
                value={t.total}
                onChange={(e) => {
                  let rows = [...tickets.list];
                  rows[i].total = e.target.value;
                  setTickets({ ...tickets, list: rows });
                }}
              />

              <input
                className={styles.ceInput}
                placeholder="Total ticket"
                value={t.totalTicket}
                onChange={(e) => {
                  let rows = [...tickets.list];
                  rows[i].totalTicket = e.target.value;
                  setTickets({ ...tickets, list: rows });
                }}
              />

              <button
                type="button"
                className={styles.ceDelete}
                onClick={() =>
                  setTickets({
                    ...tickets,
                    list: tickets.list.filter((_, idx) => idx !== i),
                  })
                }
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================
          SECTION 4: FINAL DETAILS
      ============================================================ */}
      <div className={styles.ceCard} id="finalSection">
        <h2 className={styles.ceSectionTitle}>Final Details</h2>

        <div className={styles.ceFinalSummary}>
          <h3 className={styles.ceSummaryTitle}>Summary</h3>

          <p>
            <strong>Event Title:</strong> {title || "Not entered"}
          </p>
          <p>
            <strong>Organizer:</strong> {organizer.name || "Not entered"}
          </p>
          <p>
            <strong>Total Calendar Dates:</strong> {calendarRows.length}
          </p>
          <p>
            <strong>Total Tickets:</strong> {(tickets.list || []).length}
          </p>
          <p>
            <strong>Category:</strong> {category || "Not selected"}
          </p>
        </div>

        <div className={styles.ceEndActions}>
          <button className={styles.ceBtnOutline}>Back</button>

          <button
            className={styles.ceBtnPrimary}
            onClick={() => setFinal({ ...final, showModal: true })}
          >
            Submit
          </button>
        </div>
      </div>

      {/* ============================
          SUBMISSION MODAL
      ============================ */}
      {final.showModal && (
        <div className={styles.ceModalBackdrop}>
          <div className={styles.ceModal}>
            <h2 className={styles.ceModalTitle}>Submission Successful</h2>
            <p className={styles.ceModalText}>
              Your event has been submitted and will be published once verified.
            </p>

            <div className={styles.ceModalActions}>
              <button
                className={styles.ceBtnOutline}
                onClick={() => setFinal({ ...final, showModal: false })}
              >
                Close
              </button>

              <button
                className={styles.ceBtnPrimary}
                onClick={() => {
                  setFinal({ ...final, showModal: false });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
