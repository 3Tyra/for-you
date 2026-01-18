import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import "../styles/gatekeeper.css";

export default function Gatekeeper({ onAuthorized }) {
  const [step, setStep] = useState(0); // 0: initial, 1: identity check, 2: passcode, 3: success
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [shake, setShake] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [locked, setLocked] = useState(false);
  const [timer, setTimer] = useState(0);
  const [identityConfirmed, setIdentityConfirmed] = useState(false);

  // Original passcode and alternative numerical formats
  const correctPasscode = "28TH NOV 2025";
  
  // Function to check if passcode matches any accepted format
  const isPasscodeValid = (input) => {
    const normalizedInput = input.trim().toUpperCase();
    
    // Original format
    if (normalizedInput === correctPasscode) return true;
    
    // Numerical format 1: 28/11/2025
    if (normalizedInput === "28/11/2025") return true;
    
    // Numerical format 2: 28-11-2025
    if (normalizedInput === "28-11-2025") return true;
    
    // Numerical format 3: 28.11.2025
    if (normalizedInput === "28.11.2025") return true;
    
    // Numerical format 4: 28112025 (without separators)
    if (normalizedInput === "28112025") return true;
    
    // Numerical format 5: 28 11 2025 (with spaces)
    if (normalizedInput === "28 11 2025") return true;
    
    // Add more formats if needed
    return false;
  };

  // Initial animation - slide in message
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStep(1);
      setShowMessage(true);
    }, 500);

    return () => clearTimeout(timer1);
  }, []);

  // Lockout timer
  useEffect(() => {
    if (locked && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setLocked(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [locked, timer]);

  const handleIdentityConfirm = () => {
    setIdentityConfirmed(true);
    setTimeout(() => {
      setStep(2);
    }, 800);
  };

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    
    if (locked) {
      setError(`System locked for ${timer} more seconds`);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (!passcode.trim()) {
      setError("Please enter the passcode");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (isPasscodeValid(passcode)) {
      setError("");
      setStep(3);
      
      // Success animation and proceed
      setTimeout(() => {
        if (onAuthorized) onAuthorized();
      }, 2000);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setError(`Incorrect passcode! Attempts: ${newAttempts}/3`);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      
      // Clear input for security
      setPasscode("");
      
      // Lock after 3 failed attempts
      if (newAttempts >= 3) {
        setLocked(true);
        setTimer(30);
        setError("Too many failed attempts! System locked for 30 seconds.");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handlePasscodeSubmit(e);
    }
  };

  return (
    <div className="gatekeeper-container">
      {/* Background */}
      <div className="vintage-paper-gate"></div>
      <div className="vintage-overlay-gate"></div>
      
      {/* Decorative Corners */}
      <div className="decorative-corner-gate top-left"></div>
      <div className="decorative-corner-gate top-right"></div>
      <div className="decorative-corner-gate bottom-left"></div>
      <div className="decorative-corner-gate bottom-right"></div>

      {/* Main Content */}
      <main className="gatekeeper-content">
        {/* Step 1: Identity Verification Request */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="identity"
              className="identity-container"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="gatekeeper-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                PRIVATE ACCESS ONLY
              </motion.h1>

              {/* Sliding Message (No Card) */}
              <motion.div
                className="sliding-message"
                initial={{ x: "-100vw" }}
                animate={showMessage ? { x: 0 } : {}}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.8
                }}
              >
                <h2 className="warning-title">IMPORTANT NOTICE</h2>
                <div className="message-body">
                  <p className="main-warning">
                    HELLO, THIS IS FOR <span className="highlight">EMMANUEL KAGUNYI</span> ONLY!
                  </p>
                  <p className="sub-warning">
                    IF YOU AREN'T EMMANUEL, KINDLY SHIFT AWAY FROM THIS PAGE!
                  </p>
                </div>
                <div className="message-divider"></div>
                <p className="message-note">
                  This is a private digital space created exclusively for one person.
                  Unauthorized access is strictly prohibited.
                </p>
              </motion.div>

              {/* Identity Confirmation Button */}
              <motion.div
                className="identity-confirm-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <p className="confirm-identity-text">
                  Are you Emmanuel Kagunyi?
                </p>
                <motion.button
                  className="identity-confirm-button"
                  onClick={handleIdentityConfirm}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    scale: identityConfirmed ? 1.1 : 1,
                    backgroundColor: identityConfirmed ? "#00ff88" : "#8b4513"
                  }}
                >
                  {identityConfirmed ? "✓ Verified" : "Yes, I am Emmanuel"}
                </motion.button>
                <p className="confirm-warning">
                  Only proceed if you are Emmanuel Kagunyi
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: Passcode Entry */}
        <AnimatePresence mode="wait">
          {step === 2 && (
            <motion.div
              key="passcode"
              className="passcode-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="passcode-header"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="passcode-title">Final Verification</h2>
                <p className="passcode-subtitle">
                  Please enter our special date to proceed
                </p>
              </motion.div>

              <motion.form
                className={`passcode-form ${shake ? 'shake' : ''}`}
                onSubmit={handlePasscodeSubmit}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="input-group">
                  <label htmlFor="passcode" className="input-label">
                    Enter the special date (Format: DD MMM YYYY or DD/MM/YYYY):
                  </label>
                  <motion.input
                    type="text"
                    id="passcode"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="passcode-input"
                    placeholder="KAA HUJUI USHABANT"
                    disabled={locked}
                    autoComplete="off"
                    autoFocus
                    animate={{
                      borderColor: error ? "#ff4757" : "#8b4513"
                    }}
                  />
                </div>

                {error && (
                  <motion.div
                    className="error-message"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <span className="error-icon">❌</span>
                    {error}
                    {locked && timer > 0 && (
                      <div className="lockout-timer">
                        Time remaining: <span className="timer">{timer}s</span>
                      </div>
                    )}
                  </motion.div>
                )}

                <div className="form-actions">
                  <motion.button
                    type="submit"
                    className="submit-button"
                    disabled={locked}
                    whileHover={{ scale: locked ? 1 : 1.05 }}
                    whileTap={{ scale: locked ? 1 : 0.95 }}
                    animate={{
                      opacity: locked ? 0.6 : 1,
                      backgroundColor: locked ? "#ccc" : "#8b4513"
                    }}
                  >
                    {locked ? "LOCKED" : "VERIFY & PROCEED"}
                    <span className="button-icon">→</span>
                  </motion.button>
                </div>
              </motion.form>

              {/* Attempt Counter */}
              {attempts > 0 && (
                <motion.div
                  className="attempt-counter"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="attempt-bar">
                    <motion.div
                      className="attempt-fill"
                      initial={{ width: "0%" }}
                      animate={{ width: `${(attempts / 3) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="attempt-text">
                    Attempts: {attempts}/3
                  </span>
                </motion.div>
              )}

              <motion.div
                className="passcode-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="hint-text">
                  Hint: The day we meet!!!
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Success */}
        <AnimatePresence mode="wait">
          {step === 3 && (
            <motion.div
              key="success"
              className="success-container"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="success-icon"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 1.5,
                  ease: "easeInOut"
                  
                }}
              >
                YAAAYY
              </motion.div>

              <motion.h2
                className="success-title"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Access Granted!
              </motion.h2>

              <motion.p
                className="success-message"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Welcome, Emmanuel! 
              </motion.p>

              <motion.p
                className="success-submessage"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Preparing your special memories...
              </motion.p>

              <motion.div
                className="progress-bar"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 1 }}
              />

              <motion.p
                className="redirect-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                Taking you to your special place...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="gatekeeper-footer">
        <p className="footer-note">
          Created by Tyra Mwai
        </p>
      </footer>
      {/* Add this inside the gatekeeper-container div */}
<div className="node-container">
  <div className="node"></div>
  <div className="node"></div>
  <div className="node"></div>
  <div className="node"></div>
  <div className="node"></div>
</div>
    </div>
  );
}