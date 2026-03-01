import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sun, Moon, Menu, X, ArrowRight, Star, Users, Clock } from 'lucide-react';
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
            className="w-[80vw] md:w-[45vw] lg:w-[35vw] h-[50vh] md:h-[65vh] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 flex flex-col justify-end relative overflow-hidden group cursor-pointer border border-border bg-card-bg shadow-premium backdrop-blur-glass transition-all duration-700 hover:-translate-y-4"
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

            <div className="relative z-20 flex flex-col h-full justify-between transform translate-y-0 md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                <div className="flex justify-between items-start opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    <div className="flex flex-col gap-2">
                        <span className="text-cyan-600 dark:text-cyan-400 font-mono text-[10px] md:text-sm font-bold tracking-widest uppercase py-1.5 px-3 md:py-2 md:px-5 border border-cyan-400/30 rounded-full bg-card-bg backdrop-blur-glass shadow-premium">
                            {service.category}
                        </span>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                            <Star size={12} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-[10px] font-black text-white">{service.rating}</span>
                            <span className="text-[8px] text-white/40 uppercase font-bold ml-1">({service.students} students)</span>
                        </div>
                    </div>
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-border flex items-center justify-center bg-card-bg backdrop-blur-glass group-hover:bg-foreground group-hover:text-background transition-all duration-500 hover:scale-110 shadow-premium">
                        <ArrowRight className="w-4 h-4 md:w-6 md:h-6 translate-x-[1px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                    </div>
                </div>

                <div>
                    <span className="block text-foreground/50 text-[10px] md:text-sm tracking-widest uppercase mb-2 md:mb-4 font-bold">
                        {service.duration}
                    </span>
                    <div className="flex items-center justify-between mb-3 md:mb-6">
                        <h3 className="text-2xl md:text-5xl lg:text-6xl font-black text-foreground uppercase tracking-tighter leading-[0.9] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-foreground/50 transition-all duration-500">
                            {service.title}
                        </h3>
                        <div className="text-right block">
                            <span className="block text-cyan-500 font-mono font-black text-sm md:text-2xl">{service.price}</span>
                            <span className="text-[8px] uppercase tracking-widest text-white/40">Starts from</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 md:gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-700 delay-300">
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
    const marqueeCourses = [...displayCourses, ...displayCourses];

    useEffect(() => {
        let mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            // Desktop Horizontal Scroll
            const wrapper = scrollWrapperRef.current;
            const cards = gsap.utils.toArray(".service-card-wrapper");

            const horizontalTween = gsap.to(wrapper, {
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

            cards.forEach((card, i) => {
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

                gsap.to(card, {
                    y: i % 2 === 0 ? -40 : 40,
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
        });

        mm.add("(max-width: 1023px)", () => {
            // Mobile Horizontal Scroll with GSAP
            const wrapper = scrollWrapperRef.current;
            const cards = gsap.utils.toArray(".service-card-wrapper");

            gsap.to(wrapper, {
                x: () => -(wrapper.scrollWidth - window.innerWidth + 50),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: () => `+=${wrapper.scrollWidth}`,
                    invalidateOnRefresh: true
                }
            });

            cards.forEach((card, i) => {
                gsap.from(card, {
                    y: 100,
                    opacity: 0,
                    scale: 0.9,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "left right",
                        toggleActions: "play none none reverse",
                        containerAnimation: null // Using global scroll trigger here
                    }
                });
            });
        });

        let ctx = gsap.context(() => {
            // Common Animations
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

        return () => {
            mm.revert();
            ctx.revert();
        };
    }, []);

    return (
        <section ref={containerRef} className="h-screen lg:h-screen bg-background lg:overflow-hidden flex flex-col justify-center relative border-y border-border py-24 lg:py-0" id="expertise">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[1000px] h-[500px] md:h-[1000px] bg-purple-900/10 dark:bg-cyan-900/10 rounded-full blur-[80px] md:blur-[150px] pointer-events-none"></div>

            <div ref={titleRef} className="lg:absolute top-[5%] md:top-[10%] left-6 md:left-24 z-20 pointer-events-none mb-4 lg:mb-0 px-6 lg:px-0">
                <h2 className="text-[10px] md:text-sm font-bold tracking-widest text-cyan-500 uppercase mb-2 md:mb-4 flex items-center gap-2 md:gap-4 reveal-text">
                    <span className="w-8 md:w-12 h-[2px] bg-cyan-500"></span>
                    Elevate Your Future
                </h2>
                <div className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-foreground uppercase tracking-tighter leading-[0.85] mix-blend-difference">
                    <span className="block service-title-part">Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Programs</span></span>
                    <span className="block service-title-part">This Month</span>
                </div>
            </div>

            <div className="lg:mt-32 w-full flex items-center flex-1 overflow-hidden lg:overflow-visible no-scrollbar">
                <div ref={scrollWrapperRef} className="flex flex-row gap-4 md:gap-16 lg:gap-24 px-6 lg:px-24 w-fit items-center h-full">
                    {displayCourses.map((service, i) => (
                        <div key={i} className="flex-shrink-0 service-card-wrapper w-[80vw] md:w-[45vw] lg:w-auto">
                            <ServiceCard service={service} index={i} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
