import { NextRequest } from "next/server";
import { Server as IOServer } from "socket.io";
import { prisma } from "@/app/lib/prisma";
declare global {
    var io: IOServer | undefined;
}
export async function GET(req: NextRequest) {
    try {
        if (!global.io) {
            console.log("🔌 Initializing Socket.IO server...");
            const io = new IOServer({
                path: "/api/socket/io",
                addTrailingSlash: false,
            });
            global.io = io;
            io.use((socket, next) => {
                const userId = socket.handshake.query.userId as string;
                if (!userId) {
                    return next(new Error("Unauthorized"));
                }
                socket.data.userId = userId;
                next();
            });
            io.on("connection", (socket) => {
                const userId = socket.data.userId as string;
                socket.join(userId);
                console.log(`✅ User ${userId} connected (${socket.id})`);
                socket.on("like", async ({ postId }: { postId: string }) => {
                    const post = await prisma.post.findUnique({
                        where: { id: postId },
                        select: { authorId: true },
                    });
                    if (!post || post.authorId === userId) return;
                    io.to(post.authorId).emit("notification", {
                        type: "LIKE",
                        postId,
                        fromUserId: userId,
                        createdAt: new Date().toISOString(),
                    });
                });
                socket.on("bookmark", async ({ postId }: { postId: string }) => {
                    const post = await prisma.post.findUnique({
                        where: { id: postId },
                        select: { authorId: true },
                    });
                    if (!post || post.authorId === userId) return;
                    io.to(post.authorId).emit("notification", {
                        type: "BOOKMARK",
                        postId,
                        fromUserId: userId,
                        createdAt: new Date().toISOString(),
                    });
                });
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