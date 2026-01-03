import { Resend } from 'resend';
import React from 'react';
export const sendEmail = async ({ from, to, subject, react }: { from: string; to: string; subject: string; react: React.ReactElement; }) => {
    try {
        const resend = new Resend(process.env.API_KEY_EMAIL);
        await resend.emails.send({ from, to, subject, react });
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
};
