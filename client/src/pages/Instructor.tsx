import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AllCourses from "./home/AllCourses";
import MyCourses from "../components/MyCourses";
import { UserContext } from "../context/UserContext";
import { User } from "../types/User";

const Instructor: React.FC = () => {
    // TODO: TO BE REMOVED WHEN AUTHENTICATION IS IMPLEMENTED
    const { userId, setUserId, userType, setUserType } = useContext(UserContext);

    setUserId("636020ca8701caab59e5dc30");
    setUserType(User.INSTRUCTOR);

    return (
        <Routes>
            <Route path="/" element={<AllCourses />} />
            <Route path="/my-courses" element={<MyCourses id={userId} type={userType} />} />
        </Routes>
    );
};

export default Instructor;
