import { useEffect, useMemo, useRef, useState } from "react";
import type { Interval, IntervalType } from "../../shared/types";
import { AppActions } from "../AppActions/AppActions";
import { AppControls } from "../AppControls/AppControls";
import { AppIntervals } from "../AppIntervals/AppIntervals";
import { AppTimer } from "../AppTimer/AppTimer";
import { AppContainer } from "./styles";

export const AppWrapper = () => {
    const [intervals, setIntervals] = useState<Interval[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const timerValueRef = useRef<number | null>(null);

    const addInterval = (type: IntervalType) => {
        const duration = prompt(`Enter ${type} duration (seconds):`);
        if (!duration) {
            return
        };

        setIntervals([...intervals, { type, duration: Number(duration) }]);
    };

    const startTimer = () => {
        if (intervals.length === 0) {
            return;
        }

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

        if (timerValueRef.current !== null) {
            clearInterval(timerValueRef.current);
            timerValueRef.current = null;
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
        if (!isRunning) {
            return;
        }

        timerValueRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev > 1) {
                    return prev - 1;
                }

                setCurrentIndex((prevIndex) => {
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
        if (timerValueRef.current) {
            clearInterval(timerValueRef.current);
        }
        };
    }, [isRunning, currentIndex, intervals]);

    const currentInterval = useMemo(() => {
        return intervals[currentIndex];
    }, [intervals, currentIndex]);

    return (
        <AppContainer>
            <AppControls
                onAddInterval={addInterval}
                onResetIntervals={clearIntervals}
            />
            <AppIntervals intervals={intervals} />
            <AppTimer
                currentInterval={currentInterval}
                timeLeft={timeLeft}
            />
            <AppActions
                onTimerStart={startTimer}
                onTimerStop={stopTimer}
                onTimerReset={resetTimer}
            />
        </AppContainer>
    );
};