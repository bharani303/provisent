import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

export default function HeroScene() {
    const sphereRef = useRef();

    useFrame(({ clock }) => {
        if (sphereRef.current) {
            sphereRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2;
            sphereRef.current.rotation.x = clock.elapsedTime * 0.1;
            sphereRef.current.rotation.y = clock.elapsedTime * 0.2;
        }
    });

    return (
        <group>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#8B5CF6" />
            <directionalLight position={[-10, -10, -5]} intensity={1} color="#06b6d4" />

            <Sphere ref={sphereRef} args={[1, 128, 128]} scale={3.5} position={[3, 0, -2]}>
                <MeshDistortMaterial
                    color="#1c162f"
                    attach="material"
                    distort={0.4}
                    speed={1.5}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
            <Sphere args={[1, 64, 64]} scale={2} position={[-4, -2, -5]}>
                <MeshDistortMaterial
                    color="#06b6d4"
                    attach="material"
                    distort={0.5}
                    speed={2}
                    roughness={0.4}
                    metalness={0.6}
                    transparent
                    opacity={0.3}
                />
            </Sphere>
        </group>
    );
}
