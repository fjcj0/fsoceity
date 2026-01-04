"use client";
import { useEffect, useRef } from "react";
const InputPost = ({
    setValue,
    value,
}: {
    setValue: (value: string) => void;
    value: string;
    setErrorValue: (errorValue: string) => void;
    errorValue: string;
}) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;

        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            placeholder="What's on your mind..."
            onChange={(e) => setValue(e.target.value)}
            className="
        w-full
        text-sm
        placeholder:text-white/20
        text-white
        bg-transparent
        outline-none
        resize-none
        overflow-hidden
        p-4
        leading-6
      "
        />
    );
};

export default InputPost;
