// src/components/LoadingScreen.jsx
import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);
  
  const loadingTexts = [
    'INITIALIZING AI SYSTEMS',
    'CONNECTING TO NEURAL NETWORKS',
    'LOADING MACHINE LEARNING MODULES',
    'CALIBRATING AI ALGORITHMS',
    'PREPARING 3D ENVIRONMENT',
    'ACCESSING HACKATHON INTERFACE'
  ];
  
  // Text typing effect
  useEffect(() => {
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let typingInterval;
    
    const typeText = () => {
      if (currentTextIndex < loadingTexts.length) {
        if (currentCharIndex < loadingTexts[currentTextIndex].length) {
          setText(prev => prev + loadingTexts[currentTextIndex][currentCharIndex]);
          currentCharIndex++;
        } else {
          setText(prev => prev + '\n');
          currentTextIndex++;
          currentCharIndex = 0;
          
          // Update progress based on completed text lines
          setProgressPercent((currentTextIndex / loadingTexts.length) * 100);
        }
      } else {
        clearInterval(typingInterval);
        setProgressPercent(100);
      }
    };
    
    typingInterval = setInterval(typeText, 100);
    return () => clearInterval(typingInterval);
  }, []);
  
  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  // Binary background effect with AI symbols
  const BinaryBackground = () => {
    const generateRow = () => {
      const rowLength = 25 + Math.floor(Math.random() * 15);
      const aiSymbols = ['0', '1', 'A', 'I'];
      return Array(rowLength).fill().map(() => {
        // 80% chance of 0 or 1, 20% chance of A or I
        return Math.random() > 0.8 
          ? aiSymbols[Math.floor(Math.random() * 2) + 2] 
          : aiSymbols[Math.floor(Math.random() * 2)];
      }).join('');
    };
    
    const binaryRows = Array(15).fill().map(() => generateRow());
    
    return (
      <div className="binary-background">
        {binaryRows.map((row, i) => (
          <div key={i} className="binary-row">
            {row}
          </div>
        ))}
      </div>
    );
  };
  
  // Neural connection lines effect
  const NeuralConnections = () => {
    const [connections, setConnections] = useState([]);
    
    useEffect(() => {
      // Create random neural connections
      const newConnections = Array(20).fill().map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        width: 50 + Math.random() * 150,
        angle: Math.random() * 360,
        delay: Math.random() * 3
      }));
      
      setConnections(newConnections);
    }, []);
    
    return (
      <div className="neural-connections">
        {connections.map((conn, i) => (
          <div 
            key={i}
            className="connection"
            style={{
              left: `${conn.left}%`,
              top: `${conn.top}%`,
              width: `${conn.width}px`,
              transform: `rotate(${conn.angle}deg)`,
              animationDelay: `${conn.delay}s`
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="loading-screen">
      <BinaryBackground />
      <NeuralConnections />
      
      <div className="loading-container">
        <div className="loading-header">AI HACKATHON LOADING...</div>
        
        <div className="loading-terminal">
          <pre className="terminal-text">
            {text}
            {showCursor && <span className="cursor-blink">█</span>}
          </pre>
        </div>
        
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        
        <div className="progress-info">
          <span>{'<'} INITIALIZING AI {'>'}</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
      </div>
      
      <div className="loading-footer">
        PLEASE WAIT WHILE AI SYSTEMS INITIALIZE
      </div>
    </div>
  );
};

export default LoadingScreen;