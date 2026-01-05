import { prisma } from "@/app/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    const { user, error } = await authMiddleware(req);
    if (error || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 5;
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    try {
        const posts = await prisma.post.findMany({
            take: limit + 1,
            cursor: cursor ? { id: cursor } : undefined,
            skip: cursor ? 1 : 0,
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                content: true,
                image: true,
                createdAt: true,
                likes: { select: { userId: true } },
                bookmarks: true,
                author: { select: { name: true, profilePicture: true } },
            },
        });
        const hasMore = posts.length > limit;
        const nextCursor = hasMore ? posts[limit - 1].id : null;
        if (hasMore) posts.pop();
        return NextResponse.json({ posts, nextCursor, success: true });
    } catch (err: unknown) {
        return NextResponse.json({
            error: err instanceof Error ? err.message : "Unknown Error",
            success: false,
        }, { status: 500 });
    }
}