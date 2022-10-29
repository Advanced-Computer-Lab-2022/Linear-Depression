import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import CorporateTrainee from "./pages/CorporateTrainee";
import IndividualTrainee from "./pages/IndividualTrainee";
import Instructor from "./pages/Instructor";
import { CountryContext } from "./context/CountryContext";
import Course from "./pages/Course";
import Navbar from "./components/Navbar";
import AllCourses from "./components/AllCourses";
import MyCourses from "./components/MyCourses";
import { User } from "./types/User";

function App() {
    let defaultCountry = "US";

    const [country, setCountry] = useState(defaultCountry);
    useEffect(() => {
        fetch(`http://localhost:3000/country`, { credentials: "include" }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    console.log(data.language);
                    setCountry(data.language);
                });
            }
        });
    }, []);
    const instructorId = "635cef84dfbca82a3d585769";
    return (
        <CountryContext.Provider value={{ country, setCountry }}>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="course/:courseId" element={<Course />} />
                    <Route path="instructor" element={<Instructor />}>
                        <Route path="instructor/" element={<AllCourses />} />
                        <Route
                            path="/instructor/my-courses"
                            element={<MyCourses id={instructorId} type={User.INSTRUCTOR} />}
                        />
                    </Route>
                    <Route path="corporate-trainee" element={<CorporateTrainee />} />
                    <Route path="individual-trainee" element={<IndividualTrainee />} />
                </Routes>
            </div>
        </CountryContext.Provider>
    );
}

export default App;
