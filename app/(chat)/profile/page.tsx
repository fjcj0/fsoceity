"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { liked_posts, saved_posts, types, user_posts } from "@/constants/data";
import NothingToAppear from "@/components/NothingToAppear";
import ProfileLiked from "@/components/profile-components/ProfileLiked";
import { ProfileSaved } from "@/components/profile-components/ProfileSaved";
import { ProfilePost } from "@/components/profile-components/ProfilePost";
import useAuthStore from "@/store/AuthStore";
const page = () => {
    const { user } = useAuthStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("Selected file:", file);
        }
    };
    const [type, setType] = useState<'posts' | 'saves' | 'likes'>('posts');
    const CorrectMessage: React.FC = () => {
        if (type === "likes") {
            return (
                <div>
                    {liked_posts.length === 0 ? (
                        <NothingToAppear header="No Likes Yet" par="You haven't liked any post yet" />
                    ) : (
                        <div className="grid grid-cols-4 max-md:grid-cols-2 gap-3">
                            {liked_posts.map((liked_post, index) => (
                                <ProfileLiked
                                    key={index}
                                    image={liked_post.image}
                                    par={liked_post.paragraph}
                                />
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        if (type === "posts") {
            return (
                <div>
                    {user_posts.length === 0 ? (
                        <NothingToAppear header="No Posts Yet" par="You haven't posted anything yet" />
                    ) : (
                        <div className="grid grid-cols-4 max-md:grid-cols-2 gap-3">
                            {user_posts.map((user_post, index) => (
                                <ProfilePost
                                    key={index}
                                    image={user_post.image}
                                    par={user_post.paragraph}
                                />
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        if (type === "saves") {
            return (
                <div>
                    {saved_posts.length === 0 ? (
                        <NothingToAppear header="No Saves Yet" par="You haven't saved any post yet" />
                    ) : (
                        <div className="grid grid-cols-4 max-md:grid-cols-2 gap-3">
                            {saved_posts.map((saved_post, index) => (
                                <ProfileSaved
                                    key={index}
                                    image={saved_post.image}
                                    par={saved_post.paragraph}
                                />
                            ))}
                        </div>
                    )}
                </div>
            );
        }
        return null;
    };
    return (
        <div className="w-full flex flex-col items-center justify-start">
            <div className="w-full flex max-md:flex-col items-start justify-start">
                <div>
                    <button
                        type="button"
                        className="profile-flash active:scale-75 duration-300"
                        onClick={handleButtonClick}
                    >
                        <Image
                            src="/profile.jpg"
                            alt="profile"
                            width={208}
                            height={208}
                        />
                    </button>
                </div>
                <div className="ml-5 max-md:w-full flex flex-col items-start justify-start gap-y-1 my-auto relative">
                    <h1 className="text-white font-black text-lg md:text-3xl">{user?.name}</h1>
                    <p className="text-white/60 font-light text-sm">{user?.bio ? user?.bio : 'bio'}</p>
                    <div className="flex mt-2 items-start justify-start gap-4 font-semibold text-lg">
                        <p>0 <span>Posts</span></p>
                        <p>2 <span>Groups</span></p>
                        <p>10 <span>Contacts</span></p>
                    </div>
                    <div className="mt-3 flex items-start justify-start gap-3 w-full pr-3">
                        <Button title="Edit Profile" onClick={async () => console.log('edit profile')} isLoading={false} icon="/edit.png" />
                    </div>
                </div>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
            />
            <div className="w-full flex items-center justify-between mt-15">
                {types.map((t, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setType(t.type)}
                        className="relative flex flex-col items-center"
                    >
                        <t.icon size={27} fill={type === t.type ? 'white' : 'none'} />
                        {type === t.type && (
                            <div className="absolute w-6 ml-[0.3px] h-[2px] rounded-full bg-white -bottom-1" />
                        )}
                    </button>
                ))}
            </div>
            <div className="w-full mt-13">
                <CorrectMessage />
            </div>
        </div>
    );
};
export default page;