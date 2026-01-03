import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, { params }: { params: { verificationtoken: string } }) {
    try {
        const verificationToken: string = params.verificationtoken;
        const isUserFound: boolean = await prisma.user.findFirst({
            where: {
                verificationToken,
                verificationTokenExpiresAt: {
                    gt: new Date(),
                },
            }
        }) ? true : false;
        if (!isUserFound) return NextResponse.json({
            success: false,
            message: `The link expired`,
        }, {
            status: 400
        });
        return NextResponse.json({
            success: true,
            message: `The link is correct`,
        }, {
            status: 200
        });
    } catch (error: unknown) {
        return NextResponse.json({
            error: `Fatal Error: ${error instanceof Error ? error.message : error}`,
            success: false,
        }, { status: 500 });
    }
}