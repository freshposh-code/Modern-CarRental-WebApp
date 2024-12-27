import { NextRequest, NextResponse } from "next/server";
import wishlistModel from "@/server/models/wishlistModel";
import { cookies } from "next/headers";
import { connectDB } from "@/server/MongooseConnect";
import { getToken } from "next-auth/jwt";

interface CustomToken {
  id?: string;
}

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    // Retrieve token for authenticated users or guestId from cookies
    const token = (await getToken({
      req,
      secret: process.env.NEXT_PUBLIC_APP_NEXTAUTH_SECRET,
    })) as CustomToken;

    const cookieStore = cookies();
    const userId = token?.id ?? cookieStore.get("guestId")?.value;

    // Return error if no userId is found
    if (!userId) {
      return NextResponse.json(
        { message: "User ID or Guest ID not found" },
        { status: 400 }
      );
    }

    // Fetch and return wishlist items tied to the userId
    const wishlistItems = await wishlistModel.find({ userId });

    return NextResponse.json({ wishlist: wishlistItems }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json(
      { message: "Failed to fetch wishlist", error: error.message },
      { status: 500 }
    );
  }
}
