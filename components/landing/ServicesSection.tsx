"use client";

import { motion } from "framer-motion";
import { Droplets, Sparkles, CheckCircle2 } from "lucide-react";

const washServices = [
    "Effortless",
    "Quick",
    "Detailed",
];

const detailingServices = [
    "Paint correction",
    "Ceramic",
    "PPF",
    "Sunfilm",
    "Tyre restoration",
    "Under-chassis wash",
    "Headlight restoration",
    "Chrome restoration",
    "Trim restoration"
];

export default function ServicesSection() {
    return (
        <section className="py-24 bg-[#1a1510] text-[#EDE6D6] relative">
            <div className="container mx-auto px-6 md:px-12">
                <div className="text-left mb-16">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-[#d35400] uppercase tracking-[0.2em] text-xs font-bold font-serif"
                    >
                        Our Expertise
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold mt-4 mb-6 font-serif uppercase tracking-tight text-white"
                    >
                        PREMIUM CARE
                    </motion.h2>
                    <p className="max-w-xl text-gray-400 font-sans leading-relaxed">
                        Precision care for every detail. Choose from our specialized wash tiers or comprehensive detailing packages.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                    {/* Wash Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#2C1E16]/40 border border-[#3e2723] p-10 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Droplets className="w-40 h-40" />
                        </div>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-[#d35400]/10 rounded-sm text-[#d35400]">
                                <Droplets className="w-8 h-8" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-bold text-white font-serif tracking-wide">WASH</h3>
                        </div>

                        <ul className="space-y-4 relative z-10">
                            {washServices.map((service, idx) => (
                                <li key={idx} className="flex items-center gap-4 text-[#EDE6D6]/80 text-lg hover:text-white transition-colors">
                                    <span className="w-1.5 h-1.5 bg-[#d35400] rounded-full" />
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Detailing Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-[#2C1E16]/40 border border-[#3e2723] p-10 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Sparkles className="w-40 h-40" />
                        </div>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-[#C6A664]/10 rounded-sm text-[#C6A664]">
                                <Sparkles className="w-8 h-8" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-bold text-white font-serif tracking-wide">DETAILING</h3>
                        </div>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 relative z-10">
                            {detailingServices.map((service, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-[#EDE6D6]/80 text-sm md:text-base hover:text-white transition-colors">
                                    <CheckCircle2 className="w-4 h-4 text-[#C6A664]/60" />
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
