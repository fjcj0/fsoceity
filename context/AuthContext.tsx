"use client";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuthStore from "@/store/AuthStore";
type AuthContextType = {};
const AuthContext = createContext<AuthContextType | null>(null);
const authOnlyPublicPrefixes = [
    "/",
    "/auth",
    "/verification-code",
];
const alwaysPublicPrefixes = [
    "/forget-password",
    "/reset-password",
];
const protectedPrefixes = [
    "/home",
    "/chat",
    "/profile",
    "/call",
    "/contacts",
    "/groups"
];
export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isVerifying, checkAuth, isAuth } = useAuthStore();
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
    useEffect(() => {
        if (isVerifying) return;
        const matches = (prefixes: string[]) => prefixes.some(p => pathname === p || pathname.startsWith(p + "/"));
        const isAuthOnlyPublic = matches(authOnlyPublicPrefixes);
        const isAlwaysPublic = matches(alwaysPublicPrefixes);
        const isProtected = matches(protectedPrefixes);
        if (!isAuth) {
            if (isProtected) {
                router.replace("/auth");
            }
            return;
        }
        if (isAuth) {
            if (isAuthOnlyPublic) {
                router.replace("/home");
            }
        }
    }, [isAuth, isVerifying, pathname, router]);
    if (isVerifying) {
        return (
            <div className="w-screen h-screen bg-black flex items-center justify-center">
                <h1 className="text-white">Wait...</h1>
            </div>
        );
    }
    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuthContext = () => useContext(AuthContext);