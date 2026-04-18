import { Button } from "../../shared/ui/Button";
import { ActionBlock } from "./styles";

type Props = {
    onTimerStart: () => void;
    onTimerStop: () => void;
    onTimerReset: () => void;
    isRunning?: boolean;
};

export const AppActions = (props: Props) => {
    const handleStartTimer = () => {
        props.onTimerStart();
    };

    const handleStopTimer = () => {
        props.onTimerStop();
    };

    const handleResetTimer = () => {
        props.onTimerReset();
    };

    return (
        <ActionBlock>
            <Button
                variant="start"
                onClick={handleStartTimer}
                disabled={props.isRunning}
                style={{ "opacity": props.isRunning ?  "0.5" : 1 }}
            >
                Start
            </Button>
            <Button
                variant="stop"
                onClick={handleStopTimer}
            >
                Stop
            </Button>
            <Button
                variant="reset"
                onClick={handleResetTimer}
            >
                Reset
            </Button>
        </ActionBlock>
    );
};