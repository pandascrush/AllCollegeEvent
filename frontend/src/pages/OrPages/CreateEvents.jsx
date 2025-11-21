// ============================================================
// CREATE EVENTS — MAIN MULTI-STEP WRAPPER
// Uses 4 child components to render each section
// ============================================================

import React, { useState, useRef } from "react";
import styles from "../OrPages/CreateEvents.module.css";

// Child Components
import BasicDetails from "./CreateEvent/BasicDetails";
import OrganizerDetails from "./CreateEvent/OrganizerDetails";
import TicketDetails from "./CreateEvent/TicketDetails";
import FinalDetails from "./CreateEvent/FinalDetails";

export default function CreateEvents() {
  /* ============================================================
     PAGE FLOW CONTROL (VERY IMPORTANT)
  ============================================================ */
  const [step, setStep] = useState(1);

  /* ============================================================
     ALL FORM STATES
  ============================================================ */

  // Basic Details
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [about, setAbout] = useState("");

  // Calendar
  const [calendarRows, setCalendarRows] = useState([
    { startDate: "", startTime: "", endDate: "", endTime: "" },
  ]);
  const [multiDates, setMultiDates] = useState(false);

  // Location
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  const [mapLink, setMapLink] = useState("");

  // Files
  const [files, setFiles] = useState([]);
  const fileRef = useRef(null);

  // Socials
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");

  // Misc
  const [hybrid, setHybrid] = useState(false);
  const [accommodation, setAccommodation] = useState("");

  // Perks
  const [perks, setPerks] = useState({
    cash: false,
    awards: false,
    medal: false,
  });

  // Certification
  const [cert, setCert] = useState({
    forAll: false,
    exclusiveWinners: false,
    notProvided: false,
  });

  // Organizer
  const [organizer, setOrganizer] = useState({
    orgType: "",
    name: "",
    email: "",
    mobile: "",
    altMobile: "",
    coordinators: [],
  });

  // Tickets
  const [tickets, setTickets] = useState({
    external: false,
    externalUrl: "",
    list: [],
  });
  const [finalPayload, setFinalPayload] = useState(null);

  // Final Modal
  const [final, setFinal] = useState({ showModal: false });

  /* ============================================================
     TAG HANDLING
  ============================================================ */
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

  /* ============================================================
     FILE UPLOAD
  ============================================================ */
  const onFilesChange = (e) => {
    const selected = Array.from(e.target.files).slice(0, 6);
    setFiles(selected);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).slice(0, 6);
    setFiles(dropped);
  };

  /* ============================================================
     CALENDAR HANDLING
  ============================================================ */
  const updateCalendarRow = (index, key, value) => {
    const updated = [...calendarRows];
    updated[index][key] = value;
    setCalendarRows(updated);
  };

  const addCalendarRow = () => {
    setCalendarRows([
      ...calendarRows,
      { startDate: "", startTime: "", endDate: "", endTime: "" },
    ]);
  };

  const removeCalendarRow = (index) => {
    setCalendarRows(calendarRows.filter((_, i) => i !== index));
  };

  /* ============================================================
     RENDER UI BASED ON STEP
  ============================================================ */
  return (
    <div className={styles.ceWrapper}>
      {/* ===================== TOP STEPPER ===================== */}
      <div className={styles.ceStepper}>
        <div
          className={`${styles.ceStepItem} ${
            step === 1 ? styles.ceStepItemActive : ""
          }`}
          onClick={() => setStep(1)}
        >
          <img src="/images/basicdetails.png" className={styles.ceStepIcon} />
          <p>BASIC DETAILS</p>
        </div>

        <div
          className={`${styles.ceStepItem} ${
            step === 2 ? styles.ceStepItemActive : ""
          }`}
          onClick={() => {
            if (title.trim()) setStep(2);
          }}
        >
          <img src="/images/creatordetails.png" className={styles.ceStepIcon} />
          <p>CREATOR DETAILS</p>
        </div>

        <div
          className={`${styles.ceStepItem} ${
            step === 3 ? styles.ceStepItemActive : ""
          }`}
          onClick={() => {
            if (organizer.name.trim()) setStep(3);
          }}
        >
          <img src="/images/finaldetails.png" className={styles.ceStepIcon} />
          <p>TICKET DETAILS</p>
        </div>

        <div
          className={`${styles.ceStepItem} ${
            step === 4 ? styles.ceStepItemActive : ""
          }`}
          onClick={() => {
            if (tickets.list.length > 0) setStep(4);
          }}
        >
          <img src="/images/finaldetails.png" className={styles.ceStepIcon} />
          <p>FINAL DETAILS</p>
        </div>
      </div>

      {/* ===================== STEP 1 — BASIC DETAILS ===================== */}
      {step === 1 && (
        <BasicDetails
          title={title}
          setTitle={setTitle}
          eventType={eventType}
          setEventType={setEventType}
          category={category}
          setCategory={setCategory}
          tags={tags}
          tagInput={tagInput}
          setTagInput={setTagInput}
          addTag={addTag}
          removeTag={removeTag}
          about={about}
          setAbout={setAbout}
          calendarRows={calendarRows}
          updateCalendarRow={updateCalendarRow}
          multiDates={multiDates}
          setMultiDates={setMultiDates}
          addCalendarRow={addCalendarRow}
          removeCalendarRow={removeCalendarRow}
          venue={venue}
          setVenue={setVenue}
          city={city}
          setCity={setCity}
          mapLink={mapLink}
          setMapLink={setMapLink}
          files={files}
          setFiles={setFiles}
          fileRef={fileRef}
          onFilesChange={onFilesChange}
          onDrop={onDrop}
          whatsapp={whatsapp}
          setWhatsapp={setWhatsapp}
          instagram={instagram}
          setInstagram={setInstagram}
          linkedin={linkedin}
          setLinkedin={setLinkedin}
          hybrid={hybrid}
          setHybrid={setHybrid}
          perks={perks}
          setPerks={setPerks}
          cert={cert}
          setCert={setCert}
          accommodation={accommodation}
          setAccommodation={setAccommodation}
          onNext={() => {
            if (!title.trim()) {
              alert("Event title required!");
              return;
            }

            console.log("---- BASIC DETAILS PAYLOAD ----");
            console.log({
              title,
              eventType,
              category,
              tags,
              about,
              calendarRows,
              venue,
              city,
              mapLink,
              files,
              whatsapp,
              instagram,
              linkedin,
              hybrid,
              perks,
              certification: cert,
              accommodation,
            });

            setStep(2);
          }}
        />
      )}

      {/* ===================== STEP 2 — ORGANIZER DETAILS ===================== */}
      {step === 2 && (
        <OrganizerDetails
          organizer={organizer}
          setOrganizer={setOrganizer}
          setStep={setStep}
        />
      )}

      {/* ===================== STEP 3 — TICKET DETAILS ===================== */}
      {step === 3 && (
        <TicketDetails
          tickets={tickets}
          setTickets={setTickets}
          setStep={setStep}
          // new props needed for payload
          title={title}
          eventType={eventType}
          category={category}
          tags={tags}
          about={about}
          calendarRows={calendarRows}
          venue={venue}
          city={city}
          mapLink={mapLink}
          files={files}
          whatsapp={whatsapp}
          instagram={instagram}
          linkedin={linkedin}
          hybrid={hybrid}
          perks={perks}
          cert={cert}
          accommodation={accommodation}
          organizer={organizer}
          finalPayload={finalPayload}
          setFinalPayload={setFinalPayload}
        />
      )}

      {/* ===================== STEP 4 — FINAL DETAILS ===================== */}
      {step === 4 && (
        <FinalDetails
          finalPayload={finalPayload}
          final={final}
          setFinal={setFinal}
          setStep={setStep}
        />
      )}
    </div>
  );
}
