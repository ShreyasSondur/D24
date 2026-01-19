"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative h-screen w-full overflow-hidden font-sans">
            {/* Background Image Wrapper with Parallax */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: y1 }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0F0C08] z-10" />
                <div className="w-full h-full bg-[#1a1510]">
                    <img
                        src="/images/hero-bg.jpg"
                        alt="Vintage Car Workshop"
                        className="w-full h-full object-cover object-center scale-105"
                    />
                </div>
            </motion.div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-center items-start px-6 md:px-12 lg:px-24">
                <motion.div
                    className="max-w-4xl pt-20"
                    style={{ opacity }}
                >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p className="text-[#d35400] text-sm md:text-base font-bold tracking-[0.2em] mb-4 uppercase font-serif pl-1 drop-shadow-md">
                            D24 STUDIO
                        </p>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-[#EDE6D6] leading-[0.85] tracking-tight mb-8 font-serif overflow-hidden drop-shadow-2xl">
                        <motion.span
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
                            className="block"
                        >
                            CLASSIC
                        </motion.span>
                        <motion.span
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.45 }}
                            className="block text-[#d35400]"
                        >
                            PERFECTION
                        </motion.span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-gray-300 text-sm md:text-lg max-w-xl mb-10 leading-relaxed font-sans border-l-2 border-[#d35400] pl-6"
                    >
                        Where vintage automobiles receive the reverence they deserve.
                        Expert detailing and restoration for the world's most beautiful machines.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <a href="/SelectVehicle">
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "#a04000" }}
                                whileTap={{ scale: 0.95 }}
                                className=" cursor-pointer px-10 py-4 bg-[#d35400] text-white text-sm font-bold tracking-[0.15em] uppercase rounded-sm transition-all shadow-xl hover:shadow-[#d35400]/20"
                            >
                                Book Your Service
                            </motion.button>
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-medium">Scroll</span>
                <motion.div
                    className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/40 to-white/0"
                    animate={{ height: [40, 64, 40], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-full h-1/2 bg-gradient-to-b from-transparent to-[#d35400]" />
                </motion.div>
            </motion.div>
        </section>
    );
}
