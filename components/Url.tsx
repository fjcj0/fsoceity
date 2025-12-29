"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
const Url = ({
    icon: Icon,
    direction,
    isButton,
}: {
    icon: LucideIcon;
    direction?: string;
    isButton: boolean;
}) => {
    const pathname = usePathname();
    const isActive = direction ? pathname === direction : false;
    const content = (
        <div
            className={`
                transition-all duration-300 ease
                w-10 h-10 flex items-center justify-center rounded-full
                hover:bg-black/50 hover:text-white
                ${isActive ? "text-white bg-black/50" : "text-[#B9BABE]"}
            `}>
            <Icon size={20} />
        </div>
    );
    if (isButton || !direction) {
        return <button type="button">{content}</button>;
    }
    return <Link href={direction}>{content}</Link>;
};
export default Url;