import { prisma } from "@/app/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const { error, user } = await authMiddleware(request);
        if (error) return error;
        const usersNotSentRequest = await prisma.user.findMany({
            where: {
                id: {
                    not: user.id,
                    notIn: (
                        await prisma.contact.findMany({
                            where: { senderId: user.id },
                            select: { receiveId: true },
                        })
                    ).map(c => c.receiveId),
                },
            },
            select: {
                id: true,
                name: true,
                email: true,
                profilePicture: true,
                createdAt: true
            },
        });
        const usersSentRequests = await prisma.contact.findMany({
            where: {
                senderId: user.id,
                status: "pending",
            },
            select: {
                receiveId: true,
                receiver: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        profilePicture: true,
                        createdAt: true
                    },
                },
            },
        });
        const usersAcceptedRequests = await prisma.contact.findMany({
            where: {
                senderId: user.id,
                status: "accepted",
            },
            select: {
                receiveId: true,
                receiver: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        profilePicture: true,
                        createdAt: true
                    },
                },
            },
        });
        return NextResponse.json({
            usersNotSentRequest,
            usersSentRequests,
            usersAcceptedRequests,
            success: true
        }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({
            error: `Fatal Error: ${error instanceof Error ? error.message : error}`,
            success: false
        }, { status: 500 });
    }
}