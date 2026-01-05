"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Media from "@/components/home-components/Media";
import Post from "@/components/home-components/Post";
import LoaderSpinner from "@/tools/LoaderSpinner";
import { PostType } from "@/global";
export default function Page() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const fetchPosts = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const res = await fetch(
                `/api/auth/posts?limit=5${cursor ? `&cursor=${cursor}` : ""}`
            );
            const data = await res.json();
            setPosts((prev) => [...prev, ...data.posts]);
            setCursor(data.nextCursor);
            setHasMore(Boolean(data.nextCursor));
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    }, [cursor, loading, hasMore]);
    useEffect(() => {
        fetchPosts();
    }, []);
    useEffect(() => {
        if (!hasMore || loading) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    observer.disconnect();
                    fetchPosts();
                }
            },
            { rootMargin: "120px" }
        );
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [fetchPosts, hasMore, loading]);
    return (
        <div className="w-full flex flex-col items-center max-w-6xl mx-auto">
            <div className="w-full max-w-2xl">
                <Media />
            </div>
            <div className="mt-10 w-full grid grid-cols-1 gap-6">
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        name={post.author.name}
                        profilePicture={post.author.profilePicture}
                        paragraph={post.content}
                        image={post.image || "/account.png"}
                        likesNumber={post.likes.length}
                        isLiked={false}
                        isBookMarked={post.bookmarks.length > 0}
                    />
                ))}
            </div>

            {hasMore && (
                <div
                    ref={loaderRef}
                    className="py-6 w-full flex items-center justify-center"
                >
                    {loading && <LoaderSpinner />}
                </div>
            )}
        </div>
    );
}