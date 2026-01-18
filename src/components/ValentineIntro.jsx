import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "../styles/intro.css";

export default function ValentineIntro({ onNext, onBack }) {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animations when component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="intro-wrapper">
      {/* Main container with staggered animations */}
      <div className="content-container">
        {/* Dancing Teddy GIF - Slides in from left */}
        <motion.div
          className="teddy-container"
          initial={{ opacity: 0, x: -100, rotate: -20 }}
          animate={isVisible ? { 
            opacity: 1, 
            x: 0, 
            rotate: 0 
          } : {}}
          transition={{ 
            duration: 1, 
            ease: "easeOut",
            delay: 0.2 
          }}
        >
          <motion.img
            src="/assets/dancing teddy3.webp"
            alt="Dancing Teddy Bear"
            className="dancing-teddy"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </motion.div>

        {/* Text content - Slides in from right */}
        <motion.div
          className="text-container"
          initial={{ opacity: 0, x: 100 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ 
            duration: 1, 
            ease: "easeOut",
            delay: 0.4 
          }}
        >
          <motion.h1
            className="intro-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 0.6 
            }}
          >
            Hi Babbyy! 
          </motion.h1>

          <motion.p
            className="intro-text"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 0.8 
            }}
          >
            I made something <span className="highlight">special</span> for you…
          </motion.p>

          <motion.p
            className="intro-subtext"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 1 
            }}
          >
            I Love you.
          </motion.p>
        </motion.div>
      </div>

      {/* Buttons - Slide up from bottom */}
      <motion.div
        className="button-group"
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: 1, 
          ease: "easeOut",
          delay: 1.2 
        }}
      >
        {onBack && (
          <motion.button
            type="button"
            className="intro-button back"
            whileHover={{ 
              scale: 1.1,
              x: -5,
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.4 }}
          >
            ← Back
          </motion.button>
        )}

        <motion.button
          type="button"
          className="intro-button next"
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -3, 3, 0],
            boxShadow: "0 5px 20px rgba(255, 77, 109, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5 }}
        >
          continue
        </motion.button>
      </motion.div>

      {/* Floating hearts decoration */}
      <div className="floating-hearts">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="floating-heart"
            initial={{ opacity: 0, y: 100, x: `${i * 15}%` }}
            animate={isVisible ? { 
              opacity: [0, 1, 1, 0],
              y: -100,
              x: `${i * 15}%`
            } : {}}
            transition={{
              duration: 3 + i * 0.5,
              delay: 0.5 + i * 0.2,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeOut"
            }}
          >
            {i % 2 === 0 ? "💖" : "💝"}
          </motion.div>
        ))}
      </div>
    </div>
  );
}