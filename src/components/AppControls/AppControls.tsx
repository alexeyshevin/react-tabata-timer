import type { IntervalType } from "../../shared/types";
import { Button } from "../../shared/ui/Button";
import { ControlsContainer } from "./styles";

type Props = {
    onAddInterval: (type: IntervalType) => void;
    onResetIntervals: () => void;
};

export const AppControls = (props: Props) => {
    const handleAppWork = () => {
        props.onAddInterval('work');
    };

    const handleAddRest = () => {
        props.onAddInterval('rest');
    };

    const handleClearIntervals = () => {
        props.onResetIntervals();
    };

    return (
        <ControlsContainer>
            <Button variant="work" onClick={handleAppWork}>
                Add Work
            </Button>
            <Button variant="rest" onClick={handleAddRest}>
                Add Rest
            </Button>
            <Button variant="clear" onClick={handleClearIntervals}>
                Clear intervals
            </Button>
        </ControlsContainer>
    );
};