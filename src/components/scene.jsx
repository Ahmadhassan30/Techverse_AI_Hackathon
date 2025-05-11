import React, { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import { useTexture } from "@react-three/drei";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";

// Low poly placeholder component for fast initial rendering
const PlaceholderModel = ({ isMobile }) => {
  const meshRef = useRef(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <cylinderGeometry
        args={[
          isMobile ? 1.0 : 1.8, // slightly smaller than final model
          isMobile ? 1.0 : 1.8,
          isMobile ? 1.2 : 1.7,
          isMobile ? 12 : 16, // much fewer segments for placeholder
          isMobile ? 1 : 2,
          true
        ]}
      />
      <meshStandardMaterial
        color="#0f0"
        opacity={0.7}
        transparent
        wireframe
      />
    </mesh>
  );
};

// Optimized final model component
const OptimizedModel = ({ isMobile, tex }) => {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const rotationSpeed = useRef(1);
  
  // Optimize geometry using useMemo to prevent recreation
  const geometry = useMemo(() => {
    return new THREE.CylinderGeometry(
      isMobile ? 1.2 : 2,
      isMobile ? 1.2 : 2,
      isMobile ? 1.5 : 2,
      isMobile ? 30 : 48, // reduced poly count
      isMobile ? 30 : 48,
      true
    );
  }, [isMobile]);
  
  // Pre-process texture for better performance
  useEffect(() => {
    if (tex) {
      // Optimize texture
      tex.anisotropy = 4; // improves texture quality at angles
      tex.minFilter = THREE.LinearMipMapLinearFilter;
      tex.generateMipmaps = true;
      tex.needsUpdate = true;
    }
  }, [tex]);
  
  // Animate on scroll with throttling for better performance
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const heroHeight = window.innerHeight;
          const progress = Math.min(Math.max(lastScrollY / heroHeight, 0), 1);
          
          // Scale down and warp (squash/stretch)
          if (meshRef.current) {
            const scale = 1 - 0.7 * progress;
            const warpY = 1 - 0.5 * progress; // squash vertically
            meshRef.current.scale.set(scale, warpY, scale);
            
            // Increase rotation speed as you scroll
            rotationSpeed.current = 1 + 4 * progress;
          }
          
          // Fade out and color shift
          if (materialRef.current) {
            materialRef.current.opacity = 1 - progress;
            
            // Color shift: from white to a green tint (to match your theme)
            const color = new THREE.Color().lerpColors(
              new THREE.Color(1, 1, 1), // white
              new THREE.Color(0, 1, 0.4), // green (matches your theme)
              progress
            );
            materialRef.current.color = color;
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Optimize animation frame with delta-based rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed.current;
    }
  });
  
  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        ref={materialRef}
        map={tex}
        transparent
        side={THREE.DoubleSide}
        opacity={1}
        color={0xffffff}
        // Additional optimization parameters
        toneMapped={false}
        aoMapIntensity={0.5}
      />
    </mesh>
  );
};

// Main Scene component with progressive loading
const Scene = () => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const tex = useTexture('./image.png', () => {
    // Callback when texture is loaded
    setTimeout(() => setModelLoaded(true), 100);
  });
  
  // Check if device is mobile with debounced resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on mount
    checkMobile();
    
    // Debounced resize handler
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);
  
  return (
    <group rotation={[0, 2, 0.5]}>
      <Suspense fallback={<PlaceholderModel isMobile={isMobile} />}>
        {modelLoaded ? (
          <OptimizedModel isMobile={isMobile} tex={tex} />
        ) : (
          <PlaceholderModel isMobile={isMobile} />
        )}
      </Suspense>
    </group>
  );
};

export default Scene;