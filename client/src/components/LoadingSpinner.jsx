import { motion } from "framer-motion";
import FloatingShape from "./FloatingShape";

const LoadingSpinner = () => {
	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
			<FloatingShape color="bg-green-500" size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color="bg-emerald-500" size='w-52 h-52' top='70%' left='-5%' delay={5} />
			<FloatingShape color="bg-lime-500" size='w-32 h-32' top='40%' left='-10%' delay={2} />
			<FloatingShape color="bg-green-600" size='w-64 h-64' top='50%' left='70%' delay={1} />
			<FloatingShape color="bg-emerald-500" size='w-52 h-52' top='30%' left='50%' delay={6} />
			<FloatingShape color="bg-lime-600" size='w-32 h-32' top='40%' left='30%' delay={3} />
			{/* Simple Loading Spinner */}
			<motion.div
				className='w-16 h-16 border-4 border-t-4 border-t-green-500 border-green-200 rounded-full'
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
			/>
		</div>
	);
};

export default LoadingSpinner;