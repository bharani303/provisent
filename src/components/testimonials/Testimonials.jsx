import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_DATA } from '../../data/siteContent';
import { Quote, Star, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TestimonialCard = ({ testimonial, index }) => {
    return (
        <div className="testimonial-card w-full p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-card-bg border border-border backdrop-blur-xl relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-500 hover:shadow-premium select-none cursor-default">
            <div className="absolute top-0 right-0 p-6 md:p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <Quote className="w-12 h-12 md:w-20 md:h-20 text-cyan-500" />
            </div>

            <div className="flex items-center gap-1 mb-4 md:mb-6">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-cyan-500 text-cyan-500" />
                ))}
            </div>

            <p className="text-sm md:text-lg text-foreground/80 font-medium leading-relaxed mb-6 md:mb-8 h-[80px] md:h-[120px] overflow-hidden line-clamp-3 md:line-clamp-4 whitespace-normal">
                "{testimonial.content}"
            </p>

            <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors">
                    <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h4 className="text-sm md:text-base font-black text-foreground uppercase tracking-tight">{testimonial.name}</h4>
                    <p className="text-[9px] md:text-xs font-bold text-cyan-500/70 uppercase tracking-widest">{testimonial.role}</p>
                    <div className="flex items-center gap-1 mt-0.5 md:mt-1 text-[8px] md:text-[10px] text-foreground/40 font-bold uppercase tracking-tighter">
                        <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        {testimonial.location}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Testimonials = () => {
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Horizontal Marquee Row 1
            const row1 = row1Ref.current;
            const scrollWidth1 = row1.scrollWidth;
            gsap.to(row1, {
                x: -scrollWidth1 / 2,
                duration: 40,
                repeat: -1,
                ease: "none"
            });

            // Horizontal Marquee Row 2 (Reverse)
            const row2 = row2Ref.current;
            const scrollWidth2 = row2.scrollWidth;
            gsap.fromTo(row2,
                { x: -scrollWidth2 / 2 },
                {
                    x: 0,
                    duration: 45,
                    repeat: -1,
                    ease: "none"
                }
            );

            // Stagger entrance for the headers
            gsap.from(".testimonial-header > *", {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".testimonial-header",
                    start: "top 85%"
                }
            });

            // Hover effect to slow down rows
            const pauseRows = () => {
                gsap.to([row1, row2], { timeScale: 0.2, duration: 1 });
            };
            const resumeRows = () => {
                gsap.to([row1, row2], { timeScale: 1, duration: 1 });
            };

            containerRef.current.addEventListener('mouseenter', pauseRows);
            containerRef.current.addEventListener('mouseleave', resumeRows);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const firstHalf = SITE_DATA.testimonials;
    // For a better variety in the second row, we take the same data but offset or reverse
    const secondHalf = [...SITE_DATA.testimonials].reverse();

    return (
        <section ref={containerRef} className="py-24 md:py-32 bg-background overflow-hidden relative border-t border-border">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-cyan-500/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 mb-16 md:mb-24 text-center testimonial-header relative z-10">
                <h2 className="text-[10px] md:text-sm font-black tracking-[0.3em] text-cyan-500 uppercase mb-6 md:mb-8 flex items-center justify-center gap-4">
                    <span className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-transparent to-cyan-500"></span>
                    Student Stories
                    <span className="w-8 md:w-12 h-[2px] bg-gradient-to-l from-transparent to-cyan-500"></span>
                </h2>
                <h3 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase text-foreground tracking-tighter leading-[0.85]">
                    Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient">Success</span><br />
                    Network
                </h3>
            </div>

            {/* Marquee Row 1 */}
            <div className="flex gap-4 md:gap-8 mb-8 md:mb-12 relative z-10">
                <div ref={row1Ref} className="flex gap-4 md:gap-8 whitespace-nowrap">
                    {[...firstHalf, ...firstHalf, ...firstHalf].map((t, idx) => (
                        <div key={idx} className="flex-shrink-0 w-[280px] md:w-[400px]">
                            <TestimonialCard testimonial={t} index={idx} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Marquee Row 2 */}
            <div className="flex gap-4 md:gap-8 relative z-10">
                <div ref={row2Ref} className="flex gap-4 md:gap-8 whitespace-nowrap">
                    {[...secondHalf, ...secondHalf, ...secondHalf].map((t, idx) => (
                        <div key={idx} className="flex-shrink-0 w-[280px] md:w-[400px]">
                            <TestimonialCard testimonial={t} index={idx} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Side Masks for better blending */}
            <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-background via-background/80 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-background via-background/80 to-transparent z-20 pointer-events-none"></div>
        </section>
    );
};

export default Testimonials;
