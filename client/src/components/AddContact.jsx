import { Loader, Mail, X } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';
import Input from './Input';

const AddContact = ({ toggle }) => {

    const loading = true;

    return (
        <motion.div
            className='absolute w-screen min-h-screen bg-neutral-900 opacity-80 backdrop-blur flex flex-col justify-center items-center'
            initial={{
                opacity: "0%"
            }}
            animate={{
                opacity: ["0%", "80%"]
            }}
            transition={{
                duration: 0.5,
                ease: "linear",
                delay: 0.2
            }}
        >
            <div
                className='max-w-md w-full relative bg-gray-800 bg-opacity-90 backdrop-blur-xl rounded-xl shadow-green-600 shadow-md overflow-hidden border border-green-500 border-opacity-70'
            >
                {/* close button */}
                <motion.button
                    className="absolute top-0 right-0 p-1 text-base hover:text-red-500"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { toggle(false) }}
                >
                    <X />
                </motion.button>

                <div>
                    <h2 className='text-3xl font-bold mt-4 mb-3 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text' >
                        Add New Contact
                    </h2>
                </div>
                <div className='p-8'>
                    <form>
                        <Input icon={Mail} type='email' placeholder='Email' />

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                            className='mt-5 w-full py-2.5 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-1g hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                        >
                            {loading ? (<Loader className='w-6 h-6 animate-spin  mx-auto' />) : ("Login")}
                        </motion.button>

                    </form>
                </div>
                <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                    <p className='text-sm text-gray-400'>
                        Send invite link for friend {" "}
                        <button className='text-green-400 hover:underline'>
                            Send Link
                        </button>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default AddContact;