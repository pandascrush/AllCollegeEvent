import React from "react";
import styles from "./LocationSelect.module.css";
import { IoSearch } from "react-icons/io5";
import me from '../../../public/images/chennai.png'

export default function LocationSelect({ closeModal }) {
  const cities = [
    { name: "Delhi", image: me },
    { name: "Mumbai", image: me },
    { name: "Bangalore", image: me },
    { name: "Chennai", image: me },
    { name: "Kolkata", image: me },
    { name: "Karnataka", image: me },
  ];

  const countries = [
    { flag: "🇮🇳", name: "India" },
    { flag: "🇦🇪", name: "UAE" },
    { flag: "🇸🇬", name: "Singapore" },
    { flag: "🇲🇾", name: "Malaysia" },
    { flag: "🇹🇭", name: "Thailand" },
    { flag: "🇺🇸", name: "United States" },
  ];

  return (
    <div className={styles.modalContainer}>
      {/* Close Button */}
      <button className={styles.closeBtn} onClick={closeModal}>×</button>

      <h1 className={styles.title}>Choose Your Location to Discover Events</h1>

      {/* Search Bar */}
      <div className={styles.searchWrapper}>
        <IoSearch size={20} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search your location"
          className={styles.searchInput}
        />
      </div>

      {/* Section Title */}
      <h3 className={styles.subTitle}>
        Explore City Vibes — Events You’ll Love
      </h3>

      {/* Cities Row */}
      <div className={styles.cityRow}>
        {cities.map((c, i) => (
          <div key={i} className={styles.cityCard}>
            <img src={c.image} alt={c.name} />
            <p>{c.name}</p>
          </div>
        ))}
      </div>

      <hr className={styles.divider} />

      {/* Countries Chips */}
      <div className={styles.countryRow}>
        {countries.map((c, i) => (
          <div key={i} className={styles.countryChip}>
            <span className={styles.flag}>{c.flag}</span> {c.name}
          </div>
        ))}
      </div>
    </div>
  );
}
