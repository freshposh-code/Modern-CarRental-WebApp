import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { connectDB } from "@/server/MongooseConnect";
import BookingModel from "@/server/models/bookingModel";
import UserModel from "@/server/models/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function POST(req: Request) {
  try {
    await connectDB();
    console.log("Database connected");

    let userId: string | null = null;

    const session = await getServerSession(authOptions);

    if (session?.user?.id) {
      userId = session.user.id;
      console.log("Found user ID from session:", userId);
    } else {
      console.log("No session found, checking token...");
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
        console.log("Found user ID from token:", userId);
      } catch (jwtError: any) {
        if (jwtError.name === "TokenExpiredError") {
          return NextResponse.json(
            { message: "Token expired. Please login!", success: false },
            { status: 401 }
          );
        }
        console.error("JWT verification error:", jwtError);
        return NextResponse.json(
          { message: "Invalid authentication token", success: false },
          { status: 403 }
        );
      }
    }

    if (!userId) {
      console.log("No user ID resolved");
      return NextResponse.json(
        { message: "Unauthorized. Please login!", success: false },
        { status: 401 }
      );
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      console.log("User not found in DB:", userId);
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error("Error parsing request body:", parseError);
      return NextResponse.json(
        { message: "Invalid request body", success: false },
        { status: 400 }
      );
    }

    const { carId, carName, carImg, startDate, endDate, price, transactionRef } = body;

    if (!carId || !carName || !carImg || !startDate || !endDate || !price) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      return NextResponse.json(
        { message: "Invalid date format", success: false },
        { status: 400 }
      );
    }

    const existingBooking = await BookingModel.findOne({ userId: user._id, carId });
    if (existingBooking) {
      return NextResponse.json(
        { message: "Car already booked", success: false },
        { status: 409 }
      );
    }

    console.log("Creating booking with:", {
      userId: user._id,
      carId,
      carName,
      carImg,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      price,
      transactionRef,
    });

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
      transactionRef,
    });

    await newBooking.save();

    console.log("Booking saved successfully");

    return NextResponse.json(
      { message: "Booking successful", success: true, booking: newBooking },
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
