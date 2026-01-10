import { prisma } from "@/app/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const { user, error } = await authMiddleware(request);
        if (error) return error;
        const { receiverId } = await request.json() as { receiverId: string };
        await prisma.friendRequest.create({
            data: {
                senderId: user.id,
                receiverId
            }
        });
        return NextResponse.json({
            message: `Your request has been sent successfully`,
            success: true,
        }, { status: 201 });
    } catch (error: unknown) {
        return NextResponse.json({
            success: false,
            error: `Fatal Error: ${error instanceof Error ? error.message : error}`,
        }, { status: 500 });
    }
}