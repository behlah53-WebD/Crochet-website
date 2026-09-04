import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@loomandlove.com").toLowerCase().trim();

    // Prevent registering with reserved administrator email
    if (cleanEmail === adminEmail) {
      return NextResponse.json(
        { error: "This email address is reserved for administration." },
        { status: 403 }
      );
    }

    const db = await connectToDatabase();
    if (db && User) {
      const existing = await User.findOne({ email: cleanEmail });
      if (existing) {
        return NextResponse.json(
          { error: "An account with this email already exists." },
          { status: 409 }
        );
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name: name.trim(),
        email: cleanEmail,
        passwordHash,
        role: "CUSTOMER", // Strictly customer/buyer role
      });

      return NextResponse.json({
        message: "Account created successfully! 🌸",
        user: { id: newUser._id, name: newUser.name, email: newUser.email, role: "CUSTOMER" },
      });
    }

    return NextResponse.json({
      message: "Account created successfully! You may now sign in with your credentials.",
      user: { name, email: cleanEmail, role: "CUSTOMER" },
    });
  } catch (err: any) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create account." },
      { status: 500 }
    );
  }
}
