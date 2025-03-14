import { NextResponse } from "next/server";
import { connectDB } from "@/server/MongooseConnect";
import BookingModel from "@/server/models/bookingModel";
import { parse } from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
    _id: string;
}

export async function GET(req: Request) {
    try {
        await connectDB();

        const token = parse(req.headers.get("cookie") || "").token;
        if (!token) return unauthorizedResponse();

        const decoded = verifyToken(token);
        if (!decoded || !decoded._id) return invalidTokenResponse();

        // Fetch bookings for the user
        const bookings = await BookingModel.find({ userId: decoded._id }).sort({ startDate: -1 });

        return NextResponse.json({ success: true, bookings });

    } catch (error) {
        return serverErrorResponse(error);
    }
}

const unauthorizedResponse = () => 
    NextResponse.json({ message: "Unauthorized. Please login!", success: false }, { status: 401 });

const invalidTokenResponse = () => 
    NextResponse.json({ message: "Invalid token", success: false }, { status: 403 });

const serverErrorResponse = (error: any) => {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
};

const verifyToken = (token: string): DecodedToken | null => {
    try {
        return jwt.verify(token, process.env.APP_TOKEN_SECRET_KEY as string) as DecodedToken;
    } catch {
        return null;
    }
};
