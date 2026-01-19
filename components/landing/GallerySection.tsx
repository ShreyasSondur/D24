"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const cars = [
    {
        name: "1967 Mustang Shelby GT500",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2670&auto=format&fit=crop",
        year: "1967",
    },
    {
        name: "Porsche 911 Classic",
        image: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2670&auto=format&fit=crop",
        year: "1972",
    },
    {
        name: "Jaguar E-Type",
        image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=2531&auto=format&fit=crop",
        year: "1965",
    },
    {
        name: "Mercedes Sl 300",
        image: "https://images.unsplash.com/photo-1549520018-569d6c2919d3?q=80&w=2670&auto=format&fit=crop",
        year: "1954",
    },
];

export default function GallerySection() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-rustic-black">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                <div className="absolute top-10 left-10 z-10">
                    <h2 className="text-rustic-gold text-4xl md:text-6xl font-bold uppercase opacity-20">
                        Masterpieces
                    </h2>
                </div>

                <motion.div style={{ x }} className="flex gap-10 pl-[5vw]">
                    {cars.map((car, index) => (
                        <div
                            key={index}
                            className="relative w-[80vw] md:w-[60vw] h-[70vh] flex-shrink-0 group overflow-hidden border border-white/10"
                        >
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                            <img
                                src={car.image}
                                alt={car.name}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 p-8 z-20 bg-gradient-to-t from-black to-transparent w-full">
                                <span className="text-rustic-orange font-mono text-xl block mb-2">{car.year}</span>
                                <h3 className="text-white text-4xl font-serif">{car.name}</h3>
                            </div>
                        </div>
                    ))}
                    {/* Padding for end of scroll */}
                    <div className="w-[10vw]" />
                </motion.div>
            </div>
        </section>
    );
}
