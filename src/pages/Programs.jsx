import React from 'react';
import PageTransition from '../components/animations/PageTransition';
import { SITE_DATA } from '../data/siteContent';
import { useNavigate } from 'react-router-dom';

const Programs = () => {
    const navigate = useNavigate();

    return (
        <PageTransition>
            <div className="pt-32 pb-24 min-h-screen bg-background text-foreground">
                <div className="container mx-auto px-6">
                    <h1 className="text-5xl md:text-7xl font-black uppercase mb-16 tracking-tighter">
                        Our <span className="text-gradient">Programs</span>
                    </h1>

                    <div className="grid grid-cols-1 space-y-12">
                        {SITE_DATA.courses.map((course) => (
                            <div key={course.id} className="group relative overflow-hidden rounded-2xl border border-border bg-black/5 dark:bg-white/5 p-8 transition-colors hover:border-foreground/20">
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="w-full md:w-1/3 aspect-video md:aspect-auto bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 animate-pulse"></div>
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 relative z-10"
                                            onError={(e) => {
                                                e.target.src = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop";
                                            }}
                                        />
                                    </div>
                                    <div className="w-full md:w-2/3 flex flex-col justify-between">
                                        <div>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-foreground text-background rounded-full">
                                                    {course.category}
                                                </span>
                                                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider border border-border text-foreground rounded-full">
                                                    {course.level}
                                                </span>
                                            </div>
                                            <h2 className="text-3xl font-black uppercase tracking-tight mb-4 group-hover:text-cyan-500 transition-colors">
                                                {course.title}
                                            </h2>
                                            <p className="text-lg text-foreground/70 mb-6">
                                                {course.description}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-border">
                                            <div className="flex flex-wrap gap-2">
                                                {course.tags.map(tag => (
                                                    <span key={tag} className="text-sm font-medium text-foreground/50">#{tag}</span>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="text-sm font-bold tracking-wider uppercase text-foreground/50">
                                                    {course.duration}
                                                </div>
                                                <button
                                                    onClick={() => navigate('/enroll')}
                                                    className="px-6 py-2 rounded-full bg-foreground text-background font-bold text-sm hover:scale-105 transition-transform uppercase tracking-wider">
                                                    Enroll
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Programs;
