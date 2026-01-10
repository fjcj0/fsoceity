import { prisma } from "@/app/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const { error, user } = await authMiddleware(request);
        if (error) return error;
        const { name = "", filter = "Notsent" } = Object.fromEntries(
            request.nextUrl.searchParams.entries()
        );
        const currentUserId = user.id;
        const sentRequests = await prisma.friendRequest.findMany({
            where: { senderId: currentUserId },
            select: { receiverId: true, status: true }
        });
        const contacts = await prisma.contact.findMany({
            where: { userId: currentUserId },
            select: { friendId: true }
        });
        const sentRequestMap = new Map(
            sentRequests.map(req => [req.receiverId, req.status])
        );
        const contactIds = contacts.map(c => c.friendId);
        let users = await prisma.user.findMany({
            where: {
                id: { not: currentUserId },
                name: { contains: name, mode: "insensitive" }
            },
            select: {
                id: true,
                name: true,
                profilePicture: true,
                createdAt: true
            }
        });
        users = users.filter(u => {
            const requestStatus = sentRequestMap.get(u.id);
            const isContact = contactIds.includes(u.id);
            if (filter === "Notsent") {
                return !requestStatus && !isContact;
            }
            if (filter === "Pending") {
                return requestStatus === "PENDING";
            }
            if (filter === "Accepted") {
                return isContact;
            }
            return false;
        });
        const response = users.map(u => ({
            ...u,
            isSent: sentRequestMap.has(u.id),
            isPending: sentRequestMap.get(u.id) === "PENDING",
            isAccepted: contactIds.includes(u.id)
        }));
        return NextResponse.json({
            success: true,
            contacts: response
        });
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, error: `Fatal Error: ${error instanceof Error ? error.message : error}` },
            { status: 500 }
        );
    }
}