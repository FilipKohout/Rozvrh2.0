import useTimer from "../hooks/useTimer.ts";
import Subject from "./Subject.tsx";
import Digit from "./Digit";

export default function Timer() {
    const urlParams = new URLSearchParams(window.location.search);
    const counterMode = urlParams.get("counter") || "false";

    const { isLoading, isError, time, timerPrefix, currentClass } = useTimer();

    const formatDigitsMMSS = (s: number) => {
        const minutes = Math.floor((s % 3600) / 60);
        const seconds = Math.floor(s % 60);
        return [minutes, seconds].map(unit => unit.toString().padStart(2, '0'));
    };

    const formatDigitsHHMMSS = (s: number) => {
        const hours = Math.floor(s / 3600);
        const minutes = Math.floor((s % 3600) / 60);
        const seconds = Math.floor(s % 60);
        return [hours, minutes, seconds].map(unit => unit.toString().padStart(2, '0'));
    };

    const fullscreen = () => {
        console.log(location.origin + location.pathname + "?counter=true");
        window.open(location.origin + location.pathname + "?counter=true", "_blank", "fullscreen=yes,menubar=no,toolbar=no,location=no,status=no,scrollbars=no,resizable=no,width=800,height=600");
    };

    return (
        <div className={counterMode === "true" ? "h-screen flex flex-col justify-center" : ""}>
            {isLoading && <h1>Loading</h1>}
            {isError && <h1>Error</h1>}
            {!isLoading && !isError && time && currentClass !== null &&
                <>
                    <h2 className="m-0">
                        {timerPrefix}
                        {counterMode === "false" &&
                            <button className="ml-2 h-10 w-10 p-0" onClick={fullscreen}>
                                <span className="material-symbols-outlined">open_in_full</span>
                            </button>
                        }
                    </h2>
                    <h1 className="text-9xl -mt-1 mb-4 font-black flex justify-center">
                        {formatDigitsMMSS(time.current).map((unit, i) => (
                            <span key={i} className="flex">
                                {unit.split("").map((char, j) => (
                                    <Digit key={j} value={parseInt(char)}/>
                                ))}
                                {i === 0 && <span className="mx-[0.1em] leading-[0.75]">:</span>}
                            </span>
                        ))}
                    </h1>

                    <div className="flex flex-row justify-center gap-1">
                        {currentClass.subjects.map((subject, index) =>
                            <div className="subject-holder" key={index}>
                                <Subject subject={subject} className="w-full"/>
                            </div>
                        )}
                    </div>

                    {time.end > 0 &&
                        <div>
                            <h2 className="mt-2 mb-0.5">You can go home in</h2>
                            <div className="flex flex-row justify-center text-5xl font-bold mb-4 text-white">
                                {formatDigitsHHMMSS(time.end).map((unit, i) => (
                                    <div key={i} className="flex gap-[0.05em] leading-none mb-1">
                                        {unit.split("").map((char, j) => (
                                            <Digit key={j} value={parseInt(char)}/>
                                        ))}
                                        {i < 2 && <span className="mx-[0.05em] leading-[0.75]">:</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </>
            }

            {!isLoading && !isError && time === null &&
                <h1>{timerPrefix}</h1>
            }
        </div>
    );
}