import { io, Socket } from "socket.io-client";
let socket: Socket | null = null;
export function getSocket(): Socket {
    if (!socket) {
        socket = io(process.env.SERVER!, {
            withCredentials: true,
            autoConnect: false,
        });
        socket.connect();
    }
    return socket;
}