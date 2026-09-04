import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Testimonial } from "@/models/Testimonial";
import { DEFAULT_TESTIMONIALS } from "@/lib/content";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featuredOnly = searchParams.get("featured") === "true";

    const db = await connectToDatabase();
    if (db && Testimonial) {
      const query = featuredOnly ? { isFeatured: true } : {};
      const testimonials = await Testimonial.find(query)
        .sort({ displayOrder: 1, createdAt: -1 })
        .lean();

      if (testimonials && testimonials.length > 0) {
        return NextResponse.json(testimonials);
      }
      // Initialize default testimonials if empty
      const inserted = await Testimonial.insertMany(
        DEFAULT_TESTIMONIALS.map(({ _id, ...rest }) => rest)
      );
      return NextResponse.json(inserted);
    }
    return NextResponse.json(DEFAULT_TESTIMONIALS);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await connectToDatabase();
    if (db && Testimonial) {
      const created = await Testimonial.create({
        name: body.name,
        city: body.city || "India",
        avatar:
          body.avatar ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
        item: body.item || "Handcrafted Crochet",
        rating: body.rating || 5,
        date: body.date || "Verified Buyer",
        comment: body.comment,
        isFeatured: body.isFeatured !== undefined ? body.isFeatured : true,
        displayOrder: body.displayOrder || 0,
      });
      return NextResponse.json(created, { status: 201 });
    }
    return NextResponse.json({ ...body, _id: "test-" + Date.now() }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    const db = await connectToDatabase();
    if (db && Testimonial && _id) {
      const updated = await Testimonial.findByIdAndUpdate(_id, updateData, { new: true });
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
    if (db && Testimonial && id) {
      await Testimonial.findByIdAndDelete(id);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
