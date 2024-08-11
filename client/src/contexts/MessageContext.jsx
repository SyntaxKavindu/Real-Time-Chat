import { createContext, useContext, useState } from "react";

// useMessagesContext
const MessagesContext = createContext();

// Message Context Provider
export const MessageContextProvider = ({ children }) => {

    const [messages, setMessages] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);

    return (
        <MessagesContext.Provider value={{ messages, setMessages, selectedConversation, setSelectedConversation }}>
            {children}
        </MessagesContext.Provider>
    );
};

// useMessagesContext
export const useMessagesContext = () => {
    return useContext(MessagesContext);
};