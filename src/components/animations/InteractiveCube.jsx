import React, { useRef, useEffect, useState } from 'react';

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
        positionX: 1122, // Starting X rotation (matches reference)
        positionY: 136,  // Starting Y rotation
        torqueX: 0,
        torqueY: 0,
        upsideDown: false,
        currentSide: 0,
        calculatedSide: 0
    });

    // Face definitions corresponding to the original numbers in reference:
    // 1: Top, 6: Bottom, 2: Front, 3: Right, 4: Back, 5: Left
    const faceData = [
        { id: 2, label: 'Provisent', transform: 'translateZ(150px)', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop' },
        { id: 4, label: 'Learn', transform: 'rotateY(180deg) translateZ(150px)', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop' },
        { id: 3, label: 'Build', transform: 'rotateY(90deg) translateZ(150px)', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop' },
        { id: 5, label: 'Scale', transform: 'rotateY(-90deg) translateZ(150px)', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop' },
        { id: 1, label: 'Innovate', transform: 'rotateX(90deg) translateZ(150px)', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop' },
        { id: 6, label: 'Lead', transform: 'rotateX(-90deg) translateZ(150px)', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop' },
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

                // Determine Active Side (Reference Logic)
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
                // Auto rotate when idle to keep it alive
                s.positionX += 0.5;
                if (s.positionX > 360) s.positionX -= 360;
            }

            // Apply transforms
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

    // Event Handlers
    const handlePointerDown = (e) => {
        state.current.down = true;
        state.current.mouseX = e.clientX || e.touches[0].clientX / touchSensivity;
        state.current.mouseY = e.clientY || e.touches[0].clientY / touchSensivity;
        state.current.lastX = state.current.mouseX;
        state.current.lastY = state.current.mouseY;
        document.body.style.userSelect = 'none'; // Prevent text selection on drag
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
        <div className="relative w-full h-[500px] flex items-center justify-center pointer-events-auto" style={{ perspective: '1200px' }}>
            {/* Draggable Layer Overlay */}
            <div
                ref={containerRef}
                className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing touch-none"
                onMouseDown={handlePointerDown}
                onTouchStart={handlePointerDown}
            ></div>

            {/* Glowing Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none transition-all duration-500"></div>

            <div
                ref={cubeRef}
                className="relative w-[300px] h-[300px] transition-transform duration-75 ease-linear pointer-events-none"
                style={{ transformStyle: 'preserve-3d', transform: 'rotateX(136deg) rotateY(1122deg)' }}
            >
                {faceData.map((face, index) => {
                    const isActive = activeSide === face.id;
                    return (
                        <div
                            key={index}
                            className={`absolute inset-0 flex items-center justify-center font-black text-3xl uppercase tracking-widest text-center transition-all duration-700 overflow-hidden
                                border-2 
                                ${isActive ? 'border-cyan-400 text-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.5)]' : 'border-white/10 text-white/80'}
                            `}
                            style={{
                                transform: face.transform,
                                backfaceVisibility: 'hidden',
                            }}
                        >
                            {/* Background Image Layer */}
                            <img
                                src={face.image}
                                alt={face.label}
                                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out z-0
                                    ${isActive ? 'opacity-70 scale-110 filter transform-gpu' : 'opacity-30 grayscale filter transform-gpu'}
                                `}
                            />

                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 z-0"></div>

                            {/* Inner ring for aesthetic */}
                            <div className={`absolute inset-4 border border-dashed transition-colors duration-700 rounded-full flex items-center justify-center z-10 
                                ${isActive ? 'border-cyan-400/50 animate-[spin_20s_linear_infinite]' : 'border-white/20'}`}>
                            </div>
                            <span className="relative z-20 drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">{face.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InteractiveCube;
