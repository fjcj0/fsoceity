import { prisma } from "@/app/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const { error, user } = await authMiddleware(request);
        if (error) return error;
        await prisma.bookmark.delete({
            where: {
                id,
                userId: user.id
            }
        });
        return NextResponse.json({
            success: true,
            message: `Bookmarked post delted successfully`,
        }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({
            error: `Fatal Error: ${error instanceof Error ? error.message : error}`,
            success: false
        }, { status: 500 });
    }
}