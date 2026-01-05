"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Media from "@/components/home-components/Media";
import Post from "@/components/home-components/Post";
import LoaderSpinner from "@/tools/LoaderSpinner";
import { PostType } from "@/global";
export default function Page() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);
    const fetchingRef = useRef(false);
    const fetchPosts = useCallback(async () => {
        if (fetchingRef.current || !hasMore) return;
        fetchingRef.current = true;
        setLoading(true);
        try {
            const res = await fetch(
                `/api/auth/posts?limit=5${cursor ? `&cursor=${cursor}` : ""}`
            );
            const data = await res.json();
            setPosts(prev => {
                const existingIds = new Set(prev.map(p => p.id));
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
        if (!loaderRef.current || !hasMore) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    fetchPosts();
                }
            },
            { rootMargin: "150px" }
        );
        observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [loaderRef.current, fetchPosts, hasMore]);
    return (
        <div className="w-full flex flex-col items-center max-w-6xl mx-auto">
            <div className="w-full max-w-2xl">
                <Media />
            </div>
            <div className="mt-10 w-full grid grid-cols-1 gap-6">
                {posts.map(post => (
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
                <div ref={loaderRef} className="py-6 flex justify-center">
                    {loading && <LoaderSpinner />}
                </div>
            )}
        </div>
    );
}