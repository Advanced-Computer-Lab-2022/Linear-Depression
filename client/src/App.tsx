import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { URLModal } from "react-url-modal";

import { Navbar } from "@internals/components";
import { CountryContext, UserContext } from "@internals/contexts";
import { useGetLocalizationData } from "@internals/hooks";
import { AddLesson, AddCourse, AddReview } from "@internals/modals";
import { Home, CorporateTrainee, IndividualTrainee, Instructor, Course } from "@internals/pages";
import { User } from "@internals/types";

function App() {
    const { country, setCountry, currency, setCurrency } = useGetLocalizationData();

    const [userId, setUserId] = useState("");
    const [userType, setUserType] = useState(User.GUEST);

    return (
        <UserContext.Provider value={{ userId, setUserId, userType, setUserType }}>
            <CountryContext.Provider value={{ country, setCountry, currency, setCurrency }}>
                <div className="App">
                    <URLModal
                        modals={{
                            addLesson: AddLesson,
                            addCourse: AddCourse,
                            addReview: AddReview
                        }}
                    />
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
