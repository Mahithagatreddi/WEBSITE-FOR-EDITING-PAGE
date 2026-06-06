import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { ReelModel } from "@/lib/models";
import { cookies } from "next/headers";

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    
    // Auth check
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orderData = await request.json();
    
    // orderData is expected to be: [{ id: "...", order: 0 }, { id: "...", order: 1 }]
    // Perform bulk update
    const bulkOps = orderData.map((item: any) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { order: item.order } }
      }
    }));

    await ReelModel.bulkWrite(bulkOps);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating reel order:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
