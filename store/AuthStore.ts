import { create } from "zustand";
import axios from "axios";
import { AuthStoreInterface } from "@/types/auth_store_type";
import { NumericString, SERVER } from "@/global";
axios.defaults.withCredentials = true;
const API = `${SERVER}/api/auth`;
const useHeaderStore = create<AuthStoreInterface>((set) => ({
    isAuth: false,
    isVerifying: true,
    isLoadingAuth: false,
    error: null,
    user: null,
    checkAuth: async () => {
        try {

        } catch (error: unknown) {

        }
    },
    signup: async (name: string, email: string, password: string, confirm_password: string) => {
        try {

        } catch (error: unknown) {

        }
    },
    login: async (email: string, password: string) => {
        try {

        } catch (error: unknown) {

        }
    },
    logout: async () => {
        try {

        } catch (error: unknown) {

        }
    },
    checkResetPasswordPage: async (resetToken: string) => {
        try {

        } catch (error: unknown) {

        }
    },
    forgetPassword: async (email: string) => {
        try {

        } catch (error: unknown) {

        }
    },
    resetPassowrd: async (newPassword: string, confirm_password: string, resetToken: string) => {
        try {

        } catch (error: unknown) {

        }
    },
    checkVerificationCodePage: async (verificationToken: string) => {
        try {

        } catch (error: unknown) {

        }
    },
    verifyCode: async (code: NumericString, verificationToken: string) => {
        try {

        } catch (error: unknown) {

        }
    },
}));
export default useHeaderStore;