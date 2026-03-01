import { useState, useEffect } from 'react';

const useMobile = (breakpoint = 768) => {
    // Default to false initially to avoid hydration mismatch if doing SSR, 
    // but here we are in a SPA so it's fine.
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);

        const onChange = (e) => {
            setIsMobile(e.matches);
        };

        // Set initial state correctly based on mql
        setIsMobile(mql.matches);

        // Modern event listener
        if (mql.addEventListener) {
            mql.addEventListener('change', onChange);
            return () => mql.removeEventListener('change', onChange);
        } else {
            // Safari fallback
            mql.addListener(onChange);
            return () => mql.removeListener(onChange);
        }
    }, [breakpoint]);

    return isMobile;
};

export default useMobile;
