import { prisma } from "@/app/lib/prisma";
import { UserType } from "@/global";
import { blockAuthenticatedUser } from "@/middleware/user.middleware";
import { verificationType } from "@/types/auth_types";
import { generateTokenAndSetCookie } from "@/utils/generateTokenAndSetCookie";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const block = await blockAuthenticatedUser(request);
        if (block) return block;
        const { verificationToken, code } = await request.json() as verificationType;
        if (!verificationToken || !code) return NextResponse.json({
            error: `Error filed is missing`,
            success: false
        }, { status: 400 });
        const user = await prisma.user.findFirst({
            where: {
                verificationToken,
                verificationTokenExpiresAt: {
                    gt: new Date()
                },
                code
            },
            select: {
                id: true,
                name: true,
                email: true,
                profilePicture: true,
                bio: true
            }
        }) as UserType;
        if (!user) return NextResponse.json({
            success: false,
            error: `Error code is invaild or expiration time is end`
        }, { status: 400 });
        await prisma.user.update({
            where: { id: user.id },
            data: {
                verificationToken: null,
                verificationTokenExpiresAt: null,
                resetToken: null,
                resetTokenExpiresAt: null
            },
        });
        const response: NextResponse = NextResponse.json({
            message: 'Login Successfully',
            success: true,
        }, {
            status: 200
        });
        await generateTokenAndSetCookie(response, user);
        return response;
    }
    catch (error: unknown) {
        return NextResponse.json(
            { error: `Fatal Error: ${error instanceof Error ? error.message : error}`, success: false },
            { status: 500 }
        );
    }
}