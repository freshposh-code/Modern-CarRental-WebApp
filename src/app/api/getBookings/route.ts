import { NextResponse } from "next/server";
import { connectDB } from "@/server/MongooseConnect";
import BookingModel from "@/server/models/bookingModel";
import UserModel from "@/server/models/userModel";
import { parse } from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface DecodedToken extends JwtPayload {
    _id: string;
}

export async function GET(req: Request) {
    try {
        await connectDB();

        let userId = null;

        const session = await getServerSession(authOptions);
        
        if (session?.user?.id) {
            userId = session.user.id;
            console.log("Found user ID from session:", userId);
        } 
        else {
            console.log("No session user ID, trying token");
            const cookieHeader = req.headers.get("cookie") || "";
            const cookies = parse(cookieHeader);
            const token = cookies.token;

            if (!token) {
                return unauthorizedResponse();
            }

            try {
                const decoded = verifyToken(token);
                if (!decoded || !decoded._id) {
                    return invalidTokenResponse();
                }

                userId = decoded._id;
                console.log("Found user ID from token:", userId);
            } catch (jwtError: any) {
                if (jwtError.name === 'TokenExpiredError') {
                    return unauthorizedResponse();
                }
                throw jwtError;
            }
        }

        if (!userId) {
            console.log("No user ID found from any authentication method");
            return unauthorizedResponse();
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return NextResponse.json(
                { message: "User not found", success: false }, 
                { status: 404 }
            );
        }

        const bookings = await BookingModel.find({ userId: user._id }).sort({ startDate: -1 });

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