import React from 'react';
import PageTransition from '../components/animations/PageTransition';
import { SITE_DATA } from '../data/siteContent';

const Contact = () => {
    return (
        <PageTransition>
            <div className="pt-32 pb-24 min-h-screen bg-background text-foreground">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h1 className="text-5xl md:text-7xl font-black uppercase mb-8 tracking-tighter">
                            Get in <span className="text-gradient">Touch</span>
                        </h1>
                        <p className="text-xl text-foreground/70">
                            Have questions about our programs or enrollment process? Drop us a line.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-16 max-w-6xl mx-auto">
                        {/* Contact Info */}
                        <div className="w-full md:w-1/3 space-y-12">
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/50 mb-4">Email Us</h4>
                                <a href={`mailto:${SITE_DATA.contact.email}`} className="text-2xl font-bold hover:text-cyan-500 transition-colors relative inline-block group">
                                    {SITE_DATA.contact.email}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/50 mb-4">Call Us</h4>
                                <p className="text-2xl font-bold">{SITE_DATA.contact.phone}</p>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/50 mb-4">Visit Us</h4>
                                <p className="text-xl leading-relaxed">{SITE_DATA.contact.address}</p>
                            </div>

                            <div className="pt-8 border-t border-border">
                                <a
                                    href={SITE_DATA.contact.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex py-3 px-8 rounded-full border-2 border-green-500 text-green-500 font-bold uppercase hover:bg-green-500 hover:text-background transition-colors text-sm tracking-wider"
                                >
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="w-full md:w-2/3">
                            <form className="space-y-6 bg-black/5 dark:bg-white/5 p-8 md:p-12 rounded-3xl border border-border">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-foreground/70">Full Name</label>
                                        <input type="text" className="w-full bg-transparent border-b-2 border-border py-3 px-0 focus:outline-none focus:border-cyan-500 transition-colors placeholder-foreground/20 text-lg" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-foreground/70">Email Address</label>
                                        <input type="email" className="w-full bg-transparent border-b-2 border-border py-3 px-0 focus:outline-none focus:border-cyan-500 transition-colors placeholder-foreground/20 text-lg" placeholder="john@example.com" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wider text-foreground/70">Subject</label>
                                    <input type="text" className="w-full bg-transparent border-b-2 border-border py-3 px-0 focus:outline-none focus:border-cyan-500 transition-colors placeholder-foreground/20 text-lg" placeholder="How can we help?" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wider text-foreground/70">Message</label>
                                    <textarea rows="4" className="w-full bg-transparent border-b-2 border-border py-3 px-0 focus:outline-none focus:border-cyan-500 transition-colors resize-none placeholder-foreground/20 text-lg" placeholder="Tell us more about your inquiry..."></textarea>
                                </div>

                                <div className="pt-4">
                                    <button type="button" className="px-12 py-4 rounded-full bg-foreground text-background font-black uppercase text-sm tracking-widest hover:scale-[1.02] transition-transform w-full md:w-auto">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Contact;
