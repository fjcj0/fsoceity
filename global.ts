import { LucideIcon } from "lucide-react";
export type LinkType = {
    icon: LucideIcon,
    direction?: string,
    isButton: boolean,
};
export type UserType = {
    id: string,
    name: string,
    email: string,
    profilePicture: string | null,
    bio: string | null,
} | null | undefined;