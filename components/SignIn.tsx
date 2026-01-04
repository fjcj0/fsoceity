"use client";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/AuthStore";
const SignIn = () => {
    const { isLoadingAuth, error, login } = useAuthStore();
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [errorEmail, setErrorEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");
    const validate = () => {
        let valid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            setErrorEmail("Email is required");
            valid = false;
        } else if (!emailRegex.test(email.toLowerCase())) {
            setErrorEmail("Invalid email address");
            valid = false;
        } else {
            setErrorEmail("");
        }
        if (!password) {
            setErrorPassword("Password is required");
            valid = false;
        } else if (password.length < 6) {
            setErrorPassword("Password must be at least 6 characters");
            valid = false;
        } else {
            setErrorPassword("");
        }
        return valid;
    };
    const onSignIn = async () => {
        if (!validate()) return;
        const result = await login(email, password);
        if (typeof result === "string") {
            router.replace(`/verification-code/${result}`);
        }
    };
    return (
        <div className="w-full flex flex-col items-start justify-start gap-5">
            <h1 className="text-start text-3xl font-semibold tracking-tighter bg-gradient-to-b from-neutral-50 via-neutral-300 to-neutral-700 bg-clip-text text-transparent">
                <span>Sign In</span>
                <span> To Your Account</span>
            </h1>
            <Input
                placeholder="Your email address"
                setValue={setEmail}
                value={email}
                setErrorState={setErrorEmail}
                errorState={errorEmail}
                type="email"
                isPassword={false}
            />
            <Input
                placeholder="Your password"
                setValue={setPassword}
                value={password}
                setErrorState={setErrorPassword}
                errorState={errorPassword}
                type="password"
                isPassword={true}
            />
            <Button isLoading={isLoadingAuth} title="Sign In" onClick={onSignIn} />
            {
                error &&
                <p className="text-red-500 text-xs font-light">{error}</p>
            }
            <div className="w-full flex items-end justify-end">
                <Link
                    href="/forget-password"
                    className="text-[#A495F9] underline text-sm font-light hover:text-[#A495F9]/50 duration-300 ease transition-all"
                >
                    Forget password?
                </Link>
            </div>
        </div>
    );
};
export default SignIn;