import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "../models/User";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { Order } from "../models/Order";
import { CustomOrder } from "../models/CustomOrder";
import { Coupon } from "../models/Coupon";
import { Review } from "../models/Review";
import { BlogPost } from "../models/BlogPost";
import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  MOCK_COUPONS,
  MOCK_BLOG_POSTS,
  MOCK_ORDERS,
  MOCK_CUSTOM_ORDERS,
  MOCK_REVIEWS,
} from "../lib/mock-data";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is not set in environment or .env.local.");
    process.exit(1);
  }

  console.log("🌸 Connecting to MongoDB Atlas for Loom & Love...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected successfully!");

  try {
    // 1. Seed Users
    console.log("Seeding Admin and Customer accounts...");
    await User.deleteMany({});
    const adminHash = await bcrypt.hash("Admin@123", 10);
    const customerHash = await bcrypt.hash("Customer@123", 10);

    await User.create([
      {
        name: "Loom & Love Master Admin",
        email: "admin@loomandlove.com",
        passwordHash: adminHash,
        role: "ADMIN",
        phone: "+91 98765 43210",
      },
      {
        name: "Priyanka Roy",
        email: "customer@loomandlove.com",
        passwordHash: customerHash,
        role: "CUSTOMER",
        phone: "+91 98765 43210",
      },
    ]);

    // 2. Seed Categories
    console.log("Seeding Categories...");
    await Category.deleteMany({});
    await Category.insertMany(
      MOCK_CATEGORIES.map(({ _id, ...rest }) => rest)
    );

    // 3. Seed Products
    console.log("Seeding Handcrafted Products...");
    await Product.deleteMany({});
    await Product.insertMany(
      MOCK_PRODUCTS.map(({ _id, ...rest }) => rest)
    );

    // 4. Seed Coupons
    console.log("Seeding Active Coupons...");
    await Coupon.deleteMany({});
    await Coupon.insertMany(
      MOCK_COUPONS.map(({ _id, ...rest }) => rest)
    );

    // 5. Seed Orders
    console.log("Seeding Sample Orders...");
    await Order.deleteMany({});
    await Order.insertMany(
      MOCK_ORDERS.map(({ _id, ...rest }) => rest)
    );

    // 6. Seed Custom Orders
    console.log("Seeding Custom Requests...");
    await CustomOrder.deleteMany({});
    await CustomOrder.insertMany(
      MOCK_CUSTOM_ORDERS.map(({ _id, ...rest }) => rest)
    );

    // 7. Seed Reviews
    console.log("Seeding Reviews...");
    await Review.deleteMany({});
    await Review.insertMany(
      MOCK_REVIEWS.map(({ _id, ...rest }) => rest)
    );

    // 8. Seed Blog Posts
    console.log("Seeding Journal Articles...");
    await BlogPost.deleteMany({});
    await BlogPost.insertMany(
      MOCK_BLOG_POSTS.map(({ _id, ...rest }) => rest)
    );

    console.log("✨ Seeding completed successfully for Loom & Love!");
    console.log("------------------------------------------------");
    console.log("Admin Credentials: admin@loomandlove.com / Admin@123");
    console.log("Customer Credentials: customer@loomandlove.com / Customer@123");
    console.log("------------------------------------------------");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
