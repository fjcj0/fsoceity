"use client";
import Image from "next/image";
import { useState } from "react";
const Input = ({
    placeholder,
    type,
    isPassword,
    setErrorState,
    errorState,
    setValue,
    value,
}: {
    placeholder: string;
    type: string;
    isPassword: boolean;
    setErrorState: (errorState: string) => void;
    errorState: string;
    setValue: (value: string) => void;
    value: string;
}) => {
    const [isEyeOpen, setIsEyeOpen] = useState<boolean>(false);
    const inputType = isPassword ? (isEyeOpen ? "text" : "password") : type;
    return (
        <div className="relative w-full flex flex-col items-start justify-start">
            <input
                type={inputType}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="w-full border-[0.3px] text-sm font-light text-white border-[#303030] px-4 py-3 rounded-xl outline-0
                 placeholder:text-white/20 placeholder:font-light placeholder:text-sm"
            />
            {isPassword && (
                <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setIsEyeOpen((prev) => !prev)}
                >
                    <Image
                        src={isEyeOpen ? "/view.png" : "/eyebrow.png"}
                        alt="eye"
                        width={20}
                        height={20}
                    />
                </button>
            )}
        </div>
    );
};
export default Input;