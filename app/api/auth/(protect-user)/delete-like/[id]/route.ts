import { prisma } from "@/app/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const { error, user } = await authMiddleware(request);
        if (error) return error;
        await prisma.like.delete({
            where: {
                userId: user.id,
                id,
            }
        });
        return NextResponse.json({
            message: `Deleted successfully`,
            success: true
        }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({
            error: `Fatal Error: ${error instanceof Error ? error.message : error}`,
            success: false,
        }, { status: 500 });
    }
}