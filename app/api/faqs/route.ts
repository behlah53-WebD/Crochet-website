import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { FAQ } from "@/models/FAQ";
import { DEFAULT_FAQS } from "@/lib/content";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db && FAQ) {
      const faqs = await FAQ.find().sort({ displayOrder: 1, createdAt: 1 }).lean();
      if (faqs && faqs.length > 0) {
        return NextResponse.json(faqs);
      }
      // Initialize if empty
      const inserted = await FAQ.insertMany(
        DEFAULT_FAQS.map(({ _id, ...rest }) => rest)
      );
      return NextResponse.json(inserted);
    }
    return NextResponse.json(DEFAULT_FAQS);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await connectToDatabase();
    if (db && FAQ) {
      const created = await FAQ.create({
        question: body.question,
        answer: body.answer,
        category: body.category || "General",
        displayOrder: body.displayOrder || 0,
        isActive: body.isActive !== undefined ? body.isActive : true,
      });
      return NextResponse.json(created, { status: 201 });
    }
    return NextResponse.json({ ...body, _id: "faq-" + Date.now() }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    const db = await connectToDatabase();
    if (db && FAQ && _id) {
      const updated = await FAQ.findByIdAndUpdate(_id, updateData, { new: true });
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
    if (db && FAQ && id) {
      await FAQ.findByIdAndDelete(id);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
