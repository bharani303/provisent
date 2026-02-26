import React, { useState } from 'react';
import PageTransition from '../components/animations/PageTransition';
import { SITE_DATA } from '../data/siteContent';

const EnrollNow = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <PageTransition>
                <div className="pt-32 pb-24 min-h-screen bg-background text-foreground flex items-center justify-center">
                    <div className="text-center space-y-8 max-w-2xl px-6">
                        <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-green-500">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black uppercase text-green-500 tracking-tighter">Application Received</h2>
                        <p className="text-xl text-foreground/70 leading-relaxed">
                            Thank you for taking the first step towards your dream career! Our team will review your application and contact you within 24 hours.
                        </p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="mt-8 px-10 py-4 rounded-full border-2 border-foreground font-black text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-all">
                            Return Home
                        </button>
                    </div>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="pt-32 pb-24 min-h-screen bg-background text-foreground">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black uppercase mb-6 tracking-tighter">
                            Start Your <span className="text-gradient">Journey</span>
                        </h1>
                        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                            Enroll today and join thousands of students transforming their careers with Provisent.
                        </p>
                    </div>

                    <div className="bg-white/5 dark:bg-black/20 p-8 md:p-12 rounded-3xl border border-border shadow-2xl backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none"></div>

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-black uppercase border-b border-border pb-4">Personal Details</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-foreground/70">First Name</label>
                                        <input required type="text" className="w-full bg-transparent border-b-2 border-border py-2 px-0 focus:outline-none focus:border-cyan-500 transition-colors text-lg" placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-foreground/70">Last Name</label>
                                        <input required type="text" className="w-full bg-transparent border-b-2 border-border py-2 px-0 focus:outline-none focus:border-cyan-500 transition-colors text-lg" placeholder="Doe" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-foreground/70">Email</label>
                                        <input required type="email" className="w-full bg-transparent border-b-2 border-border py-2 px-0 focus:outline-none focus:border-cyan-500 transition-colors text-lg" placeholder="john@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-foreground/70">Phone</label>
                                        <input required type="tel" className="w-full bg-transparent border-b-2 border-border py-2 px-0 focus:outline-none focus:border-cyan-500 transition-colors text-lg" placeholder="+1 (555) 000-0000" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 pt-6">
                                <h3 className="text-2xl font-black uppercase border-b border-border pb-4">Program Selection</h3>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wider text-foreground/70">Select Your Program</label>
                                    <select required className="w-full bg-transparent border-b-2 border-border py-3 px-0 focus:outline-none focus:border-cyan-500 transition-colors text-lg font-medium appearance-none">
                                        <option value="" className="bg-background text-foreground/50" disabled selected>Choose a program...</option>
                                        {SITE_DATA.courses.map(course => (
                                            <option key={course.id} value={course.id} className="bg-background text-foreground py-2">
                                                {course.title} ({course.duration})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wider text-foreground/70">Experience Level</label>
                                    <select className="w-full bg-transparent border-b-2 border-border py-3 px-0 focus:outline-none focus:border-cyan-500 transition-colors text-lg font-medium appearance-none">
                                        <option value="beginner" className="bg-background">Beginner - Complete novice</option>
                                        <option value="intermediate" className="bg-background">Intermediate - Some experience</option>
                                        <option value="advanced" className="bg-background">Advanced - Industry professional</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-8">
                                <button type="submit" className="w-full py-5 rounded-full bg-foreground text-background font-black uppercase text-lg tracking-widest hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all">
                                    Submit Application
                                </button>
                                <p className="text-center text-xs text-foreground/50 mt-4 font-medium uppercase tracking-wider">
                                    By submitting, you agree to our terms and conditions.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default EnrollNow;
