import { signUpType } from "@/types/auth_types";
import crypto from "crypto";
import { prisma } from "@/app/lib/prisma";
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
    try {
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
        const code: string = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                verificationToken,
                verificationTokenExpiresAt,
                code,
            },
            select: {
                name: true,
                email: true,
                verificationToken: true,
                verificationTokenExpiresAt: true,
                code: true,
            },
        });
        return NextResponse.json(
            {
                message: "User has been created",
                verificationToken,
                success: true
            },
            {
                status: 200
            }
        );
    } catch (error: unknown) {
        return NextResponse.json(
            { error: `Fatal Error: ${error instanceof Error ? error.message : error}`, success: false },
            { status: 500 }
        );
    }
}