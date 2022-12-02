import React from "react";

import { Instructor } from "@internals/types";

const ViewProfile: React.FC<{
    instructor: Instructor;
}> = ({ instructor }) => {
    return (
        <>
            <h1>Instructor Profile</h1>
            <p>{instructor.email}</p>
            <p>{instructor.firstName}</p>
            <p>{instructor.lastName}</p>
            <p>{instructor.userName}</p>
            <p>{instructor.biography}</p>
        </>
    );
};

export default ViewProfile;
