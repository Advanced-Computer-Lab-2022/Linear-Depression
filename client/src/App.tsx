import { Route, Routes } from "react-router-dom";
import { URLModal } from "react-url-modal";

import AuthHandler from "./components/AuthHandler";
import { User } from "./types";
import { CountryContext } from "@internals/contexts";
import { useGetLocalizationData } from "@internals/hooks";
import {
    AddLesson,
    AddCourse,
    AddPromotion,
    AddReview,
    EditCourse,
    ViewAndAcceptContract,
    EditLesson,
    EditProfile
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
    Lesson,
    PasswordReset,
    ForgotPassword,
    Profile,
    ChangePassword
} from "@internals/pages";

function App() {
    const { country, setCountry, currency, setCurrency } = useGetLocalizationData();

    return (
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
                        editProfile: EditProfile,
                        viewAndAcceptContract: ViewAndAcceptContract
                    }}
                />
                <Routes>
                    <Route element={<AuthHandler />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/me/profile" element={<Profile />} />
                        <Route element={<AuthHandler roles={[User.INSTRUCTOR]} />}>
                            <Route path="courses/:courseId" element={<Course />} />
                        </Route>
                        <Route path="corporate-trainee" element={<CorporateTrainee />} />
                        <Route path="individual-trainee" element={<IndividualTrainee />} />

                        <Route path="/auth/login" element={<Login />} />
                        <Route path="/auth/reset" element={<PasswordReset />} />
                        <Route path="/auth/forgot" element={<ForgotPassword />} />
                        <Route path="/auth/change" element={<ChangePassword />} />

                        <Route path="me/courses" element={<MyCourses />} />
                        <Route path="courses/:courseId/lessons/:lessonId/exercise" element={<CreateExercise />} />
                        <Route
                            path="courses/:courseId/lessons/:lessonId/exercises/:exerciseId"
                            element={<Exercise />}
                        />
                        <Route path="courses/:courseId/lessons/:lessonId" element={<Lesson />} />
                    </Route>
                </Routes>
            </div>
        </CountryContext.Provider>
    );
}

export default App;
