import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import { Loader, Lock, Mail, User } from "lucide-react";
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import useSignUp from '../hooks/useSignUp';
import toast from 'react-hot-toast';

const SignUpPage = () => {

  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, loading } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullname || !email || !password) {
      toast.error('All fields are required');
      return;
    }
    await signUp({ fullname, email, password });

  };

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
          Create Account
        </h1>
      </div>
      <div className='p-8'>
        <form onSubmit={handleSubmit}>
          <Input icon={User} type='text' placeholder='Full Name' value={fullname} onChange={(e) => { setFullName(e.target.value) }} />
          <Input icon={Mail} type='email' placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <Input icon={Lock} type='password' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />

          <PasswordStrengthMeter password={password} />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            className='mt-5 w-full py-2.5 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-1g hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
          >
            {loading ? (<Loader className='w-6 h-6 animate-spin  mx-auto' />) : ("Create Account")}
          </motion.button>

        </form>
      </div>
      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
        <p className='text-sm text-gray-400'>
          Already have an account?{" "}
          <Link to={"/login"} className='text-green-400 hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  )
};

export default SignUpPage;