import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utilities/AxiosInstance";

const useVerifyEmail = () => {

    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const verifyEmail = async ({ token }) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/auth/verify-email', { token });
            const { user } = response.data;
            setAuthUser(user);
            toast.success(response.data.message);
            navigate('/');
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
            }
        }
        finally {
            setLoading(false);
        }
    };

    return { verifyEmail, loading };
};

export default useVerifyEmail;