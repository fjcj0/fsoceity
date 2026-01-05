import { prisma } from "@/app/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const { user, error } = await authMiddleware(request);
        if (error) return error;
        const user_information = await prisma.user.findUnique({
            where: {
                id: user.id,
            },
            select: {
                posts: true,
                likes: true,
                bookmarks: true
            }
        });
        return NextResponse.json({
            success: true,
            message: 'User get all his information',
            user_information
        });
    } catch (error: unknown) {
        return NextResponse.json({
            error: `Fatal Error: ${error instanceof Error ? error.message : error}`,
            success: false
        }, { status: 500 });
    }
}