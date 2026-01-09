import { prisma } from "@/app/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const { error, user } = await authMiddleware(request);
        if (error) return error;
        const pending_requests = await prisma.friendRequest.findMany({
            where: {
                status: 'PENDING',
                senderId: user.id
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
        const not_sent = {};
        const accepted_request = await prisma.friendRequest.findMany({
            where: {
                senderId: user.id,
                status: 'ACCEPTED'
            },
            select: {
                receiver: {
                    select: {
                        id: true,
                        name: true,
                        createdAt: true,
                        profilePicture: true
                    }
                }
            }
        });
        return NextResponse.json({
            pending_requests,
            not_sent,
            accepted_request
        });
    } catch (error: unknown) {
        return NextResponse.json({
            error: `Fatal Error: ${error instanceof Error ? error.message : error}`,
            success: false
        }, { status: 500 });
    }
}