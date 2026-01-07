"use client";
import Image from "next/image";
import Button from "../Button";
import useAuthStore from "@/store/AuthStore";
import { useState } from "react";
const ProfileLiked = ({ id, image, par }: {
    id: string,
    image?: string;
    par?: string;
}) => {
    const { deleteLike } = useAuthStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const onDelete = async () => {
        setIsLoading(true);
        try {
            await deleteLike(id);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="w-full bg-black flex flex-col items-end justify-end p-3 gap-y-5 rounded-xl">
            {image ?
                <div className="relative w-full">
                    <Image
                        src={image}
                        alt={par ?? "User post image"}
                        width={200}
                        height={200}
                        className="w-full h-full rounded-xl"
                    />
                </div>
                :
                <div className="w-full  h-full flex items-center justify-center">
                    <h1
                        className="text-center text-xl font-semibold tracking-tighter bg-gradient-to-b from-neutral-50 via-neutral-300 to-neutral-700 bg-clip-text text-transparent"
                    >
                        <span>This Post Doesn't Contain <br /></span>
                        <span>Any Picture<br /></span>
                    </h1>
                </div>
            }
            {par && (
                <div className="flex flex-col items-center justify-between w-full gap-3">
                    <p className="text-white text-sm line-clamp-2">{par}</p>
                    <Button
                        title="Remove From Likes"
                        icon="/heart.png"
                        isLoading={isLoading}
                        onClick={onDelete}
                    />
                </div>
            )}
        </div>
    );
};
export default ProfileLiked;