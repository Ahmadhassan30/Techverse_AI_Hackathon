import { useState, useEffect } from 'react';
import './Carousel.css';

export default function ElegantTextCarousel() {
const carouselTexts = [
  'Join the <span class="highlight">Hackathon</span> and turn your boldest ideas into reality.',
  'Innovate. <span class="highlight emphasis">Create</span>. Transform the world with every line of code.',
  'Bringing <span class="highlight">ideas</span> to life through teamwork, technology, and tenacity.',
  'Code with <span class="highlight">passion</span> and push the boundaries of what’s possible.',
  'Build the <span class="highlight emphasis">future</span> by solving real problems with smart solutions.'
];


  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselTexts.length);
        setIsTransitioning(false);
      }, 500); // Match this with CSS transition duration
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      <div className="overflow-hidden relative w-full max-w-2xl">
        <div 
          className={`carousel-text ${isTransitioning ? 'transitioning' : ''}`}
          dangerouslySetInnerHTML={{ __html: carouselTexts[currentIndex] }}
        />
      </div>
    </div>
  );
}