import { useTabataTimer } from "../../shared/hooks/useTabataTimer";
import { AppActions } from "../AppActions/AppActions";
import { AppControls } from "../AppControls/AppControls";
import { AppIntervals } from "../AppIntervals/AppIntervals";
import { AppTimer } from "../AppTimer/AppTimer";
import { AppContainer } from "./styles";

export const AppWrapper = () => {
    const {
        intervals,
        timeLeft,
        currentInterval,
        addInterval,
        startTimer,
        stopTimer,
        resetTimer,
        clearIntervals,
    } = useTabataTimer();

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