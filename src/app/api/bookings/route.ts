import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { connectDB } from "@/server/MongooseConnect";
import BookingModel from "@/server/models/bookingModel";
import UserModel from "@/server/models/userModel";
import { getServerSession } from "next-auth";
import Nextauth from "@/pages/api/auth/[...nextauth]"; 

export async function POST(req: Request) {
  try {
    await connectDB();

    let userId = null;

    const session = await getServerSession();
    if (session?.user?.id) {
      userId = session.user.id;
    } 
    else {
      const cookieHeader = req.headers.get("cookie") || "";
      const cookies = parse(cookieHeader);
      const token = cookies.token;

      if (!token) {
        return NextResponse.json(
          { message: "Unauthorized. Please login!", success: false }, 
          { status: 401 }
        );
      }

      try {
        const decoded = jwt.verify(
          token, 
          process.env.APP_TOKEN_SECRET_KEY as string
        ) as { _id: string };

        if (!decoded || !decoded._id) {
          return NextResponse.json(
            { message: "Invalid token", success: false }, 
            { status: 403 }
          );
        }

        userId = decoded._id;
      } catch (jwtError: any) {
        if (jwtError.name === 'TokenExpiredError') {
          return NextResponse.json(
            { message: "Unauthorized. Please login!", success: false }, 
            { status: 401 }
          );
        }
        throw jwtError;
      }
    }

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized. Please login!", success: false }, 
        { status: 401 }
      );
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false }, 
        { status: 404 }
      );
    }

    const body = await req.json();
    const { carId, carName, carImg, startDate, endDate, price, transactionRef } = body;

    const existingBooking = await BookingModel.findOne({ userId: user.id, carId });
    if (existingBooking) {
      return NextResponse.json(
        { message: "Car's already booked", success: false }, 
        { status: 404 }
      );
    }

    if (!carId || !carName || !carImg || !startDate || !endDate || !price) {
      return NextResponse.json(
        { message: "All fields are required", success: false }, 
        { status: 400 }
      );
    }
    const parsedStartDate = new Date(startDate);

     const parsedEndDate = new Date(parsedStartDate.getTime() + 24 * 60 * 60 * 1000);

    const newBooking = new BookingModel({
      userId: user._id,
      carId,
      carName,
      carImg,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      price: Number(price),
      status: "pending",
      paymentStatus: "Pending",
      transactionRef: transactionRef,
    });

    await newBooking.save();

    return NextResponse.json(
      { message: "Booking successful", success: true, booking: newBooking}, 
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false }, 
      { status: 500 }
    );
  }
}