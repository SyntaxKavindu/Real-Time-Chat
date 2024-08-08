import React from 'react';
import Conversation from './Conversation';
import { motion } from 'framer-motion';

const Conversations = () => {
    return (
        <div className='w-full flex-1 flex flex-col gap-3 overflow-y-scroll pl-2 pr-1'>

            {/* conversation */}
            {/* <Conversation /> */}
            <Skeleton />

        </div>
    )
};

export default Conversations;

const Skeleton = () => {
    return (
        <motion.div
            className="max-w-full p-2 rounded-md flex flex-row justify-between bg-neutral-800 backdrop-blur bg-opacity-50 animate-pulse"
            whileTap={{ scale: 0.98 }}
            initial={{
                opacity: "0%",
                y: "50%"
            }}
            animate={{
                opacity: ["0%", "100%"],
                y: 0
            }}
            transition={{
                duration: 0.2,
                ease: "linear",
                delay: 0.1
            }}
        >
            <div className="max-w-full overflow-x-hidden flex flex-row gap-4 items-center justify-between">
                {/* Skeleton for Profile Image */}
                <div className="w-11 h-11 rounded-full bg-gray-300 dark:bg-gray-600" />
                <div className="flex flex-col gap-2">
                    {/* Skeleton for Name */}
                    <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
                    {/* Skeleton for Last Message */}
                    <div className="w-36 h-3 bg-gray-200 dark:bg-gray-500 rounded" />
                </div>
            </div>

            {/* Skeleton for Seen Icon */}
            <div className="flex flex-col justify-between items-center ps-2">
                <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" />
                <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
            </div>
        </motion.div>

    );
};