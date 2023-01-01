import { useFetchExerciseById } from "@internals/hooks";
import { CourseNavbar } from "@internals/components";
import CreateExercise from "./CreateExercise";

const InstructorExercise = () => {
    const { exercise } = useFetchExerciseById();
    console.log(exercise);

    if (!exercise.data) return <CourseNavbar />;

    return <CreateExercise exercise={exercise.data} edit={true} exerciseId={exercise.data._id} />;
};

export default InstructorExercise;
