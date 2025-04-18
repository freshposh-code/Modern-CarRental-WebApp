import { NextRequest, NextResponse } from "next/server";
import bookingModel from "@/server/models/bookingModel";
import { connectDB } from "@/server/MongooseConnect";

const FLW_SECRET_HASH = process.env.FLUTTERWAVE_SECRET_HASH || "";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const receivedSignature = req.headers.get("verif-hash");

    if (!receivedSignature || receivedSignature !== FLW_SECRET_HASH) {
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);
    console.log("Webhook Received:", event);

    if (event?.event === "charge.completed" && event.data?.status === "successful") {
      const tx_ref = event.data.tx_ref;
      
      console.log("Transaction Reference from webhook:", tx_ref);

      await connectDB();

      const updatedBooking = await bookingModel.findOneAndUpdate(
        { transactionRef: tx_ref }, 
        { 
          $set: { 
            status: "confirmed", 
            paymentStatus: "Paid" 
          },
          $push: {
            statusHistory: {
              status: "confirmed",
              timestamp: new Date(),
            }
          }
        },
        { new: true }
      );

      console.log("Updated Booking:", updatedBooking);

      if (!updatedBooking) {
        console.error("No booking found with transaction reference:", tx_ref);
        return NextResponse.json({ success: false, message: "No matching booking found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, message: "Payment verified and updated." });
    }

    return NextResponse.json({ success: false, message: "Payment verification failed." });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}