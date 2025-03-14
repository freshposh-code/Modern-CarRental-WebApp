import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { v4 as uuidv4 } from "uuid";
import wishlistModel from "@/server/models/wishlistModel";
import { cookies } from "next/headers";
import { connectDB } from "@/server/MongooseConnect";

interface CustomToken {
  id?: string;
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const token = (await getToken({
      req,
      secret: process.env.NEXT_PUBLIC_APP_NEXTAUTH_SECRET,
    })) as CustomToken;

    const cookieStore = cookies();
    let userId = token?.id ?? cookieStore.get("guestId")?.value;

    if (!userId) {
      userId = uuidv4();
      cookieStore.set("guestId", userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 365 * 100, // 100 years
      });
      
    }

    const body = await req.json();
    const { carName, carImage, price } = body;

    if (!carName || !carImage || !price) {
      return NextResponse.json(
        { message: "Invalid or missing request body" },
        { status: 400 }
      );
    }

    const existingItem = await wishlistModel.findOne({ userId, carName });

    if (existingItem) {
      await wishlistModel.deleteOne({ userId, carName });
      return NextResponse.json(
        { message: "Item removed from wishlist", action: "removed" },
        { status: 200 }
      );
    }

    const newItem = new wishlistModel({ userId, carName, carImage, price });
    await newItem.save();

    return NextResponse.json(
      { message: "Item added to wishlist", action: "added" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error processing wishlist request:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
