import { prisma } from "@/app/lib/prisma";
import { resetType } from "@/types/auth_types";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const { newPassword, confirm_password, resetToken } = await request.json() as resetType;
        if (!newPassword || !confirm_password || !resetToken) {
            return NextResponse.json({
                error: "All fields are required",
                success: false
            }, { status: 400 });
        }
        if (newPassword !== confirm_password) {
            return NextResponse.json({
                error: "Password and confirm password are not the same",
                success: false
            }, {
                status: 400
            });
        }
        if (newPassword.length <= 6) {
            return NextResponse.json({
                error: "Password length must be larger than 6",
                success: false
            }, { status: 400 });
        }
        const user = await prisma.user.findFirst({
            where: {
                resetToken,
                resetTokenExpiresAt: {
                    gte: new Date()
                }
            }
        });
        if (!user) {
            return NextResponse.json({
                error: "Invalid or expired reset token",
                success: false
            }, { status: 400 });
        }
        const hashedPassword: string = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiresAt: null,
            }
        });
        return NextResponse.json({
            success: true,
            message: "Password updated successfully"
        }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({
            error: `Fatal Error: ${error instanceof Error ? error.message : error}`,
            success: false
        }, { status: 500 });
    }
}