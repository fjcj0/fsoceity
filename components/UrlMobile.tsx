"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const UrlMobile = ({
    title,
    icon: Icon,
    direction,
}: {
    title: string;
    icon: LucideIcon;
    direction?: string;
}) => {
    const pathname = usePathname();
    const isActive = direction ? pathname === direction : false;
    return (
        <Link
            href={direction ?? "#"}
            className={`w-full flex items-center justify-start gap-x-2 p-3 ${isActive ? "bg-black/65 rounded-lg" : ""
                }`}>
            <Icon size={20} color="white" />
            <span>{title}</span>
        </Link>
    );
};
export default UrlMobile;