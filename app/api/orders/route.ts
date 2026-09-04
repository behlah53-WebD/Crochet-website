import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Order } from "@/models/Order";
import { generateOrderNumber } from "@/lib/utils";
import { MOCK_ORDERS } from "@/lib/mock-data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    const db = await connectToDatabase();
    if (db && Order) {
      const query = email ? { userEmail: email.toLowerCase() } : {};
      const orders = await Order.find(query).sort({ createdAt: -1 }).lean();
      if (orders && orders.length > 0) {
        return NextResponse.json(orders);
      }
    }

    if (email) {
      return NextResponse.json(MOCK_ORDERS.filter((o) => o.userEmail.toLowerCase() === email.toLowerCase()));
    }
    return NextResponse.json(MOCK_ORDERS);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const orderNumber = generateOrderNumber();

    const orderPayload = {
      ...data,
      orderNumber,
      orderStatus: data.orderStatus || "PROCESSING",
      paymentStatus: data.paymentMethod === "COD" ? "PENDING" : "PAID",
      timeline: [
        {
          status: "PENDING",
          date: new Date(),
          note: data.paymentMethod === "COD" ? "Cash on delivery order placed" : "Payment received via Razorpay",
        },
        {
          status: "PROCESSING",
          date: new Date(),
          note: "Order scheduled with Loom & Love artisans",
        },
      ],
      createdAt: new Date().toISOString(),
    };

    const db = await connectToDatabase();
    if (db && Order) {
      const saved = await Order.create(orderPayload);
      return NextResponse.json(saved, { status: 201 });
    }

    // In-memory fallback
    MOCK_ORDERS.unshift({
      ...orderPayload,
      _id: "ord-" + Date.now(),
    });

    return NextResponse.json(
      { ...orderPayload, _id: "ord-" + Date.now() },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Order creation error:", err);
    return NextResponse.json({ error: err.message || "Failed to create order" }, { status: 500 });
  }
}
