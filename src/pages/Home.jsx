import React from 'react';
import Hero from '../components/hero/Hero';
import Services from '../components/services/Services';
import FeatureSection from '../components/features/FeatureSection';
import PageTransition from '../components/animations/PageTransition';
import { SITE_DATA } from '../data/siteContent';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <PageTransition>
            <main>
                <Hero />
                <FeatureSection />
                <Services />
                <section className="py-24 bg-background">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-black uppercase text-foreground mb-16 text-center">Testimonials</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[1, 2].map((_, i) => (
                                <div key={i} className="p-8 border border-border rounded-xl bg-background hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                    <p className="text-lg text-foreground/80 mb-6 italic">
                                        "Provisent totally transformed my career. The skills I learned here got me my dream job."
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                                        <div>
                                            <h4 className="font-bold text-foreground">Student {i + 1}</h4>
                                            <p className="text-sm text-foreground/50">Alumni</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Home CTA */}
                <section className="py-48 bg-background overflow-hidden relative border-t border-border">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none"></div>
                    <div className="container mx-auto px-6 text-center relative z-10">
                        <h2 className="text-6xl md:text-9xl font-black uppercase text-foreground tracking-tighter mb-16 leading-[0.85]">
                            Ready to <br /> Transform Your <br /> <span className="text-gradient">Career?</span>
                        </h2>
                        <div className="flex flex-wrap items-center justify-center gap-8">
                            <button
                                onClick={() => navigate('/enroll')}
                                className="px-16 py-6 rounded-full bg-foreground text-background font-black text-xl hover:scale-105 transition-transform duration-500 shadow-[0_0_50px_rgba(255,255,255,0.1)] dark:shadow-[0_0_50px_rgba(255,255,255,0.2)] uppercase tracking-tight">
                                Enroll Now
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </PageTransition>
    );
};

export default Home;
