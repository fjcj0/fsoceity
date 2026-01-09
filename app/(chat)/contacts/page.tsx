"use client";
import Contact from "@/components/contact-components/Contact";
import Input from "@/components/Input";
import { useState, useEffect } from "react";
import axios from "axios";
import { ContactType } from "@/global";
import LoaderComponent from "@/tools/LoaderComponent";
axios.defaults.withCredentials = true;
const page = () => {
    const [contactName, setContactName] = useState<string>("");
    const [errorContactName, setErrorContactName] = useState<string>("");
    const [filter, setFilter] = useState<"Notsent" | "Accepted" | "Pending">("Notsent");
    const [contacts, setContacts] = useState<ContactType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasFetched, setHasFetched] = useState<boolean>(false);
    useEffect(() => {
        const timeout = setTimeout(() => {

        }, 2000);
        return () => clearTimeout(timeout);
    }, []);
    return (
        <div className="flex flex-col items-start justify-start p-4 w-full">
            <div className="flex items-center justify-start w-full gap-x-2 mb-6">
                <Input
                    placeholder="Enter contact name"
                    value={contactName}
                    setValue={setContactName}
                    errorState={errorContactName}
                    setErrorState={setErrorContactName}
                    type="text"
                    isPassword={false}
                />
                <select
                    className="px-2 py-2 rounded-xl bg-black/50"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as any)}
                >
                    <option value="Notsent">NotSent</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Pending">Pending</option>
                </select>
            </div>
            {isLoading ? (
                <div className="grid md:grid-cols-4 grid-cols-2 gap-3 w-full">
                    {
                        Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).map((arr, index) => (
                            <LoaderComponent key={index} />
                        ))
                    }
                </div>) : (
                <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-5 w-full">
                    {contacts.length === 0 && hasFetched ? (
                        <h1 className="text-center col-span-full text-sm text-white/50">
                            No contacts found
                        </h1>
                    ) : (
                        contacts.map((contact) => (
                            <Contact
                                key={contact.id}
                                name={contact.name}
                                profilePicture={contact.profilePicture || "/account.png"} // default
                                isAccepted={contact.isAccepted || false}
                                isPending={contact.isPending || false}
                                isSent={contact.isSent || false}
                                createdAt={contact.createdAt}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};
export default page;