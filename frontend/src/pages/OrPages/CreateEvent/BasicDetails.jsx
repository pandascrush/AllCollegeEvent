import React, { useEffect, useState } from "react";
import styles from "./CreateEvents.module.css";

import {
  WHATSAPPICON,
  INSTAGRAMICON,
  LINKEDINICON,
  VIDEOICON,
  WEBSITEICON,
} from "../../../const/const";
import {
  getCertification,
  getEventType,
  getEventTypeCategorys,
  getPeak,
} from "../../../APIs/DefaultValue";

export default function BasicDetails({
  title,
  setTitle,
  eventType,
  setEventType,
  category,
  setCategory,
  tags,
  tagInput,
  setTagInput,
  addTag,
  removeTag,
  about,
  setAbout,

  calendarRows,
  updateCalendarRow,
  multiDates,
  setMultiDates,
  addCalendarRow,
  removeCalendarRow,

  venue,
  setVenue,
  city,
  setCity,
  mapLink,
  setMapLink,

  files,
  setFiles,
  fileRef,
  onFilesChange,
  onDrop,

  whatsapp,
  setWhatsapp,
  instagram,
  setInstagram,
  linkedin,
  setLinkedin,

  perks,
  setPerks,
  cert,
  setCert,
  accommodation,
  setAccommodation,
  hybrid,
  setHybrid,

  onNext,
}) {
  const [perksValue, setPerksValue] = useState([]);
  const [defaultEventType, setdefaultEventType] = useState([]);
  const [defaultEventTypeCategory, setdefaultEventTypeCategory] = useState([]);
  const [defaultCertification, setdefaultCertification] = useState([]);
  const [selectedPerks, setSelectedPerks] = useState([]);
  const [selectedCertification, setselectedCertification] = useState([]);

  useEffect(() => {
    fetchDefaltValue();
  }, []);

  const fetchDefaltValue = async () => {
    try {
      const response = await getPeak();
      setPerksValue(response.data.perks);
      const getDefalutEventType = await getEventType();
      setdefaultEventType(getDefalutEventType.data);
      const getDefalutEventTypeCategory = await getEventTypeCategorys();
      setdefaultEventTypeCategory(getDefalutEventTypeCategory.data);
      const getDefalutCertification = await getCertification();
      setdefaultCertification(getDefalutCertification.data);
      console.log("000==============000", getDefalutCertification.data);
    } catch (error) {
      console.log("Error fetching profile", error);
    }
  };

  const filteredCategories = defaultEventTypeCategory.filter(
    (cat) => cat.eventTypeId?._id === eventType
  );

  const togglePerk = (id) => {
    setSelectedPerks((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );

    // also update parent
    setPerks((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleCertification = (id) => {
    setselectedCertification((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );

    // send to parent
    setCert((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* ========================= PRIMARY DETAILS ========================= */}
      <div className={styles.ceCard}>
        <h2 className={styles.ceSectionTitle}>Primary Details</h2>

        {/* Title + Type + Category */}
        <div className={styles.ceGrid3}>
          <div className={styles.ceField}>
            <label className={styles.ceLabel}>
              Event Title <span className={styles.ceReq}>*</span>
            </label>
            <input
              className={styles.ceInput}
              placeholder="Enter event name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.ceField}>
            <label className={styles.ceLabel}>Type of Event</label>
            {console.log("=====>11111111", defaultEventType)}
            <select
              className={styles.ceInput}
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              <option value="">Select type</option>

              {defaultEventType.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
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

              {filteredCategories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tags */}
        <div className={styles.ceGrid2} style={{ marginTop: "25px" }}>
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
              <button className={styles.ceBtnSmall} onClick={addTag}>
                Add
              </button>
            </div>

            <div className={styles.ceTagList}>
              {tags.map((t, i) => (
                <span key={i} className={styles.ceTag}>
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
              placeholder="Enter offers"
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
          />
        </div>
      </div>

      {/* ========================= CALENDAR ========================= */}
      <div className={styles.ceCard}>
        <h3 className={styles.ceSubtitle}>Create Calendar</h3>

        {/* FIRST CALENDAR ROW */}
        <div
          className={styles.ceGrid4}
          style={{
            opacity: multiDates ? 0.5 : 1,
            pointerEvents: multiDates ? "none" : "auto",
            marginTop: "20px",
          }}
        >
          {/* Start Date */}
          <div className={styles.ceField}>
            <label className={styles.ceLabelSmall}>Start Date</label>
            <input
              type="date"
              className={styles.ceInput}
              value={calendarRows[0].startDate}
              onChange={(e) =>
                updateCalendarRow(0, "startDate", e.target.value)
              }
            />
          </div>

          {/* Start Time */}
          <div className={styles.ceField}>
            <label className={styles.ceLabelSmall}>Start Time</label>
            <input
              type="time"
              className={styles.ceInput}
              value={calendarRows[0].startTime}
              onChange={(e) =>
                updateCalendarRow(0, "startTime", e.target.value)
              }
            />
          </div>

          {/* End Date */}
          <div className={styles.ceField}>
            <label className={styles.ceLabelSmall}>End Date</label>
            <input
              type="date"
              className={styles.ceInput}
              value={calendarRows[0].endDate}
              onChange={(e) => updateCalendarRow(0, "endDate", e.target.value)}
            />
          </div>

          {/* End Time */}
          <div className={styles.ceField}>
            <label className={styles.ceLabelSmall}>End Time</label>
            <input
              type="time"
              className={styles.ceInput}
              value={calendarRows[0].endTime}
              onChange={(e) => updateCalendarRow(0, "endTime", e.target.value)}
            />
          </div>
        </div>

        {/* MULTIPLE DATE TOGGLE */}
        <label
          className={styles.ceSwitchContainer}
          style={{ marginTop: "20px" }}
        >
          <input
            type="checkbox"
            checked={multiDates}
            onChange={() => {
              const v = !multiDates;
              setMultiDates(v);

              if (v && calendarRows.length === 1) addCalendarRow();
              if (!v) setCalendarRows([calendarRows[0]]);
            }}
          />

          <span className={styles.ceSwitch}></span>
          <span className={styles.ceSwitchText}>
            Schedule on Multiple Dates
          </span>
        </label>

        {/* MULTIPLE CALENDAR ROWS */}
        {multiDates &&
          calendarRows.slice(1).map((row, i) => {
            const idx = i + 1;
            return (
              <div
                key={idx}
                className={`${styles.ceGrid5} ${styles.ceCalendarRow}`}
                style={{ marginTop: "25px" }}
              >
                {/* Start Date */}
                <div className={styles.ceField}>
                  <label className={styles.ceLabelSmall}>Start Date</label>
                  <input
                    type="date"
                    className={styles.ceInput}
                    value={row.startDate}
                    onChange={(e) =>
                      updateCalendarRow(idx, "startDate", e.target.value)
                    }
                  />
                </div>

                {/* Start Time */}
                <div className={styles.ceField}>
                  <label className={styles.ceLabelSmall}>Start Time</label>
                  <input
                    type="time"
                    className={styles.ceInput}
                    value={row.startTime}
                    onChange={(e) =>
                      updateCalendarRow(idx, "startTime", e.target.value)
                    }
                  />
                </div>

                {/* End Date */}
                <div className={styles.ceField}>
                  <label className={styles.ceLabelSmall}>End Date</label>
                  <input
                    type="date"
                    className={styles.ceInput}
                    value={row.endDate}
                    onChange={(e) =>
                      updateCalendarRow(idx, "endDate", e.target.value)
                    }
                  />
                </div>

                {/* End Time */}
                <div className={styles.ceField}>
                  <label className={styles.ceLabelSmall}>End Time</label>
                  <input
                    type="time"
                    className={styles.ceInput}
                    value={row.endTime}
                    onChange={(e) =>
                      updateCalendarRow(idx, "endTime", e.target.value)
                    }
                  />
                </div>

                {/* DELETE */}
                <button
                  className={styles.ceDelete}
                  onClick={() => removeCalendarRow(idx)}
                >
                  🗑️
                </button>
              </div>
            );
          })}
      </div>

      {/* ========================= LOCATION ========================= */}
      <div className={styles.ceCard}>
        <h3 className={styles.ceSubtitle}>Location</h3>

        <div className={styles.ceGrid2} style={{ marginTop: "20px" }}>
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

        <div className={styles.ceField} style={{ marginTop: "20px" }}>
          <label className={styles.ceLabel}>Google Map Link</label>
          <input
            className={styles.ceInput}
            placeholder="Map link"
            value={mapLink}
            onChange={(e) => setMapLink(e.target.value)}
          />
        </div>
      </div>

      {/* ========================= FILE UPLOAD + SOCIALS ========================= */}
      <div className={styles.ceCard}>
        <div className={styles.ceGrid2} style={{ gap: "35px" }}>
          {/* FILE UPLOAD */}
          <div className={styles.ceField} style={{ gap: "40px" }}>
            <label className={styles.ceLabel}>Files</label>

            {/* FILE DROPZONE */}
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

            {/* VIDEO LINK */}
            <div className={styles.ceInputIconWrapper}>
              <span className={styles.ceInputIcon}>{VIDEOICON}</span>
              <input
                className={styles.ceInputWithIcon}
                placeholder="Event Video Link"
                value={mapLink}
                onChange={(e) => setMapLink(e.target.value)}
              />
            </div>

            {/* WEBSITE LINK */}
            <div className={styles.ceInputIconWrapper}>
              <span className={styles.ceInputIcon}>{WEBSITEICON}</span>
              <input
                className={styles.ceInputWithIcon}
                placeholder="Website Link"
                value={mapLink}
                onChange={(e) => setMapLink(e.target.value)}
              />
            </div>
          </div>

          {/* SOCIAL LINKS */}
          <div
            className={styles.ceField}
            style={{ paddingTop: "18%", gap: "20px" }}
          >
            <label className={styles.ceLabel}>Social Media Links</label>

            {/* WHatsapp */}
            <div className={styles.ceInputIconWrapper}>
              <span className={styles.ceInputIcon}>{WHATSAPPICON}</span>
              <input
                className={styles.ceInputWithIcon}
                placeholder="Whatsapp channel link"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>

            {/* Instagram */}
            <div className={styles.ceInputIconWrapper}>
              <span className={styles.ceInputIcon}>{INSTAGRAMICON}</span>
              <input
                className={styles.ceInputWithIcon}
                placeholder="Instagram link"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>

            {/* LinkedIn */}
            <div className={styles.ceInputIconWrapper}>
              <span className={styles.ceInputIcon}>{LINKEDINICON}</span>
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

      {/* ========================= HYBRID + PERKS + CERTIFICATION ========================= */}
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

          <div className={styles.cePerkBox} style={{ marginTop: "15px" }}>
            {console.log("nnnnnnnnn", perksValue)}
            {perksValue.map((item) => (
              <label key={item._id} className={styles.cePerkItem}>
                <input
                  type="checkbox"
                  checked={selectedPerks?.includes(item._id)}
                  onChange={() => togglePerk(item._id)}
                  style={{ cursor: "pointer" }}
                />
                {item.name}
              </label>
            ))}
          </div>
        </div>

        {/* CERTIFICATION */}
        <div className={styles.ceField} style={{ marginTop: "15px" }}>
          <label className={styles.ceLabel}>Certification *</label>

          <div className={styles.cePerkBox} style={{ marginTop: "30px" }}>
            {defaultCertification.map((item) => (
              <label key={item._id} className={styles.cePerkItem}>
                <input
                  type="checkbox"
                  checked={selectedCertification?.includes(item._id)}
                  onChange={() => toggleCertification(item._id)}
                  style={{ cursor: "pointer" }}
                />
                {item.name}
              </label>
            ))}
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

      {/* NEXT BUTTON */}
      <div className={styles.ceEndActions}>
        <button className={styles.ceBtnPrimary} onClick={onNext}>
          Next
        </button>
      </div>
    </>
  );
}
