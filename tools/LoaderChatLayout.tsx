const LoaderChatLayout = () => {
    return (
        <div className="w-full h-[38rem] rounded-3xl overflow-hidden">
            <div className="w-full h-full grid grid-cols-12 min-h-0 bg-black/40">
                <div className="col-span-2 bg-black overflow-y-auto p-3">
                    <div className="flex flex-col gap-4 animate-pulse">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-2 bg-white/20 rounded w-3/4" />
                                    <div className="h-2 bg-white/10 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-10 h-full min-h-0 p-6 animate-pulse">
                    <div className="flex flex-col gap-4">
                        <div className="w-1/3 h-10 bg-white/20 rounded-lg" />
                        <div className="w-1/2 h-10 bg-white/20 rounded-lg self-end" />
                        <div className="w-2/5 h-10 bg-white/20 rounded-lg" />
                        <div className="w-1/3 h-10 bg-white/20 rounded-lg self-end" />
                        <div className="mt-6 w-24 h-6 bg-white/10 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoaderChatLayout;