import { prisma } from "@/app/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const { content, image } = await request.json() as {
            content: string,
            image: string
        };
        const { user, error } = await authMiddleware(request);
        if (error) return error;
        if (!image || !content) return NextResponse.json({
            error: `Error all fields are required`,
            success: false,
        }, { status: 400 });
        const post = await prisma.post.create({
            data: {
                image,
                content,
                authorId: user.id
            },
            select: {
                authorId: true,
                image: true,
                likes: true,
                bookmarks: true
            },
        });
        return NextResponse.json({
            success: true,
            post,
            message: `Post uploaded successfully`
        }, { status: 201 });
    } catch (error: unknown) {
        return NextResponse.json({
            error: `Fatal Error: ${error instanceof Error ? error.message : error}`,
            success: false
        }, { status: 500 });
    }
}