import type { Interval } from "../../shared/types";
import { IntervalBlock, IntervalList, IntervalListItem } from "./styles";

type Props = {
    intervals: Interval[];
};

export const AppIntervals = (props: Props) => {
    return (
        <IntervalBlock>
            <IntervalList>
                {props.intervals.map((i, index) => {
                    return (
                        <IntervalListItem key={`${i.type}_${index}`}>
                            <span>{index + 1}.</span>
                            <span>{i.type.toUpperCase()}</span>
                            <span>{i.duration}s</span>
                        </IntervalListItem>
                    )
                })}
            </IntervalList>
        </IntervalBlock>
    );
};