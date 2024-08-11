import React, { useEffect, useRef } from 'react';
import Message from './Message';
import { motion } from 'framer-motion';
import useGetMessages from '../../hooks/useGetMessages';
import { useAuthContext } from '../../contexts/AuthContext';
import { useSocketContext } from '../../contexts/SocketContext';
import { useMessagesContext } from '../../contexts/MessageContext';
import { useConversationContext } from '../../contexts/ConversationsContext';

const Messages = () => {
    const { socket } = useSocketContext();
    const { setConversations } = useConversationContext();
    const { setMessages, selectedConversation } = useMessagesContext();
    const { messages, loading } = useGetMessages();
    const lastMessageRef = useRef(null);
    const { authUser } = useAuthContext();
    const isLastMessage = messages[messages.length - 1]?.sender._id !== authUser._id;

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    useEffect(() => {
        console.log()
        if (isLastMessage) {
            socket.emit("mark-seen", { conversation: selectedConversation._id });
        }

        socket.on("message-seen", (data) => {
            if (data.conversation === selectedConversation._id) {
                setMessages((prevMessages) => {
                    const updatedMessages = prevMessages.map((message) => {
                        if (message.seen == false) {
                            message.seen = true;
                        }
                        return message;
                    });
                    return updatedMessages;
                });
            }
            setConversations((prevConversations) => {
                const newConversations = prevConversations.map((conversation) => {
                    if (conversation._id === data.conversation) {
                        conversation.lastmessage.seen = true;
                    }
                    return conversation;
                });
                return newConversations;
            });

        });

    }, [messages, socket]);

    return (
        <div className='w-full flex-1 p-3 flex flex-col gap-4 overflow-y-scroll'>

            {/* Message */}
            {loading ? (
                [...Array(2)].map((_, i) => {
                    return <Skeleton key={i} />
                })
            ) : (
                messages.map((message) => (
                    <Message key={message._id} message={message} />
                ))
            )}

            <div ref={lastMessageRef} ></div>
        </div>
    )
};

export default Messages;

const Skeleton = () => {
    return (
        <>
            <motion.div
                className="flex items-start gap-2.5 animate-pulse" dir="ltl"
                initial={{
                    opacity: "0%"
                }}
                animate={{
                    opacity: "100%"
                }}
                transition={{
                    duration: 0.5,
                    ease: "linear",
                    delay: 0.2
                }}
            >
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600" />
                <div className="flex flex-col gap-1 w-full max-w-[360px]">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
                        <div className="w-20 h-4 bg-gray-200 dark:bg-gray-500 rounded" />
                    </div>
                    <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
                        <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
                    </div>
                    <div className="w-16 h-4 bg-gray-200 dark:bg-gray-500 rounded" />
                </div>
            </motion.div>

            <motion.div
                className="flex items-start gap-2.5 animate-pulse" dir="rtl"
                initial={{
                    opacity: "0%"
                }}
                animate={{
                    opacity: "100%"
                }}
                transition={{
                    duration: 0.9,
                    ease: "linear",
                    delay: 0.2
                }}
            >
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600" />
                <div className="flex flex-col gap-1 w-full max-w-[360px]">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
                        <div className="w-20 h-4 bg-gray-200 dark:bg-gray-500 rounded" />
                    </div>
                    <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
                        <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
                    </div>
                    <div className="w-16 h-4 bg-gray-200 dark:bg-gray-500 rounded" />
                </div>
            </motion.div>
        </>
    );
};