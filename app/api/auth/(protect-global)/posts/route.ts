import { prisma } from "@/app/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const { user, error } = await authMiddleware(request);
        if (error || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const searchParams = request.nextUrl.searchParams;
        const limit = Number(searchParams.get("limit")) || 5;
        const cursor = searchParams.get("cursor");
        const posts = await prisma.post.findMany({
            take: limit + 1,
            ...(cursor && {
                cursor: {
                    id: cursor,
                },
                skip: 1,
            }),
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                authorId: true,
                content: true,
                image: true,
                createdAt: true,
                likes: {
                    select: {
                        userId: true,
                    },
                },
                bookmarks: true,
                author: {
                    select: {
                        name: true,
                        profilePicture: true,
                    },
                },
            },
        });
        const hasMore = posts.length > limit;
        if (hasMore) posts.pop();
        return NextResponse.json(
            {
                posts,
                nextCursor: hasMore ? posts[posts.length - 1].id : null,
                success: true,
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        return NextResponse.json(
            {
                error: `Fatal Error: ${error instanceof Error ? error.message : error
                    }`,
                success: false,
            },
            { status: 500 }
        );
    }
}