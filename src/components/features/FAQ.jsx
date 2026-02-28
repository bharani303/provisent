import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_DATA } from '../../data/siteContent';
import { Plus, Minus, HelpCircle, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FAQItem = ({ faq, index }) => {
    const [isOpen, setIsOpen] = useState(index === 0);
    const answerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            gsap.to(answerRef.current, {
                height: contentRef.current.offsetHeight,
                duration: 0.5,
                ease: "power2.out"
            });
            gsap.to(answerRef.current, { opacity: 1, duration: 0.3 });
        } else {
            gsap.to(answerRef.current, {
                height: 0,
                duration: 0.5,
                ease: "power2.inOut"
            });
            gsap.to(answerRef.current, { opacity: 0, duration: 0.2 });
        }
    }, [isOpen]);

    return (
        <div className="faq-item border-b border-border last:border-0 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 md:py-8 flex items-center justify-between text-left group gap-4 md:gap-8 focus:outline-none"
            >
                <div className="flex items-center gap-4 md:gap-6">
                    <span className="font-mono text-cyan-500 text-base md:text-lg font-bold">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <h4 className="text-xl md:text-2xl font-black text-foreground group-hover:text-cyan-500 transition-colors uppercase tracking-tight">
                        {faq.question}
                    </h4>
                </div>
                <div className={`w-10 h-10 rounded-full border border-border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-cyan-500 border-cyan-500 rotate-180' : 'group-hover:bg-border/50'}`}>
                    {isOpen ? (
                        <Minus className="w-5 h-5 text-background" />
                    ) : (
                        <Plus className="w-5 h-5 text-foreground group-hover:text-cyan-500" />
                    )}
                </div>
            </button>
            <div ref={answerRef} className="h-0 opacity-0 overflow-hidden">
                <div ref={contentRef} className="pb-8 pl-10 md:pl-14 max-w-2xl">
                    <p className="text-base md:text-lg text-foreground/70 leading-relaxed font-medium">
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".faq-header > *", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".faq-header",
                    start: "top 90%"
                }
            });

            gsap.from(".faq-item", {
                x: -20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".faq-list",
                    start: "top 85%"
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden border-t border-border">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
                    <div className="lg:col-span-5 faq-header">
                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-foreground uppercase tracking-tighter leading-[0.85] mb-4 md:mb-8">
                            Service <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient">FAQ</span>
                        </h2>
                        <p className="text-base md:text-xl text-foreground/40 font-medium mb-8 md:mb-10 max-w-sm">
                            Quick answers about your Provisent journey.
                        </p>

                        <div className="p-8 rounded-[2rem] border border-border bg-card-bg backdrop-blur-glass shadow-premium group hover:border-cyan-500/40 transition-all duration-500 cursor-default">
                            <h4 className="text-lg font-bold text-foreground mb-2">Need more help?</h4>
                            <p className="text-sm text-foreground/40 mb-6 font-medium">Our advisors are available 24/7.</p>
                            <button className="px-6 py-3 rounded-full bg-foreground text-background font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-premium">
                                Contact Us
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-1 border-l border-border hidden lg:block opacity-50"></div>

                    <div className="lg:col-span-6 faq-list">
                        <div className="flex flex-col">
                            {SITE_DATA.faqs.map((faq, i) => (
                                <FAQItem key={i} faq={faq} index={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
