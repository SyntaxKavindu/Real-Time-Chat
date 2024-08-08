import React from 'react';
import { motion } from 'framer-motion';

const Message = ({...props}) => {
    return (
        <motion.div
            {...props}
            className="flex items-start gap-2.5 shake" dir="ltl"
            initial={{
                y: "50%"
            }}
            animate={{
                y: 0
            }}
            transition={{
                duration: 0.9,
                ease: "linear",
                delay: 0.2
            }}
        >
            <img className="w-8 h-8 rounded-full" src="https://avatar.iran.liara.run/public/boy" alt="Sender-Profile-Image" />
            <div className="flex flex-col gap-1 w-full max-w-[360px]">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Kavindu Chamath</span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">2024-08-08 12:12</span>
                </div>
                <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <p className="text-sm font-normal text-gray-900 dark:text-white" dir='ltr'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, enim!</p>
                </div>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
            </div>
        </motion.div>
    )
};

export default Message;