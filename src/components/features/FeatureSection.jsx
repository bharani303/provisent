import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_DATA } from '../../data/siteContent';

gsap.registerPlugin(ScrollTrigger);

const FeatureSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".ft-title", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                stagger: 0.1
            });

            gsap.from(".ft-item", {
                scrollTrigger: {
                    trigger: ".ft-grid",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.5)",
                stagger: 0.2
            });

            gsap.to(".ft-image", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                },
                y: -150,
                ease: "none"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 bg-[#0B0F1A] relative z-10" id="studio">
            <div className="container mx-auto px-6">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    <div className="relative h-[700px] w-full rounded-[3rem] overflow-hidden glass-panel group border-white/5">
                        {/* Parallax Image container */}
                        <div className="absolute inset-[-20%] w-[140%] h-[140%] ft-image bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity opacity-30 transition-opacity duration-1000 group-hover:opacity-70 group-hover:mix-blend-normal"></div>

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/20 to-transparent"></div>

                        <div className="absolute top-12 left-12">
                            <div className="text-pink-500 font-black text-6xl opacity-10 uppercase tracking-tighter leading-none">
                                Provisent<br />Vision
                            </div>
                        </div>

                        <div className="absolute bottom-12 left-12 right-12 z-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8 group-hover:scale-110 group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-700">
                                <span className="w-5 h-5 rounded-full bg-cyan-400 animate-pulse"></span>
                            </div>
                            <h3 className="text-4xl font-black text-white uppercase tracking-tight mb-2">Democratizing Education</h3>
                            <p className="text-white/40 text-sm tracking-widest uppercase">Our Mission since 2018</p>
                        </div>
                    </div>

                    <div>
                        <div className="overflow-hidden mb-8">
                            <h2 className="ft-title text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                                Why Choose <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-gradient">
                                    Provisent?
                                </span>
                            </h2>
                        </div>

                        <p className="ft-title text-white/50 text-xl font-light mb-16 max-w-xl border-l-2 border-cyan-400/30 pl-8">
                            Transforming lives through accessible, world-class education and professional development programs. Join our growing community of learners worldwide.
                        </p>

                        <div className="ft-grid grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                            {SITE_DATA.whyChooseUs.map((f, i) => (
                                <div key={i} className="ft-item relative group">
                                    <div className="text-cyan-400/20 font-black text-6xl absolute -top-8 -left-4 z-0 group-hover:text-cyan-400/40 transition-colors duration-500">
                                        0{i + 1}
                                    </div>
                                    <div className="relative z-10">
                                        <h4 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">{f.title}</h4>
                                        <p className="text-white/40 text-base leading-relaxed">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default FeatureSection;
