import React from "react";

import { Navbar } from "@internals/components";
import { InstructorCourse } from "@internals/pages";

const Course: React.FC = () => {
    return (
        <>
            <Navbar />
            <InstructorCourse />
        </>
    );
};

export default Course;
