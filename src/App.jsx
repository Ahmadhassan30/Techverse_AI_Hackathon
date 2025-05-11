import React, { useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import './style.css';
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Scene from './components/scene';
import Button from './components/Button';
import Header from './components/Header';
import Module from './components/Module';
import Partner from './components/Partner';                               
import Carousel from './components/Carousel';   
import Footer from './components/footer';
// Animated stars component
const AnimatedStars = () => {
  const starsRef = useRef();
  
  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.x += delta * 0.05;
      starsRef.current.rotation.y += delta * 0.075;
    }
  });
  
  return (
    <Stars
      ref={starsRef}
      radius={150}
      depth={70}
      count={3000}
      factor={3}
      saturation={0.1}
      fade
      speed={0.5}
    />
  );
};

const App = () => {
  return (
    <>
      {/* Fixed background Canvas - animated stars */}
      <div className="fixed-stars-background">
        <Canvas flat>
          <AnimatedStars />
          <fog attach="fog" args={['#000', 4, 20]} />
          <EffectComposer>
            <Bloom
              mipmapBlur={true}
              intensity={30}
              luminanceThreshold={0}
              luminanceSmoothing={3}
            />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Hero Section with Canvas and overlays - keeps original model intact */}
      <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <Canvas flat camera={{ position: [0, 0, 5] }}>
          <OrbitControls enableZoom={false} enablePan={false} />
          <ambientLight intensity={2} />
          <Scene />
          <EffectComposer>
            <Bloom
              mipmapBlur={true}
              intensity={30}
              luminanceThreshold={0}
              luminanceSmoothing={3}
            />
          </EffectComposer>
        </Canvas>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 100 }}>
          <Header />
        </div>
        
        {/* Button fixed at bottom center */}
        <div style={{
          position: 'absolute',
          left: '50%',
          bottom: 30,
          transform: 'translateX(-50%)',
          zIndex: 200
        }}>
          <Button />
        </div>
      </div>

      {/* Module Section BELOW the Canvas */}
      <div className="module-section" >
        <Carousel />
      </div>
      <div className="module-section">
        <Module />
      </div>
      <div className="module-section" >
        <Partner />
      </div>
     
      <div>
        <Footer />
      </div>
    </>
  );
};

export default App;