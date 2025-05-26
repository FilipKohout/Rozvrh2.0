type props = {
    title: string,
    teacher: string,
    room: string,
    group?: string,
    glow?: boolean,
    warning?: boolean
}

export default function Subject({ title, teacher, room, group, glow = false, warning = false }: props) {
    let additinalClasses = ""

    if (warning) additinalClasses = additinalClasses + " warning"
    if (glow) additinalClasses = additinalClasses + " static-glow current-subject"

    return (
        <div className={"subject" + additinalClasses}>
            <div className="subject-top">
                <p>{group && group}</p>
                <p>{room}</p>
            </div>
            <h2>{title.slice(0, 3)}</h2>
            <p>{teacher}</p>
        </div>
    )
}