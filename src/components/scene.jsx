import React, { useRef, useEffect } from 'react'
import { useTexture } from "@react-three/drei";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";

const Scene = () => {
  const tex = useTexture('./image.png');
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const rotationSpeed = useRef(1);

  // Animate on scroll
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);

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
        materialRef.current.transparent = true;

        // Color shift: from white to a blueish tint
        const color = new THREE.Color().lerpColors(
          new THREE.Color(1, 1, 1), // white
          new THREE.Color(0.2, 0.6, 1), // blue
          progress
        );
        materialRef.current.color = color;
        materialRef.current.needsUpdate = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed.current;
    }
  });

  // Check if device is mobile
  const [isMobile, setIsMobile] = React.useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on mount and when window resizes
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <group rotation={[0, 2, 0.5]}>
      <mesh ref={meshRef}>
        <cylinderGeometry 
          args={[
            isMobile ? 1.2 : 2, // smaller radius on mobile
            isMobile ? 1.2 : 2, 
            isMobile ? 1.5 : 2, // shorter height on mobile
            isMobile ? 40 : 60, // fewer segments for better performance
            isMobile ? 40 : 60,
            true
          ]} 
        />
        <meshStandardMaterial
          ref={materialRef}
          map={tex}
          transparent
          side={THREE.DoubleSide}
          opacity={1}
          color={0xffffff}
        />
      </mesh>
    </group>
  );
};

export default Scene;