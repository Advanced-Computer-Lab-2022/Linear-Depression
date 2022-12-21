interface IExerciseStatus {
    exerciseId: string;
    isCompleted: boolean;
}

interface ILessonStatus {
    lessonId: string;
    isVideoWatched: boolean;
    exercisesStatus: Array<IExerciseStatus>;
}

interface Enrollement {
    _id: string;
    courseId: string;
    traineeId: string;
    lessons: Array<ILessonStatus>;
    progress: number;
}

export default Enrollement;
