import { formatTime } from "../../shared/helpers/formatTime";
import type { Interval } from "../../shared/types";
import { TimeLeftBlock, TimerBlock, TimerTypeBlock } from "./styles";

type Props = {
    currentInterval?: Interval;
    timeLeft: number;
};

const NO_INTERVALS_STATE_STRING = 'Waiting for start your workout.';

export const AppTimer = (props: Props) => {
    const formattedTimeLeft = formatTime(props.timeLeft);

    return (
        <TimerBlock>
            <TimeLeftBlock>
                {formattedTimeLeft}
            </TimeLeftBlock>
            <TimerTypeBlock>
                {props.currentInterval ? props.currentInterval.type.toUpperCase() : NO_INTERVALS_STATE_STRING}
            </TimerTypeBlock>
        </TimerBlock>
    );
};