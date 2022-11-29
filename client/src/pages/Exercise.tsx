import { useContext } from "react";

import { UserContext } from "@internals/contexts";
import { InstructorExercise, TraineeExercise } from "@internals/pages";
import { User } from "@internals/types";

const Exercise = () => {
    const { userType } = useContext(UserContext);
    if (userType === User.INSTRUCTOR) {
        return <InstructorExercise />;
    } else if (userType === User.CORPORATE_TRAINEE || userType === User.INDIVIDUAL_TRAINEE) {
        return <TraineeExercise />;
    } else {
        // TODO: UNAUTHORIZED Page
        return <div>UNAUTHORIZED</div>;
    }
};

export default Exercise;
