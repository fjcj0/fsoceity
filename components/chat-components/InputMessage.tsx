import { Image, Mic, Send } from "lucide-react";
import Input from "../Input";
import { useState } from "react";
const InputMessage = ({
    message,
    setMessage,
    isUser,
    onSend,
}: {
    message: string;
    setMessage: (message: string) => void;
    isUser: boolean;
    onSend: () => Promise<void>;
}) => {
    const [errorMessage, setErrorMessage] = useState("");
    return (
        <div className="w-full flex items-center gap-3">
            <button className="active:scale-75 transition">
                <Image size={26} />
            </button>
            <div className="flex-1">
                <Input
                    value={message}
                    setValue={setMessage}
                    type="text"
                    placeholder="Enter your message"
                    isPassword={false}
                    setErrorState={setErrorMessage}
                    errorState={errorMessage}
                />
            </div>
            <div className="flex items-center gap-3">
                <button className="active:scale-75 transition">
                    <Mic size={26} />
                </button>
                <button
                    onClick={onSend}
                    className="active:scale-75 transition"
                >
                    <Send size={26} />
                </button>
            </div>
        </div>
    );
};
export default InputMessage;