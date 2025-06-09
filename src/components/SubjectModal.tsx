import type { Subject } from "../services/timetableAPI.ts";
import { motion } from "framer-motion";

export default function SubjectModal({ subject, onClose }: { subject: Subject; onClose: () => void; }) {
    return (
        <motion.div
            style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(0,0,0,0.5)" }}
            className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="relative m-auto rounded bg-background p-4 shadow-xl max-w-md"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className="text-3xl font-bold m-0 ">{subject.details.subjectText}</h1>
                <hr />
                <h2 className="text-xl m-0">{subject.details.teacher}</h2>
                <div className="flex gap-2 justify-center">
                    <h3 className="text-sm">Room {subject.room}</h3>
                    {subject.group &&
                        <h3 className="text-sm">Group {subject.group}</h3>
                    }
                </div>
                {subject.details.changeInfo !== "" && (
                    <h2 className="mt-2 text-red-500">{subject.details.changeInfo}</h2>
                )}

                <button className="mb-0 bg-negative hover:bg-red-500" onClick={onClose}>
                    Close
                </button>
            </motion.div>
        </motion.div>
    );
}
