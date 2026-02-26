import React, { useRef, useEffect } from 'react';
import PageTransition from '../components/animations/PageTransition';
import { SITE_DATA } from '../data/siteContent';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InteractiveCube from '../components/animations/InteractiveCube';
import CardStack from '../components/animations/CardStack';
import { CheckCircle2, ChevronRight, Globe, Users, Award, Target, BookOpen, Lightbulb, Heart, Shield, GraduationCap, DollarSign, Clock, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const mainRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // General text reveal
            const revealElements = gsap.utils.toArray(".reveal-text");
            revealElements.forEach(el => {
                gsap.from(el, {
                    y: 70,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%"
                    }
                });
            });

            // Stagger arrays (like feature lists, stat cards)
            const staggerElements = gsap.utils.toArray(".stagger-group");
            staggerElements.forEach(group => {
                const children = group.children;
                gsap.from(children, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: group,
                        start: "top 80%"
                    }
                });
            });

            // Journey Timeline Animation
            const journeyItems = gsap.utils.toArray(".journey-item");
            journeyItems.forEach((item, i) => {
                gsap.from(item, {
                    x: i % 2 === 0 ? -100 : 100,
                    opacity: 0,
                    duration: 1.2,
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
                        start: "top 90%"
                    }
                });
            });

        }, mainRef);

        return () => ctx.revert();
    }, []);

    const missionPoints = [
        "Expert-led courses from industry professionals",
        "Flexible learning paths tailored to your goals",
        "Globally recognized certifications"
    ];

    const coreValues = [
        { icon: <Lightbulb className="w-8 h-8 text-cyan-500" />, title: "Innovation", desc: "Cutting-edge curriculum designed for modern careers" },
        { icon: <Heart className="w-8 h-8 text-pink-500" />, title: "Community", desc: "Vibrant community of learners supporting each other" },
        { icon: <Award className="w-8 h-8 text-purple-500" />, title: "Excellence", desc: "Expert instructors with real-world industry experience" },
        { icon: <Globe className="w-8 h-8 text-cyan-500" />, title: "Accessibility", desc: "Quality education available to everyone, everywhere" }
    ];

    const whyChooseUs = [
        { icon: <DollarSign className="w-6 h-6 text-green-500" />, title: "Affordable Pricing", desc: "Quality education without breaking the bank" },
        { icon: <Clock className="w-6 h-6 text-purple-500" />, title: "Lifetime Access", desc: "Learn at your own pace with lifetime course access" },
        { icon: <Users className="w-6 h-6 text-pink-500" />, title: "Expert Instructors", desc: "Learn from industry professionals and thought leaders" },
        { icon: <Briefcase className="w-6 h-6 text-cyan-500" />, title: "Job Ready Skills", desc: "Practical skills demanded by top employers" },
        { icon: <Globe className="w-6 h-6 text-indigo-500" />, title: "Global Community", desc: "Connect with learners from around the world" },
        { icon: <Shield className="w-6 h-6 text-yellow-500" />, title: "Certifications", desc: "Earn recognized certificates to advance your career" }
    ];

    return (
        <PageTransition>
            <div ref={mainRef} className="pt-32 pb-24 min-h-screen bg-background text-foreground transition-colors duration-500 overflow-hidden">
                {/* Hero Section */}
                <div className="container mx-auto px-6 mb-32 relative z-10">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="max-w-xl">
                            <h2 className="text-sm font-black tracking-[0.3em] text-cyan-500 uppercase mb-8 flex items-center gap-4 reveal-text">
                                <span className="w-12 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent"></span>
                                Our Story
                            </h2>
                            <h1 className="text-6xl md:text-8xl font-black uppercase mb-8 tracking-tighter leading-[0.85] reveal-text text-foreground">
                                Redefining <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500">Education</span>
                            </h1>
                            <p className="text-xl text-foreground/70 leading-relaxed font-medium reveal-text">
                                We're not just a platform; we are a global movement. Combining modern curricula
                                with industry experts to transform your career and unlock your ultimate potential.
                            </p>
                        </div>
                        <div className="reveal-text flex justify-center lg:justify-end mt-12 lg:mt-0">
                            <InteractiveCube />
                        </div>
                    </div>
                </div>

                {/* Excellence in Education Gallery Section */}
                <div className="container mx-auto px-6 mb-40 relative z-10 border-t border-border pt-32">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8 reveal-text">
                            <div className="space-y-6">
                                <h3 className="text-4xl md:text-5xl font-black text-foreground leading-[1.1] uppercase tracking-tighter">
                                    Excellence in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Education</span>
                                </h3>
                                <p className="text-xl text-foreground/70 leading-relaxed font-medium">
                                    Provisent has been a beacon of academic excellence, consistently nurturing intellectual curiosity and fostering innovation since inception.
                                </p>
                                <div className="space-y-4 pt-4">
                                    {[
                                        "Affiliated with global tech giants and recognized worldwide",
                                        "Autonomous institution with top-tier accreditations",
                                        "Strong research culture with industry collaborations",
                                        "Preparing future leaders, innovators, and changemakers"
                                    ].map((point, idx) => (
                                        <div key={idx} className="flex items-start gap-4 text-foreground/80 font-medium">
                                            <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex flex-shrink-0 items-center justify-center border border-cyan-500/20 text-cyan-500 mt-0.5">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                            <p className="leading-snug">{point}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-6">
                                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-colors shadow-sm">
                                    <Award className="w-5 h-5 text-blue-500" />
                                    <p className="font-black text-xs uppercase tracking-widest text-blue-500">Global Accredited</p>
                                </div>
                                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-colors shadow-sm">
                                    <Shield className="w-5 h-5 text-green-500" />
                                    <p className="font-black text-xs uppercase tracking-widest text-green-500">ISO 9001:2015</p>
                                </div>
                                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 transition-colors shadow-sm">
                                    <Globe className="w-5 h-5 text-purple-500" />
                                    <p className="font-black text-xs uppercase tracking-widest text-purple-500">Top Rated Programs</p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Gallery Stack */}
                        <div className="flex items-center justify-center py-12 lg:py-0 reveal-text">
                            <CardStack />
                        </div>
                    </div>
                </div>

                {/* Our Mission */}
                <div className="container mx-auto px-6 mb-32 relative z-10">
                    <div className="bg-card-bg backdrop-blur-glass p-12 md:p-16 rounded-[3rem] border border-border shadow-premium flex flex-col lg:flex-row gap-16 reveal-text">
                        <div className="lg:w-1/2">
                            <h2 className="text-sm font-black tracking-[0.3em] text-cyan-500 uppercase mb-4 flex items-center gap-4">
                                <Target className="w-4 h-4" /> The Vision
                            </h2>
                            <h3 className="text-4xl md:text-5xl font-black uppercase mb-8 tracking-tight">
                                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500">Mission</span>
                            </h3>
                            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed font-medium mb-10">
                                We believe that quality education should be accessible to everyone, regardless of their background or location. Our mission is to empower learners worldwide with practical, industry-relevant skills through innovative, affordable, and inclusive educational programs.
                            </p>
                            <ul className="space-y-6 stagger-group">
                                {missionPoints.map((point, i) => (
                                    <li key={i} className="flex items-center gap-4 text-lg font-bold text-foreground">
                                        <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex flex-shrink-0 items-center justify-center border border-cyan-500/20 text-cyan-500">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:w-1/2 flex flex-col justify-center">
                            <div className="p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-purple-500/10 via-cyan-500/5 to-transparent border border-border">
                                <h4 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 tracking-tighter mb-4">500K+</h4>
                                <p className="text-xl font-black uppercase tracking-tight text-foreground/80 mb-6">Students Transformed Worldwide</p>
                                <p className="text-foreground/60 font-medium">And counting. Join our growing community of learners and elite professionals shaping the future of technology.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Granular Stats */}
                <div className="container mx-auto px-6 mb-40 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 stagger-group">
                        {[
                            { number: "500K+", label: "Active Students" },
                            { number: "120+", label: "Countries" },
                            { number: "150+", label: "Expert Programs" },
                            { number: "95%", label: "Success Rate" }
                        ].map((stat, i) => (
                            <div key={i} className="p-8 rounded-[2rem] border border-border bg-card-bg backdrop-blur-glass text-center group hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-premium">
                                <h3 className="text-4xl md:text-5xl font-black text-foreground mb-4 group-hover:text-purple-400 transition-colors duration-500 uppercase tracking-tighter">{stat.number}</h3>
                                <p className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] text-foreground/50">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Core Values */}
                <div className="container mx-auto px-6 mb-40 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20 reveal-text">
                        <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 tracking-tighter">
                            Our Core <span className="text-cyan-500">Values</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-group">
                        {coreValues.map((val, i) => (
                            <div key={i} className="p-8 rounded-[2rem] border border-border bg-card-bg backdrop-blur-glass hover:border-cyan-500/40 transition-all duration-500 group text-center hover:shadow-premium">
                                <div className="w-16 h-16 mx-auto rounded-full bg-background/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-border shadow-sm">
                                    {val.icon}
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-cyan-500 transition-colors">{val.title}</h3>
                                <p className="text-foreground/70 text-sm leading-relaxed font-medium">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="container mx-auto px-6 mb-40 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/3 reveal-text">
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500">Provisent?</span>
                            </h2>
                            <p className="text-lg text-foreground/70 font-medium mb-12">
                                We are committed to delivering the highest quality professional education at scale. Here’s what sets us apart from the rest.
                            </p>
                            <a href="/programs" className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-foreground text-background font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-premium group">
                                View Programs
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 stagger-group w-full">
                            {whyChooseUs.map((feature, i) => (
                                <div key={i} className="flex gap-6 p-6 rounded-2xl border border-border bg-card-bg hover:bg-white/5 dark:hover:bg-white/5 transition-colors">
                                    <div className="flex-shrink-0 w-12 h-12 bg-background border border-border rounded-xl flex items-center justify-center shadow-sm">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold uppercase tracking-tight text-foreground mb-2">{feature.title}</h4>
                                        <p className="text-sm font-medium text-foreground/60">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Journey Section */}
                <div className="container mx-auto px-6 mb-40 relative z-10 journey-container">
                    <div className="text-center max-w-3xl mx-auto mb-20 reveal-text">
                        <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 tracking-tighter">
                            Our <span className="text-cyan-500">Journey</span>
                        </h2>
                        <p className="text-xl text-foreground/60 font-medium">
                            The milestones that mark our relentless pursuit of excellence and global empowerment.
                        </p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-border md:-translate-x-1/2">
                            <div className="timeline-progress w-full bg-gradient-to-b from-cyan-500 to-purple-500 origin-top"></div>
                        </div>

                        {SITE_DATA.journey.map((item, i) => (
                            <div key={i} className={`journey-item relative flex flex-col md:flex-row items-center justify-between mb-16 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="hidden md:block md:w-5/12"></div>

                                <div className="absolute left-[13px] md:left-1/2 w-4 h-4 rounded-full bg-cyan-500 md:-translate-x-1/2 shadow-[0_0_15px_rgba(34,211,238,0.8)] border-2 border-background z-10"></div>

                                <div className={`w-full pl-12 md:pl-0 md:w-5/12 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                                    <div className="p-8 rounded-[2rem] border border-border bg-card-bg backdrop-blur-md group hover:border-cyan-500/40 transition-colors duration-500 hover:shadow-premium">
                                        <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4 inline-block">{item.year}</h3>
                                        <p className="text-lg text-foreground/80 leading-relaxed font-medium">{item.event}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className="container mx-auto px-6 mb-40 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20 reveal-text">
                        <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 tracking-tighter">
                            Leadership <span className="text-cyan-500">Team</span>
                        </h2>
                        <p className="text-xl text-foreground/60 font-medium">
                            Meet the visionaries, educators, and leaders who are paving the way for the future of global education.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {SITE_DATA.instructors.map((instructor, i) => (
                            <div key={i} className="team-card p-6 rounded-[2rem] border border-border bg-card-bg backdrop-blur-md group hover:border-cyan-500/40 transition-all duration-500 hover:shadow-premium hover:-translate-y-2">
                                <div className="aspect-square w-full rounded-[1.5rem] overflow-hidden mb-6 relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <img
                                        src={instructor.image}
                                        alt={instructor.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-4 left-4 z-20 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                        <p className="text-white font-bold text-sm tracking-widest uppercase">Expert</p>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight text-foreground mb-1 group-hover:text-cyan-500 transition-colors">{instructor.name}</h3>
                                <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-bold uppercase tracking-widest text-xs mb-4">{instructor.role}</p>
                                <p className="text-foreground/60 font-medium text-sm leading-relaxed">{instructor.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="container mx-auto px-6">
                    <div className="bg-foreground text-background rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden reveal-text">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20"></div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 tracking-tighter relative z-10">Join The Movement</h2>
                        <p className="text-xl md:text-2xl font-medium opacity-80 mb-12 max-w-2xl mx-auto relative z-10">Be part of the new generation of tech leaders. Your transformation begins here.</p>
                        <a href="/enroll" className="inline-block px-12 py-5 rounded-full bg-background text-foreground font-black uppercase tracking-widest hover:scale-105 transition-transform duration-500 relative z-10 shadow-xl group">
                            Apply Today
                        </a>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default About;
