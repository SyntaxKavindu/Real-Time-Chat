import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utilities/AxiosInstance";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const verifyAuth = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get("/auth/verify-auth");
                if (response.data.success) {
                    setAuthUser(response.data.user);
                }
            } catch (error) {
                toast.error(error.message);
                setAuthUser(null);
            } finally {
                setLoading(false);
            }
        };
        verifyAuth();

        return () => {
            // cleanup
            setAuthUser(null);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};