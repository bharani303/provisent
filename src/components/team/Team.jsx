import React from 'react';
import { SITE_DATA } from '../../data/siteContent';

const Team = () => {
    return (
        <section className="py-32 bg-[#0B0F1A] border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div>
                        <h2 className="text-sm font-bold tracking-[0.3em] text-cyan-400 uppercase mb-4">The Minds Behind</h2>
                        <div className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                            Expert <span className="text-gradient">Mentors</span>
                        </div>
                    </div>
                    <p className="text-white/40 max-w-md text-lg font-light">
                        Learn from industry professionals who have built systems at scale for the world's leading tech companies.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SITE_DATA.instructors.map((member, i) => (
                        <div key={i} className="glass-panel p-8 rounded-[2rem] group hover:bg-white/10 transition-colors duration-500">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 mb-8 flex items-center justify-center border border-white/10 group-hover:border-cyan-400/50 transition-colors">
                                <span className="text-3xl font-black text-white/20 group-hover:text-cyan-400 transition-colors">
                                    {member.name.charAt(0)}
                                </span>
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{member.name}</h3>
                            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">{member.role}</p>
                            <p className="text-white/40 text-sm leading-relaxed">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
