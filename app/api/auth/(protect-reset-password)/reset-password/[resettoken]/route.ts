import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
    request: NextRequest,
    { params }: { params: { resettoken: string } }
) {
    try {
        const { resettoken } = params;
        const isUserFound = await prisma.user.findFirst({
            where: {
                resetToken: resettoken,
                resetTokenExpiresAt: {
                    gt: new Date(),
                },
            },
        })
            ? true
            : false;
        if (!isUserFound) {
            return NextResponse.json(
                { success: false, message: "The link expired" },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { success: true, message: "The link is correct" },
            { status: 200 }
        );
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