import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AlignJustify, CheckCheck, LogOut, Search, UserCog, UserSearch } from "lucide-react";
import SideBar from '../components/sidebar/SideBar';
import SearchChats from '../components/SearchChats';
import Conversations from '../components/conversations/Conversations';
import Conversation from '../components/conversation/Conversation';

const HomePage = () => {

  const [toggle, setToggle] = useState(true);
  const lastMessageRef = useRef();

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <motion.div
      className='min-w-[28rem] max-w-screen-2xl w-full min-h-screen flex flex-row bg-neutral-900 bg-opacity-50 backdrop-blur-xl shadow-2xl'
      initial={{
        opacity: "0%"
      }}
      animate={{
        opacity: "100%"
      }}
      transition={{
        duration: 0.5,
        ease: "linear",
        delay: 0.1,
      }}
    >
      {/* Side Bar */}
      <SideBar />

      {/* Second and Thread Section */}
      <div className='min-h-full max-h-screen flex flex-row flex-1 relative'>

        {/* Second Section */}
        <div className='min-h-screen w-80 md:flex py-3 bg-neutral-900 md:bg-transparent border-e border-e-neutral-900 md:flex-col z-10' hidden={toggle} >

          {/* Header */}
          <div className='flex flex-col gap-5 px-2 mb-4'>
            <h1 className='font-bold text-2xl'>Chats</h1>

            {/* Search Chats */}
            <SearchChats />

          </div>

          {/* Conversations */}
          <Conversations />

        </div>

        {/* Thread Section */}
        <Conversation />

      </div>

    </motion.div>
  )
};

export default HomePage;