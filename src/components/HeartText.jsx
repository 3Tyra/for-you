import { motion } from "framer-motion";
import { useState } from "react";
import "../styles/hexLaserHeart.css";

export default function HexLaserHeart({ onBack }) {
  const [animationKey, setAnimationKey] = useState(0); // Key to reset animation

  const heartSize = 30; // heart size
  const hexRadius = 25; // spacing
  const points = [];

  // Generate hex grid points along a heart shape
  for (let t = 0; t < Math.PI * 2; t += 0.03) {
    const heartX = 16 * Math.pow(Math.sin(t), 3);
    const heartY =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    const offsets = [
      [0, 0],
      [hexRadius, 0],
      [-hexRadius, 0],
      [hexRadius / 2, hexRadius * 0.866],
      [-hexRadius / 2, hexRadius * 0.866],
      [hexRadius / 2, -hexRadius * 0.866],
      [-hexRadius / 2, -hexRadius * 0.866],
    ];

    offsets.forEach(([dx, dy]) => {
      points.push({
        x: heartX * heartSize + dx,
        y: -heartY * heartSize + dy,
      });
    });
  }

  // Handle "Again" button click
  const handleAgain = () => {
    setAnimationKey(prev => prev + 1); // change key to reset animation
  };

  return (
    <div className="laser-heart-container" key={animationKey}>
      {/* Heart points */}
      {points.map((p, i) => (
        <motion.div
          key={i}
          className="laser-beam"
          initial={{
            x: Math.random() * window.innerWidth - window.innerWidth / 2,
            y: Math.random() * window.innerHeight - window.innerHeight / 2,
          }}
          animate={{ x: p.x, y: p.y }}
          transition={{
            duration: 1.5 + Math.random(),
            delay: i * 0.002,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Buttons */}
      <div
        style={{
          position: "fixed",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "20px",
        }}
      >
        <button
  onClick={handleAgain}
  style={{
    padding: "12px 28px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "999px", // 👈 oval shape
    background: "linear-gradient(135deg, #b1125b, #6b0f3a)", // darker pink
    color: "#fff",
    border: "1px solid rgba(255, 45, 149, 0.4)",
    boxShadow: `
      0 0 8px rgba(255, 45, 149, 0.4),
      0 0 20px rgba(255, 45, 149, 0.25)
    `,
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = "translateY(-3px) scale(1.05)";
    e.target.style.boxShadow =
      "0 0 15px rgba(255,45,149,0.8), 0 0 35px rgba(255,45,149,0.5)";
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.boxShadow =
      "0 0 8px rgba(255,45,149,0.4), 0 0 20px rgba(255,45,149,0.25)";
  }}
>
  Again
</button>

<button
  onClick={onBack}
  style={{
    padding: "12px 28px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "999px", // 👈 oval shape
    background: "linear-gradient(135deg, #3a0f6b, #1b062f)", // darker purple
    color: "#fff",
    border: "1px solid rgba(138,43,226,0.4)",
    boxShadow: `
      0 0 8px rgba(138,43,226,0.4),
      0 0 20px rgba(138,43,226,0.25)
    `,
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = "translateY(-3px) scale(1.05)";
    e.target.style.boxShadow =
      "0 0 15px rgba(138,43,226,0.8), 0 0 35px rgba(138,43,226,0.5)";
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.boxShadow =
      "0 0 8px rgba(138,43,226,0.4), 0 0 20px rgba(138,43,226,0.25)";
  }}
>
  Back
</button>

      </div>
    </div>
  );
}
