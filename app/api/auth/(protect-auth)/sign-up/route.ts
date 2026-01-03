import { signUpType } from "@/types/auth_types";
import crypto from "crypto";
import { prisma } from "@/app/lib/prisma";
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { blockAuthenticatedUser } from "@/middleware/user.middleware";
import { NumericString } from "@/global";
import { sendEmail } from "@/utils/sendEmail";
import { sendCodeHtml } from "@/template/email/verification-code/SendCode";
export async function POST(request: NextRequest) {
    try {
        const block = await blockAuthenticatedUser(request);
        if (block) return block;
        const { name, email, password, confirm_password } = await request.json() as signUpType;
        if (!name || !email || !password || !confirm_password) {
            return NextResponse.json(
                { error: "Error: all fields are required", success: false },
                { status: 400 }
            );
        }
        if (password.length <= 6) {
            return NextResponse.json(
                { error: "Error: password length must be larger than 6", success: false },
                { status: 400 }
            );
        }
        if (password !== confirm_password) {
            return NextResponse.json(
                { error: "Error: password and confirm password are not equal", success: false },
                { status: 400 }
            );
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Error: invalid email address", success: false },
                { status: 400 }
            );
        }
        const verificationToken: string = crypto.randomBytes(32).toString("hex");
        const verificationTokenExpiresAt: Date = new Date(Date.now() + 60 * 60 * 1000);
        const code: NumericString = Math.floor(100000 + Math.random() * 900000).toString() as NumericString;
        const hashedPassword: string = await bcrypt.hash(password, 10);
        const now: Date = new Date();
        const nextAvailableSend: Date = new Date(now.getTime() + 30_000);
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                verificationToken,
                verificationTokenExpiresAt,
                code,
                lastVerificationSentAt: nextAvailableSend
            }
        });
        await sendEmail({
            from: process.env.EMAIL_DOMAIN!,
            to: email,
            subject: 'Send Verification code from Fsoceity',
            html: sendCodeHtml(code)
        });
        return NextResponse.json(
            {
                message: "User has been created",
                verificationToken,
                success: true
            },
            {
                status: 203
            }
        );
    } catch (error: unknown) {
        return NextResponse.json(
            { error: `Fatal Error: ${error instanceof Error ? error.message : error}`, success: false },
            { status: 500 }
        );
    }
}