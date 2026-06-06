import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { EnquiryModel } from "@/lib/models";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const newEnquiry = await EnquiryModel.create(body);
    return NextResponse.json(newEnquiry, { status: 201 });
  } catch (error) {
    console.error("Enquiry POST Error:", error);
    return NextResponse.json({ error: "Failed to create enquiry" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.get("admin_session")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const enquiries = await EnquiryModel.find().sort({ createdAt: -1 });
    return NextResponse.json(enquiries);
  } catch (error) {
    console.error("Enquiry GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}
