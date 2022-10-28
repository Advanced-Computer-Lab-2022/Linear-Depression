import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import CorporateTrainee from "./pages/CorporateTrainee";
import IndividualTrainee from "./pages/IndividualTrainee";
import Instructor from "./pages/Instructor";
import { CountryContext } from "./context/CountryContext";
import Course from "./pages/Course";

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
    return (
        <CountryContext.Provider value={{ country, setCountry }}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/course/:courseId" element={<Course />} />
                    <Route path="/instructor" element={<Instructor />} />
                    <Route path="/corporate-trainee" element={<CorporateTrainee />} />
                    <Route path="/individual-trainee" element={<IndividualTrainee />} />
                </Routes>
            </div>
        </CountryContext.Provider>
    );
}

export default App;
