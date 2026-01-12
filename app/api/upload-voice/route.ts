import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/config/cloudinary';
import { authMiddleware } from '@/middleware/auth.middleware';
export async function POST(request: NextRequest) {
    try {
        const { error } = await authMiddleware(request);
        if (error) return error;
        const formData = await request.formData();
        const file = formData.get('file') as Blob | null;
        if (!file) {
            return NextResponse.json({ success: false, message: 'No voice blob provided' }, { status: 400 });
        }
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadAudio = () =>
            new Promise<any>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: 'video', folder: 'voices' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(buffer);
            });
        const uploadedResult = await uploadAudio();
        return NextResponse.json({
            success: true,
            message: 'Voice uploaded successfully',
            voiceUrl: uploadedResult.secure_url,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `Fatal Error: ${error instanceof Error ? error.message : error}`,
        }, { status: 500 });
    }
}