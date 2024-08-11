import React from 'react';
import { motion } from 'framer-motion';
import { Loader, LogOut } from 'lucide-react';
import useLogOut from '../../hooks/useLogOut';

const LogOutButton = () => {

    const { logOut, loading } = useLogOut();

    const handleLogOut = () => {
        if (loading) return;
        logOut();
    }

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
            onClick={handleLogOut}
        >
            {loading ? (<Loader className='w-6 h-6 animate-spin  mx-auto' />) : (<LogOut className='hover:scale-110 active:scale-90 cursor-pointer' />)}
        </motion.div>
    )
};

export default LogOutButton;