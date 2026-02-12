import { motion } from "framer-motion";
import "../styles/letter.css";

export default function LoveLetter({ onOpen, onBack }) {
  return (
    <div className="letter-wrapper">

      {/* READ TEXT ABOVE */}
      <div className="read-text">FOR YOU BABYYY!</div>

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
            Sometimes I ask myself how did i get so lucky to be with someone like you babe.<br />
            You are so sweet,kind and caring,you make me feel so safe and comfortable when I'm around you and I really appreciate that.  <br /><br />
            I know simple lines of codes aren't enough for me to show you how i love you but every line of code carries my love for you babe.<br />
            I love the way you make me feel so seen,you pay attention to every detail that I say,and this made me unmask a version of myself that is more open and more deeply connected with you.<br />
            Babe,know that I love you the way you are,you are perfect in every way you could think of,I'm not bluffing but hey this is me this is how inlove I'm with you.I LOVE YOU. <br /><br />
            ~Xoxo your smart Senior developer,TY❤️~
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
