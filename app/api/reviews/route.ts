import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Review } from "@/models/Review";
import { MOCK_REVIEWS } from "@/lib/mock-data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    const db = await connectToDatabase();
    if (db && Review) {
      const query = productId ? { productId, status: "APPROVED" } : {};
      const reviews = await Review.find(query).sort({ createdAt: -1 }).lean();
      if (reviews && reviews.length > 0) return NextResponse.json(reviews);
    }

    if (productId) {
      return NextResponse.json(MOCK_REVIEWS.filter((r) => r.productId === productId));
    }
    return NextResponse.json(MOCK_REVIEWS);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const payload = {
      ...data,
      isVerified: true,
      status: "APPROVED",
      createdAt: new Date().toISOString(),
    };

    const db = await connectToDatabase();
    if (db && Review) {
      const saved = await Review.create(payload);
      return NextResponse.json(saved, { status: 201 });
    }

    MOCK_REVIEWS.unshift({
      ...payload,
      _id: "rev-" + Date.now(),
    });

    return NextResponse.json({ ...payload, _id: "rev-" + Date.now() }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    const db = await connectToDatabase();

    if (db && Review && _id) {
      const updated = await Review.findByIdAndUpdate(_id, updateData, { new: true });
      return NextResponse.json(updated);
    }

    return NextResponse.json(body);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const db = await connectToDatabase();

    if (db && Review && id) {
      await Review.findByIdAndDelete(id);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
