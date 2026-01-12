import { ContactMessageType } from '@/global';
import { MessageStoreInterface } from '@/types/message_store_types';
import { blob } from 'stream/consumers';
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
    setVoice: (voice: Blob | null) => {
        set({ voice });
    },
    contactMessages: [],
    setContactMessages: (contactMessages: ContactMessageType[]) => {
        set({ contactMessages });
    },
    addContactMessage: (message: ContactMessageType) =>
        set((state) => ({
            contactMessages: [...state.contactMessages, message]
        })),
}));
export default useMessageStore;