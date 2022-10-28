import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CourseContent from "../components/CourseContent/CourseContent";

const Course: React.FC = () => {
    const [lessons, setLessons] = useState({
        data: [],
        loading: true,
        error: null
    });
    const courseId = useParams().courseId;
    useEffect(() => {
        axios
            .get(`http://localhost:8080/courses/${courseId}`)
            .then((response) => {
                setLessons({
                    data: response.data.course.lessons,
                    loading: false,
                    error: null
                });
            })
            .catch((error) => {
                setLessons({
                    data: [],
                    loading: false,
                    error: error
                });
            });
    }, []);

    return <CourseContent lessons={lessons.data} />;
};

export default Course;
