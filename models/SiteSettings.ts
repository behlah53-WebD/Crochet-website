import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAnnouncement {
  id: string;
  text: string;
  iconName?: string;
  link?: string;
}

export interface ITrustPillar {
  id: string;
  title: string;
  description: string;
  iconName?: string;
}

export interface ISiteSettings extends Document {
  storeName: string;
  tagline: string;
  contactEmail: string;
  phone: string;
  studioAddress: string;
  workingHours: string;
  appointmentNote: string;
  announcements: IAnnouncement[];
  freeShippingThreshold: number;
  giftPackagingFee: number;
  trustPillars: ITrustPillar[];
  instagramUrl?: string;
  whatsappNumber?: string;
  pinterestUrl?: string;
  copyrightText?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AnnouncementSchema = new Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  iconName: { type: String, default: "Sparkles" },
  link: { type: String },
});

const TrustPillarSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  iconName: { type: String, default: "Truck" },
});

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    storeName: { type: String, default: "Loom & Love" },
    tagline: { type: String, default: "Handmade softness, woven with heart." },
    contactEmail: { type: String, default: "hello@loomandlove.com" },
    phone: { type: String, default: "+91 98765 43210" },
    studioAddress: { type: String, default: "Indiranagar, Bengaluru, Karnataka - 560038" },
    workingHours: { type: String, default: "Mon–Sat, 10am to 6pm IST" },
    appointmentNote: {
      type: String,
      default: "Feel our yarn swatches and witness our weavers in action by booking an artisan appointment.",
    },
    announcements: [AnnouncementSchema],
    freeShippingThreshold: { type: Number, default: 999 },
    giftPackagingFee: { type: Number, default: 99 },
    trustPillars: [TrustPillarSchema],
    instagramUrl: { type: String, default: "https://instagram.com" },
    whatsappNumber: { type: String, default: "+91 98765 43210" },
    pinterestUrl: { type: String, default: "https://pinterest.com" },
    copyrightText: {
      type: String,
      default: "Loom & Love Atelier. Hand-hooked with love in small batches.",
    },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings || mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
