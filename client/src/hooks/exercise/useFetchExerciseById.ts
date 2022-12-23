import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IExerciseProps from "src/types/Exercise";

import { fetchExerciseById } from "@internals/services";

const useFetchExerciseById = () => {
    const { courseId, lessonId, exerciseId } = useParams();

    const [exercise, setExercise] = useState({
        data: null as IExerciseProps | null,
        loading: true,
        error: null
    });

    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        fetchExerciseById(courseId, lessonId, exerciseId)
            .then((data) => {
                setExercise({
                    data,
                    loading: false,
                    error: null
                });

                const numberOfQuestions = data.questions.length;
                setAnswers(new Array(numberOfQuestions).fill(-1));
            })
            .catch((error) => {
                setExercise({
                    data: null,
                    loading: false,
                    error
                });
            });
    }, [courseId, lessonId, exerciseId]);

    return { exercise, setExercise, answers, setAnswers };
};

export default useFetchExerciseById;
