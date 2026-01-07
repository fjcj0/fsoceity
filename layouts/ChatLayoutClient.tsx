"use client";
import { ReactNode, useEffect } from "react";
import Slider from "@/components/Slider";
import { links, links_chat } from "@/constants/data";
import Header from "@/components/Header";
import SliderMobile from "@/components/SliderMobile";
import useHeaderStore from "@/store/HeaderStore";
import useAuthStore from "@/store/AuthStore";
const ChatLayoutClient = ({ children }: { children: ReactNode }) => {
    const { isHeaderSlideOpen } = useHeaderStore();
    const { user } = useAuthStore();
    return (
        <main className="h-screen w-screen flex bg-[#0f0f0f] text-white">
            <div className={`fixed w-[15rem] ${!isHeaderSlideOpen && ' translate-x-72'} p-3 right-0 min-h-screen z-50 bg-[#242424] md:hidden duration-400 transition-all ease-in-out`}>
                <SliderMobile />
            </div>
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