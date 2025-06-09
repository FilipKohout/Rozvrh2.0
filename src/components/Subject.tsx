import { useState } from "react";
import type { Subject } from "../services/timetableAPI.ts";
import SubjectModal from "./SubjectModal.tsx";
import { AnimatePresence } from "framer-motion";

export default function Subject({ subject, className }: { subject: Subject, className?: string }) {
    const { group, room, teacher, title, warning } = subject;
    const [openModal, setOpenModal] = useState(false);

    let classes = className || "";

    if (warning)
        classes += " bg-negative ";

    return (
        <>
            <AnimatePresence>
                {openModal && (
                    <SubjectModal subject={subject} onClose={() => setOpenModal(false)} />
                )}
            </AnimatePresence>
            <button className={"bg-background-alt m-0.5 p-1.5 rounded flex flex-col " + classes} onClick={() => setOpenModal(true)}>
                <div className="flex flex-row">
                    <p className="text-xs m-0">{group && group}</p>
                    <p className="text-xs ml-auto m-0">{room}</p>
                </div>
                <h2 className="text-2xl m-0 font-bold">{title.slice(0, 3)}</h2>
                <p className="text-center m-0">{teacher}</p>
            </button>
        </>
    );
}