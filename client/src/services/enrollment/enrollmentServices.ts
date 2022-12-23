import { Enrollment } from "@internals/types";

const updateVideoOfLessonAsSeen = (enrollment: Enrollment, lessonId: string): Enrollment => {
    const newEnrollment = JSON.parse(JSON.stringify(enrollment));
    for (const lesson of newEnrollment.lessons) {
        if (lesson.lessonId == lessonId) {
            lesson.isVideoWatched = true;
        }
    }
    return newEnrollment;
};

const getLessonElementsStatus = (lessonId: string, enrollment: Enrollment): Array<boolean> => {
    let lessonElementsStatus: Array<boolean> = [];
    for (const lesson of enrollment.lessons) {
        if (lesson.lessonId == lessonId) {
            lessonElementsStatus.push(lesson.isVideoWatched);
            for (const exercise of lesson.exercisesStatus) {
                lessonElementsStatus.push(exercise.isCompleted);
            }
        }
    }
    return lessonElementsStatus;
};

export { updateVideoOfLessonAsSeen, getLessonElementsStatus };
