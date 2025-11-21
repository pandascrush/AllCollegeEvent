import { EventType } from "../models/event_type.model.js";

export default async function seedEventTypes() {
  // Clear old data (optional)
  await EventType.deleteMany();

  const eventTypes = [
    { name: "Education", slug: "education" },
    { name: "Sports", slug: "sports" },
    { name: "Entertainment", slug: "entertainment" },
    { name: "Networking", slug: "networking" },
    { name: "Others", slug: "others" }
  ];

  await EventType.insertMany(eventTypes);

  console.log("✔ Event Types seeding completed");
}
