import { useAuth } from "@internals/hooks";
import { InstructorExercise, TraineeExercise } from "@internals/pages";
import { User } from "@internals/types";

const Exercise = () => {
    const {
        auth: { userType }
    } = useAuth();
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
