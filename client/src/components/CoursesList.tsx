import React from "react";
import CourseCard from "./CourseCard";

interface CoursesListProps {
    courses: {
        id: string;
        title: string;
        description: string;
        instructor: string;
        rating: number;
        duration: number;
        price: number;
        currency: string;
    }[];
}

const CoursesList: React.FC<CoursesListProps> = ({ courses }) => {
    return (
        <div>
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
};

export default CoursesList;
