"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
const page = () => {
    const [email, setEmail] = useState<string>('');
    const [errorEmail, setErrorEmail] = useState<string>('');
    const validate = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            setErrorEmail("Email is required");
            return false;
        } else if (!emailRegex.test(email.toLowerCase())) {
            setErrorEmail("Invalid email address");
            return false;
        } else {
            setErrorEmail("");
            return true;
        }
    };
    const onRecover = async () => {
        if (!validate()) return;
    };
    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <form className="flex flex-col gap-5 bg-[#090909] border-[0.3px] border-white/20 p-5 rounded-xl">
                <h1 className="text-start text-3xl font-semibold tracking-tighter bg-gradient-to-b from-neutral-50 via-neutral-300 to-neutral-700 bg-clip-text text-transparent">
                    <span>Recover Account</span>
                    <span> By Your Email</span>
                </h1>
                <Input
                    type="email"
                    setValue={setEmail}
                    value={email}
                    errorState={errorEmail}
                    setErrorState={setErrorEmail}
                    isPassword={false}
                    placeholder="Your email address"
                />
                <Button title="Recover" onClick={onRecover} isLoading={false} />
            </form>
        </div>
    );
};
export default page;