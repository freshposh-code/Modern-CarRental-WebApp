import { NextRequest, NextResponse } from 'next/server';
import userModel from '@/server/models/userModel';
import { connectDB } from '@/server/MongooseConnect';

export async function PATCH(req: NextRequest) {
    try {
        await connectDB();

        const sessionUser = req.headers.get('userId'); 
        const body = await req.json();

        const { userId, email, name, role } = body;

        const payload: {
            email?: string;
            name?: string;
            role?: string;
        } = {
            ...(email && { email }),
            ...(name && { name }),
            ...(role && { role }),
        };

        // Fetch the session user's role for authorization purposes
        const user = await userModel.findById(sessionUser);
        if (!user) {
            return NextResponse.json(
                { message: 'User not found', success: false, error: true },
                { status: 404 }
            );
        }
        console.log('user.role', user.role);

        const updatedUser = await userModel.findByIdAndUpdate(userId, payload, { new: true });

        return NextResponse.json({
            data: updatedUser,
            message: 'Role Updated Successfully',
            success: true,
            error: false,
        });
    } catch (err: any) {
        return NextResponse.json(
            { message: err.message || 'Something went wrong', error: true, success: false },
            { status: 400 }
        );
    }
}
