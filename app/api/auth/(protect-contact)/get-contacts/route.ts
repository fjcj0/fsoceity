import { prisma } from "@/app/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const { user, error } = await authMiddleware(request);
        if (error) return error;
        const contacts = await prisma.user.findUnique({
            where: {
                id: user.id
            },
            select: {
                contacts: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                profilePicture: true,
                            }
                        }
                    }
                }
            }
        });
        return NextResponse.json({
            contacts,
            success: true
        }, {
            status: 200
        });
    } catch (error: unknown) {
        return NextResponse.json({
            error: `Fatal Error: ${error instanceof Error ? error.message : error}`,
            success: false
        }, { status: 500 });
    }
}