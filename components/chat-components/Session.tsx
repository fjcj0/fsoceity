import { ReactNode, useState } from "react";
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
    const { message, setMessage, picture, setPicture, voice, setVoice, setContactMessages } = useMessageStore();
    const { contactId } = useContactStore();
    const [image, setImage] = useState<string>('');
    const { socket } = useSocket();
    const onSend = async () => {
        if (!socket) return;
        let imageUrl = null;
        let voiceUrl = null;
        if (picture) imageUrl = await uploadImage(picture);
        socket.emit("on-send-contact-message", {
            receiverId: contactId,
            content: message || null,
            image: imageUrl,
            voice: voiceUrl,
        });
        setMessage("");
        setPicture(null);
        setVoice(null);
    };
    return (
        <div className="w-full h-full flex flex-col min-h-0">
            <div className="w-full">
                <div className="flex items-center justify-start shrink-0 p-4">
                    <button className="active:scale-75 transition">
                        <Phone size={24} color="white" />
                    </button>
                </div>
            </div>
            <div className="flex-1 w-full overflow-y-auto py-4 min-h-0 px-3">
                {children}
            </div>
            <div className="shrink-0">
                <div className="p-4">
                    <InputMessage
                        isUser={isUser}
                        onSend={onSend}
                    />
                </div>
            </div>
        </div>
    );
};
export default Session;