import Image from "next/image";
const ContactChat = ({ name, avatar, status }: {
    name: string;
    avatar?: string;
    status: "online" | "offline";
}) => {
    return (
        <div className="w-full flex items-center border-r-[0.5px] border-r-transparent hover:bg-[#242424]/60 hover:border-r-white duration-300 ease-in cursor-pointer">
            <div className="relative flex items-center max-lg:items-start max-lg:flex-col gap-x-2 pl-3 py-2">
                <div className="relative flex items-center justify-center">
                    {avatar ? (
                        <Image
                            src={avatar}
                            width={43}
                            height={43}
                            alt={name}
                            className="object-cover w-10 h-10 mx-auto rounded-full"
                        />
                    ) : (
                        <span className="text-white text-xs font-bold">{name.charAt(0)}</span>
                    )}
                    <span
                        className={`absolute top-[0.3rem] -left-0.5 w-3 h-3 rounded-full  ${status === "online" ? "bg-green-400" : "bg-red-400"} md:hidden`}
                    />
                </div>
                <div className="flex flex-col items-start max-md:hidden">
                    <p className="text-white font-bold">{name}</p>
                    <div className="flex items-center gap-x-1">
                        <div
                            className={`w-2 h-2 rounded-full ${status === "online" ? "bg-green-400" : "bg-red-400"}`}
                        />
                        <p className="font-light text-xs text-white/40">{status}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ContactChat;