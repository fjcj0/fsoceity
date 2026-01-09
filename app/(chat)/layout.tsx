import { SocketProvider } from '@/context/SocketContext';
import ChatLayoutClient from '@/layouts/ChatLayoutClient';
import { ReactNode } from 'react';
const ChatLayout = ({ children }: { children: ReactNode }) => {
    return (
        <SocketProvider>
            <div className='w-screen min-h-screen bg-[#161616]'>
                <ChatLayoutClient>
                    {children}
                </ChatLayoutClient>
            </div>
        </SocketProvider>
    );
};
export default ChatLayout;