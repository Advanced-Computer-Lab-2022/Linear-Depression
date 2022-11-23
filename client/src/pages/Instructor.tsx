import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Home, MyCourses } from "@internals/pages";
import { UserContext } from "@internals/contexts";
import { User } from "@internals/types";

const Instructor: React.FC = () => {
    // TODO: TO BE REMOVED WHEN AUTHENTICATION IS IMPLEMENTED
    const { setUserId, setUserType } = useContext(UserContext);

    setUserId("636020ca8701caab59e5dc30");
    setUserType(User.INSTRUCTOR);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-courses" element={<MyCourses />} />
        </Routes>
    );
};

export default Instructor;
