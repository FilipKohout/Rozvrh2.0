import { motion, AnimatePresence } from "framer-motion";

export default function Digit({ value }: { value: number }) {
    return (
        <div className="relative w-[0.7em] h-[1em] overflow-hidden font-[Arial]">
            <AnimatePresence initial mode="wait">
                <motion.span
                    key={value}
                    initial={{ y: "-100%", opacity: 0}}
                    animate={{ y: "0%", opacity: 1}}
                    exit={{ y: "100%", opacity: 0}}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 top-0 w-full text-center"
                >
                    {value}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}
