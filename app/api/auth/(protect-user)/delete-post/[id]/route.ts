import { prisma } from "@/app/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const { error, user } = await authMiddleware(request);
        if (error) return error;
        await prisma.like.deleteMany({
            where: {
                postId: id
            }
        });
        await prisma.bookmark.deleteMany({
            where: {
                postId: id
            }
        });
        await prisma.post.delete({
            where: {
                id,
                authorId: user.id
            }
        });
        return NextResponse.json({
            message: 'Delete has done successfully',
            succcess: true
        }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({
            success: false,
            error: `Fatal Error: ${error instanceof Error ? error.message : error}`
        }, { status: 500 });
    }
}