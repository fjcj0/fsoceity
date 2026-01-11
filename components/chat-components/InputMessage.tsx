"use client";
import { Mic, Send, StopCircle, Image as ImageIcon, XIcon } from "lucide-react";
import Input from "../Input";
import { useState, useRef, useEffect } from "react";
import useMessageStore from "@/store/MessageStore";
import ImageNext from "next/image";
const InputMessage = ({
    isUser,
    onSend,
}: {
    isUser: boolean;
    onSend: () => Promise<void>;
}) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const {
        message,
        setMessage,
        picture,
        setPicture,
        voice,
        setVoice,
    } = useMessageStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    useEffect(() => {
        if (!picture) {
            setPreviewUrl(null);
            return;
        }
        const url = URL.createObjectURL(picture);
        setPreviewUrl(url);
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [picture]);
    useEffect(() => {
        return () => {
            streamRef.current?.getTracks().forEach(track => track.stop());
        };
    }, []);
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setPicture(file);
    };
    const removeImage = () => {
        setPicture(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    const handleMicClick = async () => {
        if (isRecording) {
            mediaRecorderRef.current?.stop();
            streamRef.current?.getTracks().forEach(track => track.stop());
            streamRef.current = null;
            setIsRecording(false);
            return;
        }
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        const chunks: Blob[] = [];
        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunks.push(e.data);
        };
        mediaRecorder.onstop = async () => {
            const blob = new Blob(chunks, { type: "audio/webm" });
            const arrayBuffer = await blob.arrayBuffer();
            const audioCtx = new AudioContext();
            const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
            setVoice(audioBuffer);
        };
        mediaRecorder.start();
        setIsRecording(true);
    };
    const handleSend = async () => {
        if (!message && !picture && !voice) return;
        setIsSending(true);
        try {
            await onSend();
            setMessage("");
            setPicture(null);
            setVoice(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } finally {
            setIsSending(false);
        }
    };
    return (
        <div className="w-full flex items-center gap-3">
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
            <button onClick={handleImageClick} className="active:scale-75 transition">
                <ImageIcon size={26} />
            </button>
            <div className="flex-1 relative">
                {previewUrl && (
                    <div className="absolute bottom-14 left-0">
                        <div className="relative">
                            <ImageNext
                                src={previewUrl}
                                alt="Selected image"
                                width={100}
                                height={100}
                                className="rounded object-cover"
                            />
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute -top-2 -right-2 bg-red-500 w-5 h-5 flex items-center justify-center rounded-full"
                            >
                                <XIcon size={14} color="white" />
                            </button>
                        </div>
                    </div>
                )}
                {isSending ? (
                    <div className="w-full py-2 px-3 bg-gray-100 rounded-md text-gray-500 animate-pulse">
                        Sending...
                    </div>
                ) : (
                    <Input
                        value={message}
                        setValue={setMessage}
                        type="text"
                        placeholder="Enter your message"
                        isPassword={false}
                        setErrorState={setErrorMessage}
                        errorState={errorMessage}
                    />
                )}
            </div>
            <div className="flex items-center gap-3">
                <button
                    onClick={handleMicClick}
                    className={`active:scale-75 transition ${isRecording ? "text-red-500" : ""
                        }`}
                >
                    {isRecording ? <StopCircle size={26} /> : <Mic size={26} />}
                </button>
                <button
                    onClick={handleSend}
                    disabled={isSending}
                    className="active:scale-75 transition"
                >
                    <Send size={26} />
                </button>
            </div>
        </div>
    );
};
export default InputMessage;