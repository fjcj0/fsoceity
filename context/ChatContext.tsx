"use client";
import useAuthStore from "@/store/AuthStore";
import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
type ChatContextType = {
    socket: Socket | null;
};
const ChatContext = createContext<ChatContextType>({
    socket: null,
});
export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuthStore();
    const socketRef = useRef<Socket | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    useEffect(() => {
        if (!user?.id) return;
        if (socketRef.current) return;
        const initSocket = async () => {
            await fetch("/api/socket");
            const newSocket = io({
                path: "/api/socket",
                transports: ["websocket"],
                query: { userId: user.id },
            });
            socketRef.current = newSocket;
            setSocket(newSocket);
            newSocket.on("connect", () => {
                console.log("✅ Socket connected:", newSocket.id);
            });
            newSocket.on("disconnect", () => {
                console.log("❌ Socket disconnected");
            });
        };
        initSocket();
        return () => {
            socketRef.current?.disconnect();
            socketRef.current = null;
            setSocket(null);
        };
    }, [user?.id]);
    return <ChatContext.Provider value={{ socket }}>{children}</ChatContext.Provider>;
};
export const useSocket = () => useContext(ChatContext);