import { EventType } from "../models/event_type.model.js";
import { EventTypeCategory } from "../models/event_type_category.model.js";

export default async function seedEventTypeCategories() {
  // Clear existing category records
  await EventTypeCategory.deleteMany();

  // Category data mapped with eventTypeSlug
  const categoryMap = [
    {
      eventTypeSlug: "education",
      categories: [
        "Workshops",
        "Seminars & Webinars",
        "Conferences",
        "Training Program",
        "Hackathons",
        "Exhibitions",
        "Symposiums",
        "Guest Lectures",
        "Others"
      ]
    },
    {
      eventTypeSlug: "sports",
      categories: [
        "Tournaments",
        "Marathon",
        "Sports Meet",
        "Fitness Training",
        "Coaching Camps",
        "Championships",
        "Others"
      ]
    },
    {
      eventTypeSlug: "entertainment",
      categories: [
        "Concerts",
        "Festivals",
        "DJ Nights",
        "Stage Shows",
        "Exhibitions",
        "Comedy Shows",
        "Others"
      ]
    },
    {
      eventTypeSlug: "networking",
      categories: [
        "Meetups",
        "Business Talks",
        "Startup Events",
        "Investor Pitching",
        "Corporate Meetings",
        "Panel Discussions",
        "Others"
      ]
    },
    {
      eventTypeSlug: "others",
      categories: [
        "General Events",
        "Open Discussions",
        "Community Events",
        "Social Awareness",
        "Miscellaneous"
      ]
    }
  ];

  // Loop and seed each category group
  for (const group of categoryMap) {
    const eventType = await EventType.findOne({ slug: group.eventTypeSlug });

    if (!eventType) {
      console.warn(`⚠ EventType not found for slug: ${group.eventTypeSlug}`);
      continue;
    }

    const formattedCategories = group.categories.map((name) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      eventTypeId: eventType._id
    }));

    await EventTypeCategory.insertMany(formattedCategories);
  }

  console.log("✔ Event Type Categories seeding completed");
}
