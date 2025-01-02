"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type TimerMode = "WORK" | "SHORT_BREAK" | "LONG_BREAK";

const PomodoroTimer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // Valeur par défaut
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState<TimerMode>("WORK");

    const durations = {
        WORK: 25 * 60,
        SHORT_BREAK: 5 * 60,
        LONG_BREAK: 15 * 60,
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedTime = localStorage.getItem("pomodoro-timeLeft");
            const savedRunning = localStorage.getItem("pomodoro-isRunning");
            const savedMode = localStorage.getItem("pomodoro-mode");

            if (savedTime) setTimeLeft(parseInt(savedTime));
            if (savedRunning) setIsRunning(savedRunning === "true");
            if (savedMode) setMode(savedMode as TimerMode);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("pomodoro-timeLeft", timeLeft.toString());
            localStorage.setItem("pomodoro-isRunning", isRunning.toString());
            localStorage.setItem("pomodoro-mode", mode);
        }
    }, [timeLeft, isRunning, mode]);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (isRunning) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev > 0) {
                        return prev - 1;
                    } else {
                        clearInterval(timer!);
                        setIsRunning(false);
                        return 0;
                    }
                });
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isRunning]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const handleModeChange = (newMode: TimerMode, duration: number) => {
        setMode(newMode);
        setTimeLeft(duration);
        setIsRunning(false);
    };

    const resetTimer = () => {
        setTimeLeft(durations[mode]);
        setIsRunning(false);
    };

    return (
        <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-zinc-900 to-black h-screen w-screen">
            <div className="flex flex-col items-center justify-center h-full w-full p-4 z-10">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10">
                    {["WORK", "SHORT_BREAK", "LONG_BREAK"].map((m) => (
                        <div
                            key={m}
                            onClick={() => handleModeChange(m as TimerMode, durations[m as TimerMode])}
                            className={`${
                                mode === m ? "bg-purple-800 text-white" : "bg-white/90 text-black/90"
                            } min-w-[150px] sm:min-w-auto text-center rounded-full py-2 px-4 sm:px-6 text-sm sm:text-md font-bold shadow-lg border border-white/90 hover:bg-transparent hover:text-white/90 transition-all duration-500 cursor-pointer`}
                        >
                            {m.replace("_", " ")}
                        </div>
                    ))}
                </div>
                <h1 className="text-white/90 text-[100px] sm:text-[200px] md:text-[240px] lg:text-[360px] font-bold my-6 sm:my-8 lg:my-10">
                    {formatTime(timeLeft)}
                </h1>
                <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
                    <div className="flex items-center justify-center text-white/90 text-xl sm:text-2xl font-bold text-center">
                        {mode === "WORK" && <div>It&apos;s time to work</div>}
                        {mode === "SHORT_BREAK" && <div>It&apos;s time to take a short break</div>}
                        {mode === "LONG_BREAK" && <div>It&apos;s time to take a long break</div>}
                    </div>
                    <div className="flex items-center justify-center gap-4 sm:gap-6">
                        {isRunning ? (
                            <Button
                                onClick={() => setIsRunning(false)}
                                className="bg-red-500 text-white rounded-full w-16 sm:w-20 h-16 sm:h-20 text-lg sm:text-2xl font-bold shadow-lg border border-red-500 hover:bg-transparent hover:text-red-500 transition-all duration-500"
                            >
                                Stop
                            </Button>
                        ) : (
                            <Button
                                onClick={() => setIsRunning(true)}
                                className="bg-white/90 text-black/90 rounded-full w-16 sm:w-20 h-16 sm:h-20 text-lg sm:text-2xl font-bold shadow-lg border border-white/90 hover:bg-transparent hover:text-white/90 transition-all duration-500"
                            >
                                Start
                            </Button>
                        )}
                        <Button
                            onClick={resetTimer}
                            className="bg-yellow-500 text-white rounded-full w-20 sm:w-24 h-16 sm:h-20 text-lg sm:text-2xl font-bold shadow-lg border border-yellow-500 hover:bg-transparent hover:text-yellow-500 transition-all duration-500"
                        >
                            Restart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PomodoroTimer;
