import { ReactNode } from "react";
import { Phone } from "lucide-react";
import InputMessage from "./InputMessage";
import useMessageStore from "@/store/MessageStore";
import { uploadImage } from "@/utils/uploadImage";
import axios from "axios";
import { useSocket } from "@/context/SocketContext";
import useContactStore from "@/store/ContactStore";
axios.defaults.withCredentials = true;
const Session = ({
    children,
    isUser,
    isCallStarted,
}: {
    children: ReactNode;
    isUser: boolean;
    isCallStarted: boolean;
}) => {
    const { message, picture, setMessage, setPicture } = useMessageStore();
    const { contactId } = useContactStore();
    const { socket } = useSocket();
    const onSend = async (voiceBlob?: Blob) => {
        if (!socket) return;
        let imageUrl: string | null = null;
        let voiceUrl: string | null = null;
        if (picture) {
            imageUrl = await uploadImage(picture) as string;
        }
        if (voiceBlob) {
            const formData = new FormData();
            formData.append("file", voiceBlob);
            const res = await axios.post("/api/upload-voice", formData);
            voiceUrl = res.data.voiceUrl;
        }
        socket.emit("on-send-contact-message", {
            receiverId: contactId,
            content: message || null,
            image: imageUrl,
            voice: voiceUrl,
        });
        setMessage("");
        setPicture(null);
    };
    return (
        <div className="w-full h-full flex flex-col">
            <div className="p-4">
                <button onClick={async () => console.log('join call')} className={`${isCallStarted ? 'bg-green-600/70' : 'bg-blue-600/70'} cursor-pointer active:scale-75 active:opacity-50 transition-all duration-300 px-3 py-1 gap-1 font-bold rounded-full flex items-center justify-center text-center text-white`}>
                    <Phone size={20} />
                    <p>{!isCallStarted ? 'Call Now' : 'Join Now'}</p>
                </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3">
                {children}
            </div>

            <div className="p-4">
                <InputMessage isUser={isUser} onSend={onSend} />
            </div>
        </div>
    );
};
export default Session;