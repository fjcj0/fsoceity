import { UserType } from "@/global";
import { NextResponse } from "next/server";
import { SignJWT } from 'jose';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
export const generateTokenAndSetCookie = async (
    response: NextResponse,
    user: UserType
): Promise<void> => {
    try {
        const token = await new SignJWT({ user })
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(JWT_SECRET);
        response.cookies.set({
            name: 'token',
            value: token,
            maxAge: 7 * 24 * 60 * 60,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
            path: '/',
        });
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
};