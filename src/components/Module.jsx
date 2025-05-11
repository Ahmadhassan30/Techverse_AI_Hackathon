import React, { useEffect, useRef, useState } from "react";
import "./HackathonInfo.css";
import { gsap } from "gsap";

const days = [
  {
    title: "Day 1",
    date: "May 30, 2025",
    schedule: [
      { time: "10:00 AM", event: "Opening Ceremony" },
      { time: "11:00 AM", event: "Hackathon Kickoff" },
      { time: "01:00 PM", event: "Lunch Break" },
      { time: "02:00 PM", event: "Back to competition" },
      { time: "06:30 PM", event: "Wrap Up Day 1" },
      { time: "07:00 PM", event: "Tambola Night" },
    ],
  },
  {
    title: "Day 2",
    date: "May 31, 2025",
    schedule: [
      { time: "08:00 AM", event: "Check-in" },
      { time: "09:00 AM", event: "Hacking Continues" },
      { time: "01:00 PM", event: "Lunch Break" },
      { time: "02:00 PM", event: "Back to competition" },
      { time: "06:30 PM", event: "Wrap Up Day 2" },
      { time: "07:00 PM", event: "Qawali Night" },
    ],
  },
  {
    title: "Day 3",
    date: "June 01, 2025",
    schedule: [
      { time: "08:00 AM", event: "Final Touches" },
      { time: "11:00 AM", event: "Project Submission" },
      { time: "12:00 PM", event: "Lunch Break" },
      { time: "01:00 PM", event: "Judging & Demos" },
      { time: "02:00 PM", event: "Winner Announcement" },
     
    ],
  },
];

const Module = () => {
  const cardsRef = useRef([]);
  const scheduleItemsRef = useRef([]);
  const titleRef = useRef(null);
  const sectionRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Function to run animations
  const runAnimations = () => {
    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }
    );

    // Cards animation with a 3D effect
    gsap.fromTo(
      cardsRef.current,
      { 
        opacity: 0, 
        y: 80, 
        scale: 0.8, 
        rotationY: 30,
        stagger: 0.22
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1.2,
        stagger: 0.22,
        ease: "expo.out",
        onComplete: animateScheduleItems
      }
    );
    
    setHasAnimated(true);
  };

  // Initial animation when component mounts
  useEffect(() => {
    runAnimations();
    
    // Set up intersection observer to detect when section is in view
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        runAnimations();
      } else {
        // Reset animation state when out of view
        setHasAnimated(false);
        
        // Reset elements to initial state when out of view
        gsap.set(titleRef.current, { opacity: 0, y: -50 });
        gsap.set(cardsRef.current, { 
          opacity: 0, 
          y: 80, 
          scale: 0.8, 
          rotationY: 30 
        });
        
        const allScheduleItems = scheduleItemsRef.current.flat();
        gsap.set(allScheduleItems, { opacity: 0, x: -20 });
      }
    }, { threshold: 0.2 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animate schedule items after cards have appeared
  const animateScheduleItems = () => {
    const allScheduleItems = scheduleItemsRef.current.flat();
    
    gsap.fromTo(
      allScheduleItems,
      { 
        opacity: 0, 
        x: -20 
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.03,
        ease: "power2.out"
      }
    );
  };

  // Track mouse position for card hover effects
  const handleMouseMove = (e, idx) => {
    if (idx === activeCardIndex) {
      const card = cardsRef.current[idx];
      if (!card) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setCursorPosition({ x, y });
      
      // Subtle tilt effect based on mouse position
      const xRotation = ((y - rect.height / 2) / rect.height) * 8;
      const yRotation = ((rect.width / 2 - x) / rect.width) * 8;
      
      gsap.to(card, {
        rotationX: xRotation,
        rotationY: yRotation,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  // Reset card position when mouse leaves
  const handleMouseLeave = (idx) => {
    setActiveCardIndex(null);
    gsap.to(cardsRef.current[idx], {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  // Set active card when mouse enters
  const handleMouseEnter = (idx) => {
    setActiveCardIndex(idx);
  };

  return (
    <section className="hackathon-info-section" ref={sectionRef}>
      <h2 className="hackathon-title neon-glow" ref={titleRef}>
        3-Day Hackathon Plan
      </h2>
      
      <div className="hackathon-3day-grid">
        {days.map((day, idx) => (
          <div
            className="hackathon-day-card neon-card"
            key={day.title}
            ref={el => (cardsRef.current[idx] = el)}
            onMouseMove={(e) => handleMouseMove(e, idx)}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
          >
            {activeCardIndex === idx && (
              <div 
                className="card-cursor"
                style={{ 
                  left: cursorPosition.x, 
                  top: cursorPosition.y 
                }}
              />
            )}
            
            <div className="hackathon-day-title">{day.title}</div>
            <div className="hackathon-day-date">{day.date}</div>
            
            <ul className="hackathon-day-schedule">
              {day.schedule.map((item, i) => {
                // Initialize refs array for this card if needed
                if (!scheduleItemsRef.current[idx]) scheduleItemsRef.current[idx] = [];
                
                return (
                  <li 
                    key={i} 
                    className="hackathon-day-schedule-item"
                    ref={el => (scheduleItemsRef.current[idx][i] = el)}
                  >
                    <span className="schedule-time">{item.time}</span>
                    <span className="schedule-event">{item.event}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Module;