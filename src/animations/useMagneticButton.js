import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useMagneticButton = () => {
    const buttonRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = button.getBoundingClientRect();
            const x = (clientX - (left + width / 2)) * 0.4;
            const y = (clientY - (top + height / 2)) * 0.4;

            gsap.to(button, {
                x,
                y,
                duration: 1,
                ease: 'power3.out',
            });

            if (textRef.current) {
                gsap.to(textRef.current, {
                    x: x * 0.5,
                    y: y * 0.5,
                    duration: 1,
                    ease: 'power3.out',
                });
            }
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 1,
                ease: 'elastic.out(1, 0.3)',
            });

            if (textRef.current) {
                gsap.to(textRef.current, {
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: 'elastic.out(1, 0.3)',
                });
            }
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return { buttonRef, textRef };
};
