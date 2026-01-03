import { LucideIcon } from "lucide-react";
export type LinkType = {
    icon: LucideIcon,
    direction?: string,
    isButton: boolean,
};
export type UserType = {
    id: string,
    name: string,
    email: string & { __brand: "LowercaseOnlyString" },
    profilePicture: string | null,
    bio: string | null,
} | null | undefined;
export type NumericString = string & { __brand: "NumericString" };