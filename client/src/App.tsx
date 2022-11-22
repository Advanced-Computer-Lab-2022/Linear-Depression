import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import CorporateTrainee from "./pages/CorporateTrainee";
import IndividualTrainee from "./pages/IndividualTrainee";
import Instructor from "./pages/Instructor";
import { CountryContext } from "./context/CountryContext";
import Course from "./pages/Course";
import Navbar from "./components/Navbar";
import { UserContext } from "./context/UserContext";
import { User } from "./types/User";
import useGetLocalizationData from "./hooks/useGetLocalizationData";

function App() {
    const { country, setCountry, currency, setCurrency } = useGetLocalizationData();

    const [userId, setUserId] = useState("");
    const [userType, setUserType] = useState(User.GUEST);

    return (
        <UserContext.Provider value={{ userId, setUserId, userType, setUserType }}>
            <CountryContext.Provider value={{ country, setCountry, currency, setCurrency }}>
                <div className="App">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="course/:courseId" element={<Course />} />
                        <Route path="instructor/*" element={<Instructor />} />
                        <Route path="corporate-trainee" element={<CorporateTrainee />} />
                        <Route path="individual-trainee" element={<IndividualTrainee />} />
                    </Routes>
                </div>
            </CountryContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
