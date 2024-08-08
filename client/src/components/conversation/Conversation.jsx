import React from 'react';
import { motion } from 'framer-motion';
import NavBar from './NavBar';
import MessageInput from './MessageInput';
import Messages from './Messages';

const Conversation = () => {
    return (
        <div className='min-h-screen flex flex-col w-full md:flex-1 absolute md:relative'>

            {/* Nav Bar */}
            <NavBar />

            {/* Messages */}
            <Messages />

            {/* Message Input */}
            <MessageInput />

        </div>
    )
};

export default Conversation;