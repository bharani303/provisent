import React from 'react';
import { useHeroAnimation } from '../../animations/useHeroAnimation';
import { useMagneticButton } from '../../animations/useMagneticButton';
import { Canvas } from '@react-three/fiber';
import HeroScene from '../../three/HeroScene';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SITE_DATA } from '../../data/siteContent';

const Hero = () => {
    const heroRef = useHeroAnimation();

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0F1A]"
            onPointerMove={(e) => {
                // Tracking both mouse and touch via PointerEvent
                const { currentTarget, clientX, clientY } = e;
                const rect = currentTarget.getBoundingClientRect();
                const x = clientX - rect.left;
                const y = clientY - rect.top;
                currentTarget.style.setProperty('--mouse-x', `${x}px`);
                currentTarget.style.setProperty('--mouse-y', `${y}px`);
            }}
        >
            {/* Ambient Mobile/Desktop Floating Orbs (Award Winning Liquid Feel) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="organic-blob absolute top-1/4 -left-32 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] mix-blend-screen opacity-60"></div>
                <div className="organic-blob-reverse absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen opacity-60"></div>
            </div>

            {/* 3D Background */}
            <div className="absolute inset-0 z-0 hero-bg-blur opacity-30 md:opacity-40 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <HeroScene />
                </Canvas>
            </div>

            {/* Content */}
            <div className="container relative z-10 px-6 mx-auto flex flex-col items-center justify-center text-center mt-20 pointer-events-auto">

                {/* Top Badge */}
                <div className="hero-text-fade inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium tracking-wide text-white/80 uppercase">
                        {SITE_DATA.hero.badge}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter text-white mb-6 uppercase leading-[0.85] overflow-hidden">
                    <div className="overflow-hidden inline-block px-1">
                        <span className="hero-text-fade block bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/40">
                            Transform
                        </span>
                    </div>
                    <br />
                    <div className="overflow-hidden inline-block pb-2 px-1">
                        <span className="hero-text-fade block text-gradient text-transparent bg-clip-text">
                            Your Skills
                        </span>
                    </div>
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle text-lg md:text-xl text-white/50 max-w-3xl mb-12 font-light leading-relaxed">
                    {SITE_DATA.hero.subtitle}
                </p>

                {/* Stats */}
                <div className="hero-cta w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 mt-8 mb-16 border-y md:border-y-0 border-white/10 py-8 md:py-0">
                    <div className="flex flex-col items-center flex-1 w-full relative">
                        <span className="stat-number text-5xl md:text-4xl font-black text-white leading-none" data-target="50" data-suffix="K+">0</span>
                        <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/30 mt-2 font-bold">Students</span>
                        {/* Desktop divider */}
                        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-white/10"></div>
                        {/* Mobile divider */}
                        <div className="md:hidden absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-24 h-[1px] bg-white/10"></div>
                    </div>

                    <div className="flex flex-col items-center flex-1 w-full relative">
                        <span className="stat-number text-5xl md:text-4xl font-black text-cyan-400 leading-none" data-target="120" data-suffix="+">0</span>
                        <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/30 mt-2 font-bold">Countries</span>
                        {/* Desktop divider */}
                        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-white/10"></div>
                        {/* Mobile divider */}
                        <div className="md:hidden absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-24 h-[1px] bg-white/10"></div>
                    </div>

                    <div className="flex flex-col items-center flex-1 w-full">
                        <span className="stat-number text-5xl md:text-4xl font-black text-pink-500 leading-none" data-target="98" data-suffix="%">0</span>
                        <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/30 mt-2 font-bold">Success</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="hero-cta flex flex-wrap items-center justify-center gap-6">
                    <MagneticButton primary>
                        View Programs
                    </MagneticButton>
                    <MagneticButton onClick={() => window.open(SITE_DATA.contact.whatsapp, '_blank')}>
                        Contact Us
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </MagneticButton>
                </div>

            </div>

            {/* Mouse Follow Spotlight (CSS implementation) */}
            <div className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 opacity-60 mix-blend-soft-light"
                style={{
                    background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1), transparent 50%)'
                }}
            />

            {/* Bottom fade out gradient */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0B0F1A] to-transparent z-10 pointer-events-none"></div>
        </section>
    );
};

// Extracted Magnetic Button Component for reusability
const MagneticButton = ({ children, primary }) => {
    const { buttonRef, textRef } = useMagneticButton();

    return (
        <button
            onClick={() => {
                // Find main page scroll
                window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
            }}
            className={`relative inline-flex items-center justify-center px-8 py-4 rounded-full font-medium transition-colors duration-300 ${primary
                ? 'bg-white text-black hover:bg-white/90 shadow-[0_0_40px_rgba(255,255,255,0.2)]'
                : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 backdrop-blur-md'
                }`}
        >
            {/* Magnetic wrapper */}
            <span ref={buttonRef} className="absolute inset-0 z-0"></span>
            <span ref={textRef} className="relative z-10 flex items-center justify-center">
                {children}
            </span>
        </button>
    );
};

export default Hero;
