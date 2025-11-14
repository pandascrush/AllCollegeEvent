import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const EventSchema = new mongoose.Schema({
  organizerId:       { type: ObjectId, ref: "Organizer", required: true },

  name:              { type: String, required: true },
  shortName:         { type: String },
  slug:              { type: String, unique: true, sparse: true },

  typeId:            { type: ObjectId, ref: "EventTypeCategory" },
  categoryIds:       [{ type: ObjectId, ref: "Category" }],
  tags:              [{ type: String }],
  about:             { type: String },

  schedule: [{
    startDate: { type: Date, required: true },
    endDate:   { type: Date },
    startTime: { type: String },
    endTime:   { type: String }
  }],

  venue:       { type: String },
  city:        { type: String },
  gmapLink:    { type: String },

  images: [{
    url: String,
    isCover: Boolean
  }],
  videos:      [{ type: String }],
  websiteLink: { type: String },

  hybrid:            { type: Boolean, default: false },
  perkIds:           [{ type: ObjectId, ref: "Perk" }],
  certificationIds:  [{ type: ObjectId, ref: "Certification" }],
  accommodationIds:  [{ type: ObjectId, ref: "Accommodation" }],

  educationInfo: {
    showForEducationCategory: { type: Boolean, default: false },
    institutionId: { type: ObjectId, ref: "Institution" },
    orgName:       String,
    orgEmail:      String,
    orgPhone:      String,
    altPhone:      String
  },

  buyTicket:   { type: Boolean, default: false },
  paymentUrl:  { type: String },
  ticketingConfig: {
    enableQRCode:      { type: Boolean, default: true },
    allowPartialEntry: { type: Boolean, default: false }
  },

  published:          { type: Boolean, default: false },
  rejected:           { type: Boolean, default: false },
  rejectionReasonId:  { type: ObjectId, ref: "RejectReason" },

  isDeleted:          { type: Boolean, default: false },
  viewCount:          { type: Number, default: 0 },
  registrationCount:  { type: Number, default: 0 }
}, { timestamps: true });

EventSchema.index({ slug: 1 });
EventSchema.index({ organizerId: 1, published: 1 });
EventSchema.index({ name: "text", about: "text", tags: "text" });
EventSchema.index({ city: 1, "schedule.startDate": 1 });

export const Event = mongoose.model(
  "Event",
  EventSchema
);
