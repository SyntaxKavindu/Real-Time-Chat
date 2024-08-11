import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utilities/AxiosInstance";

const useSignUp = () => {

    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const signUp = async ({ fullname, email, password }) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/auth/signup', { fullname, email, password });
            const { user } = response.data;
            setAuthUser(user);
            toast.success(response.data.message);
            navigate('/verify-email');
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

    return { signUp, loading };
};

export default useSignUp;