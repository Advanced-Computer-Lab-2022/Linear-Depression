import React from "react";

import Footer from "./Footer";
import AllCourses from "./home/AllCourses";
import { Navbar } from "@internals/components";

const Home: React.FC = () => {
    return (
        <>
            <Navbar search={true} />
            <AllCourses />
            <Footer />
        </>
    );
};

export default Home;
