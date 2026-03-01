import React from 'react';
import Hero from '../components/hero/Hero';
import Services from '../components/services/Services';
import WhyChooseUs from '../components/features/WhyChooseUs';
import PageTransition from '../components/animations/PageTransition';
import { SITE_DATA } from '../data/siteContent';
import { useNavigate } from 'react-router-dom';
import { use3DTilt } from '../animations/use3DTilt';
import FacultySection from '../components/team/FacultySection';

import Testimonials from '../components/testimonials/Testimonials';
import FAQ from '../components/features/FAQ';

const CTASection = ({ navigate }) => {
    const { ref, onMouseMove, onMouseLeave } = use3DTilt(5);

    return (
        <section className="py-24 md:py-48 bg-background overflow-hidden relative border-t border-border perspective-[1000px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] aspect-square bg-cyan-900/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none"></div>
            <div
                ref={ref}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className="container mx-auto px-6 text-center relative z-10 bg-card-bg backdrop-blur-glass border border-border rounded-[2rem] md:rounded-[3rem] p-10 md:p-24 hover:shadow-[0_0_50px_rgba(34,211,238,0.1)] transition-shadow duration-700"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 pointer-events-none rounded-[2rem] md:rounded-[3rem]"></div>
                <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase text-foreground tracking-tighter mb-10 md:mb-16 leading-[0.9] md:leading-[0.85] relative z-10">
                    Ready to <br className="hidden sm:block" /> Transform Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500">Career?</span>
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 relative z-10">
                    <button
                        onClick={() => navigate('/enroll')}
                        className="group relative overflow-hidden px-8 md:px-16 py-4 md:py-6 rounded-full bg-foreground text-background font-black text-lg md:text-xl hover:scale-105 transition-transform duration-500 shadow-premium uppercase tracking-widest">
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
                <WhyChooseUs />
                <Services />
                <FacultySection />
                <Testimonials />
                <FAQ />
                <CTASection navigate={navigate} />
            </main>
        </PageTransition>
    );
};

export default Home;
