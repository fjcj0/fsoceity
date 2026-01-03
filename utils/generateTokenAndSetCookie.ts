import { UserType } from "@/global";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
export const generateTokenAndSetCookie = async (response: NextResponse, user: UserType): Promise<void> => {
    try {
        const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
            expiresIn: "7d",
        });
        response.cookies.set({
            name: "jwt",
            value: token,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
        });
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}