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
        if (!duration) return;

        setIntervals(prev => [
            ...prev,
            { type, duration: Number(duration) }
        ]);
    };

    const startTimer = () => {
        if (intervals.length === 0) return;

        setIsRunning(true);

        if (currentIndex >= intervals.length) {
            setCurrentIndex(0);
        }

        if (timeLeft === 0) {
            setTimeLeft(intervals[0].duration);
            setCurrentIndex(0);
        }
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
        setIntervals([]);
        resetTimer();
    };

    useEffect(() => {
        if (!isRunning) return;

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev > 1) return prev - 1;

                setCurrentIndex(prevIndex => {
                    const nextIndex = prevIndex + 1;

                    if (nextIndex < intervals.length) {
                        setTimeLeft(intervals[nextIndex].duration);
                        return nextIndex;
                    } else {
                        stopTimer();
                        return prevIndex;
                    }
                });

                return 0;
            });
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isRunning, intervals]);

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