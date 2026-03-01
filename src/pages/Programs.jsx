import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_DATA } from '../data/siteContent';
import { useNavigate } from 'react-router-dom';
import { Star, Users, Clock, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import PageTransition from '../components/animations/PageTransition';
import gsap from 'gsap';
import { use3DTilt } from '../animations/use3DTilt';

const CATEGORIES = [
    "Programming",
    "Business",
    "Design",
    "Medical",
    "Mechanics",
    "Freelancing"
];

const CourseCard = ({ course, navigate }) => {
    const { ref, onMouseMove, onMouseLeave } = use3DTilt(10); // 10 degree tilt intensity

    return (
        <div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="course-card group relative flex flex-col bg-card-bg backdrop-blur-glass rounded-[2rem] border border-border hover:border-cyan-500/40 transition-all duration-700 hover:shadow-premium shadow-lg z-10 hover:z-20"
        >
            {/* Top Accent Bar - Multi-color Gradient */}
            <div className="h-1.5 w-full bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500 rounded-t-[2rem]"></div>

            {/* Image Container */}
            <div className="relative h-48 md:h-64 overflow-hidden rounded-t-[2rem]">
                <div className="absolute inset-0 bg-neutral-800/20 animate-pulse"></div>
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out"
                    onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>

                {/* Category Floating Badge */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
                    <span className="px-3 py-1 md:px-4 md:py-1.5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] bg-background/80 backdrop-blur-md rounded-full border border-border text-foreground">
                        {course.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 flex flex-col flex-grow bg-card-bg rounded-b-[2rem]">
                <div className="flex justify-between items-start mb-4 md:mb-6">
                    <h3 className="text-xl md:text-2xl font-black leading-[1.1] uppercase tracking-tight group-hover:text-cyan-500 transition-colors duration-500">
                        {course.title}
                    </h3>
                    <div className="flex items-center bg-cyan-500/10 px-2 py-1 md:px-3 md:py-1.5 rounded-xl text-cyan-500 border border-cyan-500/10 shadow-sm shrink-0">
                        <Star className="w-3.5 h-3.5 fill-current mr-1 md:mr-1.5" />
                        <span className="text-xs md:text-sm font-black">{course.rating}</span>
                    </div>
                </div>

                <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                    <div className="flex items-center text-foreground/60 text-xs md:text-sm font-medium">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-cyan-500/10 flex items-center justify-center mr-2 md:mr-3 border border-cyan-500/10">
                            <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-cyan-500" />
                        </div>
                        <span>{course.students} Global Learners</span>
                    </div>
                    <div className="flex items-center text-foreground/60 text-xs md:text-sm font-medium">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-purple-500/10 flex items-center justify-center mr-2 md:mr-3 border border-purple-500/10">
                            <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-500" />
                        </div>
                        <span>{course.duration} Intensive</span>
                    </div>
                    <div className="flex items-center text-foreground/60 text-xs md:text-sm font-medium">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-pink-500/10 flex items-center justify-center mr-2 md:mr-3 border border-pink-500/10">
                            <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-pink-500" />
                        </div>
                        <span>Professional Certification</span>
                    </div>
                </div>

                <div className="mt-auto pt-6 md:pt-8 border-t border-border flex items-center justify-between gap-4 md:gap-6">
                    <div>
                        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black text-foreground/40 mb-1">Total Program Fee</p>
                        <p className="text-3xl md:text-4xl font-black text-foreground tracking-tighter">
                            {course.price}
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/enroll')}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-foreground text-background flex items-center justify-center group-hover:bg-cyan-500 group-hover:scale-105 transition-all duration-500 shadow-premium shrink-0"
                    >
                        <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:-rotate-45 transition-transform duration-500" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const Programs = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
    const gridRef = useRef(null);

    const filteredCourses = useMemo(() => {
        return SITE_DATA.courses.filter(course => course.category === activeCategory);
    }, [activeCategory]);

    // GSAP Animation for cards on category change
    useEffect(() => {
        const cards = gridRef.current?.querySelectorAll('.course-card');
        if (cards && cards.length > 0) {
            gsap.fromTo(cards,
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out",
                    clearProps: "all"
                }
            );
        }
    }, [activeCategory, filteredCourses]);

    return (
        <PageTransition>
            <div className="pt-24 pb-32 min-h-screen bg-background text-foreground transition-colors duration-500">
                {/* Immersive background effects */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-30 z-0 overflow-hidden">
                    <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full"></div>
                </div>

                {/* Sticky Navigation Menu */}
                <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-xl border-b border-border py-2 md:py-4 mb-8 md:mb-16 shadow-premium transition-all duration-300">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex justify-start md:justify-center items-center overflow-x-auto no-scrollbar">
                            <div className="flex p-1 bg-card-bg backdrop-blur-glass rounded-full border border-border min-w-max">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`relative px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-sm font-black uppercase tracking-widest rounded-full transition-all duration-500 whitespace-nowrap ${activeCategory === cat
                                            ? "text-white dark:text-black"
                                            : "text-foreground/50 hover:text-foreground"
                                            }`}
                                    >
                                        {activeCategory === cat && (
                                            <motion.div
                                                layoutId="activeTabUnder"
                                                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500 rounded-full"
                                                transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10">{cat}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    {/* Header */}
                    <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto px-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] md:text-xs font-bold text-cyan-500 uppercase tracking-[0.2em] mb-6 md:mb-8">
                            <Sparkles size={14} />
                            <span>Professional Certifications</span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-none">
                            Our <span className="text-gradient">Programs</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-foreground/60 max-w-2xl mx-auto font-medium">
                            Industry-leading expertise designed to launch your global career in high-demand fields.
                        </p>
                    </div>

                    {/* GSAP Managed Grid */}
                    <div
                        ref={gridRef}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
                    >
                        {filteredCourses.map((course) => (
                            <CourseCard key={course.id} course={course} navigate={navigate} />
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .text-gradient {
                    background-clip: text;
                    -webkit-background-clip: text;
                    color: transparent;
                    background-image: linear-gradient(to right, #8b5cf6, #06b6d4, #db2777);
                }
            `}</style>
        </PageTransition>
    );
};

export default Programs;
