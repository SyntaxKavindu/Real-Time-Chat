import React from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';

const LogOutButton = () => {
    return (
        <motion.div
            initial={{
                opacity: "0%",
                x: "-50%"
            }}
            animate={{
                opacity: ["0%", "100%"],
                x: 0
            }}
            transition={{
                duration: 0.9,
                ease: "linear",
                delay: 0.2
            }}
        >
            <LogOut className='hover:scale-110 active:scale-90 cursor-pointer ' />
        </motion.div>
    )
};

export default LogOutButton;