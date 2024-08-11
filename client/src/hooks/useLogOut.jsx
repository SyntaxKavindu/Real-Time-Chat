import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utilities/AxiosInstance";

const useLogOut = () => {

    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const logOut = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/auth/signout', {});
            setAuthUser(null);
            toast.success(response.data.message);
            navigate('/login');
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

    return { logOut, loading };
};

export default useLogOut;