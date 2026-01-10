import Image from "next/image";
import Button from "../Button";
import { ContactType } from "@/global";
import { useState } from "react";
import { useSocket } from "@/context/SocketContext";
import axios from "axios";
axios.defaults.withCredentials = true;
const Contact = ({
    id,
    name,
    profilePicture,
    isSent,
    isPending,
    isAccepted,
    createdAt,
    setContacts,
    type
}: {
    id: string,
    name: string;
    profilePicture: string;
    isSent: boolean;
    isPending: boolean;
    isAccepted: boolean;
    createdAt: string;
    setContacts: React.Dispatch<React.SetStateAction<ContactType[]>>;
    type: "Notsent" | "Pending" | "Accepted"
}) => {
    const { socket } = useSocket();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const action = async () => {
        try {
            setIsLoading(true);
            if (type === "Notsent") {
                await axios.post("/api/auth/send-request", {
                    receiverId: id,
                });
                socket?.emit("on-send-request", id);
                setContacts((prev) => prev.filter((c) => c.id !== id));
            }
            else if (type === "Pending") {
                await axios.post("/api/auth/cancel-request", {
                    receiverId: id,
                });
                setContacts((prev) => prev.filter((c) => c.id !== id));
            }
            else if (type === "Accepted") {
                await axios.post("/api/auth/remove-contact", {
                    friendId: id,
                });
                setContacts((prev) => prev.filter((c) => c.id !== id));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="w-full p-4 flex flex-col items-start justify-between bg-black/50 rounded-3xl">
            <div className="flex flex-col items-start gap-y-2">
                <div className="w-20 h-20 relative overflow-hidden rounded-full">
                    <Image
                        src={profilePicture}
                        alt={name}
                        fill
                        className=" object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-sm">{name}</h1>
                    <p className="text-xs font-light text-white/20">
                        Joined At: {createdAt}
                    </p>
                </div>
            </div>
            <div className="mt-4">
                {!isSent && !isPending && !isAccepted && (
                    <Button
                        icon="/add-user.png"
                        title="Add To Contacts"
                        isLoading={isLoading}
                        onClick={action}
                    />
                )}
                {isAccepted && (
                    <Button
                        icon="/delete.png"
                        title="Remove Contact"
                        isLoading={isLoading}
                        onClick={action}
                    />
                )}
                {isPending && (
                    <Button
                        icon="/cancel.png"
                        title="Cancel Request"
                        isLoading={isLoading}
                        onClick={action}
                    />
                )}
            </div>
        </div>
    );
};
export default Contact;