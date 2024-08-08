import React from 'react';
import { motion } from 'framer-motion';

const NavBar = () => {
    return (
        <motion.div
            className='w-full p-3 flex flex-row items-center bg-neutral-900 bg-opacity-50'
            initial={{
                opacity: "0%",
                y: "50%"
            }}
            animate={{
                opacity: ["0%", "100%"],
                y: 0
            }}
            transition={{
                duration: 0.9,
                ease: "linear",
                delay: 0.2
            }}
        >
            <div className='max-w-full overflow-x-hidden flex flex-row gap-4 items-center justify-start'>
                {/* Profile Image */}
                <img className='w-11 h-11' src="https://avatar.iran.liara.run/public/boy" alt="profile_image" />
                <div>
                    {/* Name */}
                    <h2 className='text-lg whitespace-nowrap overflow-hidden text-ellipsis'>Kavindu Chamath</h2>
                    {/* Status */}
                    <h3 className='text-xs whitespace-nowrap overflow-hidden text-ellipsis'>Online</h3>
                </div>
            </div>
        </motion.div>
    )
};

export default NavBar;