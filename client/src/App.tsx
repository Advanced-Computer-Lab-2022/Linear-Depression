import { Outlet, Route, Routes } from "react-router-dom";
import { URLModal } from "react-url-modal";

import { Footer } from "./components";
import AuthHandler from "./components/AuthHandler";
import ViewMySettlements from "./components/modals/ViewMySettlements";
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
    EditProfile,
    ViewMyWallet,
    DeleteCourse,
    DeleteLesson,
    DeleteExercise
} from "@internals/modals";
import {
    Home,
    Course,
    Login,
    MyCourses,
    CreateExercise,
    Exercise,
    Lesson,
    PasswordReset,
    ForgotPassword,
    Profile,
    ChangePassword,
    NewReport,
    AllReports,
    ReportThread,
    Register,
    PaymentCancelled,
    PaymentSuccess,
    PrivacyPolicy,
    NotFound,
    AboutUs // Footer
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
                        viewAndAcceptContract: ViewAndAcceptContract,
                        viewMySettlements: ViewMySettlements,
                        viewMyWallet: ViewMyWallet,
                        deleteCourse: DeleteCourse,
                        deleteLesson: DeleteLesson,
                        deleteExercise: DeleteExercise
                    }}
                />
                <Routes>
                    <Route element={<AuthHandler />}>
                        <Route element={<LayoutWithFooter />}>
                            <Route path="/" element={<Home />} />
                            <Route path="courses/:courseId" element={<Course />} />
                            <Route path="/auth/login" element={<Login />} />
                            <Route path="/auth/register" element={<Register />} />
                            <Route path="/auth/reset" element={<PasswordReset />} />
                            <Route path="/auth/forgot" element={<ForgotPassword />} />
                            <Route path="/payment/cancel" element={<PaymentCancelled />} />
                            <Route path="/payment/success/:courseId" element={<PaymentSuccess />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="/about-us" element={<AboutUs />} />
                            <Route
                                element={
                                    <AuthHandler
                                        roles={[User.INSTRUCTOR, User.CORPORATE_TRAINEE, User.INDIVIDUAL_TRAINEE]}
                                    />
                                }
                            >
                                <Route path="/me/profile" element={<Profile />} />
                                <Route path="/auth/change" element={<ChangePassword />} />
                                <Route path="me/courses" element={<MyCourses />} />
                                <Route
                                    path="courses/:courseId/lessons/:lessonId/exercises/:exerciseId"
                                    element={<Exercise />}
                                />
                                <Route path="/me/reports/new" element={<NewReport />} />
                                <Route path="/me/reports" element={<AllReports />} />
                                <Route path="/me/reports/:reportId" element={<ReportThread />} />
                            </Route>

                            <Route element={<AuthHandler roles={[User.INSTRUCTOR]} />}>
                                <Route
                                    path="courses/:courseId/lessons/:lessonId/exercise"
                                    element={<CreateExercise />}
                                />
                            </Route>

                            <Route element={<AuthHandler roles={[User.CORPORATE_TRAINEE, User.INDIVIDUAL_TRAINEE]} />}>
                                <Route path="courses/:courseId/lessons/:lessonId" element={<Lesson />} />
                            </Route>

                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Route>
                </Routes>
            </div>
        </CountryContext.Provider>
    );
}

const LayoutWithFooter = () => {
    return (
        <>
            <div
                style={{
                    minHeight: "calc(100vh - 100px)"
                }}
            >
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default App;
