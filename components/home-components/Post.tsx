"use client";
import { Bookmark, Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
const Post = ({
    name,
    profilePicture,
    paragraph,
    image,
    likesNumber,
    isLiked: initialLiked,
    isBookMarked: initialBookMarked
}: {
    name: string;
    profilePicture: string;
    paragraph?: string;
    image?: string;
    likesNumber: number;
    isLiked: boolean;
    isBookMarked?: boolean;
}) => {
    const [liked, setLiked] = useState(initialLiked);
    const [bookMarked, setBookMarked] = useState(initialBookMarked || false);
    const [likes, setLikes] = useState(likesNumber);
    const toggleLike = () => {
        setLiked(!liked);
        setLikes(prev => liked ? prev - 1 : prev + 1);
    };
    const toggleBookmark = () => {
        setBookMarked(!bookMarked);
    };
    return (
        <div className="w-full flex flex-col gap-y-3 rounded-lg text-white">
            <div className="bg-black p-5 rounded-xl flex flex-col gap-3">
                <div className="w-full flex items-center gap-x-3">
                    <div className="w-10 h-10 relative rounded-full overflow-hidden">
                        <Image
                            src={profilePicture}
                            alt={name}
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <span className="font-semibold">{name}</span>
                </div>
                <div className="w-full flex flex-col gap-y-3 rounded-lg">
                    {paragraph && <p className="text-gray-200 text-sm font-light">{paragraph}</p>}
                    {image && (
                        <div className="w-full relative h-80 rounded-lg overflow-hidden">
                            <Image
                                src={image}
                                alt="Post Image"
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    )}
                </div>
                <div className="w-full flex items-center justify-between text-gray-300">
                    <button
                        type="button"
                        className="flex items-center justify-center gap-x-1"
                        onClick={toggleLike}
                    >
                        <Heart
                            color={liked ? "red" : "white"}
                            fill={liked ? "red" : "none"}
                            strokeWidth={liked ? 0 : 2}
                        />
                        <p>{likes}</p>
                    </button>
                    <button type="button" onClick={toggleBookmark}>
                        <Bookmark
                            color="white"
                            style={{ fill: bookMarked ? "white" : "none" }}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Post;