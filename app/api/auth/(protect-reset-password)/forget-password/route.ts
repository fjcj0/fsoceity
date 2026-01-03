import { prisma } from "@/app/lib/prisma";
import { forgetPassType } from "@/types/auth_types";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import { sendEmail } from "@/utils/sendEmail";
import SendLink from "@/template/email/reset-password/SendLink";
export default async function POST(request: NextRequest) {
    try {
        const { email } = await request.json() as forgetPassType;
        if (!email) return NextResponse.json({
            error: `Error email field is required`,
            success: false
        }, { status: 400 });
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        });
        if (!user) return NextResponse.json({
            error: `Email not found`,
            success: false
        }, { status: 404 });
        const resetToken: string = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiresAt: Date = new Date(Date.now() + 60 * 60 * 1000);
        await prisma.user.update({
            where: {
                email
            },
            data: {
                resetToken,
                resetTokenExpiresAt
            }
        });
        await sendEmail({
            from: process.env.EMAIL_DOMAIN!,
            to: email,
            subject: 'Reset Password Link From Fsoceity',
            react: SendLink({ link: `${process.env.SERVER_URL!}/auth/reset-password/${resetToken}` })
        })
        return NextResponse.json({
            success: true,
            message: `The link sent to your email, check your email`,
        }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({
            success: false,
            error: `Fatal Error: ${error instanceof Error ? error.message : error}`
        }, { status: 500 });
    }
}