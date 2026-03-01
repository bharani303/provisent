import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SITE_DATA } from '../data/siteContent';
import { Sparkles } from 'lucide-react';
import PageTransition from '../components/animations/PageTransition';
import gsap from 'gsap';
import CourseCard from '../components/courses/CourseCard';

const CATEGORIES = ["All", ...new Set(SITE_DATA.courses.map(c => c.category))];

const CourseList = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const gridRef = useRef(null);

    const filteredCourses = useMemo(() => {
        let list = activeCategory === "All"
            ? SITE_DATA.courses
            : SITE_DATA.courses.filter(course => course.category === activeCategory);
        // Show 6-8 course cards (limit to 8)
        return list.slice(0, 8);
    }, [activeCategory]);

    // GSAP Animation for cards on category change
    useEffect(() => {
        const cards = gridRef.current?.children;
        if (cards && cards.length > 0) {
            gsap.fromTo(cards,
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power3.out",
                    clearProps: "all"
                }
            );
        }
    }, [activeCategory, filteredCourses]);

    return (
        <PageTransition>
            <div className="pt-24 pb-32 min-h-screen bg-background text-foreground transition-colors duration-500 relative">
                {/* Immersive background effects */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-30 z-0 overflow-hidden">
                    <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full"></div>
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    {/* Header */}
                    <div className="text-center mb-16 max-w-4xl mx-auto pt-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] md:text-xs font-bold text-cyan-500 uppercase tracking-[0.2em] mb-6">
                            <Sparkles size={14} />
                            <span>Professional Training</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
                            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500">Courses</span>
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto font-medium">
                            Industry-leading expertise designed to launch your global career in high-demand fields.
                        </p>
                    </div>

                    {/* Category Filter Navigation */}
                    <div className="flex justify-center mb-16 relative z-20">
                        <div className="flex p-1.5 bg-card-bg backdrop-blur-md rounded-full border border-border overflow-x-auto no-scrollbar max-w-full">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`relative px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-sm font-black uppercase tracking-widest rounded-full transition-all duration-300 whitespace-nowrap ${activeCategory === cat
                                            ? "text-white"
                                            : "text-foreground/50 hover:text-foreground"
                                        }`}
                                >
                                    {activeCategory === cat && (
                                        <motion.div
                                            layoutId="courseTab"
                                            className="absolute inset-0 bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500 rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                        />
                                    )}
                                    <span className="relative z-10">{cat}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Responsive Grid Layout */}
                    <div
                        ref={gridRef}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
                    >
                        {filteredCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>

                    {filteredCourses.length === 0 && (
                        <div className="text-center py-24">
                            <h3 className="text-2xl font-bold text-foreground/50">No courses found in this category.</h3>
                        </div>
                    )}
                </div>
            </div>
        </PageTransition>
    );
};

export default CourseList;
