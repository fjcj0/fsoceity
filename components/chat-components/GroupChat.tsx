import Image from "next/image";
interface GroupChatProps {
    groupName: string;
    logo?: string;
    status: "online" | "offline";
}
const GroupChat = ({ groupName, logo, status }: GroupChatProps) => {
    return (
        <div className="w-full flex items-start justify-start hover:bg-[#242424]/60 duration-300 ease-in cursor-pointer">
            <div className="flex items-center gap-x-2 pl-3 py-2">

                <div className="w-[43px] h-[43px] rounded-full overflow-hidden bg-[#333] flex items-center justify-center">
                    {logo ? (
                        <Image
                            src={logo}
                            width={43}
                            height={43}
                            alt={groupName}
                            className="object-cover"
                        />
                    ) : (
                        <span className="text-white text-xs font-bold">{groupName.charAt(0)}</span>
                    )}
                </div>

                <div className="flex flex-col items-start">
                    <p className="text-white font-bold">{groupName}</p>
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
export default GroupChat;