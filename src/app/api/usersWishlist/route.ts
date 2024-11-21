import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import wishlistModel from "@/server/models/wishlistModel";
import { cookies } from "next/headers";
import { connectDB } from "@/server/MongooseConnect";

interface CustomToken {
  id?: string;
}

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    // Get user from token or guest ID from cookies
    const token = (await getToken({ req, secret: process.env.NEXT_PUBLIC_APP_NEXTAUTH_SECRET })) as CustomToken;
    const guestCookies = cookies();
    const userId = token?.id || guestCookies.get("guestId")?.value;

    if (!userId) {
      return NextResponse.json({ message: "No wishlist found for this user or guest" }, { status: 200 });
    }

    // Fetch wishlist items from the database
    const wishlistItems = await wishlistModel.find({ userId: String(userId) });

    return NextResponse.json({ wishlist: wishlistItems }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
