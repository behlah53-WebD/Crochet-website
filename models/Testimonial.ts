import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  city: string;
  avatar: string;
  item: string;
  rating: number;
  date: string;
  comment: string;
  isFeatured: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true },
    avatar: { type: String, required: true },
    item: { type: String, required: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    date: { type: String, default: "Verified Buyer" },
    comment: { type: String, required: true },
    isFeatured: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
