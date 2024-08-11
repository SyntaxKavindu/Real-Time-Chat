import React from 'react';
import { motion } from "framer-motion";

const Input = ({ icon: Icon, ...props }) => {
    return (
        <motion.div
            className='relative mb-6'
            initial={{
                opacity: "0%"
            }}
            animate={{
                opacity: ["0%", "100%"]
            }}
            transition={{
                duration: 0.9,
                ease: "linear",
                delay: 0.2
            }}
        >
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <Icon className='size-5 text-green-500' />
            </div>
            <input {...props} className='w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-1 
            focus:ring-green-500 text-white placeholder-gray-400 transition duration-200 outline-none'
            />
        </motion.div>
    )
};

export default Input;