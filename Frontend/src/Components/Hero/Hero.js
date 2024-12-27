import React from 'react';
// import Navbar from '../Components/Navbar';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { motion } from 'framer-motion';
import './Hero.css'; // Import the CSS for styling
import hero from '../Assets/hero.png';



const FadeUp = (delay) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const Hero = () => {
  return (
    <section className="hero-section">
      {/* <Navbar /> */}
      <div className="hero-container">
        {/* Brand Info */}
        <div className="hero-text-container">
          <motion.h1
            variants={FadeUp(0.6)}
            initial="initial"
            animate="animate"
            className="hero-heading"
          >
            UNLOCK POTENTIAL{" "}
            <span className="hero-highlight"><br/>EMBRACE </span><br/>KNOWLEDGE
          </motion.h1>
          <motion.div
            variants={FadeUp(0.8)}
            initial="initial"
            animate="animate"
            className="hero-button-container"
          >
            <button className="hero-primary-btn">
              Get Started
              <IoIosArrowRoundForward className="hero-arrow-icon" />
            </button>
          </motion.div>
        </div>

        {/* Hero Image */}
        <div className="hero-image-container">
          <motion.img
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            src={hero}
            alt="Hero Image"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
