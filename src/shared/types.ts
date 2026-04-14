export type IntervalType = 'work' | 'rest';

export type Interval = {
    type: IntervalType;
    duration: number;
};