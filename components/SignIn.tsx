"use client";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Link from "next/link";
const SignIn = () => {
    const [email, setEmail] = useState<string>('');
    const [errorEmail, setErrorEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    return (
        <form onSubmit={() => console.log('Here to submit')} className="w-full flex flex-col items-start justify-start gap-5">
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
            <Button isLoading={false} title="Sign In" onClick={async () => console.log('Sign In')} />
            <div className="w-full flex items-end justify-end">
                <Link href={'/'} className="text-[#A495F9] underline text-sm font-light hover:text-[#A495F9]/50 duration-300 ease transition-all" >Forget password?</Link>
            </div>
        </form>
    );
}
export default SignIn;