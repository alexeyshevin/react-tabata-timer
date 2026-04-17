import { useEffect, useMemo, useRef, useState } from "react";
import type { Interval, IntervalType } from "../types";

export const useTabataTimer = () => {
    const [intervals, setIntervals] = useState<Interval[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const timerRef = useRef<number | null>(null);

    const addInterval = (type: IntervalType) => {
        const duration = prompt(`Enter ${type} duration (seconds):`);
        if (!duration) {
            return;
        }

        const parsedDuration = Number(duration);

        if (Number.isNaN(parsedDuration) || parsedDuration <= 0) {
            return;
        }

        setIntervals(prev => [...prev, { type, duration: parsedDuration }]);
    };

    const startTimer = () => {
        if (intervals.length === 0) return;

        if (currentIndex >= intervals.length) {
            setCurrentIndex(0);
            setTimeLeft(intervals[0].duration);
        } else if (timeLeft === 0) {
            setTimeLeft(intervals[currentIndex].duration);
        }

        setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);

        if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const resetTimer = () => {
        stopTimer();
        setCurrentIndex(0);
        setTimeLeft(0);
    };

    const clearIntervals = () => {
        stopTimer();
        setIntervals([]);
        setCurrentIndex(0);
        setTimeLeft(0);
    };

    useEffect(() => {
        if (!isRunning || intervals.length === 0) return;

        timerRef.current = window.setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime > 1) {
                    return prevTime - 1;
                }

                const nextIndex = currentIndex + 1;

                if (nextIndex < intervals.length) {
                    setCurrentIndex(nextIndex);
                    return intervals[nextIndex].duration;
                }

                stopTimer();
                return 0;
            });
        }, 1000);

        return () => {
            if (timerRef.current !== null) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [isRunning, currentIndex, intervals]);

    const currentInterval = useMemo(() => {
        return intervals[currentIndex];
    }, [intervals, currentIndex]);

    return {
        intervals,
        timeLeft,
        currentInterval,
        isRunning,

        addInterval,
        startTimer,
        stopTimer,
        resetTimer,
        clearIntervals,
    };
};