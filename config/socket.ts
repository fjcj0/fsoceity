import { io, Socket } from "socket.io-client";
let socket: Socket | null = null;
export function getSocket(): Socket {
    if (!socket) {
        socket = io(process.env.NEXT_PUBLIC_SERVER, {
            withCredentials: true,
            autoConnect: false,
            transports: ["websocket"]
        });
        socket.connect();
    }
    return socket;
}