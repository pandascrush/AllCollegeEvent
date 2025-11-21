import { Certification } from "../models/certification.model.js";

export default async function seedCertifications() {
  await Certification.deleteMany();

  const certifications = [
    {
      name: "All Participants",
      details: "Certification provided to all event participants.",
    },
    {
      name: "Exclusive Winners",
      details: "Special certification awarded only to winners.",
    },
    {
      name: "Not Provided",
      details: "No certification offered for this event.",
    },
  ];

  await Certification.insertMany(certifications);

  console.log("✔ Certifications seeding completed");
}
