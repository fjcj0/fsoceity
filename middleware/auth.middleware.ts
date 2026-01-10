import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { UserType } from '@/global';
import { prisma } from '@/app/lib/prisma';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
export async function authMiddleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    if (!token) {
        return {
            error: NextResponse.json(
                { success: false, error: 'No token' },
                { status: 403 }
            ),
        };
    }
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        const user = payload.user as UserType | undefined;
        if (!user?.id) {
            return {
                error: NextResponse.json(
                    { success: false, error: 'Unauthorized or token expired' },
                    { status: 401 }
                ),
            };
        }
        const dbUser = await prisma.user.findUnique({
            where: {
                id: user.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                bio: true,
                profilePicture: true
            }
        });
        if (!dbUser) {
            return {
                error: NextResponse.json(
                    { success: false, error: 'User not found' },
                    { status: 401 }
                ),
            };
        }
        return {
            user: dbUser,
        };
    } catch (error) {
        return {
            error: NextResponse.json(
                {
                    success: false,
                    error: `Fatal Error: ${error instanceof Error ? error.message : error
                        }`,
                },
                { status: 500 }
            ),
        };
    }
}