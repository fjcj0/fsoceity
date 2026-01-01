"use client";
import Contact from "@/components/contact-components/Contact";
import Input from "@/components/Input";
import { dummyContacts } from "@/constants/data";
import { useState } from "react";
const page = () => {
    const [contactName, setContactName] = useState<string>('');
    const [errorContactName, setErrorContactName] = useState<string>('');
    const [type, setType] = useState<'All' | 'Accepted' | 'Pending'>('All');
    return (
        <div className="flex flex-col items-start justify-start">
            <div className="flex items-center justify-center w-full gap-x-2">
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
                    className=" px-2 py-2 rounded-xl bg-black/50">
                    <option value="All">All</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Pending">Pending</option>
                </select>
            </div>
            <div className="mt-13 grid grid-cols-4 max-lg:grid-cols-3 gap-5 max-md:grid-cols-2 w-full">
                {
                    dummyContacts.map((contact, index) => (
                        <Contact
                            key={index}
                            {
                            ...contact
                            }
                        />
                    ))
                }
            </div>
        </div>
    );
}
export default page;