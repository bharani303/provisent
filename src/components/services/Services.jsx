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
            className="w-[85vw] md:w-[45vw] lg:w-[35vw] h-[65vh] md:h-[75vh] rounded-[2rem] p-8 md:p-10 flex flex-col justify-end relative overflow-hidden group cursor-pointer border border-white/10 dark:border-white/5 bg-black hover:border-cyan-500/50 transition-colors duration-700"
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

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10 mix-blend-overlay"></div>

            <div className="relative z-20 flex flex-col h-full justify-between transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    <span className="text-cyan-400 font-mono text-xs md:text-sm font-bold tracking-widest uppercase py-1.5 px-4 border border-cyan-400/30 rounded-full bg-cyan-400/10 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                        {service.category}
                    </span>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all duration-500 hover:scale-110">
                        <svg className="w-5 h-5 translate-x-[1px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </div>
                </div>

                <div>
                    <span className="block text-white/50 text-sm tracking-widest uppercase mb-3 font-medium">
                        {service.duration}
                    </span>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-500">
                        {service.title}
                    </h3>
                    <p className="text-white/60 text-base md:text-lg mb-8 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 line-clamp-2">
                        {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300">
                        {service.tags.map(tag => (
                            <span key={tag} className="text-xs uppercase font-bold tracking-widest text-white/70 border border-white/20 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors">
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

    useEffect(() => {
        let ctx = gsap.context(() => {
            const wrapper = scrollWrapperRef.current;
            const scrollWidth = wrapper.scrollWidth;

            // Pin the container and translate the wrapper horizontally
            gsap.to(wrapper, {
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

            // Parallax for the title
            gsap.to(titleRef.current, {
                y: -100,
                opacity: 0,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "center center",
                    scrub: 1
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="h-screen bg-background overflow-hidden flex flex-col justify-center relative border-y border-border" id="expertise">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-900/10 dark:bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div ref={titleRef} className="absolute top-[10%] left-6 md:left-24 z-20 pointer-events-none">
                <h2 className="text-sm font-bold tracking-widest text-cyan-500 uppercase mb-4 flex items-center gap-4">
                    <span className="w-12 h-[2px] bg-cyan-500"></span>
                    Elevate Your Future
                </h2>
                <div className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground uppercase tracking-tighter leading-[0.85] mix-blend-difference">
                    Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Programs</span><br />
                    This Month
                </div>
            </div>

            <div className="mt-32 w-full flex items-center flex-1">
                <div ref={scrollWrapperRef} className="flex gap-8 md:gap-16 px-6 md:px-24 w-fit items-center h-full">
                    {SITE_DATA.courses.map((service, i) => (
                        <div key={i} className="flex-shrink-0">
                            <ServiceCard service={service} index={i} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
