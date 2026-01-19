"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Thomas W.",
        role: "1965 Jaguar E-Type Owner",
        text: "The precision and care they put into every detail is unmatched. They didn't just repair my E-Type; they honored its history.",
        rating: 5,
    },
    {
        name: "Sarah M.",
        role: "Collector",
        text: "Finding a shop that understands the soul of a vintage car is rare. This team is exceptional. My 911 has never run better.",
        rating: 5,
    },
    {
        name: "James T.",
        role: "Aston Martin DB5 Owner",
        text: "Professional, knowledgeable, and passionate. They transformed my barn find into a concours-ready masterpiece.",
        rating: 5,
    },
];

export default function TestimonialsSection() {
    return (
        <section className="py-24 bg-[#211b15] text-[#EDE6D6] relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-[#7a6b5d] uppercase tracking-[0.3em] text-[10px] font-bold font-serif"
                    >
                        Guest Book
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-5xl font-bold mt-4 mb-6 font-serif uppercase tracking-tight text-white/90"
                    >
                        HAPPY COLLECTORS
                    </motion.h2>
                    <div className="w-24 h-1 bg-[#3e2723] mx-auto mt-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-4">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="text-center group"
                        >
                            <div className="flex justify-center gap-1 mb-6 text-[#d35400]">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} className="fill-current w-4 h-4" />
                                ))}
                            </div>
                            <p className="text-lg font-serif italic mb-8 leading-relaxed text-[#EDE6D6] opacity-80 group-hover:opacity-100 transition-opacity">
                                "{t.text}"
                            </p>
                            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-1">
                                {t.name}
                            </h4>
                            <span className="text-[10px] text-[#7a6b5d] uppercase tracking-widest block">
                                {t.role}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
