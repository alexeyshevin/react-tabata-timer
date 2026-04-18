import { useEffect, useMemo, useRef, useState } from "react";
import type { Interval, IntervalType } from "../types";

export const useTabataTimer = () => {
    const [intervals, setIntervals] = useState<Interval[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const timerRef = useRef<number | null>(null);
    const endTimeRef = useRef<number | null>(null);

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
        if (intervals.length === 0) {
        return;
    }

        if (isRunning) {
            return;
        }

        if (timeLeft > 0) {
            endTimeRef.current = Date.now() + timeLeft * 1000;
            setIsRunning(true);
            return;
        }

        const safeIndex = currentIndex >= intervals.length ? 0 : currentIndex;
        const duration = intervals[safeIndex].duration;

        setCurrentIndex(safeIndex);
        setTimeLeft(duration);
        endTimeRef.current = Date.now() + duration * 1000;

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
        if (!isRunning || !endTimeRef.current) {
            return;
        }

        timerRef.current = window.setInterval(() => {
            const diff = endTimeRef.current! - Date.now();

            if (diff <= 0) {
                let shouldStop = false;

                setCurrentIndex(prevIndex => {
                    const nextIndex = prevIndex + 1;

                    if (nextIndex < intervals.length) {
                        endTimeRef.current =
                            Date.now() + intervals[nextIndex].duration * 1000;
                        return nextIndex;
                    } else {
                        shouldStop = true;
                        return prevIndex;
                    }
                });

                if (shouldStop) {
                    stopTimer();
                    setTimeLeft(0);
                }
            } else {
                setTimeLeft(diff / 1000);
            }
        }, 1);

        return () => {
            if (timerRef.current !== null) {
                clearInterval(timerRef.current);
                timerRef.current = null;
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