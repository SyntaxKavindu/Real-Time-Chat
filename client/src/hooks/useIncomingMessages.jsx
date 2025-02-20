import { useEffect } from "react";
import { useMessagesContext } from "../contexts/MessageContext";
import { useSocketContext } from "../contexts/SocketContext";
import { useConversationContext } from "../contexts/ConversationsContext";

const useIncomingMessages = () => {

    const { setMessages, selectedConversation } = useMessagesContext();
    const { setConversations } = useConversationContext();
    const { socket } = useSocketContext();

    useEffect(() => {

        socket?.on('new-message', (message) => {
            // check if the user is already in the conversation
            if (selectedConversation) {
                if (message.conversation === selectedConversation._id.toString()) {
                    setMessages((prevMessages) => [...prevMessages, message]);
                }
            }

            setConversations((prevConversations) => {
                const newConversations = prevConversations.map((conversation) => {
                    if (conversation._id === message.conversation) {
                        conversation.lastmessage.text = message.text;
                        conversation.lastmessage.sender = message.sender._id;
                        conversation.lastmessage.seen = message.seen;
                    }
                    return conversation;
                });
                return newConversations;
            });

        });

    }, [socket, selectedConversation]);
};

export default useIncomingMessages;