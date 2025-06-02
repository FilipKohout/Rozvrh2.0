type props = {
    title: string,
    teacher: string,
    room: string,
    group?: string,
    glow?: boolean,
    warning?: boolean
}

export default function Subject({ title, teacher, room, group, glow = false, warning = false }: props) {
    let classes = ""

    if (warning) classes = classes + " warning"
    if (glow) classes = classes + " static-glow current-subject"

    return (
        <div className={"bg-background-alt m-0.5 p-1.5 rounded flex flex-col " + classes}>
            <div className="flex flex-row">
                <p className="text-xs m-0">{group && group}</p>
                <p className="text-xs ml-auto m-0">{room}</p>
            </div>
            <h2 className="text-3xl m-0">{title.slice(0, 3)}</h2>
            <p className="text-center m-0">{teacher}</p>
        </div>
    )
}