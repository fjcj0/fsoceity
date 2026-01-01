"use client";
import Contact from "@/components/contact-components/Contact";
import Input from "@/components/Input";
import { dummyContacts } from "@/constants/data";
import { useState } from "react";
const page = () => {
    const [contactName, setContactName] = useState<string>("");
    const [errorContactName, setErrorContactName] = useState<string>("");
    const [filter, setFilter] = useState<"All" | "Accepted" | "Pending">("All");
    const filteredContacts = dummyContacts.filter((contact) => {
        switch (filter) {
            case "Accepted":
                return contact.isAccepted;
            case "Pending":
                return contact.isPending;
            default:
                return true;
        }
    });
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
                    <option value="All">All</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Pending">Pending</option>
                </select>
            </div>
            <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-5 w-full">
                {filteredContacts
                    .filter((contact) =>
                        contact.name.toLowerCase().includes(contactName.toLowerCase())
                    )
                    .map((contact, index) => (
                        <Contact key={index} {...contact} />
                    ))}
            </div>
        </div>
    );
};
export default page;