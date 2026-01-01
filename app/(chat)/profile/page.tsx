"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { types } from "@/constants/data";
import NothingToAppear from "@/components/NothingToAppear";
const ProfilePage: React.FC = () => {
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
        if (type === 'posts') return <NothingToAppear header="No Post Yet" par="You didn't post anything yet" />
        if (type === 'likes') return <NothingToAppear header="No Likes Yet" par="You didn't like post yet" />
        if (type === 'saves') return <NothingToAppear header="No Saves Yet" par="You didn't save post yet" />
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
                <div className="ml-5 max-md:w-full flex flex-col items-start justify-center gap-y-1 my-auto relative">
                    <h1 className="text-white font-black text-lg md:text-3xl">OMAR CODING</h1>
                    <p className="text-white/60 font-light text-sm">Full-Stack Developer</p>
                    <div className="flex mt-2 items-start justify-start gap-4 font-semibold text-lg">
                        <p>0 <span>Posts</span></p>
                        <p>2 <span>Groups</span></p>
                        <p>10 <span>Contacts</span></p>
                    </div>
                    <div className="mt-3 flex items-center justify-center gap-3 w-full pr-3">
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
export default ProfilePage;