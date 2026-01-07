import { NextRequest } from "next/server";
import { Server as IOServer, Socket } from "socket.io";
declare global {
    var io: IOServer | undefined;
}
export async function GET(request: NextRequest) {
    try {
        if (!global.io) {
            console.log("🔌 Initializing Socket.IO server...");
            const io = new IOServer({
                path: "/io/chat",
                addTrailingSlash: false,
            });
            global.io = io;
            io.use((socket: Socket, next) => {
                const userId: string = socket.handshake.query.userId as string;
                if (!userId) {
                    return next(new Error("Unauthorized"));
                }
                socket.data.userId = userId;
                next();
            });
            io.on("connection", (socket: Socket) => {
                const userId = socket.data.userId as string;
                socket.join(userId);
                console.log(`✅ User ${userId} connected(${socket.id})`);
                socket.on("disconnect", () => {
                    console.log(`❌ User ${userId} disconnected`);
                });
            });
        }
        return new Response("Socket.IO running", { status: 200 });
    } catch (error) {
        console.error("Socket.IO error:", error);
        return new Response("Socket error", { status: 500 });
    }
}