import { NextRequest } from "next/server";
import { Server as IOServer, Socket } from "socket.io";
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
                console.log(`✅ User ${userId} connected (${socket.id})`);
                socket.on("like", async ({ postId, by }: { postId: string, by: string }) => {
                    const post = await prisma.post.findUnique({
                        where: { id: postId },
                        select: { authorId: true, image: true, },
                    });
                    const liked_post = await prisma.like.create({
                        data: {
                            postId,
                            userId: by,
                        },
                        select: {
                            post: true,
                        }
                    });
                    io.to(by).emit('liked_posts', { liked_post });
                    if (!post || post.authorId === userId) return;
                    io.to(post.authorId).emit("notification", {
                        image: post.image,
                        action: `Your post liked`,
                        by: by
                    });
                });
                socket.on("bookmark", async ({ postId, by }: { postId: string, by: string }) => {
                    const post = await prisma.post.findUnique({
                        where: { id: postId },
                        select: { authorId: true, image: true },
                    });
                    const saved_post = await prisma.bookmark.create({
                        data: {
                            postId,
                            userId: by
                        }
                    });
                    io.to(by).emit("saved_posts", { saved_post });
                    if (!post || post.authorId === userId) return;
                    io.to(post.authorId).emit("notification", {
                        image: post.image,
                        action: `Your post saved`,
                        by: by
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