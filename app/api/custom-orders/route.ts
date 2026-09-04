import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { CustomOrder } from "@/models/CustomOrder";
import { MOCK_CUSTOM_ORDERS } from "@/lib/mock-data";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db && CustomOrder) {
      const requests = await CustomOrder.find().sort({ createdAt: -1 }).lean();
      if (requests && requests.length > 0) return NextResponse.json(requests);
    }
    return NextResponse.json(MOCK_CUSTOM_ORDERS);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const requestNumber = "REQ-" + new Date().getFullYear() + "-" + Math.floor(100 + Math.random() * 900);

    const payload = {
      ...data,
      requestNumber,
      status: "SUBMITTED",
      createdAt: new Date().toISOString(),
    };

    const db = await connectToDatabase();
    if (db && CustomOrder) {
      const created = await CustomOrder.create(payload);
      return NextResponse.json(created, { status: 201 });
    }

    MOCK_CUSTOM_ORDERS.unshift({
      ...payload,
      _id: "custom-" + Date.now(),
    });

    return NextResponse.json({ ...payload, _id: "custom-" + Date.now() }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
