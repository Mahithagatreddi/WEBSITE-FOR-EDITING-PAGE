import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { ReelModel } from "@/lib/models";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const reels = await ReelModel.find().sort({ createdAt: -1 });
    return NextResponse.json(reels);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reels" }, { status: 500 });
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
    const newReel = await ReelModel.create(body);
    return NextResponse.json(newReel, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create reel" }, { status: 500 });
  }
}
