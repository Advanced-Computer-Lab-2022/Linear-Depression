import React, { useEffect, useState } from "react";
import CoursesList from "../components/CoursesList";
import Navbar from "../components/Navbar";
import axios from "axios";

const Home: React.FC = () => {
    const [courses, setCourses] = useState({
        data: [],
        loading: true,
        error: null
    });

    useEffect(() => {
        axios
            .get("http://localhost:3000/courses")
            .then((res) => {
                console.log(res.data.courses);
                setCourses({
                    data: res.data.courses,
                    loading: false,
                    error: null
                });
            })
            .catch((err) => {
                setCourses({
                    data: [],
                    loading: false,
                    error: err
                });
            });
    }, []);
    return (
        <div>
            <Navbar />
            <CoursesList courses={courses.data} />
        </div>
    );
};

export default Home;

// [
//     {
//         id: "1",
//         title: "100 Days of Code: The Complete Python Pro Bootcamp for 2022",
//         description:
//             "Learn Python like a Professional! Start from the basics and go all the way to creating your own applications and games!",
//         instructor: "Dr. Angela Yu",
//         rating: 4.3,
//         duration: 10,
//         price: 12.99,
//         currency: "$"
//     },
//     {
//         id: "2",
//         title: "100 Days of Code: The Complete Python Pro Bootcamp for 2022",
//         description:
//             "Learn Python like a Professional! Start from the basics and go all the way to creating your own applications and games!",
//         instructor: "Dr. Angela Yu",
//         rating: 4.3,
//         duration: 10,
//         price: 12.99,
//         currency: "$"
//     }
// ];
