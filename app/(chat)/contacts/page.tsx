"use client";
import Contact from "@/components/contact-components/Contact";
import Input from "@/components/Input";
import LoaderComponent from "@/tools/LoaderComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import { ContactType } from "@/global";
axios.defaults.withCredentials = true;
const page = () => {
    const [contactName, setContactName] = useState("");
    const [errorContactName, setErrorContactName] = useState("");
    const [filter, setFilter] = useState<"Notsent" | "Pending" | "Accepted">("Notsent");
    const [contacts, setContacts] = useState<ContactType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);
    const fetchContacts = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get("/api/auth/display-requests", {
                params: {
                    name: contactName,
                    filter
                }
            });
            setContacts(res.data.contacts || []);
            setHasFetched(true);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchContacts();
        }, 500);
        return () => clearTimeout(timeout);
    }, [contactName, filter]);
    return (
        <div className="flex flex-col p-4 w-full">
            <div className="flex gap-2 mb-6 w-full">
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
                    className="px-3 py-2 rounded-xl bg-black/50 text-sm"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as any)}
                >
                    <option value="Notsent">Not Sent</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                </select>
            </div>
            {isLoading && (
                <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-5">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <LoaderComponent key={i} />
                    ))}
                </div>
            )}
            {!isLoading && (
                <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-5">
                    {contacts.length === 0 && hasFetched ? (
                        <h1 className="col-span-full text-center text-white/50 text-sm">
                            No contacts found
                        </h1>
                    ) : (
                        contacts.map((contact) => (
                            <Contact
                                key={contact.id}
                                id={contact.id}
                                name={contact.name}
                                profilePicture={contact.profilePicture || "/account.png"}
                                isAccepted={contact.isAccepted}
                                isPending={contact.isPending}
                                isSent={contact.isSent}
                                createdAt={contact.createdAt}
                                setContacts={setContacts}
                                type={filter}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};
export default page;