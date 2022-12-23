import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchEvaluation } from "@internals/services";
import { Evaluation } from "@internals/types";

const useFetchEvaluation = () => {
    const { courseId, lessonId, exerciseId } = useParams();

    const [evaluation, setEvaluation] = useState({
        data: null as Evaluation | null,
        loading: true,
        error: null
    });

    useEffect(() => {
        fetchEvaluation(courseId, lessonId, exerciseId)
            .then((data) => {
                setEvaluation({
                    data,
                    loading: false,
                    error: null
                });
            })
            .catch((error) => {
                setEvaluation({
                    data: null,
                    loading: false,
                    error
                });
            });
    }, [courseId, lessonId, exerciseId]);

    return { evaluation, setEvaluation };
};

export default useFetchEvaluation;
