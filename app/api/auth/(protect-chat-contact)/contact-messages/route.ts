import { prisma } from "@/app/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const { user, error } = await authMiddleware(request);
        if (error) return error;
        const { searchParams } = new URL(request.url);
        const receiverId = searchParams.get("receiverId");
        if (!receiverId) {
            return NextResponse.json(
                { error: "receiverId is required", success: false },
                { status: 400 }
            );
        }
        const isContact = await prisma.contact.findFirst({
            where: {
                OR: [
                    { userId: user.id, friendId: receiverId },
                    { userId: receiverId, friendId: user.id }
                ]
            }
        });
        if (!isContact) {
            return NextResponse.json(
                { error: "You are not allowed to view these messages", success: false },
                { status: 403 }
            );
        }
        const messages = await prisma.contactMessage.findMany({
            where: {
                OR: [
                    { senderId: user.id, receiverId },
                    { senderId: receiverId, receiverId: user.id }
                ]
            },
            orderBy: {
                createdAt: "asc"
            },
            select: {
                id: true,
                content: true,
                image: true,
                createdAt: true,
                sender: {
                    select: {
                        id: true,
                        name: true,
                        profilePicture: true
                    }
                },
                receiver: {
                    select: {
                        id: true,
                        name: true,
                        profilePicture: true
                    }
                }
            }
        });
        return NextResponse.json(
            { messages, success: true },
            { status: 200 }
        );
    } catch (error: unknown) {
        return NextResponse.json(
            {
                error: `Fatal Error: ${error instanceof Error ? error.message : error
                    }`,
                success: false
            },
            { status: 500 }
        );
    }
}