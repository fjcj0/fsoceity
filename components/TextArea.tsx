"use client";
const TextArea = ({
    placeholder,
    setErrorState,
    errorState,
    setValue,
    value,
}: {
    placeholder: string;
    setErrorState: (errorState: string) => void;
    errorState: string;
    setValue: (value: string) => void;
    value: string;
}) => {
    return (
        <div className="w-full flex flex-col items-start justify-start">
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    if (errorState) setErrorState("");
                }}
                rows={4}
                className={`w-full border-[0.3px] text-sm font-light px-4 py-3 rounded-xl outline-0 resize-none
                placeholder:text-white/20 placeholder:font-light placeholder:text-sm
                ${
                    errorState
                        ? "border-red-500 text-red-500"
                        : "border-[#303030] text-white"
                }`}
            />
            {errorState && (
                <span className="text-red-500 text-xs mt-1">
                    {errorState}
                </span>
            )}
        </div>
    );
};
export default TextArea;