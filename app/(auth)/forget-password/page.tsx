"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
const ForgetPasswordPage = () => {
    const [email, setEmail] = useState<string>('');
    const [errorEmail, setErrorEmail] = useState<string>('');
    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <form action="" className="flex flex-col gap-5 bg-[#090909] border-[0.3px] border-white/20 p-5 rounded-xl">
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
                <Button title="Recover" onClick={async () => console.log('recover')} isLoading={false} />
            </form>
        </div>
    );
}
export default ForgetPasswordPage;