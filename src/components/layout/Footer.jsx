import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#05080f] py-20 border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center mb-6">
                            <img src="/logo-dark.png" alt="Provisent Logo" className="h-24 md:h-32 object-contain origin-left" />
                        </div>
                        <p className="text-white/50 max-w-sm mb-6 mt-4">
                            Empowering learners worldwide with premium, world-class education and professional development.
                        </p>
                        <div className="flex space-x-4">
                            {['Twitter', 'LinkedIn', 'Instagram', 'Dribbble'].map((social) => (
                                <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                                    <span className="sr-only">{social}</span>
                                    {social[0]}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-4">Studio</h3>
                        <ul className="space-y-3">
                            {['About', 'Careers', 'Manifesto', 'Contact'].map((item) => (
                                <li key={item}><a href="#" className="text-white/50 hover:text-cyan-400 transition-colors text-sm">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-4">Legal</h3>
                        <ul className="space-y-3">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                                <li key={item}><a href="#" className="text-white/50 hover:text-cyan-400 transition-colors text-sm">{item}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
                    <p className="text-white/30 text-sm">© {new Date().getFullYear()} Provisent. All rights reserved.</p>
                    
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
