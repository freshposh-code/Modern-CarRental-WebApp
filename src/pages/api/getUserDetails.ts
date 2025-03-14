import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import UserModel from "@/server/models/userModel";
import { connectDB } from "@/server/MongooseConnect";

const getUserDetails = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectDB();

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const decoded = jwt.verify(token, process.env.APP_TOKEN_SECRET_KEY as string) as { _id: string };

        const user = await UserModel.findById(decoded._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            data: { name: user.name, email: user.email, role: user.role },
        });
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message || "Something went wrong",
        });
    }
};

export default getUserDetails;
