// src/components/LoadingScreen.jsx
import React, { useState, useEffect, useCallback } from 'react';
import './loading.css';

const LoadingScreen = ({ onLoadComplete, model3DProgress = 0 }) => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('initializing');
  const [engagementMessage, setEngagementMessage] = useState('');
  
  const loadingTexts = [
    'ACCESSING HACKATHON INTERFACE',
    'PREPARING 3D ENVIRONMENT',
    'CONNECTING TO NEURAL NETWORKS',
    'LOADING MACHINE LEARNING MODULES',
    'CALIBRATING AI ALGORITHMS',
    
    
  ];
  
  const engagementMessages = [
    "Did you know? This AI system processes data 100x faster than previous generations.",
    "Fun fact: Our neural networks use over 10 billion parameters for decision making.",
    "Pro tip: Interact with the 3D model using gestures once loaded.",
    "Interesting: This interface adapts to your interaction patterns over time.",
    "Almost there! The 3D environment is being optimized for your device.",
    "Get ready to experience cutting-edge AI visualization technology.",
    "We're preparing a customized environment based on your device capabilities.",
    "This hackathon interface uses advanced real-time rendering techniques.",
    "The AI models are calibrating to provide optimal performance on your device.",
    "Final optimization in progress. Prepare for an immersive experience!"
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
          const textProgress = (currentTextIndex / loadingTexts.length) * 50; // Text is 50% of total progress
          setProgressPercent(textProgress + (model3DProgress * 0.5)); // 3D model is other 50%
          
          // Update phase based on progress
          if (currentTextIndex >= loadingTexts.length) {
            setCurrentPhase('waiting_for_model');
          }
        }
      } else {
        clearInterval(typingInterval);
        // Don't set to 100% here, we'll wait for the 3D model
      }
    };
    
    typingInterval = setInterval(typeText, 100);
    return () => clearInterval(typingInterval);
  }, []);
  
  // Update progress based on 3D model loading
  useEffect(() => {
    // Text progress is 50%, 3D model is 50%
    const textProgress = Math.min((text.split('\n').length - 1) / loadingTexts.length, 1) * 50;
    const totalProgress = textProgress + (model3DProgress * 50);
    setProgressPercent(totalProgress);
    
    // If both text typing and 3D model are complete
    if (totalProgress >= 100 && onLoadComplete) {
      setTimeout(() => {
        onLoadComplete();
      }, 1000);
    }
  }, [model3DProgress, text, loadingTexts.length, onLoadComplete]);
  
  // Engagement messages rotation
  useEffect(() => {
    if (currentPhase === 'waiting_for_model') {
      let messageIndex = 0;
      const messageInterval = setInterval(() => {
        setEngagementMessage(engagementMessages[messageIndex % engagementMessages.length]);
        messageIndex++;
      }, 4000);
      
      return () => clearInterval(messageInterval);
    }
  }, [currentPhase, engagementMessages]);
  
  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  // Binary background effect with AI symbols
  const BinaryBackground = useCallback(() => {
    const [binaryRows, setBinaryRows] = useState([]);
    
    useEffect(() => {
      const generateRows = () => {
        const updateRows = () => {
          const screenWidth = window.innerWidth;
          const charWidth = 8; // Approximate width of a character in pixels
          const charsPerRow = Math.floor(screenWidth / charWidth);
          
          const generateRow = () => {
            const aiSymbols = ['0', '1', 'A', 'I'];
            return Array(charsPerRow).fill().map(() => {
              // 80% chance of 0 or 1, 20% chance of A or I
              return Math.random() > 0.8 
                ? aiSymbols[Math.floor(Math.random() * 2) + 2] 
                : aiSymbols[Math.floor(Math.random() * 2)];
            }).join('');
          };
          
          const numRows = Math.max(10, Math.min(15, Math.floor(window.innerHeight / 20)));
          setBinaryRows(Array(numRows).fill().map(() => generateRow()));
        };
        
        updateRows();
        window.addEventListener('resize', updateRows);
        
        // Periodically regenerate some rows for animation effect
        const rowUpdateInterval = setInterval(() => {
          setBinaryRows(prev => {
            const newRows = [...prev];
            const randomIndex = Math.floor(Math.random() * newRows.length);
            const generateRow = () => {
              const screenWidth = window.innerWidth;
              const charWidth = 8;
              const charsPerRow = Math.floor(screenWidth / charWidth);
              
              const aiSymbols = ['0', '1', 'A', 'I'];
              return Array(charsPerRow).fill().map(() => {
                return Math.random() > 0.8 
                  ? aiSymbols[Math.floor(Math.random() * 2) + 2] 
                  : aiSymbols[Math.floor(Math.random() * 2)];
              }).join('');
            };
            
            newRows[randomIndex] = generateRow();
            return newRows;
          });
        }, 500);
        
        return () => {
          window.removeEventListener('resize', updateRows);
          clearInterval(rowUpdateInterval);
        };
      };
      
      generateRows();
    }, []);
    
    return (
      <div className="binary-background">
        {binaryRows.map((row, i) => (
          <div key={i} className="binary-row">
            {row}
          </div>
        ))}
      </div>
    );
  }, []);
  
  // Neural connection lines effect
  const NeuralConnections = useCallback(() => {
    const [connections, setConnections] = useState([]);
    
    useEffect(() => {
      const generateConnections = () => {
        // Create random neural connections based on screen size
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const connectionCount = screenWidth < 768 ? 10 : 20; // Fewer on mobile
        
        const newConnections = Array(connectionCount).fill().map(() => ({
          left: Math.random() * 100,
          top: Math.random() * 100,
          width: (30 + Math.random() * 100) * (screenWidth / 1920), // Scale by screen width
          angle: Math.random() * 360,
          delay: Math.random() * 3
        }));
        
        setConnections(newConnections);
      };
      
      generateConnections();
      
      const resizeHandler = () => {
        generateConnections();
      };
      
      window.addEventListener('resize', resizeHandler);
      return () => window.removeEventListener('resize', resizeHandler);
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
  }, []);

  return (
    <div className={`loading-screen ${progressPercent >= 100 ? 'complete' : ''}`}>
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
        
        {currentPhase === 'waiting_for_model' && (
          <div className="engagement-message">
            {engagementMessage}
          </div>
        )}
        
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
        {progressPercent < 100 
          ? 'PLEASE WAIT WHILE AI SYSTEMS INITIALIZE' 
          : 'INITIALIZATION COMPLETE - LAUNCHING INTERFACE'}
      </div>
    </div>
  );
};

export default LoadingScreen;