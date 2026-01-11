"use client";
import axios from "axios";
import Image from "next/image";
import { ContactMessageType } from "@/global";
axios.defaults.withCredentials = true;
const ContactChat = ({
    id,
    name,
    avatar,
    status,
    setContactMessages,
    setIsSelected,
    selectedContactId,
    setSelectedContactId,
}: {
    id: string;
    name: string;
    avatar: string;
    status: "online" | "offline";
    setContactMessages: React.Dispatch<
        React.SetStateAction<ContactMessageType[]>
    >;
    setIsSelected: (v: boolean) => void;
    selectedContactId: string | null;
    setSelectedContactId: (id: string) => void;
}) => {
    const isActive = selectedContactId === id;
    const onSelectContact = async () => {
        try {
            const res = await axios.get<{ messages: ContactMessageType[] }>(`/api/auth/contact-messages?receiverId=${id}`);
            setContactMessages(res.data.messages);
            setSelectedContactId(id);
            setIsSelected(true);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div
            onClick={onSelectContact}
            className={`w-full flex items-center cursor-pointer transition-colors ${isActive ? "bg-[#242424]" : "hover:bg-[#242424]/60"}`}>
            <div className="flex items-center gap-2 pl-3 py-2 w-full">
                <div className="relative">
                    {avatar ? (
                        <Image
                            src={avatar}
                            width={40}
                            height={40}
                            alt={name}
                            className="rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
                            {name.charAt(0)}
                        </div>
                    )}
                    <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${status === "online" ? "bg-green-400" : "bg-red-400"}`} />
                </div>
                <div className="hidden md:flex flex-col">
                    <p className="text-white font-semibold">{name}</p>
                    <span className="text-xs text-white/40">{status}</span>
                </div>
            </div>
        </div>
    );
};
export default ContactChat;