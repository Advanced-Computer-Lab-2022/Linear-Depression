import React from "react";

import AllCourses from "./home/AllCourses";
import { Navbar } from "@internals/components";

const Home: React.FC = () => {
    return (
        <>
            <Navbar />
            <AllCourses />
        </>
    );
};

export default Home;
