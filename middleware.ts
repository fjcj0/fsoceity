import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { UserType } from '@/global';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ success: false, error: 'No token' }, { status: 403 });
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        const user = payload.user as UserType;
        if (!user) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized or exipration time is end' },
                { status: 401 }
            );
        }
        const headers = new Headers(request.headers);
        headers.set('x-user', JSON.stringify(user));
        return NextResponse.next({ request: { headers } });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error: `Fatal Error: ${error instanceof Error ? error.message : error}` }, { status: 500 });
    }
}
export const config = {
    matcher: [
        '/api/auth/check-auth',
        '/api/user/:path*',
    ],
};