"use client";
import Link from "next/link";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import animation from "../animations/Digitalmedia.json";
import { Variants } from "framer-motion";
const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.4,
      duration: 0.8,
      easeIn: [0.16, 1, 0.3, 1],
    },
  }),
};
export default function Home() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center gap-y-8 p-3">
      <motion.div
        className="max-w-xl"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <Lottie animationData={animation} loop />
      </motion.div>
      <motion.h1
        className="text-center text-5xl lg:text-8xl font-semibold tracking-tighter bg-gradient-to-b from-neutral-50 via-neutral-300 to-neutral-700 bg-clip-text text-transparent"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <span>Welcome To <br /></span>
        <span>Fsoceity Members+<br /></span>
      </motion.h1>
      <motion.p
        className="text-center text-neutral-400 max-w-xl font-light text-xs"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        Learn modern technology, cybersecurity, and programming together with our community.
        Share knowledge, collaborate on real projects, and grow your skills step by step in an environment built for curious minds and future innovators
      </motion.p>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={3}
      >
        <Link
          href="/auth"
          className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
        >
          <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md"></span>
          <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180">
            <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
            <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
          </span>
          <span className="relative text-white font-bold">Join The Team</span>
        </Link>
      </motion.div>
    </div>
  );
}