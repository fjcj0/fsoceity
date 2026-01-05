import { Home, MessageSquare, User, Users, UserPlus, Bookmark, Heart, Archive, Icon, LeafyGreen } from "lucide-react";
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
        icon: LeafyGreen,
        direction: '/requests',
        isButton: false,
    }

];
export const links_chat = [
    {
        icon: UserPlus,
        direction: '/contacts',
        isButton: false,
    },
    {
        icon: Users,
        direction: '/groups',
        isButton: false,
    },

];
export const mobile_links = [
    {
        title: 'Home',
        icon: Home,
        direction: '/home',
    },
    {
        title: 'Chat',
        icon: MessageSquare,
        direction: '/chat',
    },
    {
        title: 'Profile',
        icon: User,
        direction: '/profile',
    },
    {
        title: 'Contacts',
        icon: UserPlus,
        direction: '/contacts',
    },
    {
        title: 'Groups',
        icon: Users,
        direction: '/groups',
    },
    {
        title: 'Requests',
        icon: LeafyGreen,
        direction: '/requests',
    },
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
export const contacts_chat = [
    {
        id: 1,
        name: "Ahmed Ali",
        status: "online" as 'offline' | 'online',
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        id: 2,
        name: "Sara Mohamed",
        status: "offline" as 'offline' | 'online',
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        id: 3,
        name: "John Smith",
        status: "offline" as 'offline' | 'online',
        avatar: "https://randomuser.me/api/portraits/men/65.jpg"
    },
    {
        id: 4,
        name: "Emily Johnson",
        status: "online" as 'offline' | 'online',
        avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
];
export const groups_chat = [
    {
        id: 1,
        groupName: "Developers Team",
        logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&q=80",
        status: "online" as 'offline' | 'online'
    },
    {
        id: 2,
        groupName: "Design Squad",
        logo: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=200&q=80",
        status: "offline" as 'offline' | 'online'
    }
];
export const types = [
    {
        icon: Archive,
        type: 'posts' as 'posts' | 'saves' | 'likes',
    },
    {
        icon: Bookmark,
        type: 'saves' as 'posts' | 'saves' | 'likes',
    },
    {
        icon: Heart,
        type: 'likes' as 'posts' | 'saves' | 'likes',
    }
];
export const dummyContacts = [
    {
        name: "Alex Johnson",
        profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
        isSent: false,
        isPending: false,
        isAccepted: false,
        date: "2024-03-12",
    },
    {
        name: "Sophia Martinez",
        profilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
        isSent: true,
        isPending: true,
        isAccepted: false,
        date: "2024-01-25",
    },
    {
        name: "Daniel Kim",
        profilePicture: "https://randomuser.me/api/portraits/men/76.jpg",
        isSent: false,
        isPending: false,
        isAccepted: true,
        date: "2023-11-02",
    },
    {
        name: "Emily Brown",
        profilePicture: "https://randomuser.me/api/portraits/women/68.jpg",
        isSent: false,
        isPending: true,
        isAccepted: false,
        date: "2024-02-18",
    },
    {
        name: "Michael Wilson",
        profilePicture: "https://randomuser.me/api/portraits/men/12.jpg",
        isSent: false,
        isPending: false,
        isAccepted: true,
        date: "2023-09-09",
    },
];
export const dummyGroups = [
    {
        name: "Nature Lovers",
        groupPicture: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80",
        isJoined: true,
        isPending: false,
        isCreated: false,
        createdAt: "2025-11-12",
    },
    {
        name: "Movie Fans",
        groupPicture: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=80&q=80",
        isJoined: false,
        isPending: false,
        isCreated: true,
        createdAt: "2025-10-01",
    },
    {
        name: "Foodies",
        groupPicture: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80",
        isJoined: false,
        isPending: false,
        isCreated: false,
        createdAt: "2025-12-01",
    },
];

export const liked_posts = [
    {
        profilePicture: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
        paragraph: "Enjoying the latest tech innovations at work! Excited about new AI tools 🤖.",
    },
    {
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800",
        paragraph: "Just tried this awesome gadget — tech life is the best life! 💻✨",
    },
    {
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800",
        paragraph: "Tech meetup vibes 🌐🚀 #Innovation",
    }
];
export const user_posts = [
    {
        image: "https://picsum.photos/id/1040/400/400",
        paragraph: "My latest photography experiment"
    },
    {
        image: "https://picsum.photos/id/1031/400/400",
        paragraph: "Sunlit beach vibes from my summer trip"
    },
    {
        image: "https://picsum.photos/id/1059/400/400",
        paragraph: "Captured this quiet city moment"
    },
    {
        image: "https://picsum.photos/id/1035/400/400",
        paragraph: "Morning hike in the woods"
    }
];

export const saved_posts = [
    {
        image: "https://picsum.photos/id/1084/400/400",
        paragraph: "Architecture inspiration for my next project"
    },
    {
        image: "https://picsum.photos/id/109/400/400",
        paragraph: "Delicious street food from my travels"
    },
    {
        image: "https://picsum.photos/id/112/400/400",
        paragraph: "Experimental graphic design ideas"
    },
    {
        image: "https://picsum.photos/id/116/400/400",
        paragraph: "Peaceful lakeside view to save for later"
    }
];
export const dummy_notifications = [
    {
        picture: "https://picsum.photos/id/1084/400/400",
        action: 'Your post like by',
        by: 'James Willsone'
    },
    {
        picture: "https://picsum.photos/id/109/400/400",
        action: 'Your post saved by',
        by: 'Clerk Hinton'
    },
    {
        picture: "https://picsum.photos/id/112/400/400",
        action: 'Your post like by',
        by: 'Anjela Carelon'
    },
    {
        picture: "https://picsum.photos/id/116/400/400",
        action: 'Your post saved by',
        by: 'John Jack'
    }
];