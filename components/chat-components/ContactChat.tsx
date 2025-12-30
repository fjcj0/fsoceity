import Image from "next/image";
interface ContactChatProps {
    name: string;
    avatar?: string;
    status: "online" | "offline";
}
const ContactChat = ({ name, avatar, status }: ContactChatProps) => {
    return (
        <div className="w-full flex items-start justify-start hover:bg-[#242424]/60 duration-300 ease-in cursor-pointer">
            <div className="flex items-center gap-x-2 pl-3 py-2">
                <div className="w-[43px] h-[43px] rounded-full overflow-hidden bg-[#333] flex items-center justify-center">
                    {avatar ? (
                        <Image
                            src={avatar}
                            width={43}
                            height={43}
                            alt={name}
                            className="object-cover"
                        />
                    ) : (
                        <span className="text-white text-xs font-bold">{name.charAt(0)}</span>
                    )}
                </div>
                <div className="flex flex-col items-start">
                    <p className="text-white font-bold">{name}</p>
                    <div className="flex items-center gap-x-1">
                        <div
                            className={`w-2 h-2 rounded-full ${status === "online" ? "bg-green-400" : "bg-red-400"
                                }`}
                        />
                        <p className="font-light text-xs text-white/40">{status}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default ContactChat;