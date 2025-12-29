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
export const posts = [
    {
        name: "Jack",
        profilePicture: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800",
        paragraph: "Enjoying the latest tech innovations at work! Excited about new AI tools 🤖.",
        likesNumber: 42,
        isLiked: true,
        isBookMarked: true,
    },
    {
        name: "Sarah",
        profilePicture: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800",
        paragraph: "Just tried this awesome gadget — tech life is the best life! 💻✨",
        likesNumber: 88,
        isLiked: false,
        isBookMarked: false,
    },
    {
        name: "Lina",
        profilePicture: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800",
        paragraph: "Tech meetup vibes 🌐🚀 #Innovation",
        likesNumber: 64,
        isLiked: false,
        isBookMarked: false,
    }
];