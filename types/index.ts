export type UserRole = "CUSTOMER" | "ADMIN" | "STAFF";

export interface Address {
  _id?: string;
  fullName: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  addresses?: Address[];
  wishlist?: string[]; // product IDs
  createdAt?: string;
}

export interface ProductVariant {
  name: string; // e.g. "Pastel Blush", "Lilac Breeze", "Cream Cloud"
  colorHex: string;
  size?: string; // e.g. "Mini", "Standard", "Oversized"
  priceModifier?: number;
  stock: number;
  image?: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  category: string; // Category slug or ID
  categoryName?: string;
  images: string[];
  variants: ProductVariant[];
  stock: number;
  tags: string[];
  dimensions?: string;
  materials?: string;
  careInstructions?: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isMadeToOrder?: boolean;
  productionDays?: number; // e.g. 3-5 days
  rating: number;
  reviewCount: number;
  weight?: string;
  createdAt?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon?: string;
  displayOrder: number;
  itemCount?: number;
}

export interface CartItem {
  productId: string;
  title: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedColorHex?: string;
  selectedSize?: string;
  personalizationText?: string;
  strapOption?: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  personalizationText?: string;
}

export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "IN_PRODUCTION"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface Order {
  _id: string;
  orderNumber: string;
  userEmail: string;
  userName: string;
  shippingAddress: Address;
  items: OrderItem[];
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
  orderStatus: OrderStatus;
  trackingNumber?: string;
  courierName?: string;
  notes?: string;
  createdAt: string;
  timeline: {
    status: OrderStatus;
    date: string;
    note?: string;
  }[];
}

export type CustomOrderStatus =
  | "SUBMITTED"
  | "REVIEWING"
  | "QUOTE_SENT"
  | "APPROVED"
  | "IN_PRODUCTION"
  | "SHIPPED"
  | "COMPLETED"
  | "CANCELLED";

export interface CustomOrderRequest {
  _id: string;
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
  status: CustomOrderStatus;
  quotedPrice?: number;
  adminNotes?: string;
  createdAt: string;
}

export interface Coupon {
  _id: string;
  code: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  expiresAt?: string;
  isActive: boolean;
  usageCount: number;
}

export interface Review {
  _id: string;
  productId: string;
  userName: string;
  userEmail?: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  isVerified: boolean;
  status: "PENDING" | "APPROVED";
  createdAt: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  readTime: string;
  tags: string[];
  publishedAt: string;
  isPublished: boolean;
}
