const LoaderComponent = () => {
    return (
        <div className="mx-auto w-full flex items-start justify-start rounded-md bg-black/50 p-4">
            <div className="flex flex-col items-start justify-start animate-pulse space-y-6 w-full h-[13rem]">
                <div className="w-28 h-28 rounded-full bg-white/20" />
                <div className="w-full space-y-4">
                    <div className="h-2 rounded bg-white/20 w-3/4"></div>
                    <div className="space-y-2">
                        <div className="h-2 rounded bg-white/20 w-full"></div>
                        <div className="h-2 rounded bg-white/20 w-5/6"></div>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default LoaderComponent;