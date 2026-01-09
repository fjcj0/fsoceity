"use client";
import Input from "@/components/Input";
import Request from "@/components/request-components/Request";
import { dummyContacts } from "@/constants/data";
import { useState } from "react";
const page = () => {
    const [name, setName] = useState<string>('');
    const [errorName, setErrorName] = useState<string>('');
    return (
        <div className="flex flex-col gap-y-5">
            <Input
                placeholder="Enter name"
                value={name}
                setValue={setName}
                errorState={errorName}
                setErrorState={setErrorName}
                type="text"
                isPassword={false}
            />
            <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-5 w-full">
                {dummyContacts.map((dummy, index) => (
                    <Request
                        key={index}
                        name={dummy.name}
                        status="pending"
                        createdAt={dummy.date}
                        image={dummy.profilePicture}
                        id={'1'}
                    />
                ))}
            </div>
        </div>
    );
}
export default page;