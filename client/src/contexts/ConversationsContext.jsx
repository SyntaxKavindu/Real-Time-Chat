import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utilities/AxiosInstance";

const ConversationContext = createContext();

export const ConversationContextProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get("/conversation/get");
                if (response.data.success) {
                    setConversations(response.data.conversations);
                }
            } catch (error) {
                toast.error(error.message);
                setConversations(null);
            } finally {
                setLoading(false);
            }
        };
        getConversations();

        return () => {
            // cleanup
            setConversations(null);
        };
    }, []);

    return (
        <ConversationContext.Provider value={{ conversations, setConversations, loading }}>
            {children}
        </ConversationContext.Provider>
    );
};

export const useConversationContext = () => {
    return useContext(ConversationContext);
};