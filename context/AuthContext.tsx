import { createContext, ReactNode, useContext } from "react";
type AuthContextType = {};
const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const value: AuthContextType = {};
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
};