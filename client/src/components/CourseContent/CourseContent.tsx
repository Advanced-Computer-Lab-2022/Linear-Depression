import React from "react";
import ContentAccordion from "./ContentAccordion";

const CourseContent = () => {
    return (
        <ContentAccordion
            lesson={{
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
            }}
        />
    );
};

CourseContent.defaultProps = {
    lessons: [
        {
            title: "Lesson 1",
            totalDuration: 10,
            video: {
                videoLink: "https://www.youtube.com/watch?v=1",
                description: "Video 1"
            },
            exercises: [
                {
                    id: "1",
                    question: "Question 1"
                }
            ]
        }
    ]
};

export default CourseContent;
