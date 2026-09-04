import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { PageContent } from "@/models/PageContent";
import { getPageContent, DEFAULT_ABOUT_PAGE } from "@/lib/content";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug required" }, { status: 400 });
    }

    const content = await getPageContent(slug);
    return NextResponse.json(content || {});
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { slug, title, data } = body;

    if (!slug) {
      return NextResponse.json({ error: "Slug required" }, { status: 400 });
    }

    const db = await connectToDatabase();
    if (db && PageContent) {
      let page = await PageContent.findOne({ slug });
      if (!page) {
        page = await PageContent.create({
          slug,
          title: title || slug,
          data: data || {},
        });
      } else {
        if (title) page.title = title;
        if (data) page.data = data;
        await page.save();
      }
      return NextResponse.json(page);
    }

    return NextResponse.json({ slug, title, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
