import React, { useEffect } from "react";
import goldMedal from '../../../public/images/FirstOr.png'
import silverMedal from '../../../public/images/SecondOr.png'
import bronzeMedal from '../../../public/images/ThreedOr.png'
import './LeaderboardModal.css'


export default function LeaderboardModal({ open, onClose, data = [] }) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => (document.body.style.overflow = "");
    }, [open]);

    if (!open) return null;

    const top3 = data.slice(0, 3);

    return (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Leaderboard">
            <div className="modal-backdrop" onClick={onClose} />
            <div className="modal-card" role="document">
                <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

                <h2 className="modal-title">Legends Board</h2>
                <p className="modal-sub">Where brilliant organizers rise — your dedication builds the stage for every success!</p>

                <div className="podium-row">
                    {top3.map((org, i) => (
                        <div key={org.id} className={`podium-card ${i === 0 ? "center" : i === 1 ? "left" : "right"}`}>
                            <img
                                src={i === 0 ? goldMedal : i === 1 ? silverMedal : bronzeMedal}
                                alt="medal"
                                className="medal-img"
                            />
                            <div className="podium-body">
                                <div className="podium-avatar-wrap">
                                    <img src={org.avatar} alt={org.name} className="podium-avatar" />
                                </div>
                                <div className="podium-name">{org.name}</div>
                                <div className="podium-stats">
                                    <div className="stat">
                                        <div className="stat-label">Events created</div>
                                        <div className="stat-val">{org.events}</div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-label">User views</div>
                                        <div className="stat-val">{org.views}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <h3 className="table-title">List of Top Organizers</h3>
                <p className="table-sub">You don't just host events; you shape experiences. Keep shining!</p>

                <div className="leaders-table-wrap ">
                    <table className="leaders-table">
                        <thead>
                            <tr>
                                <th>Organizer Name</th>
                                <th>Events Created</th>
                                <th>User views</th>
                                <th>Ranking</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((org) => (
                                <tr key={org.id} className={org.rank === 1 ? "highlight" : ""}>
                                    <td className="cell-name">
                                        <img src={org.avatar} alt={org.name} className="table-avatar" />
                                        <div>
                                            <div className="name-text">{org.name}</div>
                                        </div>
                                    </td>
                                    <td>{org.events}</td>
                                    <td>{org.views}</td>
                                    <td className="rank-badge">{org.rank}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
