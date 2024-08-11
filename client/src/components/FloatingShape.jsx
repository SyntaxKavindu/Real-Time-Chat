import React from 'react';
import { motion } from "framer-motion";

const FloatingShape = ({ color, size, top, left, delay }) => {
    return (
        <motion.div
            className={`absolute rounded-full ${color} ${size} blur-xl opacity-60`}
            style={{ left, top }}
            animate={{
                x: ["0%", "100%", "0%"],
                rotate: [0, 360],
            }}
            transition={{
                duration: 20,
                ease: 'linear',
                repeat: Infinity,
                delay: delay,
            }}
            aria-hidden="true"
        />
    )
};

export default FloatingShape;