import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { HomeContent } from "@/models/HomeContent";
import { DEFAULT_HOME_CONTENT } from "@/lib/content";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db && HomeContent) {
      let content = await HomeContent.findOne();
      if (!content) {
        content = await HomeContent.create(DEFAULT_HOME_CONTENT);
      }
      return NextResponse.json(content);
    }
    return NextResponse.json(DEFAULT_HOME_CONTENT);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const db = await connectToDatabase();
    if (db && HomeContent) {
      let content = await HomeContent.findOne();
      if (!content) {
        content = await HomeContent.create({ ...DEFAULT_HOME_CONTENT, ...body });
      } else {
        Object.assign(content, body);
        await content.save();
      }
      return NextResponse.json(content);
    }
    return NextResponse.json(body);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
