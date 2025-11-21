import React, { useEffect } from "react";
import styles from ".././CreateEvents.module.css";

export default function FinalDetails({
  finalPayload,
  final,
  setFinal,
  setStep,
}) {
  // Auto-show modal when arriving Step 4
  useEffect(() => {
    console.log("FINAL PAYLOAD:", finalPayload);
    setFinal({ showModal: true });
  }, []);

  return (
    <div className={styles.ceCard}>
      {/* FINAL SUMMARY (NOT NEEDED BUT CAN KEEP) */}
      <h2 className={styles.ceSectionTitle}>Final Details</h2>

      {/* SUCCESS POPUP */}
      {final.showModal && (
        <div className={styles.ceModalBackdrop}>
          <div className={styles.ceModal} style={{ maxWidth: "600px" }}>
            <h2 className={styles.ceModalTitle}>Submission Successful</h2>
            <p className={styles.ceModalText}>
              Your event will be Published once verified
            </p>

            <div className={styles.ceModalActions}>
              <button
                className={styles.ceBtnPrimary}
                onClick={() => {
                  setFinal({ showModal: false });
                  setStep(1); // BACK TO FIRST PAGE
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
