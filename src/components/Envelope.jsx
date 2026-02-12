import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import "../styles/envelope.css";

export default function Envelope({ onBack, onNext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [showImages, setShowImages] = useState(false);
  
  const images = useMemo(() => [
    { 
      id: 1, 
      src: "/assets/image1.jpeg", 
      title: "Memory 1", 
      caption: "Apa nayo tumeivaa",
      color: "#ff6b6b",
      
    },
    { 
      id: 2, 
      src: "/assets/image2.jpeg", 
      title: "Memory 2", 
      caption: "Boss Apa unakaa Mlevi",
      color: "#4ecdc4",
      
    },
    { 
      id: 3, 
      src: "/assets/image3.jpeg", 
      title: "Memory 3", 
      caption: "Awwwwhhhh",
      color: "#45b7d1",
      
    },
    { 
      id: 4, 
      src: "/assets/image4.jpeg", 
      title: "Memory 4", 
      caption: "Babe walai fungua macho",
      color: "#96ceb4",
      
    },
    
    
  ], []);

  const handleEnvelopeClick = useCallback(() => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        setShowImages(true);
      }, 800);
    }
  }, [isOpen]);

  const handleImageClick = useCallback((image) => {
    setCurrentImage(image);
  }, []);

  const handleCloseImage = useCallback(() => {
    setCurrentImage(null);
  }, []);

  const handleNext = useCallback(() => {
    if (currentImage) {
      const currentIndex = images.findIndex(img => img.id === currentImage.id);
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentImage(images[nextIndex]);
    }
  }, [currentImage, images]);

  const handlePrev = useCallback(() => {
    if (currentImage) {
      const currentIndex = images.findIndex(img => img.id === currentImage.id);
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      setCurrentImage(images[prevIndex]);
    }
  }, [currentImage, images]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentImage) {
        if (e.key === 'Escape') handleCloseImage();
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentImage, handleCloseImage, handleNext, handlePrev]);

  return (
    <div className="magazine-container">
      {/* Background Pattern */}
      <div className="vintage-paper"></div>
      <div className="vintage-overlay"></div>
      
      {/* Decorative Elements */}
      <div className="decorative-corner top-left"></div>
      <div className="decorative-corner top-right"></div>
      <div className="decorative-corner bottom-left"></div>
      <div className="decorative-corner bottom-right"></div>
      
      {/* Magazine Header */}
      <motion.header 
        className="magazine-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="magazine-title">
          <h1 className="main-title">Memories Magazine</h1>
          <p className="subtitle">drum rollsss teden teden</p>
        </div>
        <div className="magazine-ornament"></div>
      </motion.header>

      {/* Main Content */}
      <main className="magazine-content">
        {/* Featured Interactive Element */}
        <section className="featured-section">
          <motion.div 
            className={`magazine-cover ${isOpen ? 'opened' : ''}`}
            onClick={handleEnvelopeClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ y: 0, rotateY: 0 }}
            animate={isOpen ? { 
              y: -50,
              rotateY: 180,
              boxShadow: "0 30px 60px rgba(0,0,0,0.4)"
            } : {}}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="cover-front">
              <div className="cover-image"></div>
              <div className="cover-title">
                <h2></h2>
                <p className="edition">Limited Edition</p>
                <p className="edition">The following pictures were taken by Tyra aka your genius wife</p>
              </div>
              <div className="cover-ornaments">
                <div className="ornament"></div>
                <div className="ornament"></div>
                <div className="ornament"></div>
              </div>
              <div className="open-hint">
                <span className="hint-arrow">↓</span>
                <span className="hint-text">Click this</span>
              </div>
            </div>
            <div className="cover-back">
              <div className="back-content">
                <h3>Inside This Issue</h3>
                <ul className="contents-list">
                  <li>• You can see how drunk you are</li>
                  <li>• You can see that you blind wah(you closed your eyes in all pictures)</li>
                  <li>• You can see how we can be good parents(hot parents)</li>
                  
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Opening Animation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                className="opening-reveal"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: 0.5 }}
              >
                
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Magazine Grid Layout */}
        <AnimatePresence>
          {showImages && (
            <motion.section 
              className="magazine-grid-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="section-header">
                <h2 className="section-title">Featured Memories</h2>
                <p className="section-subtitle">As you can see babyy this are pictures that we took together</p>
                <div className="section-divider"></div>
              </div>
              
              <div className="magazine-grid">
                {images.map((image, index) => (
                  <motion.article
                    key={image.id}
                    className={`magazine-card card-${(index % 3) + 1}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                    }}
                    onClick={() => handleImageClick(image)}
                  >
                    <div className="card-frame">
                      <div className="card-image-container">
                        <img 
                          src={image.src} 
                          alt={image.title}
                          className="card-image"
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/400x300/${image.color.replace('#', '')}/ffffff?text=${encodeURIComponent(image.title)}`;
                          }}
                        />
                        <div className="image-overlay-mag">
                          <span className="view-fullscreen">VIEW →</span>
                        </div>
                      </div>
                      <div className="card-content">
                        <div className="card-category">
                          <span className="category-badge">{image.category}</span>
                          <span className="card-number">#{String(image.id).padStart(2, '0')}</span>
                        </div>
                        <h3 className="card-title">{image.title}</h3>
                        <p className="card-caption">{image.caption}</p>
                        <div className="card-meta">
                          <span className="meta-date">Special Moment</span>
                          <span className="meta-icon">❤️</span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <nav className="magazine-navigation">
        {onBack && (
          <motion.button
            className="nav-btn prev-btn"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
          >
            ← Previous
          </motion.button>
        )}
        
        <div className="page-indicator">
          <span className="current-page">Memory Gallery</span>
          <span className="total-pages"> • 2026 Edition</span>
        </div>
        
        {onNext && (
          <motion.button
            className="nav-btn next-btn"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
          >
            Continue →
          </motion.button>
        )}
      </nav>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {currentImage && (
          <motion.div 
            className="magazine-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseImage}
          >
            <motion.div 
              className="modal-content-mag"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2 className="modal-title">{currentImage.title}</h2>
                <span className="modal-category">{currentImage.category}</span>
              </div>
              
              <div className="modal-image-wrapper">
                <img 
                  src={currentImage.src} 
                  alt={currentImage.title}
                  className="modal-image-mag"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/800x600/${currentImage.color.replace('#', '')}/ffffff?text=${encodeURIComponent(currentImage.title)}`;
                  }}
                />
                <div className="modal-navigation">
                  <button 
                    className="modal-nav-btn prev-modal-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                  >
                    ←
                  </button>
                  <button 
                    className="modal-nav-btn next-modal-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                  >
                    →
                  </button>
                </div>
              </div>
              
              <div className="modal-info">
                <p className="modal-description">{currentImage.caption}</p>
                <div className="modal-footer">
                  <div className="image-counter">
                    {images.findIndex(img => img.id === currentImage.id) + 1} / {images.length}
                  </div>
                  <div className="modal-actions">
                    <button 
                      className="close-modal-btn"
                      onClick={handleCloseImage}
                    >
                      Close ✕
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="magazine-footer">
        <p className="footer-text">
          I LOVE YOU SO MUCH • 
          <span className="footer-love"> Made by Tyra Mwai</span>
        </p>
        <p className="footer-instruction">
          {currentImage 
            ? "Press ← → to navigate • ESC to close" 
            : isOpen 
              ? "Click any photo to view fullscreen" 
              : "Click the magazine cover to begin"}
        </p>
      </footer>
    </div>
  );
}