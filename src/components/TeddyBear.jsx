import { motion } from "framer-motion";
import "../styles/teddy.css";

export default function TeddyBear({ onBack, onNext }) {
  return (
    <motion.div
      className="teddy-page-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Celebration Text */}
      <motion.h1
        className="teddy-yaaay-text"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.8 }}
      >
        YAAAYYYYY!!!
      </motion.h1>

      <motion.p
        className="teddy-valentine-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        You accepted to be my Valentine🥹
      </motion.p>

      {/* Dancing Teddy */}
      <motion.img
        src="/assets/dancing teddy5.webp"
        alt="Dancing Teddy"
        className="teddy-page-image"
        animate={{ y: [0, -15, 0], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Buttons */}
      <div className="teddy-page-buttons">
        <motion.button
          className="teddy-back-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
        >
          ← Back
        </motion.button>

        <motion.button
          className="teddy-next-btn"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
        >
          Next 
        </motion.button>
      </div>

      {/* Floating hearts */}
      <div className="teddy-hearts">
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            className="teddy-heart"
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0, 1, 0] }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              
            }}
            
          >
            💕
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
