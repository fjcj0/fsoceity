"use client";
import { ReactNode } from "react";
import Slider from "@/components/Slider";
import { links, links_chat } from "@/constants/data";
import Header from "@/components/Header";
const ChatLayoutClient = ({ children }: { children: ReactNode }) => {
    return (
        <main className="h-screen w-screen flex bg-[#0f0f0f] text-white">
            <aside className="w-[6rem] flex flex-col items-center justify-center gap-y-10 p-3 max-md:hidden">
                <Slider links={links} />
                <Slider links={links_chat} />
            </aside>
            <section className="flex-1 overflow-y-auto p-3 overflow-x-hidden">
                <Header />
                {children}
            </section>
        </main>
    );
};
export default ChatLayoutClient;