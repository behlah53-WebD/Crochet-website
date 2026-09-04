import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";
import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";
import { slugify } from "@/lib/utils";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const sort = (searchParams.get("sort") as any) || undefined;
    const isFeatured = searchParams.get("featured") === "true";
    const isBestSeller = searchParams.get("bestseller") === "true";
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined;

    const products = await getProducts({
      category,
      search,
      sort,
      isFeatured: isFeatured || undefined,
      isBestSeller: isBestSeller || undefined,
      limit,
    });

    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await connectToDatabase();

    const slug = body.slug ? slugify(body.slug) : slugify(body.title);

    if (db && Product) {
      const newProduct = await Product.create({
        ...body,
        slug,
      });
      return NextResponse.json(newProduct, { status: 201 });
    }

    return NextResponse.json({ ...body, _id: "prod-" + Date.now(), slug }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    const db = await connectToDatabase();

    if (db && Product && _id) {
      if (updateData.title && !updateData.slug) {
        updateData.slug = slugify(updateData.title);
      }
      const updated = await Product.findByIdAndUpdate(_id, updateData, { new: true });
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

    if (db && Product && id) {
      await Product.findByIdAndDelete(id);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
