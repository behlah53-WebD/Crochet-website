import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserCartItem {
  productId: string;
  title: string;
  slug?: string;
  image?: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedColorHex?: string;
  selectedSize?: string;
  personalizationText?: string;
  strapOption?: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash?: string;
  role: "CUSTOMER" | "ADMIN" | "STAFF";
  phone?: string;
  addresses: {
    fullName: string;
    phone: string;
    street: string;
    apartment?: string;
    city: string;
    state: string;
    pincode: string;
    isDefault?: boolean;
  }[];
  cart: IUserCartItem[];
  wishlist: string[];
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  street: { type: String, required: true },
  apartment: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

const CartItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, default: "" },
    image: { type: String, default: "" },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    selectedColor: { type: String },
    selectedColorHex: { type: String },
    selectedSize: { type: String },
    personalizationText: { type: String },
    strapOption: { type: String },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String },
    role: { type: String, enum: ["CUSTOMER", "ADMIN", "STAFF"], default: "CUSTOMER" },
    phone: { type: String, trim: true },
    addresses: [AddressSchema],
    cart: [CartItemSchema],
    wishlist: [{ type: String }],
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
