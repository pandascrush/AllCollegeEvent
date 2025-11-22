import React, { useState } from "react";
import styles from "./CreateEvents.module.css";
import { ADDICON, DELETICON } from "../../../const/const"; // optional icons - replace or remove if not available

export default function TicketDetails({
  tickets,
  setTickets,
  setStep,

  // ADD ALL THESE PROPS ↓↓↓
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
  cert,
  accommodation,
  organizer,
  finalPayload,
  setFinalPayload,
}) {
  // modal open
  const [showForm, setShowForm] = useState(false);

  // form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sellingFrom, setSellingFrom] = useState("");
  const [sellingTo, setSellingTo] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [amount, setAmount] = useState("");
  const [totalCount, setTotalCount] = useState("1000");
  const [minCount, setMinCount] = useState("01");
  const [maxCount, setMaxCount] = useState("1000");

  // helper lists for dropdowns (example values — adapt to your app)
  const totalOptions = ["1000", "2000", "5000"];
  const minOptions = ["01", "02", "05", "10"];
  const maxOptions = ["100", "500", "1000", "5000"];
  const currencyOptions = [
    { code: "INR", label: "₹ India" },
    { code: "USD", label: "$ USD" },
    { code: "EUR", label: "€ EUR" },
  ];

  const resetForm = () => {
    setName("");
    setDescription("");
    setSellingFrom("");
    setSellingTo("");
    setIsPaid(false);
    setCurrency("INR");
    setAmount("");
    setTotalCount("1000");
    setMinCount("01");
    setMaxCount("1000");
  };

  const handleSaveTicket = () => {
    if (!name.trim()) {
      alert("Please enter ticket name");
      return;
    }
    if (isPaid && (!amount || Number(amount) <= 0)) {
      alert("Please enter a valid amount for Paid ticket");
      return;
    }

    const newTicket = {
      id: Date.now(),
      name: name.trim(),
      description: description.trim(),
      sellingFrom,
      sellingTo,
      isPaid,
      currency,
      amount: isPaid ? amount : "0",
      totalCount,
      minCount,
      maxCount,
    };

    setTickets({
      ...tickets,
      list: [...(tickets.list || []), newTicket],
    });

    resetForm();
    setShowForm(false);
  };

  const handleDeleteTicket = (id) => {
    setTickets({
      ...tickets,
      list: (tickets.list || []).filter((t) => t.id !== id),
    });
  };

  return (
    <div className={styles.ceCard}>
      <h2 className={styles.ceSectionTitle}>Ticket Information</h2>

      {/* description */}
      <p style={{ color: "#666", marginTop: 8 }}>
        Use an external gateway for your desired payment options.
      </p>

      {/* External Payment + URL */}
      <div className={styles.ceGrid2} style={{ marginTop: 18 }}>
        <div className={styles.ceField}>
          <label className={styles.ceLabel}>
            Buy Ticket at (External Payment)
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
            value={tickets.externalUrl || ""}
            onChange={(e) =>
              setTickets({ ...tickets, externalUrl: e.target.value })
            }
          />
        </div>
      </div>

      {/* Add Ticket button */}
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}
      >
        <button
          type="button"
          className={styles.ceBtnOutline}
          onClick={() => setShowForm(true)}
        >
          + Add Ticket
        </button>
      </div>

      {/* Empty state */}
      {(!tickets.list || tickets.list.length === 0) && (
        <div className={styles.ceEmptyTicket} style={{ marginTop: 18 }}>
          Ticket is empty! Click to create ticket
        </div>
      )}

      {/* Ticket table (like image) */}
      {(tickets.list || []).length > 0 && (
        <div style={{ marginTop: 18 }}>
          <div
            style={{
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid #eee",
            }}
          >
            {/* header row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 120px 120px 120px 48px",
                background: "#fafafa",
                padding: "14px 18px",
                borderBottom: "1px solid #f1f1f1",
              }}
            >
              <div style={{ fontWeight: 700 }}>Ticket Name</div>
              <div style={{ fontWeight: 700, textAlign: "center" }}>Price</div>
              <div style={{ fontWeight: 700, textAlign: "center" }}>Total</div>
              <div style={{ fontWeight: 700, textAlign: "center" }}>
                Total ticket
              </div>
              <div></div>
            </div>

            {/* rows */}
            {(tickets.list || []).map((t) => (
              <div
                key={t.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 120px 120px 120px 48px",
                  padding: "12px 18px",
                  alignItems: "center",
                  borderBottom: "1px solid #f6f6f6",
                }}
              >
                <div>{t.name}</div>
                <div style={{ textAlign: "center" }}>
                  {t.isPaid ? `${t.currency} ${t.amount}` : "Free"}
                </div>
                <div style={{ textAlign: "center" }}>{t.totalCount}</div>
                <div style={{ textAlign: "center" }}>{t.maxCount}</div>
                <div style={{ textAlign: "center" }}>
                  <button
                    type="button"
                    onClick={() => handleDeleteTicket(t.id)}
                    className={styles.ceDelete}
                    title="Delete ticket"
                    style={{ padding: "6px", borderRadius: 8 }}
                  >
                    {DELETICON ? DELETICON : "🗑️"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom actions */}
      {/* Bottom actions */}
      <div className={styles.ceEndActions} style={{ marginTop: 22 }}>
        <button className={styles.ceBtnOutline} onClick={() => setStep(2)}>
          Back
        </button>

        {/* NEW SUBMIT BUTTON */}
        {tickets.list.length > 0 && (
          <button
            className={styles.ceBtnPrimary}
            onClick={() => {
              const payload = {
                basic: {
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
                  cert,
                  accommodation,
                },
                organizer,
                tickets,
              };

              console.log("FINAL PAYLOAD:", payload); // debug
              setFinalPayload(payload);
              setStep(4);
            }}
          >
            Submit
          </button>
        )}
      </div>

      {/* ---------------------------
          ADD / EDIT TICKET MODAL
         --------------------------- */}
      {showForm && (
        <div className={styles.ceModalBackdrop}>
          <div className={styles.ceModal} style={{ maxWidth: 980 }}>
            <h3 style={{ margin: 0, marginBottom: 12 }}>Create Ticket</h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              <div className={styles.ceField}>
                <label className={styles.ceLabelSmall}>Ticket Name</label>
                <input
                  className={styles.ceInput}
                  placeholder="Type Here"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className={styles.ceField}>
                <label className={styles.ceLabelSmall}>Description</label>
                <input
                  className={styles.ceInput}
                  placeholder="Type Here"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className={styles.ceField}>
                <label className={styles.ceLabelSmall}>Selling From</label>
                <input
                  className={styles.ceInput}
                  type="date"
                  value={sellingFrom}
                  onChange={(e) => setSellingFrom(e.target.value)}
                />
              </div>

              <div className={styles.ceField}>
                <label className={styles.ceLabelSmall}>Selling Upto</label>
                <input
                  className={styles.ceInput}
                  type="date"
                  value={sellingTo}
                  onChange={(e) => setSellingTo(e.target.value)}
                />
              </div>
            </div>

            {/* Free / Paid toggle */}
            <div
              style={{
                marginTop: 14,
                display: "flex",
                alignItems: "center",
                gap: 18,
              }}
            >
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="radio"
                  checked={!isPaid}
                  onChange={() => setIsPaid(false)}
                  name="ticketType"
                />
                <span style={{ fontWeight: 600 }}>Free</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="radio"
                  checked={isPaid}
                  onChange={() => setIsPaid(true)}
                  name="ticketType"
                />
                <span style={{ fontWeight: 600 }}>Paid</span>
              </label>
            </div>

            {/* Paid fields */}
            {isPaid && (
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 14,
                  alignItems: "center",
                }}
              >
                <select
                  className={styles.ceInput}
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  style={{ width: 140 }}
                >
                  {currencyOptions.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>

                <input
                  className={styles.ceInput}
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{ flex: 1 }}
                />
              </div>
            )}

            {/* counts */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 12,
                marginTop: 18,
              }}
            >
              <div className={styles.ceField}>
                <label className={styles.ceLabelSmall}>Total Count</label>
                <select
                  className={styles.ceInput}
                  value={totalCount}
                  onChange={(e) => setTotalCount(e.target.value)}
                >
                  {totalOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.ceField}>
                <label className={styles.ceLabelSmall}>Minimum Count</label>
                <select
                  className={styles.ceInput}
                  value={minCount}
                  onChange={(e) => setMinCount(e.target.value)}
                >
                  {minOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.ceField}>
                <label className={styles.ceLabelSmall}>Maximum Count</label>
                <select
                  className={styles.ceInput}
                  value={maxCount}
                  onChange={(e) => setMaxCount(e.target.value)}
                >
                  {maxOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* actions */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 12,
                marginTop: 22,
              }}
            >
              <button
                className={styles.ceBtnOutline}
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
              >
                Cancel
              </button>

              <button
                className={styles.ceBtnPrimary}
                onClick={handleSaveTicket}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
