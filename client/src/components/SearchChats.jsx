import { Search, UserSearch } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';

const SearchChats = () => {
    return (
        <motion.div
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
            <form
                className='flex flex-row justify-between gap-2'>
                <div className='relative' >
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                        <UserSearch className='size-5 text-green-500' />
                    </div>
                    <input type='text' id='search' placeholder='Search ...' className='w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-1 
            focus:ring-green-500 text-white placeholder-gray-400 transition duration-200 outline-none'
                    />
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type='submit'
                    className='p-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-1g hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                >
                    <Search />
                </motion.button>
            </form>
        </motion.div>
    )
};

export default SearchChats;