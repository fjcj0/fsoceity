"use client";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { Socket } from "socket.io-client";
import { getSocket } from "@/config/socket";
type SocketContextType = {
    socket: Socket | null;
    connected: boolean;
    notifications: NotificatioType[];
    setNotifications: React.Dispatch<React.SetStateAction<NotificatioType[]>>;
};
type NotificatioType = {
    action: string,
    by: string,
    image: string
}
const SocketContext = createContext<SocketContextType>({
    socket: null,
    connected: false,
    notifications: [],
    setNotifications: () => { },

});
export function SocketProvider({ children }: { children: ReactNode }) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState(false);
    const [notifications, setNotifications] = useState<NotificatioType[]>([]);
    useEffect(() => {
        const socketInstance = getSocket();
        socketInstance.on("connect", () => {
            console.log("Connected:", socketInstance.id);
            setConnected(true);
        });
        socketInstance.on("disconnect", () => {
            setConnected(false);
        });
        setSocket(socketInstance);
        return () => {
            socketInstance.off("connect");
            socketInstance.off("disconnect");
        };
    }, []);
    return (
        <SocketContext.Provider value={{ socket, connected, notifications, setNotifications }}>
            {children}
        </SocketContext.Provider>
    );
}
export function useSocket() {
    return useContext(SocketContext);
}