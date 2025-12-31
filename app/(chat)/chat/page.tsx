"use client";
import { useState } from "react";
import Lottie from "lottie-react";
import animation from '../../../animations/community.json';
import ContactChat from "@/components/chat-components/ContactChat";
import GroupChat from "@/components/chat-components/GroupChat";
import { contacts_chat, groups_chat } from "@/constants/data";
const ChatPage = () => {
    const [type, setType] = useState<'contacts' | 'groups'>('contacts');
    return (
        <div className="w-full max-w-4xl mx-auto h-full flex flex-col items-center justify-center">
            <div className="w-full h-[45rem] bg-[#242424] flex flex-col items-start justify-start rounded-3xl ">
                <div className="w-full h-full grid grid-cols-12">
                    <div className="w-full col-span-2 md:col-span-3 bg-black rounded-l-3xl">
                        <div className="p-3 max-md:hidden flex items-center justify-between">
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value as "contacts" | "groups")}
                                className="font-light text-xs bg-[#242424] px-3 py-2 rounded-lg text-white outline-none"
                            >
                                <option value="contacts">Contacts</option>
                                <option value="groups">Groups</option>
                            </select>
                            <label htmlFor="" className="flex items-center justify-center gap-x-1">
                                <input type="checkbox" />
                                <span className="text-xs text-white/30">online</span>
                            </label>
                        </div>
                        <div className="mt-3 w-full">
                            <div className="w-full flex flex-col gap-y-3 items-start">
                                {type === "contacts"
                                    ? contacts_chat.map((contact) => (
                                        <ContactChat
                                            key={contact.id}
                                            name={contact.name}
                                            avatar={contact.avatar}
                                            status={contact.status}
                                        />
                                    ))
                                    : groups_chat.map((group) => (
                                        <GroupChat
                                            key={group.id}
                                            groupName={group.groupName}
                                            logo={group.logo}
                                            status={group.status}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-10 md:col-span-9">
                        <div className="w-full h-full  flex flex-col items-center justify-center gap-3">
                            <h1 className="text-center text-xl md:text-3xl font-semibold tracking-tighter bg-gradient-to-b from-neutral-50 via-neutral-300 to-neutral-700 bg-clip-text text-transparent">
                                <span>Encrypted Chat</span>
                                <span> Around The World</span>
                            </h1>
                            <div className="w-full">
                                <Lottie animationData={animation} loop />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ChatPage;