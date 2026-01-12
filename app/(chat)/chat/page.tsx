"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Lottie from "lottie-react";

import GroupChat from "@/components/chat-components/GroupChat";
import ContactChat from "@/components/chat-components/ContactChat";
import Session from "@/components/chat-components/Session";
import LoaderChatLayout from "@/tools/LoaderChatLayout";

import { groups_chat } from "@/constants/data";
import { ContactChatType, ContactMessageType } from "@/global";

import useAuthStore from "@/store/AuthStore";
import useMessageStore from "@/store/MessageStore";
import useContactStore from "@/store/ContactStore";
import { useSocket } from "@/context/SocketContext";

import animation from "../../../animations/Digitalmedia.json";

axios.defaults.withCredentials = true;

const Page = () => {
    /* ---------------- helpers ---------------- */
    const formatTime = (date: string) => {
        return new Date(date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };
    const lastMessageRef = useRef<HTMLDivElement | null>(null);
    const { user } = useAuthStore();
    const currentUserId = user?.id;
    const {
        contactMessages,
        setContactMessages,
        setMessage,
        setPicture,
        setVoice,
        addContactMessage,
    } = useMessageStore();
    const { setSelectedContactId } = useContactStore();
    const { socket } = useSocket();
    const [isMount, setIsMount] = useState(false);
    const [contacts, setContacts] = useState<ContactChatType[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [displayOnlineUsers, setDisplayOnlineUsers] = useState(false);
    const [type, setType] = useState<"contacts" | "groups">("contacts");
    const [isSelectedSession, setIsSelectedSession] = useState(false);
    const [isCallStarted, setIsCallStarted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const getContacts = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("/api/auth/get-contacts");
            setContacts(res.data.contacts);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (!isMount) {
            setContactMessages([]);
            setMessage("");
            setPicture(null);
            setVoice(null);
            setSelectedContactId(null);
            setIsMount(true);
        }
        getContacts();
    }, []);
    useEffect(() => {
        if (!socket) return;
        const handleOnlineUsers = (users: string[]) => {
            setOnlineUsers(users);
        };
        socket.on("online-users", handleOnlineUsers);
        socket.emit("get-online-users");
        return () => {
            socket.off("online-users", handleOnlineUsers);
        };
    }, [socket]);
    useEffect(() => {
        if (!socket) return;
        const handler = (message: ContactMessageType) => {
            addContactMessage(message);
        };
        socket.on("receive-message", handler);
        return () => {
            socket.off("receive-message", handler);
        };
    }, [socket]);
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    }, [contactMessages]);
    const filteredContacts = displayOnlineUsers
        ? contacts.filter((c) => onlineUsers.includes(c.friend.id))
        : contacts;
    return (
        <div className="w-full max-w-5xl mx-auto h-full flex flex-col">
            <div className="w-full mb-3 flex items-center justify-between">
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value as "contacts" | "groups")}
                    className="text-xs bg-[#242424] px-3 py-2 rounded-lg text-white outline-none"
                >
                    <option value="contacts">Contacts</option>
                    <option value="groups">Groups</option>
                </select>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={displayOnlineUsers}
                        onChange={() => setDisplayOnlineUsers((prev) => !prev)}
                    />
                    <span className="text-xs text-white/40">online only</span>
                </label>
            </div>
            {!isLoading ? (
                <div className="w-full h-[38rem] rounded-3xl overflow-hidden">
                    <div className="w-full h-full grid grid-cols-12 min-h-0">
                        <div className="col-span-2 bg-black overflow-y-auto">
                            <div className="mt-6 flex flex-col gap-3">
                                {type === "contacts" &&
                                    filteredContacts.map((c) => {
                                        const isOnline = onlineUsers.includes(c.friend.id);
                                        return (
                                            <ContactChat
                                                key={c.friend.id}
                                                id={c.friend.id}
                                                name={c.friend.name}
                                                avatar={c.friend.profilePicture}
                                                status={isOnline ? "online" : "offline"}
                                                setIsSelected={setIsSelectedSession}
                                            />
                                        );
                                    })}
                                {type === "groups" &&
                                    groups_chat.map((g) => (
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
                                        Start Your First Chat <br />
                                        On Fsociety
                                    </h1>
                                </div>
                            ) : (
                                <Session isCallStarted={isCallStarted} isUser={false}>
                                    <div className="w-full flex flex-col gap-3 p-4">
                                        {contactMessages.map((msg, index) => {
                                            const isMine = msg.sender.id === currentUserId;
                                            const isLast =
                                                index === contactMessages.length - 1;

                                            return (
                                                <div
                                                    key={msg.id}
                                                    ref={isLast ? lastMessageRef : null}
                                                    className={`flex items-end gap-2 ${isMine
                                                        ? "justify-end"
                                                        : "justify-start"
                                                        }`}
                                                >
                                                    {!isMine && (
                                                        <img
                                                            src={msg.sender.profilePicture}
                                                            alt={msg.sender.name}
                                                            className="w-8 h-8 rounded-full object-cover"
                                                        />
                                                    )}

                                                    <div
                                                        className={`max-w-[70%] rounded-xl p-3 text-sm text-white ${isMine
                                                            ? "bg-blue-600 rounded-br-none"
                                                            : "bg-white/10 rounded-bl-none"
                                                            }`}
                                                    >
                                                        {msg.image && (
                                                            <img
                                                                src={msg.image}
                                                                alt="sent"
                                                                className="mb-2 rounded-lg max-w-full"
                                                            />
                                                        )}

                                                        {msg.content && (
                                                            <p>{msg.content}</p>
                                                        )}

                                                        <div className="text-[10px] text-white/50 text-right mt-1">
                                                            {formatTime(msg.createdAt)}
                                                        </div>
                                                    </div>

                                                    {isMine && (
                                                        <img
                                                            src={msg.sender.profilePicture}
                                                            alt="You"
                                                            className="w-8 h-8 rounded-full object-cover"
                                                        />
                                                    )}
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
export default Page;