import React, { useState } from "react";
import styles from "./OrganizerDashboard.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart, Area,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { IoCalendarOutline } from "react-icons/io5";

export default function OrganizerDashboard() {
  const [metric, setMetric] = useState("Click");
  const [range, setRange] = useState("90");

  const clickData = [
    { day: 0, value: 52 },
    { day: 10, value: 20 },
    { day: 20, value: 45 },
    { day: 30, value: 15 },
    { day: 40, value: 28 },
    { day: 50, value: 18 },
    { day: 60, value: 40 },
    { day: 70, value: 32 },
    { day: 80, value: 26 },
    { day: 90, value: 12 },
    { day: 100, value: 50 },
  ];

  const likeData = [
    { day: 0, value: 25 },
    { day: 10, value: 40 },
    { day: 20, value: 35 },
    { day: 30, value: 75 },
    { day: 40, value: 28 },
    { day: 50, value: 39 },
    { day: 60, value: 70 },
    { day: 70, value: 48 },
    { day: 80, value: 22 },
    { day: 90, value: 30 },
    { day: 100, value: 70 },
  ];

  const viewData = [];

  const getData = () =>
    metric === "Click" ? clickData : metric === "Like" ? likeData : viewData;

  const data = getData();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Dashboard</h2>

      {/* FILTER ROW */}
      <div className={styles.topFilters}>
        <div className={styles.leftFilter}>
          <label>Select</label>
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className={styles.selectBox}
          >
            <option>Click</option>
            <option>Like</option>
            <option>View</option>
          </select>
        </div>

        <div className={styles.rightFilter}>
          <label>Select Event</label>
          <select className={styles.selectBox}>
            <option>All Events</option>
          </select>
        </div>
      </div>

      <div className={styles.chartCard}>
        <div className={styles.filterRow}>
          <button
            className={`${styles.rangeBtn} ${
              range === "7" ? styles.activeBtn : ""
            }`}
            onClick={() => setRange("7")}
          >
            Last 7 days
          </button>

          <button
            className={`${styles.rangeBtn} ${
              range === "30" ? styles.activeBtn : ""
            }`}
            onClick={() => setRange("30")}
          >
            Last 30 days
          </button>

          <button
            className={`${styles.rangeBtn} ${
              range === "90" ? styles.activeBtn : ""
            }`}
            onClick={() => setRange("90")}
          >
            Last 3 months
          </button>

          <IoCalendarOutline className={styles.calIcon} />
        </div>

        {/* CHART */}
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 0, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A050FF" stopOpacity={0.8} />
                  <stop offset="50%" stopColor="#C88BFF" stopOpacity={0.4} />
                  <stop offset="180%" stopColor="#C88BFF" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={true}
                horizontal={false}
                stroke="#e6e6e6"
              />

              <XAxis dataKey="day" tick={{ fontSize: 14 }} />
              <YAxis tick={{ fontSize: 14 }} domain={["auto", "auto"]} />
              <Tooltip />

              {/* 🔥 This is the EXACT same effect as your screenshot */}
              <Area
                type="basis"
                dataKey="value"
                stroke="none"
                fill="url(#waveGradient)"
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
