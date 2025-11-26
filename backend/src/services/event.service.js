import { Organizer } from "../models/organizer.model.js";
import { Event } from "../models/events.model.js";
import { Coordinator } from "../models/coordinator.model.js";

export const EventService = {
  async updateOrganizerSocialLinks({
    organizerId,
    whatsapp,
    instagram,
    linkedin,
  }) {
    const updateData = {};

    if (whatsapp) updateData.whatsapp = whatsapp;
    if (instagram) updateData.instagram = instagram;
    if (linkedin) updateData.linkedin = linkedin;

    return Organizer.findByIdAndUpdate(
      organizerId,
      { $set: updateData },
      { new: true }
    );
  },
  
  async createEvent({ basic, organizer, tickets, organizerId }) {
    // EVENT OBJECT
    const eventData = {
      organizerId,

      title: basic.title,
      about: basic.about,
      tags: basic.tags,

      typeId: basic.typeId,
      categoryIds: basic.categoryIds,

      schedule: basic.calendarRows.map((row) => ({
        startDate: row.startDate,
        endDate: row.endDate,
        startTime: row.startTime,
        endTime: row.endTime,
      })),

      venue: basic.venue,
      city: basic.city,
      gmapLink: basic.mapLink,

      images: basic.images || [],
      videos: basic.videos || [],

      websiteLink: basic.websiteLink || "",
      hybrid: basic.hybrid,

      perkIds: basic.perkIds || [],
      certificationIds: basic.certificationIds || [],
      accommodationIds: basic.accommodationIds || [],

      educationInfo: {
        orgName: organizer.name,
        orgEmail: organizer.email,
        orgPhone: organizer.mobile,
        altPhone: organizer.altMobile,
      },

      buyTicket: !tickets.external,
      paymentUrl: tickets.externalUrl,
      ticketingConfig: {
        enableQRCode: true,
        allowPartialEntry: false,
      },
    };

    // 1️⃣ CREATE EVENT
    const event = await Event.create(eventData);

    // 2️⃣ SAVE COORDINATORS
    if (organizer.coordinators && organizer.coordinators.length > 0) {
      const coordinatorDocs = organizer.coordinators.map((co) => ({
        eventId: event._id,
        organizerId,
        name: co.name,
        email: co.email,
        phone: co.phone,
      }));

      await Coordinator.insertMany(coordinatorDocs);
    }

    return event;
  },
};
