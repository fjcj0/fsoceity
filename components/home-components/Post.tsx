"use client";
import { useSocket } from "@/context/SocketContext";
import { Bookmark, Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
const Post = ({
    id,
    name,
    profilePicture,
    paragraph,
    image,
    likesNumber,
    isLiked,
    isSaved
}: {
    id: string;
    name: string;
    profilePicture: string;
    paragraph?: string;
    image?: string;
    likesNumber: number;
    isLiked: boolean,
    isSaved: boolean
}) => {
    const [liked, setLiked] = useState<boolean>(isLiked);
    const [bookMarked, setBookMarked] = useState<boolean>(isSaved);
    const { socket } = useSocket();
    const [likes, setLikes] = useState(likesNumber);
    const toggleLike = () => {
        if (!socket) return;
        socket.emit("like", id);
        setLiked(prev => !prev);
        setLikes(prev => (liked ? prev - 1 : prev + 1));
    };
    const toggleBookmark = () => {
        if (!socket) return;
        socket.emit("save", id);
        setBookMarked(prev => !prev);
    };
    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-y-3 text-white">
            <div className="bg-black p-5 rounded-xl flex flex-col gap-4">
                <div className="flex items-center gap-x-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                            src={profilePicture}
                            alt={name}
                            className="w-full h-full"
                            objectFit="cover"
                            width={200}
                            height={200}
                        />
                    </div>
                    <span className="font-semibold">{name}</span>
                </div>
                {paragraph && (
                    <p className="text-gray-200 text-sm font-light">{paragraph}</p>
                )}
                {image && (
                    <div className="w-full relative">
                        <Image
                            src={image}
                            alt="Post image"
                            width={600}
                            height={600}
                            className="w-full h-auto rounded-lg"
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                )}
                <div className="flex items-center justify-between text-gray-300 mt-2">
                    <button
                        type="button"
                        onClick={toggleLike}
                        className="flex items-center gap-x-1"
                    >
                        <Heart
                            size={22}
                            color={liked ? "red" : "white"}
                            fill={liked ? "red" : "none"}
                            strokeWidth={liked ? 0 : 2}
                        />
                        <span>{likes}</span>
                    </button>
                    <button type="button" onClick={toggleBookmark}>
                        <Bookmark
                            size={22}
                            color="white"
                            fill={bookMarked ? "white" : "none"}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Post;