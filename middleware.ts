import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { UserType } from './global';
const PUBLIC_ROUTES = [
    '/api/auth/forget-password',
    '/api/auth/reset-password',
];
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
        return NextResponse.next();
    }
    try {
        const token = request.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.json(
                { success: false, error: '403 Unauthorized' },
                { status: 403 }
            );
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as UserType;
        const response = NextResponse.next();
        response.headers.set('x-user', JSON.stringify(decoded));
        return response;
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: `Fatal Error: ${error instanceof Error ? error.message : error
                    }`,
            },
            { status: 500 }
        );
    }
}
export const config = {
    matcher: ['/api/auth/:path*'],
};