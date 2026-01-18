import { motion } from "framer-motion";
import { useState } from "react";
import "../styles/question.css";

export default function QuestionIntro({ onYes }) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const moveNoButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoPosition({ x, y });
  };

  return (
    <div className="question-wrapper">
      <motion.div
        className="card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }} // only fade/scale in, no float
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Dancing Teddy GIF */}
        <motion.div
          animate={{ y: [0, -15, 0] }} // only teddy floats
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ textAlign: "center", marginBottom: "30px" }}
        >
          <img
            src="/assets/dancing teddy2.webp"
            alt="Dancing Teddy Bear Blowing Kisses"
            style={{ width: "300px", height: "auto" }} // bigger teddy
          />
        </motion.div>

        <h1 style={{ fontSize: "5.5rem" }}>
          Hiii <span>Babbyy</span>
        </h1>

        <p style={{ fontSize: "2.5rem", margin: "20px 0" }}>
          Will you be my Valentine?
        </p>

        <div className="buttons" style={{ gap: "20px" }}>
          <motion.button
            className="yes"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "15px 40px",
              fontSize: "1.2rem",
              borderRadius: "50px",
              background: "#ff4d6d",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            onClick={onYes}
          >
            YAAAAAASS
          </motion.button>

          <motion.button
            className="no"
            animate={{ x: noPosition.x, y: noPosition.y }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              padding: "15px 40px",
              fontSize: "1.2rem",
              borderRadius: "50px",
              background: "#ccc",
              color: "#333",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={moveNoButton}
          >
            NO
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
