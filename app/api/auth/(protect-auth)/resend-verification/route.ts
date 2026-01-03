import { prisma } from "@/app/lib/prisma";
import { NumericString } from "@/global";
import { blockAuthenticatedUser } from "@/middleware/user.middleware";
import { sendCodeHtml } from "@/template/email/verification-code/SendCode";
import { sendEmail } from "@/utils/sendEmail";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const block = await blockAuthenticatedUser(request);
        if (block) return block;
        const { verificationToken } = await request.json() as { verificationToken: string };
        const isUserFound = await prisma.user.findFirst({
            where: { verificationToken }
        });
        if (!isUserFound) {
            return NextResponse.json({
                error: `No session for code`,
                success: false,
            }, { status: 404 });
        }
        const now: Date = new Date();
        if (isUserFound.lastVerificationSentAt && now < isUserFound.lastVerificationSentAt) {
            return NextResponse.json({
                error: `Forbidden: you can't resend code yet, please wait 30 seconds`,
                success: false,
            }, { status: 403 });
        }
        const code: NumericString = Math.floor(100000 + Math.random() * 900000).toString() as NumericString;
        const nextAvailableSend: Date = new Date(now.getTime() + 30_000);
        await prisma.user.update({
            where: { id: isUserFound.id },
            data: {
                code,
                lastVerificationSentAt: nextAvailableSend
            }
        });
        await sendEmail({
            from: process.env.EMAIL_DOMAIN!,
            to: isUserFound.email,
            subject: 'Send Verification code from Fsoceity',
            html: sendCodeHtml(code)
        });
        return NextResponse.json({
            message: `The code was resent to your email successfully, check it`,
            success: true,
        }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({
            error: `Fatal Error: ${error instanceof Error ? error.message : error}`,
            success: false
        }, { status: 500 });
    }
}