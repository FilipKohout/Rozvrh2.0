import useTimer from "../hooks/useTimer.ts";
import Subject from "./Subject.tsx";

export default function Timer() {
    const { isLoading, isError, time, timerPrefix, currentClass } = useTimer();

    const formatSeconds = (s: number) => [Math.floor(s / 60 / 60), Math.floor(s / 60 % 60), Math.floor(s % 60)].join(':').replace(/\b(\d)\b/g, '0$1');

    return (
        <>
            {isLoading && <h1 className="counter-header">Loading</h1>}
            {isError && <h1 className="counter-header">Error</h1>}
            {!isLoading && !isError && time && currentClass !== null &&
                <>
                    <h2 className="counter-pretext">{timerPrefix}</h2>
                    <h1 className="counter-header glow">{formatSeconds(time.current).slice(3)}</h1>
                    <div className="counter-subjects">
                        {currentClass.subjects.map((subject, index) => {
                            const { title, teacher, room, group, warning } = subject

                            return <Subject
                                key={index}
                                title={title}
                                teacher={teacher}
                                room={room}
                                group={group}
                                warning={warning}
                            />
                        })}
                    </div>
                    {time.end > 0 &&
                        <h2 className="small-counter-header">
                            You can go home in {" "}
                            <span className='glow'>
                                {formatSeconds(time.end)}
                            </span>
                        </h2>
                    }
                </>
            }
            {!isLoading && !isError && time === null &&
                <>
                    <h1 className="counter-message">{timerPrefix}</h1>
                </>
            }
        </>
    );
}