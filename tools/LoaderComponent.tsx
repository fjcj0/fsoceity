const LoaderComponent = () => {
    return (
        <div className="mx-auto w-full flex items-center justify-center rounded-md bg-black/50 p-4">
            <div className="flex animate-pulse space-x-4 w-full">
                <div className="size-10 rounded-full bg-white/20"></div>
                <div className="flex-1 space-y-4 py-1">
                    <div className="h-2 rounded bg-white/20 w-3/4"></div>
                    <div className="space-y-2">
                        <div className="h-2 rounded bg-white/20"></div>
                        <div className="h-2 rounded bg-white/20 w-5/6"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoaderComponent;
