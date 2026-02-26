import React, { useRef, useEffect, useState } from 'react';
import { Target, Lightbulb, Rocket, Globe, Shield, Zap } from 'lucide-react';

const InteractiveCube = () => {
    const containerRef = useRef(null);
    const cubeRef = useRef(null);

    // Configuration simulating the original "Viewport" functionality
    const sensivity = 0.1;
    const sensivityFade = 0.93;
    const speed = 2;
    const touchSensivity = 1.5;

    // Physics state kept in a ref to avoid re-renders during animation loop
    const state = useRef({
        down: false,
        lastX: 0,
        lastY: 0,
        mouseX: 0,
        mouseY: 0,
        distanceX: 0,
        distanceY: 0,
        positionX: 1122, // Starting X rotation
        positionY: 136,  // Starting Y rotation
        torqueX: 0,
        torqueY: 0,
        upsideDown: false,
        currentSide: 0,
        calculatedSide: 0
    });

    const faceData = [
        { id: 2, label: 'Learn', icon: <Lightbulb size={48} />, gradient: 'from-cyan-500/80 to-blue-600/80', transform: 'translateZ(150px)' },
        { id: 4, label: 'Build', icon: <Zap size={48} />, gradient: 'from-purple-500/80 to-purple-800/80', transform: 'rotateY(180deg) translateZ(150px)' },
        { id: 3, label: 'Scale', icon: <Rocket size={48} />, gradient: 'from-pink-500/80 to-rose-600/80', transform: 'rotateY(90deg) translateZ(150px)' },
        { id: 5, label: 'Lead', icon: <Target size={48} />, gradient: 'from-emerald-400/80 to-emerald-700/80', transform: 'rotateY(-90deg) translateZ(150px)' },
        { id: 1, label: 'Innovate', icon: <Globe size={48} />, gradient: 'from-orange-400/80 to-red-600/80', transform: 'rotateX(90deg) translateZ(150px)' },
        { id: 6, label: 'Protect', icon: <Shield size={48} />, gradient: 'from-indigo-500/80 to-blue-800/80', transform: 'rotateX(-90deg) translateZ(150px)' },
    ];

    const [activeSide, setActiveSide] = useState(0);

    useEffect(() => {
        let animationFrameId;
        const s = state.current;

        const animate = () => {
            s.distanceX = (s.mouseX - s.lastX);
            s.distanceY = (s.mouseY - s.lastY);

            s.lastX = s.mouseX;
            s.lastY = s.mouseY;

            if (s.down) {
                s.torqueX = s.torqueX * sensivityFade + (s.distanceX * speed - s.torqueX) * sensivity;
                s.torqueY = s.torqueY * sensivityFade + (s.distanceY * speed - s.torqueY) * sensivity;
            }

            if (Math.abs(s.torqueX) > 1.0 || Math.abs(s.torqueY) > 1.0) {
                if (!s.down) {
                    s.torqueX *= sensivityFade;
                    s.torqueY *= sensivityFade;
                }

                s.positionY -= s.torqueY;

                if (s.positionY > 360) {
                    s.positionY -= 360;
                } else if (s.positionY < 0) {
                    s.positionY += 360;
                }

                if (s.positionY > 90 && s.positionY < 270) {
                    s.positionX -= s.torqueX;
                    if (!s.upsideDown) {
                        s.upsideDown = true;
                    }
                } else {
                    s.positionX += s.torqueX;
                    if (s.upsideDown) {
                        s.upsideDown = false;
                    }
                }

                if (s.positionX > 360) {
                    s.positionX -= 360;
                } else if (s.positionX < 0) {
                    s.positionX += 360;
                }

                if (!(s.positionY >= 46 && s.positionY <= 130) && !(s.positionY >= 220 && s.positionY <= 308)) {
                    if (s.upsideDown) {
                        if (s.positionX >= 42 && s.positionX <= 130) { s.calculatedSide = 3; }
                        else if (s.positionX >= 131 && s.positionX <= 223) { s.calculatedSide = 2; }
                        else if (s.positionX >= 224 && s.positionX <= 314) { s.calculatedSide = 5; }
                        else { s.calculatedSide = 4; }
                    } else {
                        if (s.positionX >= 42 && s.positionX <= 130) { s.calculatedSide = 5; }
                        else if (s.positionX >= 131 && s.positionX <= 223) { s.calculatedSide = 4; }
                        else if (s.positionX >= 224 && s.positionX <= 314) { s.calculatedSide = 3; }
                        else { s.calculatedSide = 2; }
                    }
                } else {
                    if (s.positionY >= 46 && s.positionY <= 130) { s.calculatedSide = 6; }
                    if (s.positionY >= 220 && s.positionY <= 308) { s.calculatedSide = 1; }
                }

                if (s.calculatedSide !== s.currentSide) {
                    s.currentSide = s.calculatedSide;
                    setActiveSide(s.calculatedSide);
                }
            } else if (!s.down) {
                s.positionX += 0.5;
                if (s.positionX > 360) s.positionX -= 360;
            }

            if (cubeRef.current) {
                cubeRef.current.style.transform = `rotateX(${s.positionY}deg) rotateY(${s.positionX}deg)`;
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const handlePointerDown = (e) => {
        state.current.down = true;
        state.current.mouseX = e.clientX || e.touches[0].clientX / touchSensivity;
        state.current.mouseY = e.clientY || e.touches[0].clientY / touchSensivity;
        state.current.lastX = state.current.mouseX;
        state.current.lastY = state.current.mouseY;
        document.body.style.userSelect = 'none';
    };

    const handlePointerMove = (e) => {
        if (!state.current.down) return;
        state.current.mouseX = e.clientX || (e.touches && e.touches[0].clientX / touchSensivity);
        state.current.mouseY = e.clientY || (e.touches && e.touches[0].clientY / touchSensivity);
    };

    const handlePointerUp = () => {
        state.current.down = false;
        document.body.style.userSelect = '';
    };

    useEffect(() => {
        window.addEventListener('mouseup', handlePointerUp);
        window.addEventListener('touchend', handlePointerUp);
        window.addEventListener('mousemove', handlePointerMove);
        window.addEventListener('touchmove', handlePointerMove, { passive: false });

        return () => {
            window.removeEventListener('mouseup', handlePointerUp);
            window.removeEventListener('touchend', handlePointerUp);
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('touchmove', handlePointerMove);
        };
    }, []);

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center pointer-events-auto mt-16" style={{ perspective: '1200px' }}>
            <div
                ref={containerRef}
                className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing touch-none"
                onMouseDown={handlePointerDown}
                onTouchStart={handlePointerDown}
            ></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-full blur-[80px] pointer-events-none transition-all duration-500"></div>

            <div
                ref={cubeRef}
                className="relative w-[240px] h-[240px] md:w-[300px] md:h-[300px] transition-transform duration-75 ease-linear pointer-events-none"
                style={{ transformStyle: 'preserve-3d', transform: 'rotateX(136deg) rotateY(1122deg)' }}
            >
                {faceData.map((face, index) => {
                    const isActive = activeSide === face.id;
                    return (
                        <div
                            key={index}
                            className={`absolute inset-0 flex flex-col items-center justify-center font-black text-2xl uppercase tracking-widest text-center transition-all duration-700 overflow-hidden
                                border rounded-[2.5rem] backdrop-blur-md
                                ${isActive ? 'border-white/50 text-white shadow-[0_0_50px_rgba(255,255,255,0.2)] bg-gradient-to-br ' + face.gradient : 'border-white/10 text-white/50 bg-black/40'}
                            `}
                            style={{
                                transform: face.transform,
                                backfaceVisibility: 'hidden',
                            }}
                        >
                            {/* Animated Background Ring */}
                            <div className={`absolute inset-0 m-auto w-[150%] h-[150%] rounded-full border border-white/5 pointer-events-none transition-all duration-1000
                                ${isActive ? 'animate-[spin_10s_linear_infinite] scale-100 opacity-100 border-white/20' : 'scale-50 opacity-0'}
                            `}></div>

                            {/* Icon Container */}
                            <div className={`mb-4 transition-all duration-500 ${isActive ? 'scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'scale-90 opacity-40'}`}>
                                {face.icon}
                            </div>

                            <span className="relative z-20 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">{face.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InteractiveCube;
