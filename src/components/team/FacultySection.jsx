import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_DATA } from '../../data/siteContent';
import { GraduationCap, Award, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const InstructorCard = ({ instructor }) => {
    return (
        <div className="group h-[400px] md:h-[500px] w-full [perspective:1500px]">
            <div className="relative h-full w-full rounded-[2rem] md:rounded-[3rem] transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-premium">

                {/* Front Side */}
                <div className="absolute inset-0 h-full w-full rounded-[2rem] md:rounded-[3rem] [backface-visibility:hidden] overflow-hidden bg-card-bg border border-border">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-50"></div>

                    <div className="relative h-full flex flex-col items-center justify-center p-6 md:p-8 text-center">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 p-[3px] mb-6 md:mb-8 shadow-2xl">
                            <div className="w-full h-full bg-background rounded-full overflow-hidden flex items-center justify-center text-3xl md:text-4xl font-black text-white uppercase">
                                {instructor.initial}
                            </div>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight mb-1 md:mb-2">
                            {instructor.name}
                        </h3>
                        <p className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-[10px] md:text-sm mb-4 md:mb-6">
                            {instructor.role}
                        </p>

                        <div className="mt-auto flex items-center gap-2 text-foreground/40 font-bold uppercase tracking-widest text-[9px] md:text-xs group-hover:text-cyan-400 transition-colors">
                            Hover to see expertise <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Decorative element */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl"></div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 h-full w-full rounded-[2rem] md:rounded-[3rem] bg-foreground p-8 md:p-12 text-background [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-start justify-center text-left">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <GraduationCap className="w-24 h-24 text-background" />
                    </div>

                    <h3 className="text-xl md:text-2xl font-black uppercase mb-1 md:mb-2 text-background">
                        {instructor.name}
                    </h3>
                    <p className="text-cyan-400 font-black uppercase tracking-widest text-[10px] md:text-xs mb-4 md:mb-8">
                        {instructor.role}
                    </p>

                    <p className="text-sm md:text-lg font-medium text-background/80 leading-relaxed mb-6 md:mb-10">
                        {instructor.bio}
                    </p>

                    <div>
                        <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-background/40 mb-3 md:mb-4 flex items-center gap-2">
                            <Award className="w-4 h-4" /> Expertise
                        </h4>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                            {instructor.expertise?.map((exp, i) => (
                                <span key={i} className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-background/20 bg-background/10 text-background font-bold text-[9px] md:text-xs uppercase tracking-tight">
                                    {exp}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FacultySection = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".faculty-header > *", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".faculty-header",
                    start: "top 85%"
                }
            });

            gsap.from(".faculty-card", {
                y: 100,
                opacity: 0,
                scale: 0.9,
                duration: 1,
                stagger: 0.1,
                ease: "back.out(1.2)",
                scrollTrigger: {
                    trigger: ".faculty-grid",
                    start: "top 80%"
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Extracting specifically requested instructors (ignoring the CEO for this specific grid if needed, or including all)
    // The user mentioned JK, SM, AR, LK
    const targetInstructors = SITE_DATA.instructors.filter(ins =>
        ["JK", "SM", "AR", "LK"].includes(ins.initial)
    );

    return (
        <section ref={containerRef} className="py-24 md:py-48 bg-background relative overflow-hidden">
            <div className="absolute top-1/2 right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-500/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="faculty-header text-center mb-16 md:mb-24 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs md:text-sm font-black uppercase tracking-[0.2em] mb-6">
                        <GraduationCap className="w-4 h-4" />
                        Expert Faculty
                    </div>
                    <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-foreground uppercase tracking-tighter leading-[0.85] mb-6 md:mb-8">
                        Meet Our <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500">Instructors</span>
                    </h2>
                    <p className="text-lg md:text-xl text-foreground/50 font-medium leading-relaxed px-4">
                        Learn from industry leaders passionate about education.
                    </p>
                </div>

                <div className="faculty-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {targetInstructors.map((instructor, i) => (
                        <div key={i} className="faculty-card">
                            <InstructorCard instructor={instructor} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FacultySection;
