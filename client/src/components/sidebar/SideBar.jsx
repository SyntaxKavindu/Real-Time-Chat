import React from 'react';
import LogOutButton from './LogOutButton';
import { motion } from 'framer-motion';
import { AlignJustify, UserCog } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';

const SideBar = ({ toggleConversation }) => {

    const { authUser } = useAuthContext();

    return (
        <div className='min-h-screen min-w-20 md:min-w-16 p-2 md:p-3 flex flex-col justify-between items-center border-e border-e-neutral-900' >
            <motion.div
                className='flex flex-col justify-center items-center gap-5'
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
                <div className='block md:hidden'>
                    <AlignJustify className='flex-1 hover:scale-110 active:scale-90 cursor-pointer ' onClick={toggleConversation} />
                </div>
                <img className='w-10 h-10 hover:scale-110 active:scale-90' src={authUser.profileImage} alt="profile-image" />
                <UserCog className='hover:scale-110 active:scale-90 cursor-pointer ' />
            </motion.div>

            {/* Log Out Button */}
            <LogOutButton />
        </div>
    )
};

export default SideBar;