import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useHeroAnimation = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Light sweep effect
            gsap.to(".light-sweep", {
                x: "150%",
                duration: 2,
                ease: "power2.inOut",
                repeat: -1,
                repeatDelay: 5
            });

            // Top Badge Entrance
            gsap.from(".hero-badge", {
                y: -50,
                opacity: 0,
                scale: 0.5,
                duration: 1.5,
                ease: "elastic.out(1, 0.5)",
                delay: 0.2
            });

            // Text reveal
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

            // Subtitle fade
            gsap.from(".hero-subtitle", {
                opacity: 0,
                y: 30,
                scale: 0.95,
                duration: 1.5,
                delay: 1.2,
                ease: "power3.out"
            });

            // CTA fade
            gsap.from(".hero-cta-item", {
                opacity: 0,
                y: 30,
                scale: 0.9,
                stagger: 0.1,
                duration: 1.2,
                delay: 1.5,
                ease: "back.out(1.5)"
            });

            // Number Counter Animation
            const counters = gsap.utils.toArray(".stat-number");
            counters.forEach(counter => {
                const target = parseFloat(counter.getAttribute('data-target'));
                const suffix = counter.getAttribute('data-suffix') || '';

                // Counter entrance
                gsap.from(counter.parentElement, {
                    opacity: 0,
                    y: 20,
                    duration: 1,
                    delay: 1.8,
                    ease: "power2.out"
                });

                // Animate from 0 to target
                gsap.fromTo(counter,
                    { innerText: 0 },
                    {
                        innerText: target,
                        duration: 2,
                        delay: 2.2,
                        ease: "power2.out",
                        snap: { innerText: 1 }, // ensure whole numbers
                        onUpdate: function () {
                            // Add the suffix back during update (e.g. "K+" or "%")
                            counter.innerHTML = Math.ceil(this.targets()[0].innerText) + suffix;
                        }
                    }
                );
            });

            // Background Elements Fade
            gsap.from(".hero-bg-blur", {
                opacity: 0,
                duration: 3,
                ease: "power2.out"
            });

            // Organic Aurora Blobs Continuous Animation
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

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return heroRef;
};
