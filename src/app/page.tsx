"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
type TimerMode = "WORK" | "SHORT_BREAK" | "LONG_BREAK";

const PomodoroTimer = () => {
    const [i_time_left, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [w_mode, setMode] = useState<TimerMode>("WORK");
    const [showExtend, setShowExtend] = useState(false);

    const durations = {
        WORK: 1 * 60,
        SHORT_BREAK: 5 * 60,
        LONG_BREAK: 15 * 60,
    };

    // Load the audio file
    const alertSound = new Audio("/sound-end.mp3");

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
            localStorage.setItem("pomodoro-timeLeft", i_time_left.toString());
            localStorage.setItem("pomodoro-isRunning", isRunning.toString());
            localStorage.setItem("pomodoro-mode", w_mode);
        }
    }, [i_time_left, isRunning, w_mode]);

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
                        setShowExtend(w_mode === "WORK");
                        alertSound.play();
                        return 0;
                    }
                });
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isRunning, w_mode]);

    useEffect(() => {
        const formatTime = (seconds: number) => {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
        };

        document.title = `${formatTime(i_time_left)} - Pomodoro Timer (${w_mode})`;
    }, [i_time_left, w_mode]);

    const sp_format_time = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const sp_change_mode = (newMode: TimerMode, duration: number) => {
        setMode(newMode);
        setTimeLeft(duration);
        setIsRunning(false);
        setShowExtend(false);
    };

    const sp_reset_timer = () => {
        setTimeLeft(durations[w_mode]);
        setIsRunning(false);
        setShowExtend(false);
    };

    const sp_extend_timer = () => {
        setTimeLeft((prev) => prev + 5 * 60);
        setIsRunning(true);
        setShowExtend(false);
    };

    return (
        <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-zinc-900 to-black h-screen w-screen">
            <div className="flex flex-col items-center justify-around h-full w-full p-4 z-10">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                    {["WORK", "SHORT_BREAK", "LONG_BREAK"].map((m) => (
                        <div
                            key={m}
                            onClick={() => sp_change_mode(m as TimerMode, durations[m as TimerMode])}
                            className={`${
                                w_mode === m ? "bg-purple-800 text-white" : "bg-white/90 text-black/90"
                            } min-w-[150px] sm:min-w-auto text-center rounded-full py-2 px-4 sm:px-6 text-sm sm:text-md font-bold shadow-lg border border-white/90 hover:bg-transparent hover:text-white/90 transition-all duration-500 cursor-pointer`}
                        >
                            {m.replace("_", " ")}
                        </div>
                    ))}
                </div>
                <div className="text-white/90 text-[100px] sm:text-[300px] font-bold">
                    {sp_format_time(i_time_left)}
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-center text-white/90 text-xl sm:text-2xl font-bold text-center">
                        {w_mode === "WORK" && <div>C&apos;est le moment de travailler</div>}
                        {w_mode === "SHORT_BREAK" && <div>C&apos;est le moment de prendre une courte pause</div>}
                        {w_mode === "LONG_BREAK" && <div>C&apos;est le moment de prendre une longue pause</div>}
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
                                className="bg-green-500 text-white rounded-full w-16 sm:w-20 h-16 sm:h-20 text-lg sm:text-2xl font-bold shadow-lg border border-green-500 hover:bg-transparent hover:text-green-500 transition-all duration-500"
                            >
                                Start
                            </Button>
                        )}
                        {showExtend && w_mode === "WORK" && (
                            <Button
                                onClick={sp_extend_timer}
                                className="bg-blue-500 text-white rounded-full text-lg font-bold shadow-lg border border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-500"
                            >
                                +5 Minutes
                            </Button>
                        )}
                        <Button
                            onClick={sp_reset_timer}
                            className="bg-white/90 text-black/90 rounded-full w-20 sm:w-24 h-16 sm:h-20 text-lg sm:text-2xl font-bold shadow-lg border border-white/90 hover:bg-transparent hover:text-white/90 transition-all duration-500"
                        >
                            Restart
                        </Button>
                    </div>
                </div>
                <p className="text-white/90 text-center text-xs sm:text-sm md:text-md lg:text-lg font-bold transition-all duration-500 cursor-pointer hover:underline">
                    <Link href="/about-pomodoro">Qu&apos;est-ce que le Pomodoro Timer ?</Link>
                </p>
            </div>
        </div>
    );
};

export default PomodoroTimer;
