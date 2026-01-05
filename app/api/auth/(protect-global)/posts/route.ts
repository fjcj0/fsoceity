import { prisma } from "@/app/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page: number = Number(searchParams.get("page")) || 1;
        const limit: number = Number(searchParams.get("limit")) || 10;
        const safePage: number = page < 1 ? 1 : page;
        const safeLimit: number = limit < 1 ? 10 : limit;
        const offset: number = (safePage - 1) * safeLimit;
        const { user, error } = await authMiddleware(request);
        if (error || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const posts = await prisma.post.findMany({
            take: safeLimit,
            skip: offset,
            orderBy: {
                createdAt: "desc",
            },
            select: {
                authorId: true,
                content: true,
                image: true,
                likes: true,
                bookmarks: true
            }
        });
        return NextResponse.json({
            posts,
            success: true
        }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({
            error: `Fatal Error: ${error instanceof Error ? error.message : error}`,
            success: false
        },
            { status: 500 }
        );
    }
}