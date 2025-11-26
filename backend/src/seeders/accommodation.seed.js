import { Accommodation } from "../models/accommadation.model.js";

export default async function seedAccommodations() {

  await Accommodation.deleteMany();

  const accommodations = [
    { name: "Stay", details: "Accommodation / stay facility provided." },
    { name: "WiFi", details: "Free WiFi available at event premises." },
    { name: "Parking", details: "Parking area available for participants." },
    { name: "Restrooms", details: "Clean and accessible restrooms available." },
    { name: "Accessibility Support", details: "Support for differently-abled attendees." },
    { name: "Medical Assistance", details: "Basic first-aid and medical help at venue." },
    { name: "Food", details: "Meals / refreshments included." },
    { name: "Event Kit", details: "Event kit or welcome package provided." }
  ];

  await Accommodation.insertMany(accommodations);

  console.log("✔ Accommodations seeding completed");
}
