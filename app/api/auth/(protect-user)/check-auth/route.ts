import { prisma } from '@/app/lib/prisma';
import { UserType } from '@/global';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest) {
    try {
        const userHeader = request.headers.get('x-user');
        const user: UserType | null = userHeader ? JSON.parse(userHeader) : null;
        if (!user) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }
        return await prisma.user.findUnique({
            where: {
                id: user.id
            }
        }) ? NextResponse.json(
            {
                message: 'User Authorized Successfully',
                success: true,
                user,
            },
            { status: 200 }
        ) : NextResponse.json(
            { success: false, error: 'Unauthorized' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: `Fatal Error: ${error instanceof Error ? error.message : error}`,
            },
            { status: 500 }
        );
    }
}