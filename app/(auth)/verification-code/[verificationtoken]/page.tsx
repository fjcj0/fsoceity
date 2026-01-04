"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useParams } from "next/navigation";
import { useState } from "react";
const page = () => {
    const [code, setCode] = useState<string>('');
    const [errorCode, setErrorCode] = useState<string>('');
    const params = useParams();
    const verificationtoken = params.verificationtoken;
    const validate = () => {
        const codeRegex = /^\d{6}$/;
        if (!code.trim()) {
            setErrorCode("Verification code is required");
            return false;
        } else if (!codeRegex.test(code)) {
            setErrorCode("Code must be exactly 6 digits");
            return false;
        } else {
            setErrorCode("");
            return true;
        }
    };
    const onConfirm = async () => {
        if (!validate()) return;
    };
    return (
        <div className="w-screen min-h-screen flex items-center justify-center">
            <form className="flex flex-col gap-5 bg-[#090909] border-[0.3px] border-white/20 p-5 rounded-xl">
                <h1 className="text-start text-3xl font-semibold tracking-tighter bg-gradient-to-b from-neutral-50 via-neutral-300 to-neutral-700 bg-clip-text text-transparent">
                    <span>Verification</span>
                    <span> Code</span>
                </h1>
                <Input
                    type="text"
                    setValue={setCode}
                    value={code}
                    errorState={errorCode}
                    setErrorState={setErrorCode}
                    isPassword={false}
                    placeholder="Enter verification code"
                />
                <Button title="Confirm" onClick={onConfirm} isLoading={false} />
            </form>
        </div>
    );
};
export default page;