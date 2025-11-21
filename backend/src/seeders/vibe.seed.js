import { Vibe } from "../models/vibe.model.js";

export default async function seedVibes() {
  console.log("➡ Seeding Vibes...");

  // Clear old data (optional)
  await Vibe.deleteMany();

  const vibes = [
    {
      name: "Student",
      icon: "🎓",
      color: "#6C63FF"
    },
    {
      name: "Faculty",
      icon: "👨‍🏫",
      color: "#FF8C42"
    },
    {
      name: "Freelance",
      icon: "💻",
      color: "#00B894"
    },
    {
      name: "Professional",
      icon: "🧑‍💼",
      color: "#0984E3"
    }
  ];

  await Vibe.insertMany(vibes);

  console.log("✔ Vibes seeding completed");
}
