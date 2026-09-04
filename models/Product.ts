import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProductVariant {
  name: string;
  colorHex: string;
  size?: string;
  priceModifier?: number;
  stock: number;
  image?: string;
}

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  categoryName?: string;
  images: string[];
  variants: IProductVariant[];
  stock: number;
  tags: string[];
  dimensions?: string;
  materials?: string;
  careInstructions?: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  isMadeToOrder: boolean;
  productionDays: number;
  rating: number;
  reviewCount: number;
  weight?: string;
  createdAt: Date;
  updatedAt: Date;
}

const VariantSchema = new Schema({
  name: { type: String, required: true },
  colorHex: { type: String, required: true },
  size: { type: String },
  priceModifier: { type: Number, default: 0 },
  stock: { type: Number, default: 10 },
  image: { type: String },
});

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    category: { type: String, required: true, index: true },
    categoryName: { type: String },
    images: [{ type: String, required: true }],
    variants: [VariantSchema],
    stock: { type: Number, required: true, default: 5 },
    tags: [{ type: String, index: true }],
    dimensions: { type: String },
    materials: { type: String, default: "100% Cotton & Milk Cotton Yarn" },
    careInstructions: { type: String, default: "Gently hand wash in cold water. Lay flat to dry." },
    isFeatured: { type: Boolean, default: false, index: true },
    isBestSeller: { type: Boolean, default: false, index: true },
    isMadeToOrder: { type: Boolean, default: false },
    productionDays: { type: Number, default: 3 },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    reviewCount: { type: Number, default: 0 },
    weight: { type: String },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
