import { NextResponse } from "next/server";
import { connectDB } from "@/server/MongooseConnect";
import BookingModel from "@/server/models/bookingModel";
import { parse } from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  _id: string;
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const cookieHeader = req.headers.get("cookie");
    const cookies = cookieHeader ? parse(cookieHeader) : {};
    const token = cookies.token;

    if (!token) return unauthorizedResponse();

    const decoded = verifyToken(token);
    if (!decoded || !decoded._id) return invalidTokenResponse();

    const bookingId = params.id;
    if (!bookingId) {
      return NextResponse.json(
        { message: "Booking ID is required", success: false },
        { status: 400 }
      );
    }

    const deletedBooking = await BookingModel.findOneAndDelete({
      _id: bookingId,
      userId: decoded._id,
    });

    if (!deletedBooking) {
      return NextResponse.json(
        { message: "Booking not found or already deleted", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error:any) {
    console.error("Error deleting booking:", error.message, error.stack);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

const unauthorizedResponse = () =>
  NextResponse.json(
    { message: "Unauthorized. Please login!", success: false },
    { status: 401 }
  );

const invalidTokenResponse = () =>
  NextResponse.json(
    { message: "Invalid token", success: false },
    { status: 403 }
  );

const verifyToken = (token: string): DecodedToken | null => {
  try {
    return jwt.verify(
      token,
      process.env.APP_TOKEN_SECRET_KEY as string
    ) as DecodedToken;
  } catch (error:any) {
    console.error("Token verification failed:", error.message);
    return null;
  }
};
