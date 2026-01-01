"use client";
import { useState } from "react";
import Lottie from "lottie-react";
import animation from "../../../animations/community.json";
import ContactChat from "@/components/chat-components/ContactChat";
import GroupChat from "@/components/chat-components/GroupChat";
import { contacts_chat, groups_chat } from "@/constants/data";
import Session from "@/components/chat-components/Session";
const Page = () => {
    const [type, setType] = useState<"contacts" | "groups">("contacts");
    const [isSelectedSession, setIsSelectedSession] = useState(true);
    const [isUser] = useState(false);
    const [isCallStarted] = useState(false);
    return (
        <div className="w-full max-w-5xl mx-auto h-full flex flex-col">
            <div className="w-full mb-3 flex items-center justify-between">
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="text-xs bg-[#242424] px-3 py-2 rounded-lg text-white outline-none"
                >
                    <option value="contacts">Contacts</option>
                    <option value="groups">Groups</option>
                </select>
                <label className="flex items-center gap-1">
                    <input type="checkbox" />
                    <span className="text-xs text-white/30">online</span>
                </label>
            </div>
            <div className="w-full h-[50rem] rounded-3xl overflow-hidden">
                <div className="w-full h-full grid grid-cols-12 min-h-0">
                    <div className="col-span-2 bg-black overflow-y-auto">
                        <div className="mt-6 flex flex-col gap-3">
                            {type === "contacts"
                                ? contacts_chat.map((c) => (
                                    <ContactChat
                                        key={c.id}
                                        name={c.name}
                                        avatar={c.avatar}
                                        status={c.status}
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
                            <Lottie animationData={animation} loop />
                        ) : (
                            <Session isUser={isUser} isCallStarted={isCallStarted}>
                                <div className="flex flex-col gap-3">
                                    {Array.from({ length: 40 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="bg-white/10 text-white p-3 rounded-lg max-w-[70%]"
                                        >
                                            Message {i + 1}
                                        </div>
                                    ))}
                                </div>
                            </Session>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Page;