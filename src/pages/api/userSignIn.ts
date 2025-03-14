import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "@/server/models/userModel";
import { connectDB } from "@/server/MongooseConnect";

const userSignInController = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectDB()

        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        console.timeEnd("Password Check");
        if (!checkPassword) {
            throw new Error("Invalid password");
        }

        const tokenData = {
            _id: user._id,
            email: user.email,
        };

        const token = jwt.sign(tokenData, process.env.APP_TOKEN_SECRET_KEY as string, {
            expiresIn: "7days",
        });

        const tokenOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict" as const,
            maxAge: 7 * 24 * 60 * 60 * 1000
        };

        res.setHeader(
            "Set-Cookie",
            `token=${token}; Path=/; HttpOnly; Secure; SameSite=${tokenOptions.sameSite}; Max-Age=${tokenOptions.maxAge}`
        );

        res.status(200).json({
            message: "Login successful",
            data: token,
            success: true,
            error: false,
        });
    } catch (err: any) {
        res.status(400).json({
            message: err.message || "Something went wrong",
            error: true,
            success: false,
        });
    }
};

export default userSignInController;
