import { NextRequest, NextResponse } from 'next/server'
import cloudinary from '@/config/cloudinary'
import { authMiddleware } from '@/middleware/auth.middleware';
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const { error } = await authMiddleware(request);
        if (error) return error;
        const file = formData.get('file') as File | null;
        if (!file) {
            return NextResponse.json(
                { success: false, message: 'No image file provided' },
                { status: 400 }
            );
        }
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const b64 = buffer.toString('base64');
        const dataURI = `data:${file.type};base64,${b64}`;
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: 'uploads',
            resource_type: 'auto',
        });
        return NextResponse.json(
            {
                success: true,
                message: 'Image uploaded successfully',
                image: result.secure_url,
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        return NextResponse.json(
            {
                success: false,
                message: 'Error uploading image',
            },
            { status: 500 }
        );
    }
}