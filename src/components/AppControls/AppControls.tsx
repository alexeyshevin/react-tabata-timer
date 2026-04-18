import type { Interval, IntervalType } from "../../shared/types";
import { Button } from "../../shared/ui/Button";
import { ControlsContainer } from "./styles";

type Props = {
    onAddInterval: (type: IntervalType) => void;
    onResetIntervals: () => void;
    intervals?: Interval[];
};

export const AppControls = (props: Props) => {
    const lastInterval = props.intervals && props.intervals[props.intervals.length - 1];

    const isWorkButtonDisabled = lastInterval?.type === 'work';
    const isRestButtonDisabled = lastInterval?.type === 'rest' || !props.intervals?.length;

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
            <Button
                variant="work"
                onClick={handleAppWork}
                disabled={isWorkButtonDisabled}
                style={{ "opacity": isWorkButtonDisabled ?  "0.5" : 1 }}
            >
                Add Work
            </Button>
            <Button
                variant="rest"
                onClick={handleAddRest}
                disabled={isRestButtonDisabled}
                style={{ "opacity": isRestButtonDisabled ?  "0.5" : 1 }}
            >
                Add Rest
            </Button>
            <Button variant="clear" onClick={handleClearIntervals}>
                Clear intervals
            </Button>
        </ControlsContainer>
    );
};