import bookingModel from "@/server/models/bookingModel";
import { connectDB } from "@/server/MongooseConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { reference, email, amount } = await req.json();

    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const paystackData = await paystackRes.json();

    if (paystackData.data.status === "success") {
      await connectDB();
      await bookingModel.updateMany({ userEmail: email }, { $set: { status: "Confirmed", paymentStatus: "Paid" } });

      return NextResponse.json({ success: true, message: "Payment verified and updated." });
    }

    return NextResponse.json({ success: false, message: "Payment verification failed." });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" });
  }
}
