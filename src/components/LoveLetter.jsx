import { motion } from "framer-motion";
import "../styles/letter.css";

export default function LoveLetter({ onOpen, onBack }) {
  return (
    <div className="letter-wrapper">

      {/* READ TEXT ABOVE */}
      <div className="read-text">READ</div>

      <motion.div
        className="scroll"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        exit={{ scaleY: 0, opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="scroll-rod top"></div>

        <div className="scroll-content">
          <p>
            Msupaa <br /><br />
            Hey babe I want to start by saying that i love you so much <br />
            Every smile, every moment, every memory with you <br />
            feels like destiny gently written in time. <br /><br />
            This is not just a letter, <br />
            it is my heart — written in lines of code, <br />
            crafted with love meant only for you. <br /><br />
            Xoxo your smart Senior developer girlfriend TYYYY 💻❤️
          </p>

          {/* GIF INSIDE LETTER */}
          <img
            src="/assets/dancing teddy4.webp"
            alt="Dancing Teddy"
            className="inside-gif"
          />

          {/* BUTTONS */}
          <div className="letter-buttons">
            <motion.button
              className="continue-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpen}
            >
              CONTINUE
            </motion.button>

            <motion.button
              className="back-simple"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
            >
              Back
            </motion.button>
          </div>

          <div className="hint-text">
            Press continue to see your final gift
          </div>
        </div>

        <div className="scroll-rod bottom"></div>
      </motion.div>
    </div>
  );
}
