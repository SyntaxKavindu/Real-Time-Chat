import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utilities/AxiosInstance";
import { useMessagesContext } from "../contexts/MessageContext";

const useGetMessages = () => {

    const { messages, setMessages, selectedConversation } = useMessagesContext();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getMessages = async () => {
            try {
                const response = await axiosInstance.get(`/message/get/${selectedConversation._id}`);
                const { messages } = response.data;
                setMessages(messages);
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

        getMessages();

    }, [selectedConversation]);

    return { messages, loading };
};


export default useGetMessages;