import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from "lucide-react";
import SideBar from '../components/sidebar/SideBar';
import SearchChats from '../components/SearchChats';
import Conversations from '../components/conversations/Conversations';
import Conversation from '../components/conversation/Conversation';
import AddContact from '../components/AddContact';

const HomePage = () => {

  const [toggle, setToggle] = useState(true);
  const [toggleAddContact, setToggleAddContact] = useState(false);

  const toggleConversation = () => {
    setToggle(!toggle);
  };

  return (
    <>
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
        <SideBar toggleConversation={toggleConversation} />

        {/* Second and Thread Section */}
        <div className='min-h-full max-h-screen flex flex-row flex-1 relative'>

          {/* Second Section */}
          <div className='min-h-screen w-80 md:flex py-3 bg-neutral-900 md:bg-transparent border-e border-e-neutral-900 md:flex-col z-10' hidden={toggle} >

            {/* Header */}
            <div className='flex flex-col gap-5 px-2 mb-4'>
              <div className='flex flex-row justify-between items-center'>
                <h1 className='font-bold text-2xl'>Chats</h1>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type='submit'
                  className='py-1 px-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-1g hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                  onClick={() => { setToggleAddContact(true) }}
                >
                  <UserPlus />
                </motion.button>
              </div>

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

      {toggleAddContact && (
        <AddContact toggle={setToggleAddContact} />
      )}
    </>
  )
};

export default HomePage;