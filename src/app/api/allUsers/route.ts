import userModel from '@/server/models/userModel';
import { connectDB } from '@/server/MongooseConnect';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();

        const users = await userModel.find().select('-password');

        return NextResponse.json({
            message: 'All users retrieved successfully',
            data: users,
            success: true,
        });
    } catch (err: any) {
        return NextResponse.json({
            message: err.message || 'Internal Server Error',
            error: true,
            success: false,
        }, { status: 500 });
    }
}
