import { prisma } from "@/app/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const { error, user } = await authMiddleware(request);
        if (error) return error;
        const { name = "", filter = "Notsent" } = Object.fromEntries(request.nextUrl.searchParams.entries());

    } catch (error: unknown) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : error, success: false },
            { status: 500 }
        );
    }
}