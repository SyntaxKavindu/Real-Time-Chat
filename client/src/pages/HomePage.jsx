import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AlignJustify, CheckCheck, LogOut, Search, UserCog, UserSearch } from "lucide-react";

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
            <AlignJustify className='flex-1 hover:scale-110 active:scale-90 cursor-pointer ' onClick={() => { setToggle(!toggle) }} />
          </div>
          <img className='w-10 h-10 hover:scale-110 active:scale-90' src="https://avatar.iran.liara.run/public/boy" alt="profile-image" />
          <UserCog className='hover:scale-110 active:scale-90 cursor-pointer ' />
        </motion.div>
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
        >
          <LogOut className='hover:scale-110 active:scale-90 cursor-pointer ' />
        </motion.div>
      </div>

      <div className='min-h-full max-h-screen flex flex-row flex-1 relative'>

        <div className='min-h-screen w-80 md:flex py-3 px-2 bg-neutral-900 md:bg-transparent border-e border-e-neutral-900 md:flex-col z-10' hidden={toggle} >

          <div className='flex flex-col gap-5 mb-4'>
            <h1 className='font-bold text-2xl'>Chats</h1>
            <motion.div
              className='flex flex-row justify-between gap-2'
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
            </motion.div>
          </div>

          <motion.div className='w-full flex-1 flex flex-col gap-3 overflow-y-scroll p-1'>

            <motion.div
              className={`max-w-full p-2 rounded-md flex flex-row justify-between bg-neutral-800 cursor-pointer backdrop-blur bg-opacity-50 hover:ring-1 hover:ring-green-600`}
              whileTap={{ scale: 0.98 }}
              initial={{
                opacity: "0%",
                y: "50%"
              }}
              animate={{
                opacity: ["0%", "100%"],
                y: 0
              }}
              transition={{
                duration: 0.2,
                ease: "linear",
                delay: 0.1
              }}
            >
              <div className='max-w-full overflow-x-hidden flex flex-row gap-4 items-center justify-between'>
                {/* Profile Image */}
                <img className=' w-11 h-11' src="https://avatar.iran.liara.run/public/boy" alt="profile_image" />
                <div>
                  {/* Name */}
                  <h2 className='text-base whitespace-nowrap overflow-hidden text-ellipsis'>Kavindu Chamath</h2>
                  {/* Last Message */}
                  <h3 className='text-xs whitespace-nowrap overflow-hidden text-ellipsis text-gray-300'>
                    no last message
                  </h3>
                </div>
              </div>

              {/* Seen Icon */}
              <div className='flex flex-col justify-between items-center ps-2'>
                <div className='h-2 w-2 rounded-full bg-green-400 glow'></div>
                <CheckCheck className='w-4 h-4' />
              </div>
            </motion.div>

          </motion.div>

        </div>

        <div className='min-h-screen flex flex-col w-full md:flex-1 absolute md:relative'>

          <motion.div
            className='w-full  h-[8%] p-3 flex flex-row items-center bg-neutral-900 bg-opacity-50'
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

          <div className='w-full flex-1 p-3 overflow-y-scroll'>

            <motion.div
              ref={lastMessageRef}
              className="flex items-start gap-2.5 shake" dir="ltl"
              initial={{
                y: "50%"
              }}
              animate={{
                y: 0
              }}
              transition={{
                duration: 0.9,
                ease: "linear",
                delay: 0.2
              }}
            >
              <img className="w-8 h-8 rounded-full" src="https://avatar.iran.liara.run/public/boy" alt="Sender-Profile-Image" />
              <div className="flex flex-col gap-1 w-full max-w-[360px]">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Kavindu Chamath</span>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">2024-08-08 12:12</span>
                </div>
                <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                  <p className="text-sm font-normal text-gray-900 dark:text-white" dir='ltr'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, enim!</p>
                </div>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
              </div>
            </motion.div>

          </div>

          <motion.div
            initial={{
              opacity: "0%",
              y: "-50%"
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
            <form>
              <div className="flex items-center px-3 py-4 bg-neutral-900 bg-opacity-50">
                <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                    <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                  </svg>
                  <span className="sr-only">Upload image</span>
                </button>
                <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
                  </svg>
                  <span className="sr-only">Add emoji</span>
                </button>
                <textarea id="chat" rows="1" className="resize-none block mx-4 p-2.5 w-full text-sm bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-1 
            focus:ring-green-500 text-white placeholder-gray-400 transition duration-200 outline-none" placeholder="Your message..."></textarea>
                <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                  <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                  </svg>
                  <span className="sr-only">Send message</span>
                </button>
              </div>
            </form>
          </motion.div>

        </div>

      </div>

    </motion.div>
  )
};

export default HomePage;