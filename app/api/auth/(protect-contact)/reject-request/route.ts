import { prisma } from "@/app/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const { user, error } = await authMiddleware(request);
        if (error) return error;
        const { senderId } = (await request.json()) as { senderId: string };
        const cur_request = await prisma.friendRequest.findFirst({
            where: {
                senderId: senderId,
                receiverId: user.id,
                status: 'PENDING',
            },
        });
        if (!cur_request) {
            return NextResponse.json(
                { success: false, message: 'No pending request found' },
                { status: 404 }
            );
        }
        await prisma.friendRequest.delete({
            where: {
                id: cur_request.id,
            },
        });
        return NextResponse.json({
            success: true,
            message: 'Friend request cancelled successfully',
        });
    } catch (error: unknown) {
        return NextResponse.json(
            {
                success: false,
                error: `Fatal Error: ${error instanceof Error ? error.message : error
                    }`,
            },
            { status: 500 }
        );
    }
}