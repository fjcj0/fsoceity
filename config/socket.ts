import { io, Socket } from "socket.io-client";
let socket: Socket | null = null;
export function getSocket(): Socket {
    if (!socket) {
        socket = io("http://localhost:1230", {
            withCredentials: true,
            autoConnect: false,
        });
        socket.connect();
    }
    return socket;
}