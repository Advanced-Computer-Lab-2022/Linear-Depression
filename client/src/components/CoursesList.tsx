import React from "react";
import ICourseProps from "../types/Course";
import CourseCard from "./CourseCard";

interface CoursesListProps {
    courses: ICourseProps[];
}

const CoursesList: React.FC<CoursesListProps> = ({ courses }) => {
    return (
        <div>
            {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
            ))}
        </div>
    );
};

export default CoursesList;
