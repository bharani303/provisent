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
    const navigate = useNavigate();

    const navRef = useRef(null);
    const menuRef = useRef(null);
    const tl = useRef(null);

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

    // GSAP Mobile Menu Animation
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            tl.current = gsap.timeline({ paused: true })
                .to(menuRef.current, {
                    y: "0%",
                    duration: 0.6,
                    ease: "power4.inOut"
                })
                .from(".mobile-link", {
                    y: 50,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.4,
                    ease: "power2.out"
                }, "-=0.2");
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (menuOpen) {
            tl.current.play();
            document.body.style.overflow = 'hidden';
        } else if (tl.current) {
            tl.current.reverse();
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
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? 'py-4 bg-card-bg backdrop-blur-glass border-b border-border shadow-premium'
                    : 'py-6 bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <div
                        onClick={() => navigate('/')}
                        className="cursor-pointer flex items-center h-16 md:h-24 transition-transform hover:scale-105 duration-300 py-1"
                    >
                        <img
                            src={isDark ? "/logo-dark.png" : "/logo.png"}
                            alt="Provisent Logo"
                            className="h-full w-auto object-contain scale-125 md:scale-150 origin-left"
                        />
                    </div>

                    <div className="hidden md:flex items-center space-x-10 text-sm font-bold text-foreground/80 uppercase tracking-widest">
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

                    <div className="hidden md:flex items-center space-x-6">
                        <button onClick={toggleTheme} className="text-foreground hover:scale-110 transition-transform">
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => navigate('/enroll')}
                            className="px-6 py-2.5 rounded-full border border-border bg-foreground text-background text-sm font-bold uppercase tracking-wider hover:bg-transparent hover:text-foreground transition-all duration-300"
                        >
                            Enroll Now
                        </button>
                    </div>

                    <div className="md:hidden flex items-center space-x-4">
                        <button onClick={toggleTheme} className="text-foreground">
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            className="text-foreground z-50 relative"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Fullscreen Overlay */}
            <div
                ref={menuRef}
                className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center translate-y-[-100%]"
            >
                <div className="flex flex-col items-center space-y-8">
                    {navLinks.map((item) => (
                        <NavLink
                            key={item.title}
                            to={item.url}
                            onClick={handleLinkClick}
                            className="mobile-link text-4xl font-black text-foreground uppercase tracking-widest hover:text-cyan-500 transition-colors"
                        >
                            {item.title}
                        </NavLink>
                    ))}
                    <button
                        onClick={() => {
                            navigate('/enroll');
                            handleLinkClick();
                        }}
                        className="mobile-link mt-8 px-10 py-4 rounded-full border-2 border-foreground bg-foreground text-background text-lg font-black uppercase tracking-widest"
                    >
                        Enroll Now
                    </button>
                </div>
            </div>
        </>
    );
};

export default Navbar;

