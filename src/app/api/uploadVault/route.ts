import { NextResponse } from 'next/server';
import { connectDB } from '@/server/MongooseConnect';  
import vaultModel from '@/server/models/vaultModel';

export async function POST(req: Request) {
    try {
        await connectDB(); 

        const productData = await req.json();  
        const newProduct = new vaultModel(productData); 
        const saveProduct = await newProduct.save(); 

        return NextResponse.json({
            message: 'uploaded successfully',
            success: true,
            data: saveProduct,
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({
            message: error.message || 'Internal Server Error',
            error: true,
            success: false,
        }, { status: 500 });
    }
}
