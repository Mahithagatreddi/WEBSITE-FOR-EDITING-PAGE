import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { EventModel } from "@/lib/models";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await connectToDatabase();
    const events = await EventModel.find().sort({ date: 1 });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.get("admin_session")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    await connectToDatabase();
    const body = await request.json();
    const newEvent = await EventModel.create(body);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
