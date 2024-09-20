import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import UserModel from "@/server/models/userModel";
import { connectDB } from "@/server/MongooseConnect";

const userSignUpController = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        await connectDB();

        const { email, password, name } = req.body;

        // Validate incoming request body
        if (!email) throw new Error("Please provide email");
        if (!password) throw new Error("Please provide password");
        if (!name) throw new Error("Please provide name");

        // Check password length
        if (password.length < 8) {
            throw new Error("Password must be at least 8 characters long")
        }
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists.");
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        if (!hashPassword) {
            throw new Error("Something went wrong during password hashing");
        }

        // Create new user payload
        const payload = {
            name,
            email,
            password: hashPassword,
            role: "GENERAL",
        };

        // Create and save new user in the database
        const newUser = new UserModel(payload);
        const savedUser = await newUser.save();

        // Return success response
        res.status(201).json({
            data: savedUser,
            success: true,
            error: false,
            message: "Account created successfully!",
        });
    } catch (err: any) {
        // Return error response
        res.status(400).json({
            message: err.message || "Something went wrong",
            error: true,
            success: false,
        });
    }
};

export default userSignUpController;
