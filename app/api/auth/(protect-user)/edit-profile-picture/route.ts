import { prisma } from "@/app/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const { imageUrl } = await request.json() as {
            imageUrl: string,
        };
        const { error, user } = await authMiddleware(request);
        if (error) return error;
        if (!imageUrl) return NextResponse.json({
            error: `Error image url is required field`,
            success: false,
        }, { status: 400 });
        const new_user_data = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                profilePicture: imageUrl
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