import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './partner.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Partner = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const infoRef = useRef(null);
  const techLinesRef = useRef(null);
  const particlesRef = useRef(null);
  
  // Featured partner data
  const partner = {
    name: "Uplift AI",
    logo: "/logo.png", // Replace with actual path
    tagline: "Empowering Pakistan's Voice with AI",
    partnerType: "Strategic Technology Partner",
    description: "Uplift AI is Pakistan's pioneering Voice AI company, building state-of-the-art speech understanding and generation models tailored for local languages. With roots in Alexa and Siri, their in-house R&D powers voice-first digital services that just work — fast, intuitive, and made for millions.",
    stats: [],
    ctaLink: "https://upliftai.org/",
    ctaText: "Explore Partnership"
  };

  // Initialize animations
  useEffect(() => {
    const container = containerRef.current;
    
    // Create tech lines
    createTechLines();
    
    // Create floating particles
    createParticles();
    
    // Main entrance animation
    gsap.fromTo(container.querySelector('.partner-section-header'), 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    
    // Logo animation
    gsap.fromTo(logoRef.current, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        ease: "back.out(1.2)",
        delay: 0.2,
        scrollTrigger: {
          trigger: logoRef.current,
          start: "top 80%",
        }
      }
    );
    
    // Tech indicators animation
    const indicators = document.querySelectorAll('.tech-indicator');
    gsap.fromTo(indicators, 
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        stagger: 0.2,
        delay: 0.5,
        ease: "back.out(1.7)" 
      }
    );
    
    // Info section animation
    const infoElements = infoRef.current.children;
    gsap.fromTo(infoElements, 
      { opacity: 0, x: 30 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.8, 
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 70%",
        }
      }
    );
    
    return () => {
      // Clean up ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Create tech lines
  const createTechLines = () => {
    const techLines = techLinesRef.current;
    if (!techLines) return;
    
    // Clean up any existing lines
    techLines.innerHTML = '';
    
    // Create 15 lines with different properties
    for (let i = 0; i < 15; i++) {
      const line = document.createElement('div');
      line.className = 'tech-line';
      
      // Randomize position, width and animation delay
      const top = Math.random() * 100;
      const width = Math.random() * 150 + 50;
      const animationDelay = Math.random() * 10;
      
      line.style.top = `${top}%`;
      line.style.width = `${width}px`;
      line.style.animationDelay = `${animationDelay}s`;
      
      techLines.appendChild(line);
    }
  };
  
  // Create floating particles
  const createParticles = () => {
    const particles = particlesRef.current;
    if (!particles) return;
    
    // Clean up any existing particles
    particles.innerHTML = '';
    
    // Create 40 particles with different properties
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Randomize position and size
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const size = Math.random() * 3 + 1;
      const opacity = Math.random() * 0.5 + 0.2;
      
      particle.style.top = `${top}%`;
      particle.style.left = `${left}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = opacity;
      
      // Add subtle animation
      gsap.to(particle, {
        y: -30 + Math.random() * 60,
        x: -30 + Math.random() * 60,
        duration: 5 + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      particles.appendChild(particle);
    }
  };

  return (
    <section className="technical-partner-section" ref={containerRef}>
      {/* Background elements */}
      <div className="partner-bg-elements">
        <div className="tech-grid"></div>
        <div className="glow-sphere"></div>
        <div className="glow-sphere-2"></div>
        <div className="floating-particles" ref={particlesRef}></div>
        <div className="tech-lines" ref={techLinesRef}></div>
      </div>
      
      {/* Main content */}
      <div className="partner-container">
        <div className="partner-section-header">
          <h2 className="partner-section-title">
            Featured <span className="title-highlight">Technical Partner</span>
            <span className="title-dot"></span>
          </h2>
        </div>
        
        <div className="partner-showcase">
          {/* Logo section */}
          <div className="partner-logo-showcase">
            <div className="logo-frame" ref={logoRef}>
              <div className="logo-highlight"></div>
              <div className="logo-container">
                <img src={partner.logo} alt={`${partner.name} Logo`} className="partner-logo" />
              </div>
              
              {/* Tech indicators */}
              <div className="tech-indicator ai">AI</div>
              <div className="tech-indicator cloud">DL</div>
              <div className="tech-indicator security">ML</div>
            </div>
          </div>
          
          {/* Info section */}
          <div className="partner-info" ref={infoRef}>
            <div className="partner-title">
              <div className="partner-type">{partner.partnerType}</div>
              <h3 className="partner-name">{partner.name}</h3>
            </div>
            
            <p className="partner-tagline">{partner.tagline}</p>
            <p className="partner-description">{partner.description}</p>
            
            <div className="partner-stats">
              {partner.stats.map((stat, index) => (
                <div className="stat-item" key={index}>
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
            
            <a href={partner.ctaLink} className="partner-cta" target="_blank" rel="noopener noreferrer">
              {partner.ctaText}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.16667 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partner;