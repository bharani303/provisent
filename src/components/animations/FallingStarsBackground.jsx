import React from 'react';

const FallingStarsBackground = () => {
    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-[5] overflow-hidden">
            <style>
                {`
                    @keyframes meteor {
                        0% {
                            transform: translate(0, 0) rotate(-45deg);
                            opacity: 0;
                        }
                        5% {
                            opacity: 1;
                        }
                        35% {
                            opacity: 1;
                        }
                        40% {
                            transform: translate(-2000px, 2000px) rotate(-45deg);
                            opacity: 0;
                        }
                        100% {
                            transform: translate(-2000px, 2000px) rotate(-45deg);
                            opacity: 0;
                        }
                    }

                    .meteor {
                        position: absolute;
                        width: 7px;
                        height: 7px;
                        background: #fff;
                        border-radius: 50%;
                        box-shadow: 
                            0 0 25px #fff,
                            0 0 50px #fff,
                            0 0 100px rgba(255, 255, 255, 0.9);
                        z-index: 1;
                        opacity: 0;
                        animation: meteor 18s ease-in-out infinite;
                    }

                    .meteor::after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 350px;
                        height: 4px;
                        background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0.6), transparent);
                        transform: translate(0, -50%) rotate(0deg);
                        transform-origin: left center;
                        border-radius: 100% 0 0 100%;
                        filter: blur(1px);
                    }

                    /* First Group: 2 Stars */
                    .meteor-1 { top: -100px; right: 10%; animation-delay: 0s; }
                    .meteor-2 { top: 0%; right: -100px; animation-delay: 0.8s; }

                    /* Second Group: 3 Stars (starts after ~8s gap) */
                    .meteor-3 { top: -50px; right: 20%; animation-delay: 8s; }
                    .meteor-4 { top: 10%; right: -50px; animation-delay: 8.6s; }
                    .meteor-5 { top: 20%; right: -150px; animation-delay: 9.2s; }

                    /* Mobile Optimizations - 60fps Target */
                    @media (max-width: 768px) {
                        .meteor {
                            box-shadow: 0 0 10px #fff; /* Reduce expensive blur shadows */
                            animation: meteor 25s ease-in-out infinite; /* Slow down */
                        }
                        .meteor::after { width: 100px; filter: none; }
                        /* Hide excess stars on mobile to save GPU layout */
                        .meteor-3, .meteor-4, .meteor-5 { display: none; }
                    }
                `}
            </style>
            <div className="meteor meteor-1"></div>
            <div className="meteor meteor-2"></div>
            <div className="meteor meteor-3"></div>
            <div className="meteor meteor-4"></div>
            <div className="meteor meteor-5"></div>
        </div>
    );
};

export default FallingStarsBackground;
