import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {

const navigate = useNavigate()
    return (
        <>
       <div className="flex flex-col items-center justify-center min-h-screen bg-[#ffedfa]">
      <motion.h1
        className="font-bold text-5xl text-gray-600"
        initial={{ opacity: 0, y: 50 }}     // start invisible, moved down
        animate={{ opacity: 1, y: 0 }}      // fade in and move up
        transition={{ duration: 1, ease: "easeOut" }} // smooth timing
      >
        Welcome to{" "}
        <motion.span
          className="text-[#49769f]"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "reverse", // pulse back and forth
          }}
        >
          DO.
        </motion.span>
      </motion.h1>

     <motion.button 
        className="bg-[#49769f] mt-14 text-white px-8 py-3 rounded-xl shadow-md font-semibold" 
        onClick={()=>navigate('/auth/login')}
        whileHover={{
          scale: 1.05,
          backgroundColor: "#a6a0d2", // slightly brighter red
          boxShadow: "0px 0px 12px #a6a0d2",
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        Login
      </motion.button>

      <motion.p
        className="text-gray-700 mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Create an account?{" "}
        <motion.span
          className="text-[#9785ff] font-medium cursor-pointer "
          whileHover={{ scale: 1.1, color: "#49769f" }}
          onClick={
            ()=>navigate('/auth/signup')
          }
        >
          Sign up
        </motion.span>
      </motion.p>
    </div>
        </>
    );
};

export default Home;
