import { ContactMessageType } from "@/global"
export interface MessageStoreInterface {
    message: string,
    setMessage: (message: string) => void
    picture: File | null,
    setPicture: (picture: File | null) => void,
    voice: AudioBuffer | null,
    setVoice: (voice: AudioBuffer | null) => void,
    contactMessages: ContactMessageType[],
    setContactMessages: (contactMessages: ContactMessageType[]) => void,
}