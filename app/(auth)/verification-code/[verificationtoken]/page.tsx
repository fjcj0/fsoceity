"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { NumericString } from "@/global";
import useAuthStore from "@/store/AuthStore";
import LoaderSpinner from "@/tools/LoaderSpinner";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
const Page = () => {
    const router = useRouter();
    const { verifyCode, checkVerificationCodePage, isCheckingPage, resendCode, error, isLoadingAuth } = useAuthStore();
    const [code, setCode] = useState<NumericString>('' as NumericString);
    const [isThePage, setIsThePage] = useState<boolean>(true);
    const [isResendCode, setIsResendCode] = useState<boolean>(false);
    const [errorCode, setErrorCode] = useState<string>('');
    const [timer, setTimer] = useState<number>(30);
    const [canResend, setCanResend] = useState<boolean>(false);
    const params = useParams();
    const verificationtoken: string = params.verificationtoken as string;
    useEffect(() => {
        if (timer === 0) {
            setCanResend(true);
            return;
        }
        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);
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
        await verifyCode(code, verificationtoken);
    };
    const onResend = async () => {
        setIsResendCode(true);
        const status: boolean = await resendCode(verificationtoken);
        if (status === true) {
            setTimer(30);
            setCanResend(false);
        }
        setIsResendCode(false);
    };
    const formatTimer = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    const checkPage = async () => {
        const status: boolean = await checkVerificationCodePage(verificationtoken);
        if (status === false) {
            setIsThePage(false);
            router.replace('/404');
        }
    }
    useEffect(() => {
        checkPage();
    }, []);
    if (isCheckingPage) {
        return (
            <LoaderSpinner />
        );
    }
    if (!isThePage) return null;
    return (
        <div className="w-screen min-h-screen flex items-center justify-center">
            <div className="flex flex-col gap-5 bg-[#090909] border-[0.3px] border-white/20 p-5 rounded-xl">
                <h1 className="text-start text-3xl font-semibold tracking-tighter bg-gradient-to-b from-neutral-50 via-neutral-300 to-neutral-700 bg-clip-text text-transparent">
                    <span>Verification</span>
                    <span> Code</span>
                </h1>
                <Input
                    type="text"
                    setValue={setCode as (code: string) => void}
                    value={code}
                    errorState={errorCode}
                    setErrorState={setErrorCode}
                    isPassword={false}
                    placeholder="Enter verification code"
                />
                <Button title="Confirm" onClick={onConfirm} isLoading={isLoadingAuth} />
                {
                    error &&
                    <p className="mb-3 text-red-500 font-light text-sm">{error}</p>
                }
                {canResend ? (
                    <button disabled={isResendCode} type="button" className={`text-white font-light text-sm self-start cursor-pointer underline ${isResendCode && 'opacity-50'}`} onClick={onResend}>
                        resend code?
                    </button>
                ) : (
                    <p className="text-sm text-gray-400">Resend code in {formatTimer(timer)}</p>
                )}
            </div>
        </div>
    );
};
export default Page;