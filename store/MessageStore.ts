import { ContactMessageType } from '@/global';
import { MessageStoreInterface } from '@/types/message_store_types';
import { create } from 'zustand';
const useMessageStore = create<MessageStoreInterface>((set, get) => ({
    message: '',
    setMessage: (message: string) => {
        set({ message });
    },
    picture: null,
    setPicture: (picture: File | null) => {
        set({ picture })
    },
    voice: null,
    setVoice: (voice: AudioBuffer | null) => {
        set({ voice });
    },
    contactMessages: [],
    setContactMessages: (contactMessages: ContactMessageType[]) => {
        set({ contactMessages });
    }
}));
export default useMessageStore;