"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Media from "@/components/home-components/Media";
import Post from "@/components/home-components/Post";
import LoaderSpinner from "@/tools/LoaderSpinner";
import { PostType } from "@/global";
import useAuthStore from "@/store/AuthStore";
const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const postVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};
export default function Page() {
    const { user } = useAuthStore();
    const [posts, setPosts] = useState<PostType[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const fetchingRef = useRef(false);
    const fetchPosts = useCallback(async () => {
        if (fetchingRef.current || !hasMore) return;
        fetchingRef.current = true;
        setLoading(true);
        try {
            const res = await fetch(`/api/auth/posts?limit=5${cursor ? `&cursor=${cursor}` : ""}`);
            const data = await res.json();
            setPosts((prev) => {
                const existingIds = new Set(prev.map((p) => p.id));
                const newPosts = data.posts.filter((p: PostType) => !existingIds.has(p.id));
                return [...prev, ...newPosts];
            });
            setCursor(data.nextCursor);
            setHasMore(Boolean(data.nextCursor));
        } catch (err) {
            console.error("Failed to fetch posts:", err);
        } finally {
            setLoading(false);
            fetchingRef.current = false;
        }
    }, [cursor, hasMore]);
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);
    useEffect(() => {
        if (!hasMore) return;
        const node = loaderRef.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) fetchPosts();
            },
            { rootMargin: "150px" }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [fetchPosts, hasMore]);
    return (
        <div className="w-full flex flex-col items-center max-w-6xl mx-auto">
            <div className="w-full max-w-2xl">
                <Media />
            </div>
            <motion.div
                className="mt-10 w-full grid grid-cols-1 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence>
                    {posts.map((post: PostType) => (
                        <motion.div
                            key={post.id}
                            variants={postVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, y: 10 }}
                            layout
                        >
                            <Post
                                id={post.id}
                                name={post.author.name}
                                profilePicture={post.author.profilePicture}
                                paragraph={post.content}
                                image={post.image || "/account.png"}
                                likesNumber={post.likes.length}
                                isLiked={post.likes.some(like => like.userId === user?.id)}
                                isSaved={post.bookmarks.some(bookmark => bookmark.userId === user?.id)}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
            {hasMore && (
                <motion.div
                    ref={loaderRef}
                    className="py-6 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {loading && <LoaderSpinner />}
                </motion.div>
            )}
        </div>
    );
}