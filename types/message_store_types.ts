import { ContactMessageType } from "@/global"
export interface MessageStoreInterface {
    message: string,
    setMessage: (message: string) => void
    picture: File | null,
    setPicture: (picture: File | null) => void,
    voice: Blob | null,
    setVoice: (voice: Blob | null) => void,
    contactMessages: ContactMessageType[],
    setContactMessages: (contactMessages: ContactMessageType[]) => void,
    addContactMessage: (message: ContactMessageType) => void;
}