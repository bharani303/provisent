import React, { useRef, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFlow } from '../../animations/FlowContext';

gsap.registerPlugin(ScrollTrigger);

const PageTransition = ({ children }) => {
    const containerRef = useRef();
    const location = useLocation();
    const { isReady } = useFlow();

    // Reset scroll position on route change before GSAP runs
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useLayoutEffect(() => {
        // Only trigger the main page fade-in if we're "ready" (modal flow finished)
        if (!isReady) {
            gsap.set(containerRef.current, { opacity: 0 });
            return;
        }

        let ctx = gsap.context(() => {
            // Fade animation
            gsap.fromTo(
                containerRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.8, ease: "power3.out", clearProps: "all" }
            );

            // Allow DOM to settle before refreshing scroll trigger locations
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);

        }, containerRef);

        return () => ctx.revert();
    }, [location.pathname, isReady]);

    return (
        <div ref={containerRef} className="page-transition-wrapper">
            {children}
        </div>
    );
};

export default PageTransition;
