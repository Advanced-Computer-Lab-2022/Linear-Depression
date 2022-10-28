import React from "react";
import CourseContent from "../components/CourseContent/CourseContent";
import ILessonProps from "../types/Lesson";

const Course = () => {
    return <CourseContent lessons={lessons} />;
};

const lessons: ILessonProps[] = [
    {
        id: "1",
        title: "Lesson 1",
        totalDuration: 10,
        video: {
            videoLink: "https://www.youtube.com/watch?v=7WwtzsSHdpI",
            description: "Introduction to React"
        },
        exercises: [
            {
                id: "1",
                question: "What is React?"
            },
            {
                id: "2",
                question: "What is JSX?"
            }
        ]
    }
];

export default Course;
