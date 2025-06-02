type props = {
    title: string,
    teacher: string,
    room: string,
    group?: string,
    glow?: boolean,
    warning?: boolean
}

export default function Subject({ title, teacher, room, group, glow = false, warning = false }: props) {
    let classes = "bg-bg-alt m-0.5 p-1 rounded-lg"

    if (warning) classes = classes + " warning"
    if (glow) classes = classes + " static-glow current-subject"

    return (
        <div className={classes}>
            <div className="subject-top">
                <p>{group && group}</p>
                <p>{room}</p>
            </div>
            <h2>{title.slice(0, 3)}</h2>
            <p className="text-center m-0">{teacher}</p>
        </div>
    )
}