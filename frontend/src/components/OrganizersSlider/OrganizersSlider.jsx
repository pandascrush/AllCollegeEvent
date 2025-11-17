// src/components/Organizers/OrganizersSection.jsx
import React, { useState } from "react";
import LeaderboardModal from "../../components/LeaderboardModal/LeaderboardModal";
import { ORGANIZERSS } from "../../const/const";
import "./OrganizersSlider.css";

export default function OrganizersSection() {
  const [open, setOpen] = useState(false);

  // top 3 for medal cards
  const topThree = ORGANIZERSS.slice(0, 3);

  return (
    <section className="organizers-root">
      <div className="organizers-header">
        <div>
          <h3 className="organizers-title">Our Top Organizers</h3>
          <p className="organizers-sub">
            Find the Organizations you're looking for quickly. <span className="see-more">You can see more.</span>
          </p>
        </div>

        <div>
          <button className="leaderboard-btn" onClick={() => setOpen(true)}>
            View Leaderboard &gt;&gt;&gt;
          </button>
        </div>
      </div>

      {/* medal + list row */}
      <div className="organizers-row">
        {/* right: horizontal list of organizer circles */}
        <div className="organizers-list">
          {ORGANIZERSS.map((org) => (
            <div className="org-card" key={org.id}>
              <div className="org-avatar-wrap">
                <img src={org.avatar} alt={org.name} className="org-avatar" />
              </div>
              <div className="org-name">{org.name}</div>
              <div className="org-events">{org.events} events</div>
            </div>
          ))}
        </div>
      </div>

      <LeaderboardModal open={open} onClose={() => setOpen(false)} data={ORGANIZERSS} />
    </section>
  );
}
