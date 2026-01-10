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
                senderId,
                receiverId: user.id,
                status: 'PENDING',
            },
        });
        if (!cur_request) {
            return NextResponse.json(
                { success: false, error: "No pending friend request found" },
                { status: 404 }
            );
        }
        await prisma.friendRequest.update({
            where: { id: cur_request.id },
            data: { status: 'ACCEPTED' },
        });
        await prisma.contact.createMany({
            data: [
                { userId: user.id, friendId: senderId },
                { userId: senderId, friendId: user.id },
            ],
            skipDuplicates: true,
        });
        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        return NextResponse.json(
            {
                success: false,
                error: `Fatal Error: ${error instanceof Error ? error.message : error}`,
            },
            { status: 500 }
        );
    }
}