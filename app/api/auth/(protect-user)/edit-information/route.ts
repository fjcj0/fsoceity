import { prisma } from "@/app/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const { name, bio } = await request.json() as {
            name: string,
            bio: string
        };
        const { error, user } = await authMiddleware(request);
        if (error) return error;
        if (!name && !bio) return NextResponse.json({
            error: `At least one field...`,
            success: false
        }, { status: 400 });
        if (name) {
            await prisma.user.update({
                data: {
                    name,
                },
                where: {
                    id: user.id
                }
            });
        }
        if (bio) {
            await prisma.user.update({
                data: {
                    bio
                },
                where: {
                    id: user.id
                }
            });
        }
        const new_user_data = await prisma.user.findUnique({
            where: {
                id: user.id
            },
            select: {
                id: true,
                name: true,
                profilePicture: true,
                bio: true
            }
        });
        return NextResponse.json({
            success: true,
            message: `User data updated successfully`,
            user: new_user_data
        }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({
            error: `Fatal Error: ${error instanceof Error ? error.message : error}`,
            success: false,
        }, { status: 500 });
    }
}