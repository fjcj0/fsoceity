import { create } from "zustand";
import { MessageStoreInterface } from "@/types/message_store_types";
const useMessageStore = create<MessageStoreInterface>((set) => ({
    message: "",
    setMessage: (message) => set({ message }),
    picture: null,
    setPicture: (picture) => set({ picture }),
    voice: null,
    setVoice: (voice) => set({ voice }),
    contactMessages: [],
    setContactMessages: (contactMessages) =>
        set({ contactMessages }),
    addContactMessage: (message) =>
        set((state) => ({
            contactMessages: [...state.contactMessages, message],
        })),
    clearMedia: () =>
        set({
            picture: null,
            voice: null,
        }),
}));
export default useMessageStore;