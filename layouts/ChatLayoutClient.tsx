"use client";
import { ReactNode } from "react";
import Slider from "@/components/Slider";
import { links } from "@/constants/data";
const ChatLayoutClient = ({ children }: { children: ReactNode }) => {
    return (
        <main className="h-screen w-screen flex bg-[#0f0f0f] text-white">
            <aside className="w-[6rem] flex flex-col items-center justify-center p-3">
                <Slider links={links} />
            </aside>
            <section className="flex-1 overflow-y-auto p-6">{children}</section>
        </main>
    );
};
export default ChatLayoutClient;