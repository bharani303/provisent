import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#05080f] pt-28 pb-0 border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>

            <div className="container mx-auto px-6 relative z-10 pb-28">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    {/* Brand Section */}
                    <div className="md:col-span-4">
                        <div className="flex items-center mb-6">
                            <img src="/logo-dark.png" alt="Provisent Logo" className="h-20 md:h-24 object-contain origin-left" />
                        </div>
                        <p className="text-white/50 max-w-sm mb-8 text-sm leading-relaxed">
                            Empowering learners worldwide with premium, world-class education and professional development in AI and emerging technologies.
                        </p>

                        {/* Social Media Icons */}
                        <div className="flex items-center gap-4">
                            {/* Instagram */}
                            <a href="https://www.instagram.com/provisent_edutech/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300" aria-label="Instagram">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            {/* LinkedIn */}
                            <a href="https://www.linkedin.com/company/provisent" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300" aria-label="LinkedIn">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            {/* Facebook */}
                            <a href="https://www.facebook.com/profile.php?viewas=100000686899395&id=61588543630941" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300" aria-label="Facebook">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            {/* X / Twitter */}
                            <a href="https://x.com/provisent" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300" aria-label="X (Twitter)">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="md:col-span-2">
                        <h3 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em] text-cyan-400/80">Studio</h3>
                        <ul className="space-y-4">
                            {['About', 'Careers', 'Manifesto', 'Contact'].map((item) => (
                                <li key={item}><a href="#" className="text-white/40 hover:text-white transition-all text-[11px] uppercase tracking-widest">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h3 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em] text-cyan-400/80">Legal</h3>
                        <ul className="space-y-4">
                            {['Privacy Policy', 'Terms', 'Cookies'].map((item) => (
                                <li key={item}><a href="#" className="text-white/40 hover:text-white transition-all text-[11px] uppercase tracking-widest">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Certifications Section */}
                    <div className="md:col-span-4">
                        <h3 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em] text-cyan-400/80">Certified By</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { src: "/AICTE Logo Vector.svg .png", alt: "AICTE" },
                                { src: "/ISO.png", alt: "ISO Certified" },
                                { src: "/MSME.png", alt: "MSME" },
                                { src: "/startupindia.png", alt: "Startup India" }
                            ].map((cert, idx) => (
                                <div key={idx} className="group relative bg-white/5 border border-white/5 rounded-xl p-3 flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                                    <img
                                        src={cert.src}
                                        alt={cert.alt}
                                        className="h-9 md:h-11 w-auto object-contain opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-12 border-t border-white/5">
                    <p className="text-white/20 text-[9px] uppercase tracking-[0.3em]">© {new Date().getFullYear()} PROVISENT. POWERING THE FUTURE OF AI.</p>
                </div>
            </div>

            {/* Huge background text */}
            <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 text-[15vw] font-black text-white/5 whitespace-nowrap pointer-events-none select-none uppercase tracking-tighter">
                Provisent
            </div>
        </footer>
    );
};

export default Footer;
