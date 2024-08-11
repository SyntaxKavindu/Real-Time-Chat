import React from 'react';
import { motion } from 'framer-motion';
import { useAuthContext } from '../../contexts/AuthContext';

const Message = ({ message }) => {

    const { authUser } = useAuthContext();
    const isCurrentUser = message.sender._id === authUser._id;;

    return (
        <motion.div
            className="flex items-start gap-2.5" dir={isCurrentUser ? "rtl" : "ltr"}
            initial={{
                opacity: "0%"
            }}
            animate={{
                opacity: "100%"
            }}
            transition={{
                duration: 0.4,
                ease: "linear",
                delay: 0.2
            }}
        >
            <img className="w-8 h-8 rounded-full" src={message.sender.profileImage} alt="Sender-Profile-Image" />
            <div className="flex flex-col gap-1 w-full max-w-[360px]">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{message.sender.fullname}</span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400" dir='ltr'>{formatDateTime(message.createdAt)}</span>
                </div>
                <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <p className="text-sm font-normal text-gray-900 dark:text-white" dir='ltr'>{message.text}</p>
                </div>
                {isCurrentUser && (
                    <span className={`text-sm font-normal ${message.seen ? "text-blue-500" : 'text-gray-500'} `}>{message.seen ? "Seen" : "Delivered"}</span>
                )}
            </div>
        </motion.div>
    )
};

export default Message;

const formatDateTime = (dateTimeString) => {
    // Create a new Date object
    const date = new Date(dateTimeString);

    // Extract components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Format the date and time
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}`;

    // Combine into a readable format
    const readableFormat = `${formattedDate} ${formattedTime}`;

    return readableFormat;
}