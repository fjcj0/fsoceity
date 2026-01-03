import { prisma } from "@/app/lib/prisma";
import { signInType } from "@/types/auth_types";
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";
import crypto from 'crypto';
export async function POST(request: Request) {
    try {
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
        const code: string = Math.floor(100000 + Math.random() * 900000).toString();
        await prisma.user.update({
            where: { email },
            data: {
                verificationToken,
                verificationTokenExpiresAt,
                code: code
            },
        });
        return NextResponse.json({
            message: `vaild credentials`,
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