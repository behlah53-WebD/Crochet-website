import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
  orderNumber: string;
  userEmail: string;
  userName: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    street: string;
    apartment?: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: {
    productId: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
    personalizationText?: string;
  }[];
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  giftWrapFee: number;
  giftMessage?: string;
  shippingFee: number;
  total: number;
  paymentMethod: "RAZORPAY" | "COD";
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  razorpayPaymentId?: string;
  orderStatus: "PENDING" | "PROCESSING" | "IN_PRODUCTION" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  trackingNumber?: string;
  courierName?: string;
  notes?: string;
  timeline: {
    status: string;
    date: Date;
    note?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    userEmail: { type: String, required: true, index: true },
    userName: { type: String, required: true },
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      apartment: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    items: [
      {
        productId: { type: String, required: true },
        title: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        selectedColor: { type: String },
        selectedSize: { type: String },
        personalizationText: { type: String },
      },
    ],
    subtotal: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    couponCode: { type: String },
    giftWrapFee: { type: Number, default: 0 },
    giftMessage: { type: String },
    shippingFee: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["RAZORPAY", "COD"], default: "RAZORPAY" },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
      default: "PENDING",
      index: true,
    },
    razorpayPaymentId: { type: String },
    orderStatus: {
      type: String,
      enum: ["PENDING", "PROCESSING", "IN_PRODUCTION", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PROCESSING",
      index: true,
    },
    trackingNumber: { type: String },
    courierName: { type: String },
    notes: { type: String },
    timeline: [
      {
        status: { type: String, required: true },
        date: { type: Date, default: Date.now },
        note: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
