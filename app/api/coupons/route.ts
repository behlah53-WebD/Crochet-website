import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Coupon } from "@/models/Coupon";
import { MOCK_COUPONS } from "@/lib/mock-data";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db && Coupon) {
      let coupons = await Coupon.find().sort({ createdAt: -1 }).lean();
      if (coupons && coupons.length > 0) {
        return NextResponse.json(coupons);
      }
      // Initialize if empty
      const inserted = await Coupon.insertMany(
        MOCK_COUPONS.map(({ _id, ...rest }) => rest)
      );
      return NextResponse.json(inserted);
    }
    return NextResponse.json(MOCK_COUPONS);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await connectToDatabase();
    const code = body.code ? body.code.trim().toUpperCase() : "";

    if (db && Coupon) {
      const created = await Coupon.create({
        code,
        discountType: body.discountType || "PERCENTAGE",
        discountValue: Number(body.discountValue),
        minOrderValue: Number(body.minOrderValue) || 0,
        maxDiscount: body.maxDiscount ? Number(body.maxDiscount) : undefined,
        isActive: body.isActive !== undefined ? body.isActive : true,
        usageCount: 0,
      });
      return NextResponse.json(created, { status: 201 });
    }
    return NextResponse.json({ ...body, _id: "coup-" + Date.now(), code }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    const db = await connectToDatabase();
    if (db && Coupon && _id) {
      const updated = await Coupon.findByIdAndUpdate(_id, updateData, { new: true });
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
    if (db && Coupon && id) {
      await Coupon.findByIdAndDelete(id);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
