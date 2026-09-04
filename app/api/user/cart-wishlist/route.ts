import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email.toLowerCase().trim();
    await connectToDatabase();

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: session.user.name || "Customer",
        email,
        role: (session.user as any).role || "CUSTOMER",
        cart: [],
        wishlist: [],
      });
    }

    return NextResponse.json({
      cart: user.cart || [],
      wishlist: user.wishlist || [],
    });
  } catch (error: any) {
    console.error("Error fetching user cart/wishlist:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch user data" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email.toLowerCase().trim();
    const body = await request.json();
    const { cart, wishlist } = body;

    await connectToDatabase();

    const updateFields: any = {};
    if (cart !== undefined) {
      updateFields.cart = cart;
    }
    if (wishlist !== undefined) {
      updateFields.wishlist = wishlist;
    }

    const user = await User.findOneAndUpdate(
      { email },
      {
        $set: updateFields,
        $setOnInsert: {
          name: session.user.name || "Customer",
          role: (session.user as any).role || "CUSTOMER",
        },
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      cart: user.cart || [],
      wishlist: user.wishlist || [],
    });
  } catch (error: any) {
    console.error("Error updating user cart/wishlist:", error);
    return NextResponse.json({ error: error.message || "Failed to update user data" }, { status: 500 });
  }
}
