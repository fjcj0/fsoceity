import { prisma } from "@/app/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const { user, error } = await authMiddleware(request);
        if (error) return error;
        const { friendId } = (await request.json()) as { friendId: string };
        if (friendId === user.id) {
            return NextResponse.json(
                { success: false, message: "You cannot remove yourself" },
                { status: 400 }
            );
        }
        const [contactsResult] = await prisma.$transaction([
            prisma.contact.deleteMany({
                where: {
                    OR: [
                        { userId: user.id, friendId },
                        { userId: friendId, friendId: user.id },
                    ],
                },
            }),
            prisma.friendRequest.deleteMany({
                where: {
                    OR: [
                        { senderId: user.id, receiverId: friendId },
                        { senderId: friendId, receiverId: user.id },
                    ],
                },
            }),
        ]);
        if (contactsResult.count === 0) {
            return NextResponse.json(
                { success: false, message: "Contact not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({
            success: true,
            message: "Contact and friend request removed successfully",
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