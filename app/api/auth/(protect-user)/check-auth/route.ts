import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/auth.middleware';
export async function GET(request: NextRequest) {
    const { user, error } = await authMiddleware(request);
    if (error) return error;
    return NextResponse.json(
        {
            message: 'User Authorized Successfully',
            success: true,
            user,
        },
        { status: 200 }
    );
}