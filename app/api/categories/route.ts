import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Category } from "@/models/Category";
import { MOCK_CATEGORIES } from "@/lib/mock-data";
import { slugify } from "@/lib/utils";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db && Category) {
      let categories = await Category.find().sort({ displayOrder: 1, createdAt: 1 }).lean();
      if (categories && categories.length > 0) {
        return NextResponse.json(categories);
      }
    }
    return NextResponse.json(MOCK_CATEGORIES);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await connectToDatabase();
    const slug = body.slug ? slugify(body.slug) : slugify(body.name);

    if (db && Category) {
      const created = await Category.create({
        name: body.name,
        slug,
        description: body.description,
        image:
          body.image ||
          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
        icon: body.icon,
        displayOrder: body.displayOrder || 0,
      });
      return NextResponse.json(created, { status: 201 });
    }

    return NextResponse.json({ ...body, _id: "cat-" + Date.now(), slug }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    const db = await connectToDatabase();

    if (db && Category && _id) {
      const updated = await Category.findByIdAndUpdate(_id, updateData, { new: true });
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

    if (db && Category && id) {
      await Category.findByIdAndDelete(id);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
