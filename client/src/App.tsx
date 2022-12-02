import { Route, Routes } from "react-router-dom";
import { URLModal } from "react-url-modal";

import { CountryContext, UserContext } from "@internals/contexts";
import { useGetLocalizationData, useGetUserType } from "@internals/hooks";
import {
    AddLesson,
    AddCourse,
    AddPromotion,
    AddReview,
    EditCourse,
    ViewAndAcceptContract,
    EditLesson
} from "@internals/modals";
import {
    Home,
    CorporateTrainee,
    IndividualTrainee,
    Course,
    Login,
    MyCourses,
    CreateExercise,
    Exercise,
    PasswordReset,
    ForgotPassword,
    Profile
} from "@internals/pages";

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
                            addPromotion: AddPromotion,
                            editCourse: EditCourse,
                            editLesson: EditLesson,
                            viewAndAcceptContract: ViewAndAcceptContract
                        }}
                    />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/me/profile" element={<Profile />} />
                        <Route path="courses/:courseId" element={<Course />} />
                        <Route path="corporate-trainee" element={<CorporateTrainee />} />
                        <Route path="individual-trainee" element={<IndividualTrainee />} />

                        <Route path="/auth/login" element={<Login />} />
                        <Route path="/auth/reset" element={<PasswordReset />} />
                        <Route path="/auth/forgot" element={<ForgotPassword />} />

                        <Route path="me/courses" element={<MyCourses />} />
                        <Route path="courses/:courseId/lessons/:lessonId/exercise" element={<CreateExercise />} />
                        <Route
                            path="courses/:courseId/lessons/:lessonId/exercises/:exerciseId"
                            element={<Exercise />}
                        />
                    </Routes>
                </div>
            </CountryContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
