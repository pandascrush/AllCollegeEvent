import React from "react";
import { ORGANIZERSS } from "../../const/const";
import "./OrganizersSlider.css";

export default function OrganizersSection({ onOpenLeaderboard }) {
  return (
    <section className="organizers-root">

      {/* Header */}
      <div className="organizers-header">
        <div>
          <h3 className="organizers-title">Our Top Organizers</h3>
          <p className="organizers-sub">
            Find the Organizations you're looking for quickly.{" "}
            <span className="see-more">You can see more.</span>
          </p>
        </div>

        <button className="leaderboard-btn" onClick={onOpenLeaderboard}>
          View Leaderboard &gt;&gt;&gt;
        </button>
      </div>

      {/* Organizer logos list */}
      <div className="organizers-row">
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

    </section>
  );
}
