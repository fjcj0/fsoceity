import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { UserType } from '@/global';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
export async function blockAuthenticatedUser(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    if (!token) return null;
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        const user = payload.user as UserType;
        if (user) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'You are already logged in'
                },
                {
                    status: 403
                }
            );
        }
        return null;
    } catch (error: unknown) {
        throw new Error(`Fatal Error: ${error instanceof Error ? error.message : error}`)
    }
}