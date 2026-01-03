import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/utils/sendEmail";
import { sendLink } from "@/template/email/reset-password/SendLink";
export async function POST(request: NextRequest) {
    try {
        const { resetToken } = await request.json() as { resetToken: string };
        const isUserFound = await prisma.user.findFirst({
            where: { resetToken }
        });
        if (!isUserFound) {
            return NextResponse.json({
                error: `No session for reset token`,
                success: false,
            }, { status: 404 });
        }
        const now: Date = new Date();
        if (isUserFound.lastResetTokenSentAt && now < isUserFound.lastResetTokenSentAt) {
            return NextResponse.json({
                error: `Forbidden: you can't resend reset link yet, please wait 30 seconds`,
                success: false,
            }, { status: 403 });
        }
        const newResetToken: string = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiresAt: Date = new Date(Date.now() + 60 * 60 * 1000);
        const nextAvailableSend: Date = new Date(now.getTime() + 30_000);
        await prisma.user.update({
            where: { id: isUserFound.id },
            data: {
                resetToken: newResetToken,
                resetTokenExpiresAt,
                lastResetTokenSentAt: nextAvailableSend
            }
        });
        await sendEmail({
            from: process.env.EMAIL_DOMAIN!,
            to: isUserFound.email,
            subject: 'Reset your password',
            html: sendLink(`${process.env.SERVER_URL}/reset-password/${newResetToken}`)
        });
        return NextResponse.json({
            message: `Reset link was resent to your email successfully, check it`,
            success: true,
        }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({
            error: `Fatal Error: ${error instanceof Error ? error.message : error}`,
            success: false
        }, { status: 500 });
    }
}