import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { AuthStoreInterface } from "@/types/auth_store_type";
import { NumericString, SERVER, UserType } from "@/global";
import { toast } from 'react-toastify';
axios.defaults.withCredentials = true;
const API = `${SERVER}/api/auth`;
const useAuthStore = create<AuthStoreInterface>((set) => ({
    isLoadingUserContents: false,
    isPostingContent: false,
    isEditingData: false,
    isCheckingPage: false,
    isAuth: false,
    isVerifying: true,
    isLoadingAuth: false,
    error: null,
    user: null,
    user_posts: [],
    user_likes: [],
    user_bookmarks: [],
    checkAuth: async () => {
        set({ isVerifying: true, error: null });
        try {
            const response = await axios.get(`${API}/check-auth`);
            set({ user: response?.data?.user, isAuth: true });
        } catch (error: unknown) {
            set({ user: null, isAuth: false });
            console.log(error);
        } finally {
            set({ isVerifying: false });
        }
    },
    signup: async (name: string, email: string, password: string, confirm_password: string): Promise<void | string> => {
        set({ isLoadingAuth: true, error: null });
        try {
            const response = await axios.post(`${API}/sign-up`, {
                name,
                email,
                password,
                confirm_password,
            });
            return response?.data?.verificationToken;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                set({ error: error.response?.data?.error });
                return;
            }
            set({ error: `An unexpected error occurred ${error instanceof Error ? error.message : error}` });
        } finally {
            set({ isLoadingAuth: false });
        }
    },
    login: async (email: string, password: string): Promise<void | string> => {
        set({ isLoadingAuth: true, error: null });
        try {
            const response = await axios.post(`${API}/sign-in`, {
                email,
                password
            });
            return response?.data?.verificationToken;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                set({ error: error.response?.data?.error });
                return;
            }
            set({ error: `An unexpected error occurred ${error instanceof Error ? error.message : error}` });
        } finally {
            set({ isLoadingAuth: false });
        }
    },
    logout: async () => {
        try {
            const response = await axios.post(`${API}/logout`);
            if (response.status === 200) set({ isAuth: false, user: null });
        } catch (error: unknown) {
            console.log(error);
        }
    },
    checkResetPasswordPage: async (resetToken: string): Promise<boolean> => {
        set({ isCheckingPage: true });
        try {
            const response = await axios.get(`${API}/reset-password/${resetToken}`);
            if (response.status >= 200 && response.status < 300)
                return true;
        } catch (error: unknown) {
            console.log(error);
        } finally {
            set({ isCheckingPage: false });
        }
        return false;
    },
    forgetPassword: async (email: string): Promise<boolean> => {
        set({ isLoadingAuth: true, error: null });
        try {
            const response = await axios.post(`${API}/forget-password`, { email });
            if (response.status === 200) {
                return true;
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                set({ error: error.response?.data?.error });
                return false;
            }
            set({ error: `An unexpected error occurred ${error instanceof Error ? error.message : error}` });
        } finally {
            set({ isLoadingAuth: false });
        }
        return false;
    },
    resetPassowrd: async (newPassword: string, confirm_password: string, resetToken: string): Promise<boolean> => {
        set({ isLoadingAuth: true, error: null });
        try {
            const response = await axios.post(`${API}/reset-password`, {
                newPassword,
                confirm_password,
                resetToken
            });
            if (response.status === 200) {
                return true;
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                set({ error: error.response?.data?.error });
                return false;
            }
            set({ error: `An unexpected error occurred ${error instanceof Error ? error.message : error}` });
        } finally {
            set({ isLoadingAuth: false });
        }
        return false;
    },
    checkVerificationCodePage: async (verificationToken: string): Promise<boolean> => {
        set({ isCheckingPage: true });
        try {
            const response = await axios.get(`${API}/verification/${verificationToken}`);
            console.log(response);
            if (response.status === 200) return true;
        } catch (error: unknown) {
            console.log(error);
        }
        finally {
            set({ isCheckingPage: false });
        }
        return false;
    },
    verifyCode: async (code: NumericString, verificationToken: string): Promise<void> => {
        set({ isLoadingAuth: true });
        try {
            const response = await axios.post(`${API}/verification`, {
                code,
                verificationToken
            });
            if (response.status === 200) set({ isAuth: true, user: response?.data?.user });
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                set({ error: error.response?.data?.error });
                return;
            }
            set({ error: `An unexpected error occurred ${error instanceof Error ? error.message : error}` });
        } finally {
            set({ isLoadingAuth: false });
        }
    },
    resendCode: async (verificationToken: string): Promise<boolean> => {
        try {
            const response = await axios.post(`${API}/resend-verification`, {
                verificationToken
            });
            if (response.status === 200) {
                toast.success(`The code has been sent to your email`);
                return true;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.error);
                return false;
            }
            toast.error(`An unexpected error occurred ${error instanceof Error ? error.message : error}`);
            return false;
        }
        return false;
    },
    editProfilePicture: async (imageUrl: string): Promise<boolean> => {
        try {
            const response = await axios.post(`${API}/edit-profile-picture`, {
                imageUrl
            });
            if (response.status === 200) {
                set({ user: response.data.user });
                return true;
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.error);
                return false;
            }
        }
        return false;
    },
    editUserData: async (name: string, bio: string): Promise<void> => {
        set({ isEditingData: true });
        try {
            const response = await axios.post(`${API}/edit-information`, {
                name,
                bio
            });
            if (response.status === 200) {
                set({ user: response.data.user });
                toast.success(response.data.message);
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.error);
                return;
            }
            toast.error(`An unexpected error occurred ${error instanceof Error ? error.message : error}`);
        } finally {
            set({ isEditingData: false });
        }
    },
    postContent: async (image: string, content: string): Promise<void> => {
        set({ error: null, isPostingContent: true });
        try {
            const response = await axios.post(`${API}/post-content`, {
                image,
                content
            });
            if (response.status === 201) toast.success(response.data.message);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                set({ error: error.response?.data?.error });
                return;
            }
            set({ error: `An unexpected error occurred ${error instanceof Error ? error.message : error}` });
        } finally {
            set({ isPostingContent: false });
        }
    },
    getUserContent: async (): Promise<void> => {
        set({ isLoadingUserContents: true });
        try {
            const response = await axios.get(`${API}/post-content`);
            set({ user_posts: response.data.user_posts, user_likes: response.data.user_likes, user_bookmarks: response.data.user_bookmarks });

        } catch (error: unknown) {
            console.log(error);
        } finally {
            set({ isLoadingUserContents: false });
        }
    },
    deletePost: async (id: string): Promise<void> => {
        try {
            const response = await axios.delete(`${API}/delete-post/${id}`);
            if (response.status === 200) {
                set((state) => ({
                    user_posts: state.user_posts.filter(post => post.id !== id),
                }));
                toast.success(`The post deleted successfully`);
            }
        } catch (error: unknown) {
            console.log(error);
        }
    },
}));
export default useAuthStore;