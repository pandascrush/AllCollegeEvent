import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.bgGradient}></div>

      <div className={styles.centerBox}>
        <div className={styles.numberWrapper}>
          <span className={styles.zero}>
            <img
              src="/images/404page.png"
              alt="404-icon"
              className={styles.img}
            />
          </span>
        </div>

        <h2 className={styles.title}>Page Not Found</h2>
        <h1 className={styles.error}>ERROR</h1>

        <p className={styles.desc}>
          It seems like the page you’re looking for doesn’t exist or has been
          moved. <br />
          But don’t worry, you can get back on track!
        </p>

        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
}
