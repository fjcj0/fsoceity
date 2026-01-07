"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Input from "@/components/Input";
import NothingToAppear from "@/components/NothingToAppear";
import ProfileLiked from "@/components/profile-components/ProfileLiked";
import { ProfileSaved } from "@/components/profile-components/ProfileSaved";
import { ProfilePost } from "@/components/profile-components/ProfilePost";
import useAuthStore from "@/store/AuthStore";
import { uploadImage } from "@/utils/uploadImage";
import { toast } from "react-toastify";
import { types } from "@/constants/data";
import LoaderComponent from "@/tools/LoaderComponent";
const CorrectMessage: React.FC<{ type: "posts" | "saves" | "likes" }> = ({ type }) => {
    const { getUserContent, isLoadingUserContents, user_likes, user_bookmarks, user_posts } = useAuthStore();
    useEffect(() => {
        getUserContent();
    }, []);
    if (isLoadingUserContents) {
        return (
            <div className="grid md:grid-cols-4 grid-cols-2 gap-3 w-full">
                {
                    Array.from([1, 2, 3, 4, 5, 6, 7, 8]).map((arr, index) => (
                        <LoaderComponent key={index} />
                    ))
                }
            </div>
        );
    }
    if (type === "likes") {
        return user_likes.length === 0 ? (
            <NothingToAppear header="No Likes Yet" par="You haven't liked any post yet" />
        ) : (
            <div className="grid grid-cols-4 max-md:grid-cols-2 gap-3">
                {user_likes.map((liked_post, index) => (
                    <ProfileLiked key={index} image={liked_post.post.image} par={liked_post.post.content} />
                ))}
            </div>
        );
    }
    if (type === "posts") {
        return user_posts.length === 0 ? (
            <NothingToAppear header="No Posts Yet" par="You haven't posted anything yet" />
        ) : (
            <div className="grid grid-cols-4 max-md:grid-cols-2 gap-3">
                {user_posts.map((user_post, index) => (
                    <ProfilePost key={index} id={user_post.id} image={user_post.image} par={user_post.content} />
                ))}
            </div>
        );
    }
    if (type === "saves") {
        return user_bookmarks.length === 0 ? (
            <NothingToAppear header="No Saves Yet" par="You haven't saved any post yet" />
        ) : (
            <div className="grid grid-cols-4 max-md:grid-cols-2 gap-3">
                {user_bookmarks.map((saved_post, index) => (
                    <ProfileSaved key={index} image={saved_post.post.image} par={saved_post.post.content} />
                ))}
            </div>
        );
    }
    return null;
};
const page = () => {
    const { user, editProfilePicture, editUserData, isEditingData } = useAuthStore();
    const [newName, setNewName] = useState<string>("");
    const [errorNewName, setErrorNewName] = useState<string>("");
    const [newBio, setNewBio] = useState<string>("");
    const [errorNewBio, setErrorNewBio] = useState<string>("");
    const [isChangingPicture, setIsChangingPicture] = useState<boolean>(false);
    const [statusEdit, setStatusEdit] = useState<"uneditable" | "editable">("uneditable");
    const [type, setType] = useState<"posts" | "saves" | "likes">("posts");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const toastId = toast.loading("Wait, the image is uploading...");
        setIsChangingPicture(true);
        try {
            const file = event.target.files?.[0];
            if (file) {
                const result: string = (await uploadImage(file)) as string;
                await editProfilePicture(result);
                toast.update(toastId, {
                    render: "Profile picture updated!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        } catch (error: unknown) {
            console.log(error);
            toast.update(toastId, {
                render: "Failed to upload image",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        } finally {
            setIsChangingPicture(false);
        }
    };
    const editUserDataInformation = async () => {
        try {
            await editUserData(newName, newBio);
        } catch (error: unknown) {
            console.log(error);
        } finally {
            setStatusEdit("uneditable");
        }
    };
    return (
        <div className="w-full flex flex-col items-center justify-start">
            <div className="w-full flex max-md:flex-col items-start justify-start">
                <div>
                    <button
                        disabled={isChangingPicture}
                        type="button"
                        className={`profile-flash active:scale-75 duration-300 ${isChangingPicture ? "opacity-50 cursor-none" : ""
                            }`}
                        onClick={handleButtonClick}
                    >
                        <Image
                            src={user?.profilePicture || "/account.png"}
                            alt="profile"
                            width={208}
                            height={208}
                        />
                    </button>
                </div>
                <div className="ml-5 max-md:w-full flex flex-col items-start justify-start gap-y-1 my-auto relative">
                    {statusEdit === "editable" ? (
                        <div className="flex flex-col items-start justify-start w-full gap-y-3 pr-5">
                            <h1 className="font-bold">Edit Information</h1>
                            <Input
                                placeholder="Enter new name"
                                setValue={setNewName}
                                value={newName}
                                setErrorState={setErrorNewName}
                                errorState={errorNewName}
                                type="text"
                                isPassword={false}
                            />
                            <Input
                                placeholder="Enter new bio"
                                setValue={setNewBio}
                                value={newBio}
                                setErrorState={setErrorNewBio}
                                errorState={errorNewBio}
                                type="text"
                                isPassword={false}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-start justify-start w-full">
                            <h1 className="text-white font-black text-lg md:text-3xl">{user?.name}</h1>
                            <p className="text-white/60 font-light text-sm">{user?.bio || "bio"}</p>
                        </div>
                    )}
                    <div className="flex mt-2 items-start justify-start gap-4 font-semibold text-lg">
                        <p>0 <span>Posts</span></p>
                        <p>2 <span>Groups</span></p>
                        <p>10 <span>Contacts</span></p>
                    </div>
                    <div className="mt-3 flex items-start justify-start gap-3 w-full pr-3">
                        {statusEdit === "uneditable" ? (
                            <Button
                                title="Edit Profile"
                                onClick={async () => setStatusEdit("editable")}
                                isLoading={false}
                                icon="/edit.png"
                            />
                        ) : (
                            <div className="w-full flex gap-x-3">
                                <Button
                                    title="Cancel"
                                    onClick={async () => setStatusEdit('uneditable')}
                                    isLoading={false}
                                    icon="/cancel.png"
                                />
                                <Button
                                    title="Save"
                                    onClick={editUserDataInformation}
                                    isLoading={isEditingData}
                                    icon="/edit.png"
                                />
                            </div>
                        )}
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
                        <t.icon size={27} fill={type === t.type ? "white" : "none"} />
                        {type === t.type && (
                            <div className="absolute w-6 ml-[0.3px] h-[2px] rounded-full bg-white -bottom-1" />
                        )}
                    </button>
                ))}
            </div>
            <div className="w-full mt-13">
                <CorrectMessage type={type} />
            </div>
        </div>
    );
};
export default page;