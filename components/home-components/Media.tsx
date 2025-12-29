"use client";
import { useRef, useState } from "react";
import InputPost from "./InputPost";
import { Send, Image as Picture, X } from "lucide-react";
const Media = () => {
    const [text, setText] = useState<string>("");
    const [errorText, setErrorText] = useState<string>("");
    const [picture, setPicture] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handlePictureClick = () => {
        fileInputRef.current?.click();
    };
    const handlePictureChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setPicture(file);
        e.target.value = "";
    };
    const handleRemovePicture = () => {
        setPicture(null);
    };
    return (
        <div className="w-full flex flex-col bg-black rounded-xl">
            <div className="w-full flex items-center gap-3 px-5">
                <button type="button" onClick={handlePictureClick}>
                    <Picture className="text-white cursor-pointer hover:opacity-50 duration-300 transition-all ease-out" />
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePictureChange}
                />
                <InputPost
                    setValue={setText}
                    value={text}
                    setErrorValue={setErrorText}
                    errorValue={errorText}
                />
                <button type="button">
                    <Send className="text-white cursor-pointer hover:opacity-50 duration-300 transition-all ease-out" />
                </button>
            </div>
            <div
                className={`
          overflow-hidden
          transition-all
          duration-300
          ease-in-out
          ${picture ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
        `}
            >
                {picture && (
                    <div className="relative px-5 pb-3 w-fit">
                        <img
                            src={URL.createObjectURL(picture)}
                            alt="preview"
                            className="max-h-32 rounded"
                        />
                        <button
                            type="button"
                            onClick={handleRemovePicture}
                            className="absolute cursor-pointer top-1 right-1 bg-black text-white rounded-full p-1"
                        >
                            <X size={14} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Media;