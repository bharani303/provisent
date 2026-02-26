import React from 'react';
import Hero from '../components/hero/Hero';
import Services from '../components/services/Services';
import FeatureSection from '../components/features/FeatureSection';
import PageTransition from '../components/animations/PageTransition';
import { SITE_DATA } from '../data/siteContent';
import { useNavigate } from 'react-router-dom';
import { use3DTilt } from '../animations/use3DTilt';

const TestimonialCard = ({ index }) => {
    const { ref, onMouseMove, onMouseLeave } = use3DTilt(15);
    return (
        <div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="p-8 border border-border rounded-[2rem] bg-card-bg backdrop-blur-glass hover:border-cyan-500/30 transition-all duration-500 hover:shadow-premium z-10 hover:z-20 cursor-default"
        >
            <p className="text-xl md:text-2xl font-medium text-foreground/80 mb-8 italic leading-relaxed">
                "Provisent totally transformed my career trajectory. The practical skills and premium mentorship I received here directly landed me my dream technology role."
            </p>
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full p-[2px]">
                    <div className="w-full h-full bg-background rounded-full overflow-hidden flex items-center justify-center font-black">
                        P{index + 1}
                    </div>
                </div>
                <div>
                    <h4 className="font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 uppercase tracking-wide">Professional {index + 1}</h4>
                    <p className="text-sm font-bold tracking-widest text-foreground/50 uppercase">Global Alumni</p>
                </div>
            </div>
        </div>
    );
};

const CTASection = ({ navigate }) => {
    const { ref, onMouseMove, onMouseLeave } = use3DTilt(5);

    return (
        <section className="py-48 bg-background overflow-hidden relative border-t border-border perspective-[1000px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none"></div>
            <div
                ref={ref}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className="container mx-auto px-6 text-center relative z-10 bg-card-bg backdrop-blur-glass border border-border rounded-[3rem] p-16 md:p-24 hover:shadow-[0_0_50px_rgba(34,211,238,0.1)] transition-shadow duration-700"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 pointer-events-none rounded-[3rem]"></div>
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase text-foreground tracking-tighter mb-16 leading-[0.85] relative z-10">
                    Ready to <br /> Transform Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500">Career?</span>
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-8 relative z-10">
                    <button
                        onClick={() => navigate('/enroll')}
                        className="group relative overflow-hidden px-16 py-6 rounded-full bg-foreground text-background font-black text-xl hover:scale-105 transition-transform duration-500 shadow-premium uppercase tracking-widest">
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">Enroll Now</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                    </button>
                </div>
            </div>
        </section>
    );
};

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
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground mb-16 text-center">Global <span className="text-cyan-500">Testimonials</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 perspective-[1000px]">
                            {[0, 1].map((index) => (
                                <TestimonialCard key={index} index={index} />
                            ))}
                        </div>
                    </div>
                </section>

                <CTASection navigate={navigate} />
            </main>
        </PageTransition>
    );
};

export default Home;
