import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_DATA } from '../../data/siteContent';
import { Users, Video, Globe, Award, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const gridRef = useRef(null);

    const icons = [
        <Users className="w-8 h-8 text-cyan-500" />,
        <Video className="w-8 h-8 text-purple-500" />,
        <Globe className="w-8 h-8 text-pink-500" />,
        <Award className="w-8 h-8 text-blue-500" />
    ];

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Header animation
            gsap.from(".why-header > *", {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".why-header",
                    start: "top 85%",
                }
            });

            // Cards animation
            const cards = gsap.utils.toArray(".why-card");
            cards.forEach((card, i) => {
                gsap.from(card, {
                    y: 100,
                    opacity: 0,
                    scale: 0.9,
                    rotateX: -10,
                    duration: 1,
                    delay: i * 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                    }
                });

                // Hover effect logic
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        y: -10,
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        borderColor: "rgba(34, 211, 238, 0.4)",
                        duration: 0.4,
                        ease: "power2.out"
                    });
                    gsap.to(card.querySelector('.icon-box'), {
                        scale: 1.1,
                        rotate: 5,
                        backgroundColor: "rgba(34, 211, 238, 0.1)",
                        duration: 0.4
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        y: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.02)",
                        borderColor: "rgba(255, 255, 255, 0.1)",
                        duration: 0.4,
                        ease: "power2.inOut"
                    });
                    gsap.to(card.querySelector('.icon-box'), {
                        scale: 1,
                        rotate: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                        duration: 0.4
                    });
                });
            });

            // Background glow animation
            gsap.to(".bg-glow-1", {
                x: "20%",
                y: "10%",
                duration: 10,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
            gsap.to(".bg-glow-2", {
                x: "-20%",
                y: "-10%",
                duration: 12,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 bg-background relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="bg-glow-1 absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px]"></div>
                <div className="bg-glow-2 absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="why-header text-center max-w-3xl mx-auto mb-16 md:mb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 md:py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs md:text-sm font-black uppercase tracking-[0.2em] mb-4 md:mb-6">
                        <Sparkles className="w-4 h-4" />
                        Why Provisent
                    </div>
                    <h2 className="text-4xl md:text-7xl font-black text-foreground uppercase tracking-tighter leading-[0.9] mb-4 md:mb-8">
                        Why Choose <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">Us</span>
                    </h2>
                    <p className="text-base md:text-xl text-foreground/50 font-medium leading-relaxed">
                        We provide more than just courses. We build a complete learning ecosystem designed for your success.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {SITE_DATA.whyChooseUs.map((item, i) => (
                        <div
                            key={i}
                            className="why-card p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 group relative overflow-hidden"
                            style={{ transformPerspective: '1000px' }}
                        >
                            {/* Card Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-500"></div>

                            <div className="relative z-20">
                                <div className="icon-box w-16 h-16 md:w-20 md:h-20 rounded-[1.2rem] md:rounded-[1.5rem] bg-black/20 flex items-center justify-center mb-6 md:mb-10 border border-white/5 shadow-inner transition-all duration-500">
                                    {React.cloneElement(icons[i], { className: `w-6 h-6 md:w-8 md:h-8 ${icons[i].props.className.split(' ').find(c => c.startsWith('text-'))}` })}
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight mb-2 md:mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-foreground/60 text-sm md:text-lg leading-relaxed font-medium">
                                    {item.desc}
                                </p>
                            </div>

                            {/* Decorative number */}
                            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 text-7xl md:text-9xl font-black text-white/5 select-none pointer-events-none group-hover:text-cyan-500/10 transition-colors duration-500">
                                0{i + 1}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
