import bookingModel from "@/server/models/bookingModel";
import { connectDB } from "@/server/MongooseConnect";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
      await connectDB();
  
      const bookings = await bookingModel.find()
        .populate('userId', 'name email')
        .sort({ createdAt: -1 });
  
      return NextResponse.json({ 
        success: true, 
        bookings,
        totalBookings: bookings.length
      });
    } catch (error) {
      console.error("Booking fetch error:", error);
      return NextResponse.json({ 
        success: false, 
        message: "Unable to retrieve bookings" 
      }, { status: 500 });
    }
  }