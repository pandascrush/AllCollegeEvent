import { Institution } from "../models/institutions.model.js";

export default async function seedInstitutions() {

  await Institution.deleteMany();

  const institutions = [
    { name: "Medicine", shortName: "MED" },
    { name: "Law", shortName: "LAW" },
    { name: "Agriculture", shortName: "AGRI" },
    { name: "Engineering", shortName: "ENGG" },
    { name: "Arts & Humanities", shortName: "ARTS" },
    { name: "Science", shortName: "SCI" },
    { name: "Commerce", shortName: "COM" },
    { name: "Management", shortName: "MGMT" },
    { name: "Pharmacy", shortName: "PHARMA" },
    { name: "Education", shortName: "EDU" }
  ];

  await Institution.insertMany(institutions);

  console.log("✔ Institutions seeding completed");
}
