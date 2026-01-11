"use client";
import { useEffect, useState } from "react";
import GroupChat from "@/components/chat-components/GroupChat";
import { groups_chat } from "@/constants/data";
import Session from "@/components/chat-components/Session";
import Lottie from "lottie-react";
import animation from "../../../animations/Digitalmedia.json";
import axios from "axios";
import LoaderChatLayout from "@/tools/LoaderChatLayout";
import { ContactChatType, ContactMessageType } from "@/global";
import ContactChat from "@/components/chat-components/ContactChat";
import useAuthStore from "@/store/AuthStore";
import useContactStore from "@/store/ContactStore";
import useMessageStore from "@/store/MessageStore";
axios.defaults.withCredentials = true;
const page = () => {
    const { user } = useAuthStore();
    const { setSelectedContactId } = useContactStore();
    const { contactMessages, setContactMessages } = useMessageStore();
    const [isMounted, setIsMounted] = useState(false);
    const [type, setType] = useState<"contacts" | "groups">("contacts");
    const [isSelectedSession, setIsSelectedSession] = useState(false);
    const [isCallStarted, setIsCallStarted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [contacts, setContacts] = useState<ContactChatType[]>([]);
    const currentUserId = user?.id;
    const getContacts = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("/api/auth/get-contacts");
            setContacts(res.data.contacts);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (!isMounted) {
            setSelectedContactId(null);
            setIsMounted(true);
            setContactMessages([]);
        }
        getContacts();
    }, []);
    return (
        <div className="w-full max-w-5xl mx-auto h-full flex flex-col">
            <div className="w-full mb-3 flex items-center justify-between">
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value as "contacts" | "groups")}
                    className="text-xs bg-[#242424] px-3 py-2 rounded-lg text-white outline-none">
                    <option value="contacts">Contacts</option>
                    <option value="groups">Groups</option>
                </select>
                <label className="flex items-center gap-1">
                    <input type="checkbox" />
                    <span className="text-xs text-white/30">online</span>
                </label>
            </div>
            {!isLoading ? (
                <div className="w-full h-[38rem] rounded-3xl overflow-hidden">
                    <div className="w-full h-full grid grid-cols-12 min-h-0">
                        <div className="col-span-2 bg-black overflow-y-auto">
                            <div className="mt-6 flex flex-col gap-3">
                                {type === "contacts"
                                    ? contacts.map((c) => (
                                        <ContactChat
                                            key={c.friend.id}
                                            id={c.friend.id}
                                            name={c.friend.name}
                                            avatar={c.friend.profilePicture}
                                            status="online"
                                            setIsSelected={setIsSelectedSession}

                                        />
                                    ))
                                    : groups_chat.map((g) => (
                                        <GroupChat
                                            key={g.id}
                                            groupName={g.groupName}
                                            logo={g.logo}
                                            status={g.status}
                                        />
                                    ))}
                            </div>
                        </div>
                        <div className="col-span-10 h-full min-h-0 bg-black/40 backdrop-blur-md">
                            {!isSelectedSession ? (
                                <div className="w-full h-full flex flex-col items-center justify-center">
                                    <Lottie animationData={animation} loop />
                                    <h1 className="text-center mt-5 text-4xl font-semibold bg-gradient-to-b from-neutral-50 via-neutral-300 to-neutral-700 bg-clip-text text-transparent">
                                        Start Your First Chat <br /> On Fsociety
                                    </h1>
                                </div>
                            ) : (
                                <Session isCallStarted={isCallStarted} isUser={false}>
                                    <div className="flex flex-col gap-3 p-4">
                                        {contactMessages.map((msg) => {
                                            const isMine = msg.sender.id === currentUserId;
                                            return (
                                                <div
                                                    key={msg.id}
                                                    className={`p-3 rounded-lg max-w-[70%] text-white ${isMine ? "ml-auto bg-blue-600" : "mr-auto bg-white/10"}`}>
                                                    {msg.content}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </Session>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <LoaderChatLayout />
            )}
        </div>
    );
};
export default page;