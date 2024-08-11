import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utilities/AxiosInstance";
import { useMessagesContext } from "../contexts/MessageContext";
import { useConversationContext } from "../contexts/ConversationsContext";

const useSendMessages = () => {

    const { setConversations } = useConversationContext();
    const { setMessages, selectedConversation } = useMessagesContext();
    const [loading, setLoading] = useState(false);

    const sendMessage = async ({ message }) => {
        try {
            const text = message
            const response = await axiosInstance.post(`/message/create/${selectedConversation._id}`, { text });
            const newMessage = response.data.message;
            setMessages((messages) => ([...messages, newMessage]));
            setConversations((prevConversations) => {
                const newConversations = prevConversations.map((conversation) => {
                    if (conversation._id === newMessage.conversation) {
                        conversation.lastmessage.text = newMessage.text;
                        conversation.lastmessage.sender = newMessage.sender._id;
                        conversation.lastmessage.seen = newMessage.seen;
                    }
                    return conversation;
                });
                return newConversations;
            });
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