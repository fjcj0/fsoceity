import Loader from "./Loader";

export default function Button({
    title,
    onClick,
    isLoading
}: {
    title: string,
    onClick: () => Promise<void>,
    isLoading: boolean
}) {
    return (
        <>
            <style>{`
                @keyframes rotate {
                    100% {
                        transform: rotate(1turn);
                    }
                }
            
                .rainbow::before {
                    content: '';
                    position: absolute;
                    z-index: -2;
                    left: -50%;
                    top: -50%;
                    width: 200%;
                    height: 200%;
                    background-position: 100% 50%;
                    background-repeat: no-repeat;
                    background-size: 50% 30%;
                    filter: blur(6px);
                    background-image: linear-gradient(#FFF);
                    animation: rotate 4s linear infinite;
                }
            `}</style>
            <div className="w-full rainbow relative z-0 bg-white/10 overflow-hidden p-0.5 flex items-center justify-center rounded-full transition duration-300 active:scale-100">
                <button
                    disabled={isLoading}
                    type="submit" className={`${isLoading ? 'opacity-50 cursor-auto' : 'cursor-pointer hover:bg-black/75'} w-full font-bold transition-all duration-400 ease px-8 text-sm py-3 text-white rounded-full bg-black backdrop-blur flex items-center justify-center`}>
                    {isLoading ? <Loader /> : title}
                </button>
            </div>
        </>
    );
};