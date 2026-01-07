import { prisma } from "@/app/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const { error, user } = await authMiddleware(request);
        if (error) return error;
        const requestsSentToMe = await prisma.contact.findMany({
            where: {
                receiveId: user.id,
            },
            select: {
                senderId: true,
                status: true,
                sender: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        profilePicture: true,
                        createdAt: true,
                    },
                },
            },
        });
        const incomingRequests = requestsSentToMe.map(r => ({
            id: r.sender.id,
            name: r.sender.name,
            email: r.sender.email,
            profilePicture: r.sender.profilePicture,
            createdAt: r.sender.createdAt,
            status: r.status,
        }));
        return NextResponse.json({
            incomingRequests,
            success: true,
        }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({
            error: `Fatal Error: ${error instanceof Error ? error.message : error}`,
            success: false,
        }, { status: 500 });
    }
}