import { ChatProvider } from '@/context/ChatContext';
import ChatLayoutClient from '@/layouts/ChatLayoutClient';
import { ReactNode } from 'react';
const ChatLayout = ({ children }: { children: ReactNode }) => {
    return (
        <ChatProvider>
            <div className='w-screen min-h-screen bg-[#161616]'>
                <ChatLayoutClient>
                    {children}
                </ChatLayoutClient>
            </div>
        </ChatProvider>
    );
};
export default ChatLayout;