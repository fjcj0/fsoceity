import { ContactStoreInterface } from '@/types/contact_store_types';
import { create } from 'zustand';
const useContactStore = create<ContactStoreInterface>((set) => ({
    contactId: null,
    setSelectedContactId: (id: string) => {
        set({ contactId: id, isSelectContact: true });
    },
    isSelectContact: false
}));
export default useContactStore;
