import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import { Loader, Lock, Mail, User } from "lucide-react";

import useLogin from "../hooks/useLogin";
import toast from 'react-hot-toast';

const LogInPage = () => {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const { login, loading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password) {
            toast.error('Please enter email and password');
            return;
        }
        await login(inputs);
    }

    return (
        <motion.div
            className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-xl shadow-green-600 shadow-xl overflow-hidden border border-green-500 border-opacity-70'
            initial={{
                opacity: "0%",
                y: "20%"
            }}
            animate={{
                opacity: ["0%", "100%"],
                y: 0
            }}
            transition={{
                duration: 0.7,
                ease: "linear",
                delay: 0.2
            }}
        >
            <div>
                <h1 className='text-3xl font-bold mt-4 mb-3 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text' >
                    Welcome Back
                </h1>
            </div>
            <div className='p-8'>
                <form onSubmit={handleSubmit}>
                    <Input icon={Mail} type='email' placeholder='Email' value={inputs.email} onChange={(e) => { setInputs((inputs) => ({ ...inputs, email: e.target.value })) }} />
                    <Input icon={Lock} type='password' placeholder='Password' value={inputs.password} onChange={(e) => { setInputs((inputs) => ({ ...inputs, password: e.target.value })) }} />

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
                    Don't have an account?{" "}
                    <Link to='/signup' className='text-green-400 hover:underline'>
                        Sign up
                    </Link>
                </p>
            </div>
        </motion.div>
    )
};

export default LogInPage;