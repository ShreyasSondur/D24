"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactSection() {
    return (
        <section className="py-24 bg-[#1a1510] text-[#EDE6D6] relative border-t border-[#2C1E16]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-[#7a6b5d] uppercase tracking-[0.3em] text-[10px] font-bold font-serif"
                    >
                        Get In Touch
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mt-4 mb-6 font-serif uppercase tracking-tight text-white"
                    >
                        CONTACT US
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto px-6">
                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="pt-4"
                    >
                        <h3 className="text-3xl font-serif mb-8 text-white">Visit Our Workshop</h3>
                        <p className="text-gray-400 mb-10 leading-relaxed max-w-sm">
                            We welcome visitors by appointment.
                            Come see where the magic happens.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-5">
                                <div className="p-3 border border-[#3e2723] rounded-sm">
                                    <MapPin className="w-5 h-5 text-[#d35400]" />
                                </div>
                                <div>
                                    <h4 className="font-bold uppercase tracking-widest text-xs mb-2 text-white/50">Location</h4>
                                    <p className="text-white">near pandeshwar railway track</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5">
                                <div className="p-3 border border-[#3e2723] rounded-sm">
                                    <Phone className="w-5 h-5 text-[#d35400]" />
                                </div>
                                <div>
                                    <h4 className="font-bold uppercase tracking-widest text-xs mb-2 text-white/50">Phone</h4>
                                    <p className="text-white">+91 87628 05856</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5">
                                <div className="p-3 border border-[#3e2723] rounded-sm">
                                    <Mail className="w-5 h-5 text-[#d35400]" />
                                </div>
                                <div>
                                    <h4 className="font-bold uppercase tracking-widest text-xs mb-2 text-white/50">Email</h4>
                                    <p className="text-white">info@d24.studio</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <form className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <input type="text" className="w-full bg-white border-0 p-4 text-black placeholder:text-gray-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#d35400]" placeholder="First Name" />
                                </div>
                                <div>
                                    <input type="text" className="w-full bg-white border-0 p-4 text-black placeholder:text-gray-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#d35400]" placeholder="Last Name" />
                                </div>
                            </div>

                            <div>
                                <input type="email" className="w-full bg-white border-0 p-4 text-black placeholder:text-gray-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#d35400]" placeholder="Email Address" />
                            </div>

                            <div>
                                <textarea rows={6} className="w-full bg-white border-0 p-4 text-black placeholder:text-gray-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#d35400]" placeholder="How can we help?" />
                            </div>

                            <button className="w-full py-4 bg-[#d35400] text-white text-sm font-bold uppercase tracking-[0.15em] hover:bg-[#a04000] transition-all shadow-lg mt-2">
                                Send Request
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-24 border-t border-[#2C1E16] pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#7a6b5d]">
                    CLASSIC AND PERFECTION - D24
                </div>
                <div className="w-8 h-8 rounded-full border border-[#7a6b5d] flex items-center justify-center cursor-pointer hover:bg-[#d35400] hover:border-[#d35400] transition-all">
                    <span className="text-[10px] text-white">▲</span>
                </div>
            </div>
        </section>
    );
}
