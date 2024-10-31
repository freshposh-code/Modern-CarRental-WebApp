import { NextResponse } from 'next/server';
import { connectDB } from '@/server/MongooseConnect'; 
import vaultModel from '@/server/models/vaultModel';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();

        const { id } = params;
        const updateData = await req.json();

        const updatedVault = await vaultModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedVault) {
            return NextResponse.json({
                message: 'Inventory not found',
                success: false,
                error: true,
            }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Vault updated successfully',
            data: updatedVault,
            success: true,
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            message: error.message || 'Internal Server Error',
            error: true,
            success: false,
        }, { status: 500 });
    }
}
