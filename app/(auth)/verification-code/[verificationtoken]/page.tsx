"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useParams } from "next/navigation";
import { useState } from "react";
const VerificationPage = () => {
    const [code, setCode] = useState<string>('');
    const [errorCode, setErrorCode] = useState<string>('');
    const params = useParams();
    const verificationtoken = params.verificationtoken;
    return (
        <div className="w-screen min-h-screen flex items-center justify-center">
            <form action="" className="flex flex-col gap-5 bg-[#090909] border-[0.3px] border-white/20 p-5 rounded-xl">
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
                    placeholder="Enter verfication code"
                />
                <Button title="Confirm" onClick={async () => console.log('recover')} isLoading={false} />
            </form>
        </div>
    );
}
export default VerificationPage;