import React, { useEffect, useRef } from 'react';
import Message from './Message';
import { motion } from 'framer-motion';

const Messages = () => {

    const lastMessageRef = useRef(null);

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return (
        <div className='w-full flex-1 p-3 flex flex-col gap-4 overflow-y-scroll'>

            {/* Message */}
            {[...Array(2)].map((_, i) => {
                return <Skeleton key={i} />;
            })}

            {/* <Message /> */}

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