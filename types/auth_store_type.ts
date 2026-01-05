import { NumericString, PostUserType, UserType } from "@/global";
export interface AuthStoreInterface {
    isLoadingUserContents: boolean,
    isPostingContent: boolean,
    isEditingData: boolean,
    isCheckingPage: boolean,
    isVerifying: boolean;
    isAuth: boolean;
    isLoadingAuth: boolean;
    user: UserType | null;
    error: string | null;
    user_posts: PostUserType[],
    user_likes: PostUserType[],
    user_bookmarks: PostUserType[],
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
    editProfilePicture: (imageUrl: string) => Promise<boolean>;
    editUserData: (name: string, bio: string) => Promise<void>;
    postContent: (image: string, content: string) => Promise<void>;
    getUserContent: () => Promise<void>;
    deletePost: (id: string) => Promise<void>;
}