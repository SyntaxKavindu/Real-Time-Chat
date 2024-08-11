import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utilities/AxiosInstance";
import { useMessagesContext } from "../contexts/MessageContext";

const useSendMessages = () => {

    const { setMessages, selectedConversation } = useMessagesContext();
    const [loading, setLoading] = useState(false);

    const sendMessage = async ({ message }) => {
        try {
            const text = message
            const response = await axiosInstance.post(`/message/create/${selectedConversation._id}`, { text });
            const newMessage = response.data.message;
            setMessages((messages) => ([...messages, newMessage]));
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

    return { sendMessage, loading };
};


export default useSendMessages;