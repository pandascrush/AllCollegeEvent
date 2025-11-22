import React from "react";
import styles from "./ProfileHeader.module.css";

export default function ProfileHeader({
  coverColor = "#3f3f3f",
  role = "Organizer",
  profileImage,
  name,
  followers,
  following,
  rank,
  reviews,
}) {
  return (
    <div className={styles.header_wrapper}>
      {/* Top Dark Cover */}
      <div className={styles.cover} style={{ background: coverColor }}>
        <div className={styles.role_badge}>
          <span className={styles.role_dot}></span>
          {role}
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div style={{paddingLeft:"10px"}}>
          <img
            src="/images/creatorprofile.png"
            alt="profile"
            className={styles.profile_img}
          />
          <div className={styles.reviews}>
           <div>⭐⭐⭐⭐⭐</div> 
            <span className={styles.review_text} style={{paddingTop:"5px"}}>149 Reviews</span>
          </div>
        </div>

        <div className={styles.info}>
          <h2 className={styles.name}>
            Prabavathi M <span className={styles.role_small}>({role})</span>
          </h2>

          <div className={styles.follow_info}>
            <span>123 Followers</span>
            <span>456 Following</span>
          </div>

          <div className={styles.rank}>#10 Rank</div>
        </div>
      </div>
    </div>
  );
}
