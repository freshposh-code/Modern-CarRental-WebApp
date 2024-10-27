import vaultModel from '@/server/models/vaultModel';
import { connectDB } from '@/server/MongooseConnect';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');

        if (!category) {
            return NextResponse.json({
                message: 'Category is required',
                error: true,
                success: false,
            }, { status: 400 });
        }

        const cars = await vaultModel.find({ category });

        return NextResponse.json({
            data: cars,
            message: 'Cars retrieved successfully by category',
            success: true,
            error: false,
        });
    } catch (err: any) {
        return NextResponse.json({
            message: err.message || 'Internal Server Error',
            error: true,
            success: false,
        }, { status: 500 });
    }
}
