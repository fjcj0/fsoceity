const Loader = () => {
    return (
        <svg
            className="animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width="24"
            height="24"
        >
            <circle
                className="opacity-100"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth={4}
                strokeLinecap="round"
                strokeDasharray="31.4 31.4"
                strokeDashoffset="0"
            />
        </svg>
    );
};
export default Loader;