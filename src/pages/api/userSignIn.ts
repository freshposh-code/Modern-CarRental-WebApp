import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "@/server/models/userModel";
import { connectDB } from "@/server/MongooseConnect";

const userSignInController = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectDB()

        const { email, password } = req.body;

        // Validate request body
        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        // Find user by email
        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        // Compare provided password with stored hash
        const checkPassword = await bcrypt.compare(password, user.password);
        console.timeEnd("Password Check");
        if (!checkPassword) {
            throw new Error("Invalid password");
        }

        // Create JWT token payload
        const tokenData = {
            _id: user._id,
            email: user.email,
        };

        const token = jwt.sign(tokenData, process.env.NEXT_PUBLIC_APP_TOKEN_SECRET_KEY as string, {
            expiresIn: "10h",
        });

        // Define cookie options
        const tokenOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict" as const,
            maxAge: 10 * 60 * 60 * 1000,
        };

        // Set the cookie and respond with the token
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
