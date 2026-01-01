"use client";
import Image from "next/image";
import animation from "../../../animations/Globe.json";
import Lottie from "lottie-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignUp from "@/components/SignUp";
import SignIn from "@/components/SignIn";
const page = () => {
    const [authState, setAuthState] = useState<"sign-in" | "sign-up">("sign-up");
    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };
    return (
        <div className="w-screen min-h-screen flex items-center justify-center bg-[#000000] py-10">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeIn" }}
                className="w-full max-w-[95%] grid grid-cols-1 md:grid-cols-2 border-[0.3px] rounded-lg border-[#303030]"
            >
                <div className="bg-[#030305] p-5 flex flex-col gap-y-3 items-center justify-center order-1 md:order-2 rounded-t-lg md:rounded-t-none md:rounded-r-lg">
                    <div className="relative w-full">
                        <p className="text-start text-3xl font-semibold tracking-tighter bg-gradient-to-b from-neutral-50 via-neutral-300 to-neutral-700 bg-clip-text text-transparent">
                            <span>Secure Encrypted Chat</span>
                            <br />
                            <span>400+ Users Learning Tech</span>
                        </p>
                        <div className="flex absolute flex-col items-end justify-end mt-5">
                            <Image
                                src="/up-arrow.png"
                                width={40}
                                height={40}
                                alt="up-arrow"
                                className="absolute bottom-4 right-16"
                            />
                            <button
                                type="button"
                                disabled
                                className="bg-[#A495F9] px-2 py-1 rounded-md"
                            >
                                Join Now
                            </button>
                        </div>
                    </div>
                    <div className="w-full">
                        <Lottie animationData={animation} loop />
                    </div>
                </div>
                <div className="bg-[#090909] flex flex-col p-5 items-start justify-center gap-7 order-2 md:order-1 rounded-b-lg md:rounded-b-none md:rounded-l-lg">
                    <div className="text-white font-bold text-3xl flex items-center justify-center gap-2">
                        <Image src={"/fsoceity.png"} alt="fsoceity" width={40} height={40} />
                        <h1>Welcome!</h1>
                    </div>
                    <p className="font-light text-white text-sm">
                        Log in to begin your journey into our exclusive world of technology,
                        where innovation, creativity, and modern digital solutions come together
                        to shape the future
                    </p>
                    <div className="w-full relative flex rounded-full border-[0.3px] border-[#303030] overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full w-1/2 bg-[#A495F9] rounded-full transition-all duration-300 ease-in"
                            style={{
                                transform: authState === "sign-up" ? "translateX(0%)" : "translateX(100%)",
                            }}
                        ></div>
                        <button
                            onClick={() => setAuthState("sign-up")}
                            className="relative font-medium z-10 w-1/2 py-3 text-white"
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={() => setAuthState("sign-in")}
                            className="relative font-medium z-10 w-1/2 py-3 text-white"
                        >
                            Sign In
                        </button>
                    </div>
                    <div className="w-full">
                        <AnimatePresence mode="wait">
                            {authState === "sign-up" ? (
                                <motion.div
                                    key="sign-up"
                                    variants={formVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    transition={{ duration: 0.4 }}
                                >
                                    <SignUp />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="sign-in"
                                    variants={formVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    transition={{ duration: 0.4 }}
                                >
                                    <SignIn />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
export default page;