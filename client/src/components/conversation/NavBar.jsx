import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMessagesContext } from '../../contexts/MessageContext';

const NavBar = () => {

    const { selectedConversation } = useMessagesContext();

    return (

        <motion.div
            className='w-full p-3 flex flex-row items-center bg-neutral-900 bg-opacity-50'
            initial={{
                opacity: "0%",
            }}
            animate={{
                opacity: ["0%", "100%"],
            }}
            transition={{
                duration: 0.5,
                ease: "linear",
                delay: 0.2
            }}
        >
            <div className='max-w-full overflow-x-hidden flex flex-row gap-4 items-center justify-start'>
                {/* Profile Image */}
                <img className='w-11 h-11' src={selectedConversation.participants.profileImage} alt="profile_image" />
                <div>
                    {/* Name */}
                    <h2 className='text-lg whitespace-nowrap overflow-hidden text-ellipsis'>{selectedConversation.participants.fullname}</h2>
                    {/* Status */}
                    <h3 className='text-xs whitespace-nowrap overflow-hidden text-ellipsis'>Online</h3>
                </div>
            </div>
        </motion.div>
    )
};

export default NavBar;