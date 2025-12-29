"use client";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
const SignUp = () => {
    const [name, setName] = useState<string>('');
    const [errorName, setErrorName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [errorEmail, setErrorEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>('');
    return (
        <form onSubmit={() => console.log('Here to submit')} className="w-full flex flex-col items-start justify-start gap-5">
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
            <Button isLoading={false} title="Sign Up" onClick={async () => console.log('Sign Up')} />
        </form>
    );
}
export default SignUp;