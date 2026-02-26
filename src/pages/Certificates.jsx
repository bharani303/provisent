import React from 'react';
import PageTransition from '../components/animations/PageTransition';
import { useNavigate } from 'react-router-dom';

const Certificates = () => {
    const navigate = useNavigate();

    return (
        <PageTransition>
            <div className="pt-32 pb-24 min-h-screen bg-background text-foreground">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl md:text-7xl font-black uppercase mb-8 tracking-tighter">
                            Global <span className="text-gradient">Certifications</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-foreground/70 mb-16 leading-relaxed">
                            Earn credentials that matter. Our certifications are recognized by top tech companies worldwide and prove your mastery of modern skills.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                        {[
                            { title: "Industry Recognized", desc: "Trusted by top tech giants globally." },
                            { title: "Verifiable", desc: "Digital badges and verifiable credential links." },
                            { title: "Lifetime Validity", desc: "Your certification never expires." }
                        ].map((feature, i) => (
                            <div key={i} className="p-8 border border-border rounded-xl">
                                <h3 className="text-xl font-bold uppercase mb-4">{feature.title}</h3>
                                <p className="text-foreground/60">{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="relative p-12 rounded-3xl overflow-hidden border border-border bg-gradient-to-br from-black/10 to-transparent dark:from-white/5">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                            <div className="w-full md:w-1/2">
                                <h2 className="text-4xl font-black uppercase mb-6">Provisent Certified Professional</h2>
                                <ul className="space-y-4 mb-8">
                                    {['Pass final assessment with 80%+', 'Complete all real-world projects', 'Demonstrate practical knowledge'].map((req, i) => (
                                        <li key={i} className="flex items-center gap-3 text-lg">
                                            <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => navigate('/programs')}
                                    className="px-8 py-3 rounded-full bg-foreground text-background font-bold text-sm hover:scale-105 transition-transform uppercase tracking-wider">
                                    View Programs
                                </button>
                            </div>
                            <div className="w-full md:w-1/2 aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-white/10 shadow-2xl flex items-center justify-center p-8">
                                <div className="text-center p-8 border-4 border-double border-foreground/20 w-full h-full flex flex-col items-center justify-center">
                                    <h3 className="text-2xl font-black tracking-widest uppercase mb-2">Certificate of Completion</h3>
                                    <div className="w-16 h-1 mt-4 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Certificates;
