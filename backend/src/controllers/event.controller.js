import { EventService } from "../services/event.service.js";

export const EventController = {
  async createEvent(req, res,next) {
    try {
      const { basic, organizer, tickets } = req.body;
      const organizerId = req.user.id;

      // Update organizer socials
      await EventService.updateOrganizerSocialLinks({
        organizerId,
        whatsapp: basic.whatsapp,
        instagram: basic.instagram,
        linkedin: basic.linkedin
      });

      // Create event
      const event = await EventService.createEvent({
        basic,
        organizer,
        tickets,
        organizerId
      });

      return res.status(201).json({
        success: true,
        message: "Event created successfully",
        event
      });

    } catch (err) {
      console.log("Event Create Error:", err);
      next(err)
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }
};
