"use client";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/AuthStore";
const SignUp = () => {
    const { error, isLoadingAuth, signup } = useAuthStore();
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [errorName, setErrorName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [errorEmail, setErrorEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>("");
    const validate = () => {
        let valid = true;
        if (!name.trim()) {
            setErrorName("Name is required");
            valid = false;
        } else {
            setErrorName("");
        }
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
        if (!confirmPassword) {
            setErrorConfirmPassword("Confirm password is required");
            valid = false;
        } else if (password !== confirmPassword) {
            setErrorConfirmPassword("Passwords do not match");
            valid = false;
        } else {
            setErrorConfirmPassword("");
        }
        return valid;
    };
    const onSignUp = async () => {
        if (!validate()) return;
        const result = await signup(name, email.toLowerCase(), password, confirmPassword);
        if (typeof result === "string") {
            router.replace(`/verification-code/${result}`);
        }
    };
    return (
        <div className="w-full flex flex-col items-start justify-start gap-5">
            <h1 className="text-start text-3xl font-semibold tracking-tighter bg-gradient-to-b from-neutral-50 via-neutral-300 to-neutral-700 bg-clip-text text-transparent">
                <span>Sign Up</span>
                <span> To Your Account</span>
            </h1>
            <Input
                placeholder="Your full name"
                setValue={setName}
                value={name}
                setErrorState={setErrorName}
                errorState={errorName}
                type="text"
                isPassword={false}
            />
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
            <Input
                placeholder="Confirm password"
                setValue={setConfirmPassword}
                value={confirmPassword}
                setErrorState={setErrorConfirmPassword}
                errorState={errorConfirmPassword}
                type="password"
                isPassword={true}
            />
            <Button
                isLoading={isLoadingAuth}
                title="Sign Up"
                onClick={onSignUp}
            />
            {
                error &&
                <p className="text-red-500 text-xs font-light">{error}</p>
            }
        </div>
    );
};
export default SignUp;