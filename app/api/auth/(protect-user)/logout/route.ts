import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const response: NextResponse = NextResponse.json({
            success: true,
            message: `User logged out successfully`
        }, { status: 200 });
        response.cookies.delete('token');
        return response;
    } catch (error: unknown) {
        return NextResponse.json({
            error: `Fatal Error: ${error instanceof Error ? error.message : error}`
        }, { status: 500 });
    }
}