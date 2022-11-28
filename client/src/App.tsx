import { Routes, Route } from "react-router-dom";
import { URLModal } from "react-url-modal";

import { Navbar } from "@internals/components";
import { CountryContext, UserContext } from "@internals/contexts";
import { useGetLocalizationData, useGetUserType } from "@internals/hooks";
import { AddLesson, AddCourse, AddPromotion, AddReview } from "@internals/modals";
import { Home, CorporateTrainee, IndividualTrainee, Course, Login, MyCourses, Exercise } from "@internals/pages";

function App() {
    const { country, setCountry, currency, setCurrency } = useGetLocalizationData();
    const { userType, setUserType } = useGetUserType();

    return (
        <UserContext.Provider value={{ userType, setUserType }}>
            <CountryContext.Provider value={{ country, setCountry, currency, setCurrency }}>
                <div className="App">
                    <URLModal
                        modals={{
                            addLesson: AddLesson,
                            addCourse: AddCourse,
                            addReview: AddReview,
                            addPromotion: AddPromotion
                        }}
                    />
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="courses/:courseId" element={<Course />} />
                        <Route path="corporate-trainee" element={<CorporateTrainee />} />
                        <Route path="individual-trainee" element={<IndividualTrainee />} />
                        <Route path="login" element={<Login />} />
                        <Route path="me/courses" element={<MyCourses />} />
                        <Route path="courses/:courseId/lessons/:lessonId/exercise" element={<Exercise />} />
                    </Routes>
                </div>
            </CountryContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
