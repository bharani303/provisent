import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useFlow } from './FlowContext';

export const useHeroAnimation = () => {
    const heroRef = useRef(null);
    const { isReady } = useFlow();

    useEffect(() => {
        // Only start animations if the entry flow (modal) is complete
        if (!isReady) return;

        let mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Desktop Animations
            gsap.from(".hero-badge", {
                y: -50,
                opacity: 0,
                scale: 0.5,
                duration: 1.5,
                ease: "elastic.out(1, 0.5)",
                delay: 0.2
            });

            gsap.from(".hero-text-fade", {
                y: 120,
                rotationX: -45,
                opacity: 0,
                transformOrigin: "0% 50% -50",
                stagger: 0.15,
                duration: 1.8,
                ease: "power4.out",
                delay: 0.4
            });

            gsap.from(".hero-subtitle", {
                opacity: 0,
                y: 30,
                scale: 0.95,
                duration: 1.5,
                delay: 1.2,
                ease: "power3.out"
            });

            gsap.from(".hero-cta-item", {
                opacity: 0,
                y: 30,
                scale: 0.9,
                stagger: 0.1,
                duration: 1.2,
                delay: 1.5,
                ease: "back.out(1.5)"
            });
        });

        mm.add("(max-width: 767px)", () => {
            // Mobile Animations (Subtle & Clean)
            gsap.from(".hero-badge", {
                y: -20,
                opacity: 0,
                scale: 0.8,
                duration: 1,
                ease: "power3.out",
                delay: 0.2
            });

            gsap.from(".hero-text-fade", {
                y: 40,
                opacity: 0,
                stagger: 0.1,
                duration: 1.2,
                ease: "power4.out",
                delay: 0.4
            });

            gsap.from(".hero-subtitle", {
                opacity: 0,
                y: 15,
                duration: 1.2,
                delay: 1,
                ease: "power3.out"
            });

            gsap.from(".hero-cta-item", {
                opacity: 0,
                scale: 0.9,
                stagger: 0.1,
                duration: 1,
                delay: 1.3,
                ease: "power2.out"
            });
        });

        let ctx = gsap.context(() => {
            // Common Animations (Continuous & Counters)
            gsap.to(".light-sweep", {
                x: "150%",
                duration: 2,
                ease: "power2.inOut",
                repeat: -1,
                repeatDelay: 5
            });

            const counters = gsap.utils.toArray(".stat-number");
            counters.forEach(counter => {
                const target = parseFloat(counter.getAttribute('data-target'));
                const suffix = counter.getAttribute('data-suffix') || '';

                gsap.from(counter.parentElement, {
                    opacity: 0,
                    y: 20,
                    duration: 1,
                    delay: 1.4, // Reduced delay since modal took some time
                    ease: "power2.out"
                });

                gsap.fromTo(counter,
                    { innerText: 0 },
                    {
                        innerText: target,
                        duration: 2,
                        delay: 1.8,
                        ease: "power2.out",
                        snap: { innerText: 1 },
                        onUpdate: function () {
                            counter.innerHTML = Math.ceil(this.targets()[0].innerText) + suffix;
                        }
                    }
                );
            });

            gsap.from(".hero-bg-blur", {
                opacity: 0,
                duration: 3,
                ease: "power2.out"
            });

            gsap.to(".organic-blob", {
                x: "random(-100, 100)",
                y: "random(-100, 100)",
                scale: "random(0.8, 1.2)",
                rotation: "random(-45, 45)",
                duration: "random(8, 12)",
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                repeatRefresh: true
            });

            gsap.to(".organic-blob-reverse", {
                x: "random(-100, 100)",
                y: "random(-100, 100)",
                scale: "random(0.8, 1.2)",
                rotation: "random(-45, 45)",
                duration: "random(8, 12)",
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                repeatRefresh: true,
                delay: -5
            });

            // Falling Fire Stars Animation
            const fireStars = gsap.utils.toArray(".falling-fire-star");
            fireStars.forEach((star, i) => {
                gsap.fromTo(star,
                    {
                        x: 0,
                        y: 0,
                        opacity: 0,
                        scale: 0.5
                    },
                    {
                        x: -window.innerWidth,
                        y: window.innerHeight * 0.8,
                        opacity: 1,
                        scale: i === 1 ? 4 : 3,
                        duration: 1.8,
                        delay: 2.5 + (i * 0.6),
                        ease: "power2.in",
                        onComplete: () => {
                            gsap.to(star, { opacity: 0, duration: 0.3 });
                        }
                    }
                );
            });

        }, heroRef);

        return () => {
            ctx.revert();
            mm.revert();
        };
    }, [isReady]);

    return heroRef;
};
