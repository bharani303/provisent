import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const use3DTilt = (intensity = 20) => {
    const ref = useRef(null);

    // Persist GSAP QuickTo instances via useRef
    const qX = useRef(null);
    const qY = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        // Initialize GSAP QuickTo for 60fps tracking
        qX.current = gsap.quickTo(ref.current, "rotateX", { duration: 0.5, ease: "power3.out" });
        qY.current = gsap.quickTo(ref.current, "rotateY", { duration: 0.5, ease: "power3.out" });

        // Set initial 3D transform properties
        gsap.set(ref.current, {
            transformPerspective: 1000,
            transformStyle: "preserve-3d"
        });

    }, []);

    const onMouseMove = (e) => {
        if (!ref.current || !qX.current || !qY.current) return;

        const rect = ref.current.getBoundingClientRect();

        // Calculate relative mouse position (0.0 to 1.0)
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        // Map to angle
        const rotateX = (y - 0.5) * -intensity;
        const rotateY = (x - 0.5) * intensity;

        qX.current(rotateX);
        qY.current(rotateY);
    };

    const onMouseLeave = () => {
        if (!qX.current || !qY.current) return;

        // Snap back to 0
        qX.current(0);
        qY.current(0);
    };

    return { ref, onMouseMove, onMouseLeave };
};
