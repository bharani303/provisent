import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Sun, Moon, Menu, X } from 'lucide-react';

const navLinks = [
    { title: "Home", url: "/" },
    { title: "Programs", url: "/programs" },
    { title: "Certificates", url: "/certificates" },
    { title: "About", url: "/about" },
    { title: "Contact", url: "/contact" }
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const navigate = useNavigate();

    const navRef = useRef(null);

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Initialize theme based on document class list
    useLayoutEffect(() => {
        let isDarkGlobal = document.documentElement.classList.contains('dark');
        if (!isDarkGlobal && !document.documentElement.classList.contains('light')) {
            // If neither is set, default to dark
            document.documentElement.classList.add('dark');
            isDarkGlobal = true;
        }
        setIsDark(isDarkGlobal);
    }, []);

    // Apply theme class whenever isDark state changes
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    // GSAP Initial Reveal
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(navRef.current, {
                y: -100,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [menuOpen]);

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
                    ? 'py-2 bg-card-bg/80 backdrop-blur-xl border-b border-border/50 shadow-premium'
                    : 'py-4 bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <div
                        onClick={() => navigate('/')}
                        onMouseEnter={() => setIsLogoHovered(true)}
                        onMouseLeave={() => setIsLogoHovered(false)}
                        className={`cursor-pointer relative flex items-center transition-all duration-500 py-1 ${scrolled ? 'h-10 md:h-14' : 'h-14 md:h-24'
                            } hover:scale-105 md:hover:scale-110`}
                    >
                        {/* Light Logo (logo.png) - This one defines the container's width */}
                        <img
                            src="/logo.png"
                            alt="Provisent Logo"
                            className={`h-full w-auto object-contain origin-left transition-all duration-500 ${isLogoHovered || !isDark ? 'opacity-100' : 'opacity-0'
                                }`}
                        />
                        {/* Dark Logo (logo-dark.png) - This one overlays the light one exactly */}
                        <img
                            src="/logo-dark.png"
                            alt="Provisent Logo"
                            className={`absolute right-4 h-full w-auto object-contain origin-left transition-all duration-500 scale-135 ${!isLogoHovered && isDark ? 'opacity-100' : 'opacity-0'
                                }`}
                        />
                    </div>

                    <div className={`hidden md:flex items-center transition-all duration-500 ${scrolled ? 'space-x-6' : 'space-x-10'} text-sm font-bold text-foreground/80 uppercase tracking-widest`}>
                        {navLinks.map((item) => (
                            <NavLink
                                key={item.title}
                                to={item.url}
                                className={({ isActive }) =>
                                    `relative group overflow-hidden ${isActive ? 'text-foreground' : 'transition-colors'}`
                                }
                            >
                                <span className="relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-300">
                                    {item.title}
                                </span>
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transform -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                            </NavLink>
                        ))}
                    </div>

                    <div className={`hidden md:flex items-center transition-all duration-500 ${scrolled ? 'space-x-4' : 'space-x-6'}`}>
                        {/* Premium Theme Toggle Switch */}
                        <button
                            onClick={toggleTheme}
                            className="relative flex items-center w-14 h-7 rounded-full bg-card-bg/50 backdrop-blur-glass border border-border/50 p-1 transition-all duration-500 hover:border-cyan-500/50 shadow-premium group overflow-hidden"
                            aria-label="Toggle Theme"
                        >
                            {/* Sliding Track Background Highlight */}
                            <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`}></div>

                            {/* The Sliding Circle */}
                            <div className={`relative z-10 flex items-center justify-center w-5 h-5 rounded-full shadow-lg transform transition-all duration-500 ease-out-back ${isDark ? 'translate-x-7 bg-background text-cyan-400' : 'translate-x-0 bg-foreground text-background'}`}>
                                {isDark ? <Moon size={12} fill="currentColor" /> : <Sun size={12} fill="currentColor" />}
                            </div>

                            {/* Subtle Stationary Icons */}
                            <div className="absolute inset-x-1 flex justify-between items-center px-1.5 pointer-events-none">
                                <Sun size={10} className={`transition-opacity duration-300 ${!isDark ? 'opacity-0' : 'opacity-40 text-foreground'}`} />
                                <Moon size={10} className={`transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-40 text-foreground'}`} />
                            </div>
                        </button>
                        <button
                            onClick={() => navigate('/enroll')}
                            className={`relative group overflow-hidden px-6 ${scrolled ? 'py-1.5' : 'py-2.5'} rounded-full border border-border bg-foreground text-background text-sm font-bold uppercase tracking-wider transition-all duration-500`}
                        >
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Enroll Now</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                        </button>
                    </div>

                    <div className="md:hidden flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="relative flex items-center w-14 h-7 rounded-full bg-card-bg/50 backdrop-blur-glass border border-border/50 p-1 transition-all duration-500 shadow-premium group overflow-hidden"
                            aria-label="Toggle Theme"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`}></div>
                            <div className={`relative z-10 flex items-center justify-center w-5 h-5 rounded-full shadow-lg transform transition-all duration-500 ease-out-back ${isDark ? 'translate-x-7 bg-background text-cyan-400' : 'translate-x-0 bg-foreground text-background'}`}>
                                {isDark ? <Moon size={12} fill="currentColor" /> : <Sun size={12} fill="currentColor" />}
                            </div>
                        </button>
                        <button
                            className="text-foreground z-50 relative p-2 -mr-2"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <X size={24} className="md:w-7 md:h-7" /> : <Menu size={24} className="md:w-7 md:h-7" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Premium Mobile Side Navigation (Pure CSS for Ultra Performance) */}
            <div
                className={`fixed inset-0 z-[9999] transition-all duration-500 lg:hidden ${menuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
                    }`}
            >
                {/* Backdrop Overlay */}
                <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ${menuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={() => setMenuOpen(false)}
                ></div>

                {/* The Side Drawer Panel */}
                <div
                    className={`absolute top-0 right-0 w-[85%] max-w-[350px] h-full bg-background border-l border-border/50 shadow-2xl flex flex-col items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex flex-col items-center space-y-6 w-full px-4">
                        {navLinks.map((item, index) => (
                            <NavLink
                                key={item.title}
                                to={item.url}
                                onClick={handleLinkClick}
                                className={`text-2xl font-black text-foreground uppercase tracking-widest hover:text-cyan-500 transition-all duration-500 transform w-full text-center py-3 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                    }`}
                                style={{ transitionDelay: `${menuOpen ? 150 + index * 60 : 0}ms` }}
                            >
                                {item.title}
                            </NavLink>
                        ))}
                        <button
                            onClick={() => {
                                navigate('/enroll');
                                handleLinkClick();
                            }}
                            className={`mt-2 w-full py-4 rounded-full border-2 border-foreground bg-foreground text-background text-base font-black uppercase tracking-widest relative group overflow-hidden transition-all duration-500 transform ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                }`}
                            style={{ transitionDelay: `${menuOpen ? 150 + navLinks.length * 60 : 0}ms` }}
                        >
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300 px-6 whitespace-nowrap">Enroll Now</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;

