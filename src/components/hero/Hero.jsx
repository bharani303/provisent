import React from 'react';
import { useHeroAnimation } from '../../animations/useHeroAnimation';
import { useMagneticButton } from '../../animations/useMagneticButton';
import { Canvas } from '@react-three/fiber';
import HeroScene from '../../three/HeroScene';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SITE_DATA } from '../../data/siteContent';
import FallingStarsBackground from '../animations/FallingStarsBackground';

const Hero = () => {
    const heroRef = useHeroAnimation();

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background transition-colors duration-500 select-none pb-20"
            onPointerMove={(e) => {
                const { currentTarget, clientX, clientY } = e;
                const rect = currentTarget.getBoundingClientRect();
                const x = clientX - rect.left;
                const y = clientY - rect.top;
                currentTarget.style.setProperty('--mouse-x', `${x}px`);
                currentTarget.style.setProperty('--mouse-y', `${y}px`);
            }}
        >
            {/* 2 Cinematic Falling Stars Component */}
            <FallingStarsBackground />

            {/* Background Layers */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] neural-grid-overlay bg-foreground/5"></div>
                {/* Light mode: extra brightness, Dark mode: subtle drift */}
                <div className="organic-blob absolute top-1/4 -left-16 md:-left-32 w-64 h-64 md:w-[600px] md:h-[600px] bg-gradient-to-br from-cyan-400/30 to-purple-400/20 dark:from-cyan-500/20 dark:to-purple-500/10 rounded-full blur-[100px] md:blur-[160px] opacity-60 dark:opacity-40 animate-drift-slow"></div>
                <div className="organic-blob-reverse absolute bottom-1/4 -right-16 md:-right-32 w-80 h-80 md:w-[800px] md:h-[800px] bg-gradient-to-tr from-purple-400/30 to-pink-400/20 dark:from-purple-500/20 dark:to-pink-500/10 rounded-full blur-[120px] md:blur-[200px] opacity-60 dark:opacity-40 animate-drift-slow-reverse"></div>
            </div>

            {/* 3D Background */}
            <div className="absolute inset-0 z-0 hero-bg-blur opacity-90 dark:opacity-90 pointer-events-auto transition-opacity duration-1000">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <HeroScene />
                </Canvas>
            </div>

            {/* Content Container */}
            <div className="container relative z-10 px-6 mx-auto flex flex-col items-center justify-center text-center mt-12 md:mt-24 pointer-events-auto">
                {/* Hero Badge */}
                <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card-bg/50 dark:bg-card-bg backdrop-blur-glass shadow-premium mb-6 md:mb-8">
                    <Sparkles className="w-4 h-4 text-cyan-500" />
                    <span className="text-[10px] md:text-sm font-bold tracking-wide text-foreground/80 uppercase">
                        {SITE_DATA.hero.badge}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter text-foreground mb-4 md:mb-8 uppercase leading-[0.9] md:leading-[0.85] flex flex-col items-center">
                    <span className="hero-text-fade block bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/80 to-foreground/40 dark:from-white dark:via-white/80 dark:to-white/40">
                        Transform
                    </span>
                    <span className="hero-text-fade block text-gradient text-transparent bg-clip-text mt-1 md:mt-2">
                        Your Skills
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle text-sm md:text-xl text-foreground/60 dark:text-foreground/50 max-w-2xl mb-10 md:mb-14 font-medium leading-relaxed px-4 text-center">
                    {SITE_DATA.hero.subtitle}
                </p>

                {/* Counter Statistics */}
                <div className="hero-cta w-full max-w-4xl mx-auto grid grid-cols-3 md:flex md:flex-row items-center justify-center gap-2 md:gap-0 mb-12 md:mb-20">
                    <div className="flex flex-col items-center flex-1 relative px-2">
                        <span className="stat-number text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground" data-target="50" data-suffix="K+">0</span>
                        <span className="text-[7px] md:text-xs uppercase tracking-widest text-foreground/40 dark:text-foreground/30 mt-2 font-black text-center whitespace-nowrap">Students</span>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-6 md:h-12 bg-border/50"></div>
                    </div>
                    <div className="flex flex-col items-center flex-1 relative px-2">
                        <span className="stat-number text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-cyan-500 dark:text-cyan-400" data-target="120" data-suffix="+">0</span>
                        <span className="text-[7px] md:text-xs uppercase tracking-widest text-foreground/40 dark:text-foreground/30 mt-2 font-black text-center whitespace-nowrap">Countries</span>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-6 md:h-12 bg-border/50"></div>
                    </div>
                    <div className="flex flex-col items-center flex-1 px-2">
                        <span className="stat-number text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-pink-500" data-target="98" data-suffix="%">0</span>
                        <span className="text-[7px] md:text-xs uppercase tracking-widest text-foreground/40 dark:text-foreground/30 mt-2 font-black text-center whitespace-nowrap">Success</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 w-full sm:w-auto relative">
                    <MagneticButton primary>
                        View Programs
                    </MagneticButton>
                    <MagneticButton onClick={() => window.open(SITE_DATA.contact.whatsapp, '_blank')}>
                        Contact Us
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </MagneticButton>
                </div>
            </div>

            {/* Mouse Spotlight */}
            <div className="pointer-events-none absolute inset-0 z-20 opacity-40 dark:opacity-60 mix-blend-soft-light"
                style={{
                    background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.4), transparent 50%)'
                }}
            />

            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none"></div>
        </section>
    );
};

const MagneticButton = ({ children, primary, onClick }) => {
    const { buttonRef, textRef } = useMagneticButton();
    return (
        <button
            onClick={onClick || (() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' }))}
            className={`relative inline-flex items-center justify-center px-10 py-5 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 ${primary ? 'bg-foreground text-background shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'bg-card-bg text-foreground border border-border backdrop-blur-glass'
                }`}
        >
            <span ref={buttonRef} className="absolute inset-0"></span>
            <span ref={textRef} className="relative z-10 flex items-center">{children}</span>
        </button>
    );
};

export default Hero;
