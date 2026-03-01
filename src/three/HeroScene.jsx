import { useRef, useState, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Float, MeshDistortMaterial, Stars, Torus, OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export default function HeroScene() {
    const globeRef = useRef();
    const wireframeRef = useRef();
    const ringRef = useRef();
    const groupRef = useRef();
    const starsRef = useRef();
    const [isInteracting, setIsInteracting] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const interactionFactor = useRef(0);

    // Detect theme
    useLayoutEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        setIsDark(document.documentElement.classList.contains('dark'));
        return () => observer.disconnect();
    }, []);

    useFrame(({ clock }) => {
        const time = clock.elapsedTime;

        // Smooth Interpolation for Interaction
        const targetFactor = isInteracting ? 1 : 0;
        interactionFactor.current = THREE.MathUtils.lerp(interactionFactor.current, targetFactor, 0.05);

        // 1. Spinning Borders (Automatic)
        if (wireframeRef.current) {
            wireframeRef.current.rotation.y = time * 0.1;
            wireframeRef.current.rotation.z = time * 0.05;
        }
        if (ringRef.current) {
            ringRef.current.rotation.x = 1.5;
            ringRef.current.rotation.y = time * 0.2;
        }

        // 2. Interactive Twinkling & Brightening Stars
        if (starsRef.current) {
            // Base cinematic twinkle + bright surge when interacting
            const baseTwinkle = 6 + Math.sin(time * 0.5) * 3; // Brighter idle state
            const interactiveSurge = interactionFactor.current * 30; // Even more massive brightness boost

            starsRef.current.factor = baseTwinkle + interactiveSurge;

            // Speed up the galaxy rotation slightly when interacting for 'warp' feel
            starsRef.current.rotation.y = time * (0.02 + (interactionFactor.current * 0.08));
        }
    });

    return (
        <group
            ref={groupRef}
            onPointerDown={() => setIsInteracting(true)}
            onPointerUp={() => setIsInteracting(false)}
            onPointerLeave={() => setIsInteracting(false)}
        >
            <ambientLight intensity={isDark ? 0.8 : 1.5} />
            <pointLight position={[10, 10, 10]} intensity={isDark ? 2 : 3} color="#06b6d4" />
            <pointLight position={[-10, -10, -10]} intensity={isDark ? 2 : 3} color="#8B5CF6" />

            {/* Interactive User Controls */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableDamping={true}
                dampingFactor={0.05}
                rotateSpeed={0.5}
            />

            {/* Falling Stars Effect (Cinematic Sparkles - Bigger and Faster) */}
            <Sparkles
                count={60}
                scale={[25, 25, 15]}
                size={6}
                speed={1.5}
                opacity={0.4}
                color="#06b6d4"
            />
            <Sparkles
                count={30}
                scale={[35, 35, 20]}
                size={10}
                speed={2}
                opacity={0.3}
                color="#8B5CF6"
            />

            {/* 4K Cinematic Milky Way Effect */}
            {/* The Galactic Core Glow */}
            <Sparkles
                count={300}
                scale={[35, 12, 35]}
                size={10}
                speed={0.2}
                opacity={isDark ? 0.3 : 0.4}
                color={isDark ? "#8B5CF6" : "#4f46e5"}
                position={[-5, 2, -10]}
                rotation={[0, 0, Math.PI / 4]}
            />
            <Sparkles
                count={250}
                scale={[45, 8, 45]}
                size={15}
                speed={0.15}
                opacity={isDark ? 0.25 : 0.35}
                color={isDark ? "#06b6d4" : "#0284c7"}
                position={[0, 0, -12]}
                rotation={[0, 0, Math.PI / 4]}
            />

            {/* Clean, High-End Starfield (Fewer but Better) */}
            <Stars
                ref={starsRef}
                radius={130}
                depth={70}
                count={isDark ? 5000 : 7000}
                factor={isDark ? 7 : 8}
                saturation={isDark ? 0.4 : 1} // Higher saturation in light mode for "jewel" look
                fade
                speed={1.2}
            />

            <Float
                speed={1.5}
                rotationIntensity={0.2}
                floatIntensity={0.5}
            >
                {/* Main Spinning Globe Hub - KEPT ORIGINAL DESIGN */}
                <group position={[2, 0, -2]}>
                    {/* The Core */}
                    <Sphere ref={globeRef} args={[1, 100, 100]} scale={2.8}>
                        <MeshDistortMaterial
                            color={isDark ? "#1c162f" : "#cbd5e1"}
                            distort={0.25}
                            speed={1}
                            roughness={isDark ? 0 : 0.1}
                            metalness={isDark ? 1 : 0.8}
                            opacity={isDark ? 1 : 0.8}
                            transparent={!isDark}
                        />
                    </Sphere>

                    {/* Digital Wireframe Shell */}
                    <Sphere ref={wireframeRef} args={[1, 40, 40]} scale={3}>
                        <meshBasicMaterial
                            color={isDark ? "#06b6d4" : "#0284c7"}
                            wireframe
                            transparent
                            opacity={isDark ? 0.2 : 0.3}
                        />
                    </Sphere>

                    {/* The Logo-Inspired Ring (Saturn Effect) */}
                    <Torus ref={ringRef} args={[4.2, 0.03, 16, 100]} rotation={[1.5, 0, 0]}>
                        <meshBasicMaterial
                            color="#06b6d4"
                            transparent
                            opacity={0.3}
                        />
                    </Torus>

                    {/* Secondary Subtle Orbiting Glow */}
                    <Torus args={[4.5, 0.01, 16, 100]} rotation={[1.6, 0.2, 0]}>
                        <meshBasicMaterial
                            color="#8B5CF6"
                            transparent
                            opacity={0.15}
                        />
                    </Torus>
                </group>

                {/* Additional Planets (Celestial System) */}
                {/* Distant Purple Planet */}
                <group position={[-6, 3, -8]}>
                    <Sphere args={[1, 32, 32]} scale={1.2}>
                        <MeshDistortMaterial
                            color="#8B5CF6"
                            distort={0.3}
                            speed={2}
                            opacity={0.4}
                            transparent
                        />
                    </Sphere>
                </group>

                {/* Nearby Cyan Planet */}
                <group position={[-4, -3, -5]}>
                    <Sphere args={[1, 32, 32]} scale={0.8}>
                        <meshStandardMaterial
                            color="#06b6d4"
                            roughness={0.1}
                            metalness={0.8}
                            emissive="#06b6d4"
                            emissiveIntensity={0.5}
                        />
                    </Sphere>
                </group>
            </Float>
        </group>
    );
}
