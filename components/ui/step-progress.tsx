"use client"

import { motion } from "framer-motion"

interface StepProgressProps {
    currentStep: number
    totalSteps?: number
    title: string
}

export default function StepProgress({ currentStep, totalSteps = 4, title }: StepProgressProps) {
    const progressPercentage = (currentStep / totalSteps) * 100

    return (
        <div className="w-full px-6 pt-6 pb-2">
            <div className="mx-auto max-w-7xl">
                <div className="mb-3 flex items-center justify-between text-xs font-bold tracking-widest uppercase">
                    <span className="text-[#c44522]">
                        Step {currentStep} of {totalSteps}
                    </span>
                    <span className="text-gray-400">{title}</span>
                </div>

                {/* Progress Track */}
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    {/* Animated Bar */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="h-full rounded-full bg-[#c44522] shadow-[0_0_10px_rgba(196,69,34,0.4)]"
                    />
                </div>
            </div>
        </div>
    )
}
