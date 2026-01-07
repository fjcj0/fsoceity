import { io, Socket } from "socket.io-client";
let socket: Socket | null = null;
export const connectSocket = (userId: string) => {
    if (!socket) {
        socket = io({
            path: "/api/socket/io",
            query: {
                userId,
            },
            transports: ["websocket"],
        });
    }
    return socket;
};
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
export const getSocket = () => socket;