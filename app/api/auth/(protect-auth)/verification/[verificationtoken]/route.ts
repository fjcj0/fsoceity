import { prisma } from "@/app/lib/prisma";
import { blockAuthenticatedUser } from "@/middleware/user.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, context: { params: Promise<{ verificationtoken: string }> }) {
    try {
        const { verificationtoken } = await context.params;
        const block = await blockAuthenticatedUser(request);
        if (block) return block;
        const userExists = await prisma.user.findFirst({
            where: {
                verificationToken: verificationtoken,
                verificationTokenExpiresAt: { gt: new Date() },
            },
        });
        if (!userExists) {
            return NextResponse.json({ success: false, message: "The link expired" }, { status: 400 });
        }
        return NextResponse.json({ success: true, message: "The link is correct" }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}