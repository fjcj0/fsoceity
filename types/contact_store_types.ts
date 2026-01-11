export interface ContactStoreInterface {
    contactId: string | null;
    setSelectedContactId: (id: string | null) => void;
    isSelectContact: boolean;
}
