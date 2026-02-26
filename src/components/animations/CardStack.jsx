import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CARDS = [
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=600&auto=format&fit=crop",
];

const CardStack = () => {
    const [cards, setCards] = useState(CARDS);

    // Auto cycle cards every 3 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCards((prev) => {
                const newArray = [...prev];
                const last = newArray.pop();
                newArray.unshift(last);
                return newArray;
            });
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const handleDragEnd = (event, info) => {
        // If dragged far enough to the right or left, cycle the card
        if (Math.abs(info.offset.x) > 100) {
            setCards((prev) => {
                const newArray = [...prev];
                const last = newArray.pop();
                newArray.unshift(last);
                return newArray;
            });
        }
    };

    return (
        <div className="relative mx-auto w-[300px] h-[200px] md:w-[400px] md:h-[260px] perspective-[1200px] flex items-center justify-center">
            <AnimatePresence>
                {cards.map((card, index) => {
                    const isTop = index === cards.length - 1;
                    const offset = cards.length - 1 - index; // 0 for top card, 1 for second, etc.

                    return (
                        <motion.div
                            key={card}
                            layout
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{
                                opacity: 1,
                                scale: 1 - offset * 0.05,
                                y: offset * 20,
                                rotateZ: isTop ? 0 : -offset * 4,
                                zIndex: cards.length - offset,
                            }}
                            exit={{ opacity: 0, scale: 0.8, x: 200, rotateZ: 20 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                mass: 1,
                            }}
                            drag={isTop ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={isTop ? handleDragEnd : undefined}
                            className={`absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden border border-border bg-card-bg shadow-premium ${isTop ? "cursor-grab active:cursor-grabbing" : "cursor-default"
                                }`}
                        >
                            <img
                                src={card}
                                alt="Gallery"
                                className="w-full h-full object-cover pointer-events-none"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default CardStack;
