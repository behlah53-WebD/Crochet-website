import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview extends Document {
  productId: string;
  userName: string;
  userEmail?: string;
  rating: number;
  title: string;
  comment: string;
  images: string[];
  isVerified: boolean;
  status: "PENDING" | "APPROVED";
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    productId: { type: String, required: true, index: true },
    userName: { type: String, required: true },
    userEmail: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    images: [{ type: String }],
    isVerified: { type: Boolean, default: true },
    status: { type: String, enum: ["PENDING", "APPROVED"], default: "APPROVED", index: true },
  },
  { timestamps: true }
);

export const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
