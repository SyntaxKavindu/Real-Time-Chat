import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utilities/AxiosInstance";
import { useConversationContext } from "../contexts/ConversationsContext";

const useCreateConversation = () => {

    const [loading, setLoading] = useState(false);
    const { conversations, setConversations } = useConversationContext();

    const createConversation = async ({ email }, toggle) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/conversation/create', { email });
            const { conversation } = response.data;
            setConversations((conversations) => ([conversation, ...conversations]));
            toast.success(response.data.message);
            toggle(false);
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

    return { createConversation, loading };
};

export default useCreateConversation;