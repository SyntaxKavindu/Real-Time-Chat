import { useEffect } from "react";
import { useSocketContext } from "../contexts/SocketContext";
import { useConversationContext } from "../contexts/ConversationsContext";
import toast from "react-hot-toast";

const useNewConversations = () => {

    const { setConversations } = useConversationContext();
    const { socket } = useSocketContext();

    useEffect(() => {

        socket?.on('new-conversation', (data) => {
            setConversations((conversations) => ([data.conversation, ...conversations]));
            toast.success("You have New Conversation");
        });

    }, [socket]);
};

export default useNewConversations;