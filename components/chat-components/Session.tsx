import { ReactNode, useState } from "react";
import { Phone } from "lucide-react";
import InputMessage from "./InputMessage";
const Session = ({
    children,
    isUser,
    isCallStarted,
}: {
    children: ReactNode;
    isUser: boolean;
    isCallStarted: boolean;
}) => {
    const [message, setMessage] = useState("");
    const onSend = async () => {
        if (!message.trim()) return;
        console.log("Send:", message);
        setMessage("");
    };
    return (
        <div className="w-full h-full flex flex-col min-h-0">
            <div className="w-full">
                <div className="flex items-center justify-between shrink-0 p-4">
                    <button className="active:scale-75 transition">
                        <Phone size={24} color="white" />
                    </button>
                    <button className="text-white text-2xl">⋯</button>
                </div>
            </div>
            <div className="flex-1 w-full overflow-y-auto py-4 min-h-0 px-3">
                {children}
            </div>
            <div className="shrink-0">
                <div className="p-4">
                    <InputMessage
                        message={message}
                        setMessage={setMessage}
                        isUser={isUser}
                        onSend={onSend}
                    />
                </div>
            </div>
        </div>
    );
};
export default Session;