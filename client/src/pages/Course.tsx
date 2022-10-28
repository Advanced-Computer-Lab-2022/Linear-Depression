import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import CourseContent from "../components/CourseContent/CourseContent";
import ILessonProps from "../types/Lesson";

const Course: React.FC = () => {
    const [lessons, setLessons] = useState({
        data: [],
        loading: true,
        error: null
    });
    const courseId = useParams().courseId;
    useEffect(() => {
        axios.get(`http://localhost:3000/courses/${courseId}`).then((res) => {
            console.log(res.data.course.lessons);
            setLessons(res.data.course.lessons);
        });
    }, []);
    return <CourseContent lessons={lessons.data} />;
};

export default Course;
