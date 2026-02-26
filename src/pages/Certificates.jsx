import React, { useEffect, useRef } from 'react';
import PageTransition from '../components/animations/PageTransition';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Target, TrendingUp, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { use3DTilt } from '../animations/use3DTilt';

gsap.registerPlugin(ScrollTrigger);

const CertPreview = () => {
    const { ref, onMouseMove, onMouseLeave } = use3DTilt(10);
    return (
        <div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="w-full lg:w-1/2 cert-preview aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-[2rem] border border-white/10 shadow-2xl flex items-center justify-center p-8 lg:p-12 hover:shadow-[0_0_50px_rgba(34,211,238,0.2)] transition-shadow duration-700 z-10 hover:z-20"
        >
            <div className="text-center p-8 border-4 border-double border-foreground/20 w-full h-full flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm rounded-xl relative overflow-hidden">
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                    <Award className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-3xl font-black tracking-widest text-foreground/30 uppercase mb-4">Provisent</h3>
                <h2 className="text-2xl font-bold tracking-widest uppercase mb-4 text-foreground/80">Certificate of Completion</h2>
                <div className="w-16 h-1.5 mt-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                <div className="mt-8 flex justify-between w-full px-8 opacity-50">
                    <div className="w-20 h-1 bg-foreground/20 rounded"></div>
                    <div className="w-20 h-1 bg-foreground/20 rounded"></div>
                </div>
            </div>
        </div>
    );
};

const Certificates = () => {
    const navigate = useNavigate();
    const mainRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Header Reveal
            gsap.from(".reveal-header", {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.2
            });

            // Feature Cards Stagger
            gsap.fromTo(".feature-card",
                { y: 50, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".features-grid",
                        start: "top 80%"
                    }
                }
            );

            // Cert Preview Anim
            gsap.from(".cert-preview", {
                x: 100,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".cert-section",
                    start: "top 75%"
                }
            });

            gsap.from(".cert-text li", {
                x: -50,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".cert-section",
                    start: "top 75%"
                }
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);

    const features = [
        {
            icon: <Award className="w-8 h-8 text-cyan-500" />,
            title: "Industry Recognition",
            desc: "Our certificates are recognized by top companies and organizations worldwide."
        },
        {
            icon: <Target className="w-8 h-8 text-purple-500" />,
            title: "Skill Validation",
            desc: "Prove your expertise and competency in specific technologies and domains."
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-pink-500" />,
            title: "Career Advancement",
            desc: "Certified professionals often earn higher salaries and faster promotions."
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-cyan-500" />,
            title: "Digital Badges",
            desc: "Receive shareable digital badges for your LinkedIn and online portfolios."
        }
    ];

    return (
        <PageTransition>
            <div ref={mainRef} className="pt-32 pb-32 min-h-screen bg-background text-foreground relative overflow-hidden transition-colors duration-500">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl text-center md:text-left mb-24">
                        <div className="reveal-header inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-500 uppercase tracking-[0.2em] mb-8">
                            <Sparkles size={14} />
                            <span>Global Recognition</span>
                        </div>
                        <h1 className="reveal-header text-5xl md:text-7xl lg:text-8xl font-black uppercase mb-8 tracking-tighter leading-[0.9]">
                            Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500">Certifications</span>
                        </h1>
                        <p className="reveal-header text-xl md:text-2xl text-foreground/70 leading-relaxed font-medium">
                            Earn credentials that matter. Our certifications are recognized by top tech companies worldwide and prove your mastery of modern skills.
                        </p>
                    </div>

                    <div className="mb-32">
                        <h2 className="reveal-header text-3xl md:text-5xl font-black uppercase mb-12 tracking-tight text-center">
                            Why Certification <span className="text-cyan-500">Matters</span>
                        </h2>
                        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature, i) => (
                                <div key={i} className="feature-card p-8 rounded-[2rem] border border-border bg-card-bg backdrop-blur-glass hover:border-cyan-500/40 transition-all duration-500 hover:shadow-premium group relative overflow-hidden flex flex-col items-start">
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-duration-500 pointer-events-none"></div>
                                    <div className="w-16 h-16 rounded-2xl bg-background/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-border shadow-sm">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-black uppercase mb-4 tracking-tight group-hover:text-cyan-500 transition-colors">{feature.title}</h3>
                                    <p className="text-foreground/60 text-sm leading-relaxed font-medium">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="cert-section relative p-8 md:p-12 lg:p-16 rounded-[3rem] overflow-hidden border border-border bg-card-bg backdrop-blur-glass shadow-premium">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                            <div className="w-full lg:w-1/2 cert-text">
                                <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 tracking-tighter leading-tight">
                                    Provisent Certified <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Professional</span>
                                </h2>
                                <p className="text-lg text-foreground/70 mb-8 font-medium">
                                    Join the elite group of professionals who have validated their skills through our rigorous assessment process.
                                </p>
                                <ul className="space-y-6 mb-12">
                                    {['Pass final assessment with 80%+', 'Complete all real-world projects', 'Demonstrate practical knowledge in capstone'].map((req, i) => (
                                        <li key={i} className="flex items-center gap-4 text-lg font-medium">
                                            <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                                                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                                            </div>
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => navigate('/programs')}
                                    className="group relative overflow-hidden px-10 py-4 rounded-full bg-foreground text-background font-black text-sm uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-xl"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        View Programs
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 font-black tracking-widest text-sm">
                                        VIEW PROGRAMS
                                    </span>
                                </button>
                            </div>
                            <CertPreview />
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Certificates;
