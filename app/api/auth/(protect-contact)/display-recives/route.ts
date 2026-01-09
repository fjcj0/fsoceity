import { prisma } from "@/app/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const { error, user } = await authMiddleware(request);
        if (error) return error;
        const recives = await prisma.friendRequest.findMany({
            where: {
                receiverId: user.id
            },
            select: {
                receiver: {
                    select: {
                        id: true,
                        name: true,
                        profilePicture: true,
                        createdAt: true
                    }
                }
            }
        });
        return NextResponse.json({
            recives,
            success: true
        }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({
            error: `Fatal Error: ${error instanceof Error ? error.message : error}`,
            success: false
        }, { status: 500 });
    }
}