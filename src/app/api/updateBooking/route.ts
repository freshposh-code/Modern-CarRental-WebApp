import { connectDB } from "@/server/MongooseConnect";
import bookingModel from "@/server/models/bookingModel";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    try {
      await connectDB();

      const { bookingId, newStatus, userId } = await req.json();
      
      const booking = await bookingModel.findById(bookingId);
      
      if (!booking) {
        return NextResponse.json({ message: "Booking not found", success: false }, { status: 404 });
      }

      const validTransitions:any = {
        'pending': ['confirmed', 'cancelled', 'rejected'],
        'confirmed': ['in_progress', 'cancelled', 'pending'],
        'in_progress': ['completed'],
        'completed': [],
        'cancelled': [],
        'rejected': []
      };
  
      if (!validTransitions[booking.status].includes(newStatus)) {
        return NextResponse.json({ message: "Invalid status transition", success: false }, { status: 400 });
      }
  
      booking.status = newStatus;
      booking.statusHistory.push({
        status: newStatus,
        updatedBy: userId
      });

      await booking.save();

      return NextResponse.json({ message: "Booking status updated", success: true, booking });
    } catch (error) {
      console.error("Error updating booking:", error);
      return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}
