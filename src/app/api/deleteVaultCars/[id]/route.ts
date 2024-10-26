import vaultModel from '@/server/models/vaultModel';
import { connectDB } from '@/server/MongooseConnect';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();

        const { id } = params;

        if (!id) {
            return NextResponse.json(
                {
                    message: "ID is required to delete the car",
                    success: false,
                    error: true,
                },
                { status: 400 }
            );
        }

        const deletedCar = await vaultModel.findByIdAndDelete(id);

        if (!deletedCar) {
            return NextResponse.json(
                {
                    message: "Item not found",
                    success: false,
                    error: true,
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Deleted successfully",
            success: true,
            error: false,
            data: deletedCar,
        });

    } catch (err: any) {
        return NextResponse.json(
            {
                message: err.message || "Internal Server Error",
                success: false,
                error: true,
            },
            { status: 500 }
        );
    }
}
