import { NumericString, UserType } from "@/global";
export interface AuthStoreInterface {
    isCheckingPage: boolean,
    isVerifying: boolean;
    isAuth: boolean;
    isLoadingAuth: boolean;
    user: UserType | null;
    error: string | null;
    checkAuth: () => Promise<void>;
    signup: (
        name: string,
        email: string,
        password: string,
        confirm_password: string
    ) => Promise<void | string>;
    login: (email: string, password: string) => Promise<void | string>;
    logout: () => Promise<void>;
    checkResetPasswordPage: (resetToken: string) => Promise<boolean>;
    forgetPassword: (email: string) => Promise<boolean>;
    resetPassowrd: (
        newPassword: string,
        confirm_password: string,
        resetToken: string
    ) => Promise<boolean>;
    checkVerificationCodePage: (verificationToken: string) => Promise<boolean>;
    verifyCode: (
        code: NumericString,
        verificationToken: string
    ) => Promise<void>;
    resendCode: (verificationToken: string) => Promise<boolean>;
}