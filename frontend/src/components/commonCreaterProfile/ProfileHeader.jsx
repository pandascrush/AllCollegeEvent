import React from "react";
import styles from "./ProfileHeader.module.css";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const goFollowers = () => {
    navigate("/organizer/dashboard/my-profile/followers");
  };

  const goFollowing = () => {
    navigate("/organizer/dashboard/my-profile/following");
  };
  const goReviews = () => {
    navigate("/organizer/dashboard/my-profile/reviews");
  };

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
        <div style={{ paddingLeft: "10px" }}>
          <img
            src="/images/creatorprofile.png"
            alt="profile"
            className={styles.profile_img}
          />
          <div
            className={styles.reviews}
            onClick={goReviews}
            style={{ cursor: "pointer" }}
          >
            <div>⭐⭐⭐⭐⭐</div>
            <span className={styles.review_text} style={{ paddingTop: "5px" }}>
              {reviews} Reviews
            </span>
          </div>
        </div>

        <div className={styles.info}>
          <h2 className={styles.name}>
            Prabavathi M <span className={styles.role_small}>({role})</span>
          </h2>

          {/* CLICKABLE FOLLOWER & FOLLOWING */}
          <div className={styles.follow_info}>
            <span className={styles.clickable} onClick={goFollowers}>
              123 Followers
            </span>

            <span className={styles.clickable} onClick={goFollowing}>
              456 Following
            </span>
          </div>

          <div className={styles.rank}>#10 Rank</div>
        </div>
      </div>
    </div>
  );
}
