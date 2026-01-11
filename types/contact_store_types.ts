export interface ContactStoreInterface {
    contactId: string | null;
    setSelectedContactId: (id: string) => void;
    isSelectContact: boolean;
}
