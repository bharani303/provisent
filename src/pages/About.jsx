import React, { useRef, useEffect } from 'react';
import PageTransition from '../components/animations/PageTransition';
import { SITE_DATA } from '../data/siteContent';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InteractiveCube from '../components/animations/InteractiveCube';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const mainRef = useRef(null);
    const journeyRef = useRef(null);
    const teamRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Hero Text & other text Reveal
            const revealElements = gsap.utils.toArray(".reveal-text");
            revealElements.forEach(el => {
                gsap.from(el, {
                    y: 100,
                    opacity: 0,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%"
                    }
                });
            });

            // Stats Reveal
            gsap.from(".stat-box", {
                scale: 0.8,
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: ".stats-container",
                    start: "top 75%"
                }
            });

            // Journey Timeline Animation
            const journeyItems = gsap.utils.toArray(".journey-item");
            journeyItems.forEach((item, i) => {
                gsap.from(item, {
                    x: i % 2 === 0 ? -100 : 100,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                    }
                });
            });

            // Timeline line progress
            gsap.fromTo(".timeline-progress",
                { height: "0%" },
                {
                    height: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".journey-container",
                        start: "top 50%",
                        end: "bottom 50%",
                        scrub: 1
                    }
                }
            );

            // Team Cards Reveal
            const teamCards = gsap.utils.toArray(".team-card");
            teamCards.forEach((card, i) => {
                gsap.from(card, {
                    y: 100,
                    opacity: 0,
                    rotateX: -15,
                    transformPerspective: 1000,
                    duration: 1.2,
                    ease: "power3.out",
                    delay: (i % 3) * 0.1, // Stagger effect per row
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%" // Trigger earlier so they are visibly revealed when scrolled
                    }
                });
            });

        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <PageTransition>
            <div ref={mainRef} className="pt-32 pb-24 min-h-screen bg-background text-foreground">
                {/* Hero Section */}
                <div className="container mx-auto px-6 mb-32 relative z-10">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="max-w-xl">
                            <h2 className="text-sm font-bold tracking-widest text-cyan-500 uppercase mb-8 flex items-center gap-4 reveal-text">
                                <span className="w-12 h-[2px] bg-cyan-500"></span>
                                Our Story
                            </h2>
                            <h1 className="text-6xl md:text-8xl font-black uppercase mb-8 tracking-tighter leading-[0.85] reveal-text">
                                Redefining <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Education</span>
                            </h1>
                            <p className="text-xl text-foreground/70 leading-relaxed font-medium reveal-text">
                                We are a global ed-tech platform on a relentless mission to democratize elite education. Combining modern curricula
                                with industry experts to transform your career and unlock your ultimate potential.
                            </p>
                        </div>
                        <div className="reveal-text flex justify-center lg:justify-end mt-12 lg:mt-0">
                            <InteractiveCube />
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="container mx-auto px-6 mb-40 stats-container relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
                        {[
                            { number: "50K+", label: "Students Worldwide" },
                            { number: "95%", label: "Placement Rate" },
                            { number: "100+", label: "Industry Partners" },
                            { number: "24/7", label: "Mentorship Access" }
                        ].map((stat, i) => (
                            <div key={i} className="stat-box p-8 rounded-[2rem] border border-white/10 dark:border-white/5 bg-black/5 dark:bg-white/5 backdrop-blur-sm text-center group hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2">
                                <h3 className="text-5xl md:text-6xl font-black text-foreground mb-4 group-hover:text-cyan-400 transition-colors duration-500">{stat.number}</h3>
                                <p className="text-sm font-bold uppercase tracking-widest text-foreground/50">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Journey Section */}
                <div ref={journeyRef} className="container mx-auto px-6 mb-40 relative z-10 journey-container">
                    <div className="text-center max-w-3xl mx-auto mb-20 reveal-text">
                        <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 tracking-tighter">
                            Our <span className="text-gradient">Journey</span>
                        </h2>
                        <p className="text-xl text-foreground/60">
                            The milestones that mark our relentless pursuit of excellence and global empowerment.
                        </p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-border md:-translate-x-1/2">
                            <div className="timeline-progress w-full bg-gradient-to-b from-cyan-500 to-purple-500"></div>
                        </div>

                        {SITE_DATA.journey.map((item, i) => (
                            <div key={i} className={`journey-item relative flex flex-col md:flex-row items-center justify-between mb-16 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="hidden md:block md:w-5/12"></div>

                                <div className="absolute left-[13px] md:left-1/2 w-4 h-4 rounded-full bg-cyan-500 md:-translate-x-1/2 shadow-[0_0_15px_rgba(34,211,238,0.8)] border-2 border-background z-10"></div>

                                <div className={`w-full pl-12 md:pl-0 md:w-5/12 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                                    <div className="p-8 rounded-[2rem] border border-border bg-black/5 dark:bg-white/5 backdrop-blur-md group hover:border-cyan-500/50 transition-colors duration-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                                        <h3 className="text-3xl font-black text-cyan-400 mb-4 inline-block">{item.year}</h3>
                                        <p className="text-lg text-foreground/80 leading-relaxed">{item.event}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div ref={teamRef} className="container mx-auto px-6 mb-32 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20 reveal-text">
                        <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 tracking-tighter">
                            Our <span className="text-gradient">Leadership</span> Team
                        </h2>
                        <p className="text-xl text-foreground/60">
                            Experienced professionals dedicated to your success.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {SITE_DATA.instructors.map((instructor, i) => (
                            <div key={i} className="team-card group relative overflow-hidden rounded-[2.5rem] border border-border bg-black/5 dark:bg-white/5 p-8 transition-all duration-700 hover:border-cyan-500/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                                <div className="relative z-10 text-center flex flex-col items-center">
                                    <div className="w-32 h-32 rounded-full overflow-hidden mb-6 group-hover:scale-110 transition-transform duration-700 border-4 border-border group-hover:border-cyan-500 relative flex items-center justify-center bg-background">
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 mix-blend-overlay"></div>
                                        {instructor.image ? (
                                            <img
                                                src={instructor.image}
                                                alt={instructor.name}
                                                className="w-full h-full object-cover relative z-10"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'block';
                                                }}
                                            />
                                        ) : null}
                                        <span
                                            className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500 tracking-tighter relative z-10"
                                            style={{ display: instructor.image ? 'none' : 'block' }}
                                        >
                                            {instructor.initial}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl font-black uppercase tracking-tight mb-2 group-hover:text-cyan-400 transition-colors">{instructor.name}</h3>
                                    <p className="text-sm font-bold tracking-widest text-purple-400 mb-6 uppercase border-b border-white/5 dark:border-white/10 pb-6 w-full">{instructor.role}</p>
                                    <p className="text-foreground/70 text-sm leading-relaxed font-medium">
                                        {instructor.bio}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action Inside About */}
                <div className="container mx-auto px-6">
                    <div className="bg-foreground text-background rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden reveal-text">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20"></div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 tracking-tighter relative z-10">Join The Movement</h2>
                        <p className="text-xl md:text-2xl font-medium opacity-80 mb-12 max-w-2xl mx-auto relative z-10">Be part of the new generation of tech leaders. Your transformation begins here.</p>
                        <a href="/enroll" className="inline-block px-12 py-5 rounded-full bg-background text-foreground font-black uppercase tracking-widest hover:scale-105 transition-transform duration-500 relative z-10 shadow-xl">
                            Apply Today
                        </a>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default About;
