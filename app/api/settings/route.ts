import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SiteSettings } from "@/models/SiteSettings";
import { DEFAULT_SITE_SETTINGS } from "@/lib/content";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db && SiteSettings) {
      let settings = await SiteSettings.findOne();
      if (!settings) {
        settings = await SiteSettings.create(DEFAULT_SITE_SETTINGS);
      }
      return NextResponse.json(settings);
    }
    return NextResponse.json(DEFAULT_SITE_SETTINGS);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const db = await connectToDatabase();
    if (db && SiteSettings) {
      let settings = await SiteSettings.findOne();
      if (!settings) {
        settings = await SiteSettings.create({ ...DEFAULT_SITE_SETTINGS, ...body });
      } else {
        Object.assign(settings, body);
        await settings.save();
      }
      return NextResponse.json(settings);
    }
    return NextResponse.json(body);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
