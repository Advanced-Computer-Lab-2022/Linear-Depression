import { useEffect, useState } from "react";

import { fetchLessonById } from "@internals/services";
import { Lesson as ILessonProps } from "@internals/types";

const useFetchLessonById = (courseId: string, lessonId: string) => {
    const [lesson, setLesson] = useState({
        data: null as ILessonProps | null,
        loading: true,
        error: null
    });

    useEffect(() => {
        fetchLessonById(courseId, lessonId)
            .then((data) => {
                setLesson({
                    data,
                    loading: false,
                    error: null
                });
            })
            .catch((error) => {
                setLesson({
                    data: null,
                    loading: false,
                    error
                });
            });
    }, [courseId, lessonId]);

    return { lesson, setLesson };
};

export default useFetchLessonById;
