import React from 'react';
import { motion } from 'framer-motion';
import { CheckCheck } from 'lucide-react';
import { useMessagesContext } from '../../contexts/MessageContext';

const Conversation = ({ conversation }) => {

    const { selectedConversation, setSelectedConversation } = useMessagesContext();

    const isSelected = conversation._id === selectedConversation?._id;

    return (
        <motion.div
            className={`max-w-full p-2 rounded-md flex flex-row justify-between  bg-neutral-800 ${isSelected && "border border-green-500"}  cursor-pointer backdrop-blur bg-opacity-50 hover:ring-2 hover:ring-green-600`}
            whileTap={{ scale: 0.98 }}
            initial={{
                opacity: "0%",
            }}
            animate={{
                opacity: ["0%", "100%"],
            }}
            transition={{
                duration: 0.5,
                ease: "linear",
                delay: 0.1
            }}
            onClick={() => { setSelectedConversation(conversation) }}
        >
            <div className='max-w-full overflow-x-hidden flex flex-row gap-4 items-center justify-between'>
                {/* Profile Image */}
                <img className=' w-11 h-11' src={conversation.participants.profileImage} alt="profile_image" />
                <div>
                    {/* Name */}
                    <h2 className='text-base whitespace-nowrap overflow-hidden text-ellipsis'>{conversation.participants.fullname}</h2>
                    {/* Last Message */}
                    <h3 className='text-xs whitespace-nowrap overflow-hidden text-ellipsis text-gray-300'>
                        {conversation.lastmessage.text}
                    </h3>
                </div>
            </div>

            {/* Seen Icon */}
            <div className='flex flex-col justify-between items-center ps-2'>
                <div className='h-2 w-2 rounded-full bg-green-400 glow'></div>
                <CheckCheck className='w-4 h-4' />
            </div>
        </motion.div>
    )
};

export default Conversation;