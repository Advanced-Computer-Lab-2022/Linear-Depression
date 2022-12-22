import { Enrollement } from "@internals/types";

const updateVideoOfLessonAsSeen = (enrollement: Enrollement, lessonId: string): Enrollement => {
    const newEnrollement = JSON.parse(JSON.stringify(enrollement));
    for (const lesson of newEnrollement.lessons) {
        if (lesson.lessonId === lessonId) {
            lesson.isVideoWatched = true;
        }
    }
    return newEnrollement;
};

const getLessonElementsStatus = (lessonId: string, enrollement: Enrollement): Array<boolean> => {
    let lessonElementsStatus: Array<boolean> = [];
    for (const lesson of enrollement.lessons) {
        if (lesson.lessonId == lessonId) {
            //TODO: fix this
            lessonElementsStatus.push(lesson.isVideoWatched);
            for (const exercise of lesson.exercisesStatus) {
                lessonElementsStatus.push(exercise.isCompleted);
            }
        }
    }
    return lessonElementsStatus;
};

export { updateVideoOfLessonAsSeen, getLessonElementsStatus };
