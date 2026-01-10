"use client";
import Image from "next/image";
import Button from "../Button";
import { FriendRequestType } from "@/global";
import { useState } from "react";
import axios from "axios";
import { useSocket } from "@/context/SocketContext";
axios.defaults.withCredentials = true;
const Request = ({
    id,
    image,
    name,
    createdAt,
    setFriendRequests,
}: {
    id: string;
    image: string;
    name: string;
    createdAt: string;
    setFriendRequests: React.Dispatch<React.SetStateAction<FriendRequestType[]>>;
}) => {
    const { socket } = useSocket();
    const [isCancel, setIsCancel] = useState(false);
    const [isAccept, setIsAccept] = useState(false);
    const onAccept = async () => {
        setIsAccept(true);
        try {
            await axios.post("/api/auth/accept-request", {
                senderId: id,
            });
            socket?.emit("on-accept-request", id);
            setFriendRequests((prev) =>
                prev.filter((req) => req.sender.id !== id)
            );
        } catch (error) {
            console.log(error);
        } finally {
            setIsAccept(false);
        }
    };
    const onCancel = async () => {
        setIsCancel(true);
        try {
            await axios.post("/api/auth/reject-request", {
                senderId: id,
            });
            setFriendRequests((prev) =>
                prev.filter((req) => req.sender.id !== id)
            );
        } catch (error) {
            console.log(error);
        } finally {
            setIsCancel(false);
        }
    };
    return (
        <div className="w-full p-4 flex flex-col items-start justify-between bg-black/50 rounded-3xl">
            <div className="flex flex-col items-start gap-y-2">
                <div className="w-20 h-20 relative overflow-hidden rounded-full">
                    <Image src={image} alt={name} fill className="object-cover" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-sm">{name}</h1>
                    <p className="text-xs font-light text-white/20">
                        Joined At: {createdAt}
                    </p>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-3">
                <Button
                    icon="/cancel.png"
                    title="Cancel"
                    isLoading={isCancel}
                    onClick={onCancel}
                />
                <Button
                    icon="/check-mark.png"
                    title="Accept"
                    isLoading={isAccept}
                    onClick={onAccept}
                />
            </div>
        </div>
    );
};
export default Request;