import wishlistModel from "@/server/models/wishlistModel";
import { connectDB } from "@/server/MongooseConnect";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface CustomToken {
    id?: string;
  }

export async function DELETE(req: NextRequest) {
    await connectDB();
  
    try {
      const token = (await getToken({ req, secret: process.env.NEXT_PUBLIC_APP_NEXTAUTH_SECRET })) as CustomToken;
  
      let userId = token?.id || cookies().get("guestId")?.value;
  
      if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
      }
  
      const itemId = req.nextUrl.searchParams.get("id");
      if (!itemId) {
        return NextResponse.json({ message: "Wishlist item ID is required" }, { status: 400 });
      }
  
      const result = await wishlistModel.deleteOne({ userId, _id: itemId });
      if (result.deletedCount === 0) {
        return NextResponse.json({ message: "Item not found or already deleted" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Item removed from wishlist", success: true }, {status: 201});
    } catch (error:any) {
      console.error("Error deleting wishlist item:", error);
      return NextResponse.json({ message: "Failed to delete item", error: error.message }, { status: 500 });
    }
  }
  