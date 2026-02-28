import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { use3DTilt } from '../../animations/use3DTilt';
import { SITE_DATA } from '../../data/siteContent';

gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({ service }) => {
    const { ref, style, onMouseMove, onMouseLeave } = use3DTilt();
    const navigate = useNavigate();

    return (
        <div
            ref={ref}
            style={style}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="w-[85vw] md:w-[45vw] lg:w-[35vw] h-[65vh] md:h-[75vh] rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-end relative overflow-hidden group cursor-pointer border border-border bg-card-bg shadow-premium backdrop-blur-glass transition-all duration-700 hover:-translate-y-4"
            onClick={() => navigate('/programs')}
        >
            {/* Background Image Parallax effect via CSS */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[2rem] bg-gradient-to-br from-gray-900 to-black">
                <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-110 filter saturate-50 group-hover:saturate-100"
                    onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop";
                    }}
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent dark:from-black dark:via-black/80 dark:to-transparent z-10 transition-colors duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10 mix-blend-multiply dark:mix-blend-overlay"></div>

            <div className="relative z-20 flex flex-col h-full justify-between transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    <span className="text-cyan-600 dark:text-cyan-400 font-mono text-[10px] md:text-sm font-bold tracking-widest uppercase py-1.5 px-3 md:py-2 md:px-5 border border-cyan-400/30 rounded-full bg-card-bg backdrop-blur-glass shadow-premium">
                        {service.category}
                    </span>
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-border flex items-center justify-center bg-card-bg backdrop-blur-glass group-hover:bg-foreground group-hover:text-background transition-all duration-500 hover:scale-110 shadow-premium">
                        <svg className="w-4 h-4 md:w-6 md:h-6 translate-x-[1px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </div>
                </div>

                <div>
                    <span className="block text-foreground/50 text-[10px] md:text-sm tracking-widest uppercase mb-2 md:mb-4 font-bold">
                        {service.duration}
                    </span>
                    <h3 className="text-2xl md:text-5xl lg:text-6xl font-black text-foreground mb-3 md:mb-6 uppercase tracking-tighter leading-[0.9] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-foreground/50 transition-all duration-500">
                        {service.title}
                    </h3>

                    <div className="flex flex-wrap gap-1.5 md:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300">
                        {service.tags.map(tag => (
                            <span key={tag} className="text-[9px] md:text-xs uppercase font-bold tracking-widest text-white/70 border border-white/20 px-2 py-1 md:px-3 md:py-1.5 rounded-full hover:bg-white/10 transition-colors">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Services = () => {
    const containerRef = useRef(null);
    const scrollWrapperRef = useRef(null);
    const titleRef = useRef(null);

    // Limit to 10 cards
    const displayCourses = SITE_DATA.courses.slice(0, 10);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const wrapper = scrollWrapperRef.current;
            const cards = gsap.utils.toArray(".service-card-wrapper");

            // Main horizontal scroll
            const horizontalTween = gsap.to(wrapper, {
                id: "horizontal-scroll",
                x: () => -(wrapper.scrollWidth - window.innerWidth + 150),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    start: "center center",
                    end: () => `+=${wrapper.scrollWidth}`,
                    invalidateOnRefresh: true
                }
            });

            // Individual card animations during scroll
            cards.forEach((card, i) => {
                // Entrance stagger
                gsap.from(card, {
                    y: 200,
                    opacity: 0,
                    rotate: 10,
                    duration: 1,
                    delay: i * 0.1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center",
                        toggleActions: "play none none reverse"
                    }
                });

                // Tilt/Float effect on scroll
                gsap.to(card, {
                    y: i % 2 === 0 ? -40 : 40, // Zig-zag pattern
                    rotate: i % 2 === 0 ? 3 : -3,
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: horizontalTween,
                        start: "left right",
                        end: "right left",
                        scrub: 1
                    }
                });
            });

            // Refined Parallax for the title
            gsap.from(".service-title-part", {
                x: -100,
                opacity: 0,
                stagger: 0.2,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%"
                }
            });

            gsap.to(titleRef.current, {
                scale: 0.8,
                filter: "blur(10px)",
                opacity: 0.3,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "center center",
                    scrub: 1
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="h-[80vh] md:h-screen bg-background overflow-hidden flex flex-col justify-center relative border-y border-border" id="expertise">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[1000px] h-[500px] md:h-[1000px] bg-purple-900/10 dark:bg-cyan-900/10 rounded-full blur-[80px] md:blur-[150px] pointer-events-none"></div>

            <div ref={titleRef} className="absolute top-[5%] md:top-[10%] left-6 md:left-24 z-20 pointer-events-none">
                <h2 className="text-[10px] md:text-sm font-bold tracking-widest text-cyan-500 uppercase mb-2 md:mb-4 flex items-center gap-2 md:gap-4 reveal-text">
                    <span className="w-8 md:w-12 h-[2px] bg-cyan-500"></span>
                    Elevate Your Future
                </h2>
                <div className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-foreground uppercase tracking-tighter leading-[0.85] mix-blend-difference">
                    <span className="block service-title-part">Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Programs</span></span>
                    <span className="block service-title-part">This Month</span>
                </div>
            </div>

            <div className="mt-24 md:mt-32 w-full flex items-center flex-1">
                <div ref={scrollWrapperRef} className="flex gap-4 md:gap-24 px-6 md:px-24 w-fit items-center h-full">
                    {displayCourses.map((service, i) => (
                        <div key={i} className="flex-shrink-0 service-card-wrapper w-[80vw] md:w-auto">
                            <ServiceCard service={service} index={i} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
