"use client";
import axios from "axios";
import Image from "next/image";
import { ContactMessageType } from "@/global";
import useContactStore from "@/store/ContactStore";
import useMessageStore from "@/store/MessageStore";
axios.defaults.withCredentials = true;
const ContactChat = ({
  id,
  name,
  avatar,
  status,
  setIsSelected,
}: {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline";
  setIsSelected: (v: boolean) => void;
}) => {
  const { contactMessages, setContactMessages } = useMessageStore();
  const { contactId, setSelectedContactId } = useContactStore();
  const isActive = contactId === id;
  const onSelectContact = async () => {
    setContactMessages([]);
    try {
      const res = await axios.get<{ messages: ContactMessageType[] }>(
        `/api/auth/contact-messages?receiverId=${id}`,
      );
      setContactMessages(res.data.messages);
      setSelectedContactId(id);
      setIsSelected(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      onClick={onSelectContact}
      className={`w-full flex items-center cursor-pointer duration-300 transition-colors ${
        isActive
          ? "bg-slate-900/60 border-r-1 border-r-gray-300/50"
          : "hover:bg-slate-900/60"
      }`}
    >
      <div className="flex items-center gap-2 pl-3 py-2 w-full">
        <div className="relative">
          {avatar ? (
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={avatar}
                width={40}
                height={40}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
              {name.charAt(0)}
            </div>
          )}
          <span
            className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${
              status === "online" ? "bg-green-400" : "bg-red-400"
            }`}
          />
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