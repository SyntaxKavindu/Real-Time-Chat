import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utilities/AxiosInstance";

const useLogin = () => {

    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const login = async ({ email, password }) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/auth/signin', { email, password });
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

    return { login, loading };
};

export default useLogin;