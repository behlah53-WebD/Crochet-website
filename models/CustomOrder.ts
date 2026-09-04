import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICustomOrder extends Document {
  requestNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  category: string;
  title: string;
  description: string;
  yarnColors: string[];
  sizePreference?: string;
  personalizationText?: string;
  targetDate?: string;
  budgetEstimated?: number;
  referenceImages: string[];
  status:
    | "SUBMITTED"
    | "REVIEWING"
    | "QUOTE_SENT"
    | "APPROVED"
    | "IN_PRODUCTION"
    | "SHIPPED"
    | "COMPLETED"
    | "CANCELLED";
  quotedPrice?: number;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CustomOrderSchema = new Schema<ICustomOrder>(
  {
    requestNumber: { type: String, required: true, unique: true, index: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true, index: true },
    customerPhone: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    yarnColors: [{ type: String }],
    sizePreference: { type: String },
    personalizationText: { type: String },
    targetDate: { type: String },
    budgetEstimated: { type: Number },
    referenceImages: [{ type: String }],
    status: {
      type: String,
      enum: [
        "SUBMITTED",
        "REVIEWING",
        "QUOTE_SENT",
        "APPROVED",
        "IN_PRODUCTION",
        "SHIPPED",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "SUBMITTED",
      index: true,
    },
    quotedPrice: { type: Number },
    adminNotes: { type: String },
  },
  { timestamps: true }
);

export const CustomOrder: Model<ICustomOrder> =
  mongoose.models.CustomOrder ||
  mongoose.model<ICustomOrder>("CustomOrder", CustomOrderSchema);
