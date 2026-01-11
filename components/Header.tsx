"use client";
import Image from "next/image";
import Button from "./Button";
import { List } from "lucide-react";
import useHeaderStore from "@/store/HeaderStore";
import useAuthStore from "@/store/AuthStore";
import { useEffect, useState } from "react";
import Notification from "./Notification";
import { useSocket } from "@/context/SocketContext";
const Header = () => {
    const { logout } = useAuthStore();
    const { toggleHeaderSlide } = useHeaderStore();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { notifications, setNotifications, socket } = useSocket();
    useEffect(() => {
        if (!socket) return;
        const handleNotification = (data: {
            image: string,
            action: string,
            by: string
        }) => {
            setNotifications((prev) => [...prev, data]);
        };
        socket.on("notification", handleNotification);
        return () => {
            socket.off("notification", handleNotification);
        };
    }, [socket, setNotifications]);
    return (
        <div className="w-full mb-10 flex items-center justify-between">
            <div className="flex items-center justify-center">
                <Image src={'/fsoceity.png'} width={60} height={60} alt="icon" />
            </div>
            <div className="flex items-center justify-center gap-3">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative cursor-pointer"
                >
                    <Image src="/bell.png" width={30} height={30} alt="bell icon" />
                    {notifications.length > 0 && (
                        <div className="absolute bg-red-500 w-4 h-4 rounded-full right-0 -top-1 flex items-center justify-center">
                            <p className="text-white text-[9px]">
                                {notifications.length}
                            </p>
                        </div>
                    )}
                    {isOpen && (
                        <div className="absolute z-40 bg-white flex flex-col py-5 w-80 -left-72 max-md:-left-40 top-8 rounded-md shadow-lg">
                            {notifications.length > 0 ? (
                                notifications.map((not, index) => (
                                    <Notification
                                        key={index}
                                        picture={not.image}
                                        by={not.by}
                                        action={not.action}
                                    />
                                ))
                            ) : (
                                <p className="px-4 py-2 text-sm text-gray-500">
                                    No notifications
                                </p>
                            )}
                        </div>
                    )}
                </button>
                <Button
                    title="logout"
                    onClick={logout}
                    isLoading={false}
                    icon="/logout.png"
                />
                <button type="button" onClick={toggleHeaderSlide} className="cursor-pointer active:opacity-50 active:scale-75 duration-300 transition-all md:hidden">
                    <List />
                </button>
            </div>
        </div>
    );
}
export default Header;