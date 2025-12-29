import { Home, MessageSquare, User, LogOut } from "lucide-react";
export const links = [
    {
        icon: Home,
        direction: '/home',
        isButton: false,
    },
    {
        icon: MessageSquare,
        direction: '/chat',
        isButton: false,
    },
    {
        icon: User,
        direction: '/profile',
        isButton: false,
    },
    {
        icon: LogOut,
        isButton: true,
    }
];