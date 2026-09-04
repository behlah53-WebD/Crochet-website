import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPageContent extends Document {
  slug: string; // 'about', 'contact', 'shipping-policy', 'return-policy'
  title: string;
  subtitle?: string;
  data: Record<string, any>;
  updatedAt: Date;
}

const PageContentSchema = new Schema<IPageContent>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    data: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export const PageContent: Model<IPageContent> =
  mongoose.models.PageContent ||
  mongoose.model<IPageContent>("PageContent", PageContentSchema);
