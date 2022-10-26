import { Routes, Route } from "react-router-dom";
import "./App.css";
import CorporateTrainee from "./pages/CorporateTrainee";
import IndividualTrainee from "./pages/IndividualTrainee";
import Instructor from "./pages/Instructor";
import Home from "./pages/Home";
import { CoursesContext } from "./context/CoursesContext";
import { useState } from "react";
import ICourseProps from "./types/Course";

function App() {
    const [coursesResultSet, setCoursesResultSet] = useState<ICourseProps[]>([]);

    return (
        <CoursesContext.Provider value={{ coursesResultSet, setCoursesResultSet }}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/instructor" element={<Instructor />} />
                    <Route path="/corporate-trainee" element={<CorporateTrainee />} />
                    <Route path="/individual-trainee" element={<IndividualTrainee />} />
                </Routes>
            </div>
        </CoursesContext.Provider>
    );
}

export default App;
