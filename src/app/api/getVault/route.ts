import { NextResponse } from 'next/server';
import { connectDB } from '@/server/MongooseConnect'; 
import vaultModel from '@/server/models/vaultModel';

export async function GET() {
    try {
        await connectDB(); 

        const allVault = await vaultModel.find().sort({ createdAt: -1 });

        return NextResponse.json({
            message: 'All Products retrieved successfully',
            success: true,
            error: false,
            data: allVault,
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            message: error.message || 'Internal Server Error',
            success: false,
            error: true,
        }, { status: 500 });
    }
}
