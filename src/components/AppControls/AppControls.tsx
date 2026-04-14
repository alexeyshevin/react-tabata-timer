import type { IntervalType } from "../../shared/types";
import { Button } from "../../shared/ui/Button";
import { ControlsContainer } from "./styles";

type Props = {
    onAddInterval: (type: IntervalType) => void;
};

export const AppControls = (props: Props) => {
    const handleAppWork = () => {
        props.onAddInterval('work');
    };
    const handleAddRest = () => {
        props.onAddInterval('rest');
    };
    return (
        <ControlsContainer>
            <Button variant="work" onClick={handleAppWork}>
                Add Work
            </Button>
            <Button variant="rest" onClick={handleAddRest}>
                Add Rest
            </Button>
        </ControlsContainer>
    );
};