import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
    request: NextRequest,
    context: { params: { resettoken: string } }
) {
    try {
        const { resettoken } = context.params;
        const userExists = await prisma.user.findFirst({
            where: {
                resetToken: resettoken,
                resetTokenExpiresAt: {
                    gt: new Date(),
                },
            },
        });
        if (!userExists) {
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
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}