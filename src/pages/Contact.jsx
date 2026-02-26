import React, { useRef, useEffect, useState } from 'react';
import PageTransition from '../components/animations/PageTransition';
import { SITE_DATA } from '../data/siteContent';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, MessageCircle, Plus, Minus, Sparkles } from 'lucide-react';
import { use3DTilt } from '../animations/use3DTilt';

gsap.registerPlugin(ScrollTrigger);

const FAQAcorrdion = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            if (isOpen) {
                gsap.to(contentRef.current, { height: 'auto', duration: 0.4, ease: "power2.out", opacity: 1 });
            } else {
                gsap.to(contentRef.current, { height: 0, duration: 0.3, ease: "power2.in", opacity: 0 });
            }
        }
    }, [isOpen]);

    return (
        <div className="faq-item border-b border-border py-6 group">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between text-left focus:outline-none"
            >
                <h3 className={`text-xl font-bold tracking-tight uppercase transition-colors duration-300 ${isOpen ? 'text-cyan-500' : 'text-foreground group-hover:text-purple-400'}`}>
                    {question}
                </h3>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${isOpen ? 'border-cyan-500 text-cyan-500 bg-cyan-500/10' : 'border-border text-foreground group-hover:border-purple-500 group-hover:text-purple-500'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
            </button>
            <div ref={contentRef} className="h-0 overflow-hidden opacity-0">
                <p className="pt-6 text-foreground/70 font-medium leading-relaxed">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const Contact = () => {
    const mainRef = useRef(null);
    const { ref: formRef, onMouseMove, onMouseLeave } = use3DTilt(5); // subtle 5 deg tilt for the large form

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Header Stagger
            gsap.from(".contact-header", {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.2
            });

            // Contact Blocks Reveal
            gsap.from(".contact-block", {
                x: -50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".contact-grid",
                    start: "top 80%"
                }
            });

            // Form Reveal
            gsap.from(".contact-form", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".contact-form",
                    start: "top 80%"
                }
            });

            // FAQ Items Reveal
            gsap.from(".faq-item", {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".faq-section",
                    start: "top 75%"
                }
            });

        }, mainRef);

        return () => ctx.revert();
    }, []);

    const faqs = [
        {
            question: "How do I enroll in a program?",
            answer: "Simply click the 'Enroll Now' button on any program page, fill out the application form with your details, and select your desired course from the dropdown. Our admissions team will get back to you within 24 hours."
        },
        {
            question: "Can I get a refund?",
            answer: "Yes, we offer a 14-day money-back guarantee for all our full-time certification programs if you are unsatisfied with the curriculum or learning experience."
        },
        {
            question: "Do I get a certificate after completion?",
            answer: "Absolutely. Upon successful completion of all modules and the final capstone project with a score of 80% or higher, you will receive a globally recognized, verifiable digital certificate."
        },
        {
            question: "Is there lifetime access to courses?",
            answer: "Yes! Once you enroll in a program, you get unlimited lifetime access to the course content, including all future updates to the curriculum."
        },
        {
            question: "What if I need technical support?",
            answer: "Our dedicated support team is available 24/7. You can reach out via the student dashboard, email us directly, or use our priority WhatsApp support channel."
        },
        {
            question: "Can I download course materials?",
            answer: "Many resources like cheat sheets, PDFs, and slide decks are fully downloadable. However, to protect intellectual property, video lectures are available via streaming only."
        }
    ];

    return (
        <PageTransition>
            <div ref={mainRef} className="pt-32 pb-32 min-h-screen bg-background text-foreground relative overflow-hidden transition-colors duration-500">
                {/* Background Glows */}
                <div className="absolute top-[10%] left-[-10%] w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-24">
                        <div className="contact-header inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-500 uppercase tracking-[0.2em] mb-8">
                            <Sparkles size={14} />
                            <span>We're Here For You</span>
                        </div>
                        <h1 className="contact-header text-5xl md:text-7xl lg:text-8xl font-black uppercase mb-8 tracking-tighter leading-[0.9]">
                            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500">Touch</span>
                        </h1>
                        <p className="contact-header text-xl md:text-2xl text-foreground/70 leading-relaxed font-medium">
                            Have questions about our programs or the enrollment process? Our global team is ready to assist you.
                        </p>
                    </div>

                    <div className="contact-grid flex flex-col lg:flex-row gap-16 max-w-7xl mx-auto mb-40">
                        {/* Contact Info */}
                        <div className="w-full lg:w-1/3 space-y-12">
                            <div className="contact-block flex gap-6">
                                <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex flex-shrink-0 items-center justify-center">
                                    <Mail className="w-6 h-6 text-cyan-500" />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50 mb-2">Email Us</h4>
                                    <a href={`mailto:${SITE_DATA.contact.email}`} className="text-xl md:text-2xl font-black hover:text-cyan-500 transition-colors">
                                        {SITE_DATA.contact.email}
                                    </a>
                                </div>
                            </div>

                            <div className="contact-block flex gap-6">
                                <div className="w-14 h-14 rounded-full bg-purple-500/10 border border-purple-500/20 flex flex-shrink-0 items-center justify-center">
                                    <Phone className="w-6 h-6 text-purple-500" />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50 mb-2">Call Us (Global)</h4>
                                    <p className="text-xl md:text-2xl font-black">{SITE_DATA.contact.phone}</p>
                                </div>
                            </div>

                            <div className="contact-block flex gap-6">
                                <div className="w-14 h-14 rounded-full bg-pink-500/10 border border-pink-500/20 flex flex-shrink-0 items-center justify-center">
                                    <MapPin className="w-6 h-6 text-pink-500" />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50 mb-2">Visit HQ</h4>
                                    <p className="text-lg font-medium leading-relaxed">{SITE_DATA.contact.address}</p>
                                </div>
                            </div>

                            <div className="contact-block pt-8 border-t border-border">
                                <a
                                    href={SITE_DATA.contact.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 py-4 px-8 rounded-full border border-green-500/50 bg-green-500/10 text-green-500 font-bold uppercase hover:bg-green-500 hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.1)] group"
                                >
                                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    <span className="tracking-widest text-sm">Chat on WhatsApp</span>
                                </a>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="w-full lg:w-2/3 contact-form z-10 perspective-[1000px]">
                            <form
                                ref={formRef}
                                onMouseMove={onMouseMove}
                                onMouseLeave={onMouseLeave}
                                className="space-y-8 bg-card-bg backdrop-blur-glass p-8 md:p-12 lg:p-16 rounded-[3rem] border border-border hover:shadow-[0_0_50px_rgba(139,92,246,0.1)] transition-shadow duration-500 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none"></div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/70">Full Name</label>
                                        <input type="text" className="w-full bg-transparent border-b border-border py-4 px-0 focus:outline-none focus:border-cyan-500 transition-colors placeholder-foreground/20 text-xl font-medium" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/70">Email Address</label>
                                        <input type="email" className="w-full bg-transparent border-b border-border py-4 px-0 focus:outline-none focus:border-cyan-500 transition-colors placeholder-foreground/20 text-xl font-medium" placeholder="john@example.com" />
                                    </div>
                                </div>

                                <div className="space-y-2 relative z-10">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/70">Subject Focus</label>
                                    <input type="text" className="w-full bg-transparent border-b border-border py-4 px-0 focus:outline-none focus:border-cyan-500 transition-colors placeholder-foreground/20 text-xl font-medium" placeholder="How can we help?" />
                                </div>

                                <div className="space-y-2 relative z-10">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/70">Your Message</label>
                                    <textarea rows="4" className="w-full bg-transparent border-b border-border py-4 px-0 focus:outline-none focus:border-cyan-500 transition-colors resize-none placeholder-foreground/20 text-xl font-medium" placeholder="Tell us more about your inquiry..."></textarea>
                                </div>

                                <div className="pt-8 relative z-10">
                                    <button type="button" className="group relative overflow-hidden px-12 py-5 rounded-full bg-foreground text-background font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-all duration-300 w-full md:w-auto shadow-xl">
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors">
                                            Send Message
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="faq-section max-w-4xl mx-auto pt-20 border-t border-border">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 tracking-tight">
                                Frequently Asked <span className="text-cyan-500">Questions</span>
                            </h2>
                            <p className="text-lg text-foreground/60 font-medium">Quick answers to common questions about our programs.</p>
                        </div>

                        <div className="border-t border-border mt-8">
                            {faqs.map((faq, index) => (
                                <FAQAcorrdion key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Contact;
