import { useTimer } from "react-timer-hook";

export const Timer = ({
    expiryTimestamp,
    time,
}: {
    expiryTimestamp?: any;
    time?: number | string;
}) => {
    const { seconds, minutes, hours, pause, resume, restart } = useTimer({
        expiryTimestamp,
    });

    const couldown = Number(time) * 60;

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "100px" }}>
                <span>{hours}</span>:<span>{minutes}</span>:
                <span>{seconds}</span>
            </div>
            <button className="label-filename" onClick={pause}>
                Pause
            </button>
            <button className="label-choose-file" onClick={resume}>
                Reprendre
            </button>
            <button
                onClick={() => {
                    const time = new Date();
                    time.setSeconds(time.getSeconds() + couldown);
                    restart(time);
                }}
            >
                Recommencer
            </button>
        </div>
    );
};
