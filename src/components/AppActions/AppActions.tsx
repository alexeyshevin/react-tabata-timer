import { Button } from "../../shared/ui/Button";
import { ActionBlock } from "./styles";

type Props = {
    onTimerStart: () => void;
    onTimerStop: () => void;
    onTimerReset: () => void;
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