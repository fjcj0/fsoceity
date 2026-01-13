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
    onSend: (voiceBlob?: Blob) => Promise<void>;
}) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { message, setMessage, picture, setPicture } = useMessageStore();
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
        return () => URL.revokeObjectURL(url);
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
        setPicture(e.target.files?.[0] || null);
    };
    const removeImage = () => {
        setPicture(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };
    const handleMicClick = async () => {
        if (isRecording) {
            mediaRecorderRef.current?.stop();
            setIsRecording(false);
            return;
        }
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;
        const chunks: Blob[] = [];
        recorder.ondataavailable = (e) => {
            if (e.data.size) chunks.push(e.data);
        };
        recorder.onstop = async () => {
            stream.getTracks().forEach(track => track.stop());
            const blob = new Blob(chunks, { type: "audio/webm" });
            await handleSend(blob);
        };
        recorder.start();
        setIsRecording(true);
    };
    const handleSend = async (voiceBlob?: Blob) => {
        if (!message && !picture && !voiceBlob) return;
        setIsSending(true);
        try {
            await onSend(voiceBlob);
            setMessage("");
            setPicture(null);
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
            <button onClick={handleImageClick} disabled={isSending} className={`${isSending && 'opacity-50'}`}>
                <ImageIcon size={26} />
            </button>
            <div className="flex-1 relative">
                {previewUrl && (
                    <div className="absolute bottom-14 left-0">
                        <div className="relative">
                            <ImageNext
                                src={previewUrl}
                                alt="preview"
                                width={100}
                                height={100}
                                className="rounded object-cover"
                            />
                            <button
                                onClick={removeImage}
                                className="absolute -top-2 -right-2 bg-red-500 w-5 h-5 rounded-full flex items-center justify-center"
                            >
                                <XIcon size={14} color="white" />
                            </button>
                        </div>
                    </div>
                )}
                <Input
                    value={message}
                    setValue={setMessage}
                    placeholder="Enter your message"
                    type="text"
                    isPassword={false}
                    setErrorState={setErrorMessage}
                    errorState={errorMessage}
                />
            </div>
            <div className="flex gap-3">
                <button onClick={handleMicClick} disabled={isSending} className={`${isSending && 'opacity-50'}`}>
                    {isRecording ? <StopCircle size={26} color="red" /> : <Mic size={26} />}
                </button>
                <button onClick={() => handleSend()} disabled={isSending} className={`${isSending && 'opacity-50'}`}>
                    <Send size={26} />
                </button>
            </div>
        </div>
    );
};
export default InputMessage;