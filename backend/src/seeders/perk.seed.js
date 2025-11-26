import { Perk } from "../models/perks.model.js";

export default async function seedPerks() {
  await Perk.deleteMany();

  const perks = [
    {
      name: "Cash",
      description: "Early entry and backstage privileges."
    },
    {
      name: "Awards",
      description: "Enjoy complimentary snacks during the event."
    },
    {
      name: "Medals",
      description: "Hassle-free parking included."
    }
  ];

  await Perk.insertMany(perks);

  console.log("✔ Perks seeding completed");
}
