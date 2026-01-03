import { prisma } from "@/app/lib/prisma";
import { signInType } from "@/types/auth_types";
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import { blockAuthenticatedUser } from "@/middleware/user.middleware";
import { sendEmail } from "@/utils/sendEmail";
import SendCode from "@/template/email/verification-code/SendCode";
import { NumericString } from "@/global";
export async function POST(request: NextRequest) {
    try {
        const block = await blockAuthenticatedUser(request);
        if (block) return block;
        const { email, password, } = await request.json() as signInType;
        if (!email || !password) {
            return new Response(JSON.stringify({ error: "Error: all fields are required", success: false }), { status: 400 });
        }
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                name: true,
                profilePicture: true,
                bio: true,
                password: true
            }
        });
        if (!user) return NextResponse.json({
            error: `Invalid credential`
        }, { status: 403 });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return NextResponse.json(
            { error: "Invalid credentials", success: false },
            { status: 403 });
        const verificationToken: string = crypto.randomBytes(32).toString("hex");
        const verificationTokenExpiresAt: Date = new Date(Date.now() + 60 * 60 * 1000);
        const code: NumericString = Math.floor(100000 + Math.random() * 900000).toString() as NumericString;
        await prisma.user.update({
            where: {
                email
            },
            data: {
                verificationToken,
                verificationTokenExpiresAt,
                code: code
            },
        });
        await sendEmail({
            from: process.env.EMAIL_DOMAIN!,
            to: email,
            subject: 'Send Verification code from Fsoceity',
            react: SendCode({ code: code }),
        });
        return NextResponse.json({
            message: `The code has been sent to ${email} check your email`,
            verificationToken,
            success: true
        }, {
            status: 200
        });
    } catch (error: unknown) {
        return new Response(JSON.stringify({
            error: `Fatal Error: ${error instanceof Error ? error.message : error}`,
            success: false,
        }), { status: 500 });
    }
}