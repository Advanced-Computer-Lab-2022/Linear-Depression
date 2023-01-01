# Contributing

Contributions are always welcome!

## Getting Started

1. Fork the repository
2. Clone the repository
3. Install dependencies
4. Create a new branch
5. Make your changes
6. Commit and push your changes
7. Create a pull request
8. Wait for your pull request to be reviewed and merged

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/). Please read the [full text](https://www.contributor-covenant.org/version/2/0/code_of_conduct/) so that you can understand what actions will and will not be tolerated.

## Project Structure

```bash
.
├── client
│   ├── craco.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── README.md
│   ├── src
│   │   ├── api
│   │   │   ├── endpoints.ts
│   │   │   ├── index.ts
│   │   │   └── report
│   │   │   ├── addReport.ts
│   │   │   ├── addThreadReply.ts
│   │   │   ├── getReport.ts
│   │   │   ├── getUserReports.ts
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── components
│   │   │   ├── AuthHandler.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── CircularProgressBar.tsx
│   │   │   ├── Copyright.tsx
│   │   │   ├── course
│   │   │   │   ├── courseContent
│   │   │   │   │   ├── ContentAccordion.css
│   │   │   │   │   ├── ContentAccordion.tsx
│   │   │   │   │   └── ContentItem.tsx
│   │   │   │   ├── CourseContent.tsx
│   │   │   │   ├── courseHeader
│   │   │   │   │   ├── CourseActions.tsx
│   │   │   │   │   ├── courseInfo
│   │   │   │   │   │   └── BadgeRatedEnrolled.tsx
│   │   │   │   │   └── CourseInfo.tsx
│   │   │   │   ├── CourseHeader.tsx
│   │   │   │   └── CourseReviews.tsx
│   │   │   ├── CourseNavbar.tsx
│   │   │   ├── CoursePrice.tsx
│   │   │   ├── coursesListWithFilters
│   │   │   │   ├── BrowseBy.tsx
│   │   │   │   ├── coursesList
│   │   │   │   │   └── CourseCard.tsx
│   │   │   │   ├── CoursesList.tsx
│   │   │   │   ├── filter
│   │   │   │   │   ├── PriceFilter.tsx
│   │   │   │   │   ├── RatingFilter.tsx
│   │   │   │   │   └── SubjectsFilter.tsx
│   │   │   │   └── Filter.tsx
│   │   │   ├── CoursesListWithFilters.tsx
│   │   │   ├── exercise
│   │   │   │   ├── Header.ts
│   │   │   │   ├── QuestionCard.ts
│   │   │   │   ├── QuestionTitle.ts
│   │   │   │   ├── SolvedQuestion.tsx
│   │   │   │   ├── SubmitButton.ts
│   │   │   │   ├── Title.ts
│   │   │   │   └── TotalGrade.tsx
│   │   │   ├── FloatingButton.ts
│   │   │   ├── GroupRadioButton.tsx
│   │   │   ├── index.ts
│   │   │   ├── modals
│   │   │   │   ├── AddCourse.tsx
│   │   │   │   ├── AddExercise.tsx
│   │   │   │   ├── AddLesson.tsx
│   │   │   │   ├── AddPromotion.tsx
│   │   │   │   ├── AddQuestion.tsx
│   │   │   │   ├── AddReview.tsx
│   │   │   │   ├── EditCourse.tsx
│   │   │   │   ├── EditLesson.tsx
│   │   │   │   ├── EditProfile.tsx
│   │   │   │   ├── index.ts
│   │   │   │   ├── ViewAndAcceptContract.tsx
│   │   │   │   └── ViewMySettlements.tsx
│   │   │   ├── navbar
│   │   │   │   ├── CountrySelect.tsx
│   │   │   │   └── Navbar.css
│   │   │   ├── Navbar.tsx
│   │   │   ├── OptionsButton.tsx
│   │   │   ├── report
│   │   │   │   ├── index.ts
│   │   │   │   ├── listing
│   │   │   │   │   ├── table
│   │   │   │   │   │   ├── BodyContainer.tsx
│   │   │   │   │   │   ├── Header.tsx
│   │   │   │   │   │   └── Row.tsx
│   │   │   │   │   └── TableContainer.tsx
│   │   │   │   ├── new
│   │   │   │   │   ├── Form.tsx
│   │   │   │   │   └── HorizontalCourseCard.tsx
│   │   │   │   ├── PageContainter.tsx
│   │   │   │   ├── PageHeader.tsx
│   │   │   │   └── thread
│   │   │   │   ├── Author.tsx
│   │   │   │   ├── CardContainer.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Container.tsx
│   │   │   │   ├── ReplyForm.tsx
│   │   │   │   └── SubjectDivider.tsx
│   │   │   ├── ReviewItem.tsx
│   │   │   ├── SimpleAccordion.tsx
│   │   │   └── VideoPlayer.tsx
│   │   ├── config
│   │   │   └── config.ts
│   │   ├── contexts
│   │   │   ├── AuthProvider.tsx
│   │   │   ├── CountryContext.ts
│   │   │   ├── index.ts
│   │   │   └── ToastProvider.tsx
│   │   ├── hooks
│   │   │   ├── course
│   │   │   │   ├── index.ts
│   │   │   │   ├── useFetchAllCourses.ts
│   │   │   │   ├── useFetchCourseById.ts
│   │   │   │   ├── useFetchMyCourses.ts
│   │   │   │   └── useFetchSubjects.ts
│   │   │   ├── enrollment
│   │   │   │   ├── index.ts
│   │   │   │   └── useFetchMyEnrollment.ts
│   │   │   ├── exercise
│   │   │   │   ├── index.ts
│   │   │   │   ├── useFetchEvaluation.ts
│   │   │   │   └── useFetchExerciseById.ts
│   │   │   ├── index.ts
│   │   │   ├── instructor
│   │   │   │   ├── index.ts
│   │   │   │   └── useGetInstructorContractStatus.ts
│   │   │   ├── lesson
│   │   │   │   ├── index.ts
│   │   │   │   └── useFetchLessonById.ts
│   │   │   ├── localization
│   │   │   │   ├── index.ts
│   │   │   │   └── useGetLocalizationData.ts
│   │   │   ├── note
│   │   │   │   ├── index.ts
│   │   │   │   └── useFetchMyNote.ts
│   │   │   ├── profile
│   │   │   │   ├── index.ts
│   │   │   │   └── useFetchProfile.ts
│   │   │   ├── report
│   │   │   │   ├── index.ts
│   │   │   │   ├── useFetchReports.ts
│   │   │   │   └── useFetchThread.ts
│   │   │   ├── request
│   │   │   │   ├── index.ts
│   │   │   │   ├── useFetchMyAccessRequest.ts
│   │   │   │   └── useFetchMyRefundRequest.ts
│   │   │   ├── review
│   │   │   │   ├── index.ts
│   │   │   │   ├── useFetchCourseReviews.ts
│   │   │   │   ├── useFetchMyReviews.ts
│   │   │   │   └── useFetchMyReviewSubmission.ts
│   │   │   ├── settlements
│   │   │   │   ├── index.ts
│   │   │   │   └── useFetchMySettlements.ts
│   │   │   ├── useAuth.ts
│   │   │   └── useToast.ts
│   │   ├── index.css
│   │   ├── index.tsx
│   │   ├── media
│   │   │   └── country-currency.json
│   │   ├── pages
│   │   │   ├── auth
│   │   │   │   ├── ChangePassword.tsx
│   │   │   │   ├── ForgotPassword.tsx
│   │   │   │   ├── Login.tsx
│   │   │   │   ├── PasswordReset.tsx
│   │   │   │   └── Register.tsx
│   │   │   ├── CorporateTraineeProfile.tsx
│   │   │   ├── Course.tsx
│   │   │   ├── CreateExercise.tsx
│   │   │   ├── Exercise.tsx
│   │   │   ├── home
│   │   │   │   └── AllCourses.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── index.ts
│   │   │   ├── IndividualTraineeProfile.tsx
│   │   │   ├── InstructorCourse.tsx
│   │   │   ├── InstructorExercise.tsx
│   │   │   ├── instructorProfile
│   │   │   │   ├── MyReviews.tsx
│   │   │   │   └── ViewProfile.tsx
│   │   │   ├── InstructorProfile.tsx
│   │   │   ├── lesson
│   │   │   │   └── Note.tsx
│   │   │   ├── Lesson.tsx
│   │   │   ├── MyCourses.tsx
│   │   │   ├── payment
│   │   │   │   ├── Cancelled.tsx
│   │   │   │   ├── index.ts
│   │   │   │   └── Success.tsx
│   │   │   ├── PrivacyPolicy.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── report
│   │   │   │   ├── List.tsx
│   │   │   │   ├── New.tsx
│   │   │   │   └── Thread.tsx
│   │   │   └── TraineeExercise.tsx
│   │   ├── redux
│   │   │   ├── features
│   │   │   │   ├── course
│   │   │   │   │   └── courseSlice.ts
│   │   │   │   ├── courseList
│   │   │   │   │   └── coursesListSlice.ts
│   │   │   │   ├── enrollment
│   │   │   │   │   └── enrollmentSlice.ts
│   │   │   │   ├── profile
│   │   │   │   │   └── profileSlice.ts
│   │   │   │   └── subjects
│   │   │   │   └── subjectSlice.ts
│   │   │   ├── index.ts
│   │   │   └── store.ts
│   │   ├── reportWebVitals.ts
│   │   ├── services
│   │   │   ├── auth
│   │   │   │   ├── changePassword.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── login.ts
│   │   │   │   ├── logout.ts
│   │   │   │   ├── performPasswordReset.ts
│   │   │   │   ├── refresh.ts
│   │   │   │   ├── register.ts
│   │   │   │   ├── sendForgotPasswordRequest.ts
│   │   │   │   └── validatePasswordResetToken.ts
│   │   │   ├── course
│   │   │   │   ├── addCourse.ts
│   │   │   │   ├── addPromotion.ts
│   │   │   │   ├── editCourse.ts
│   │   │   │   ├── fetchAllCourses.ts
│   │   │   │   ├── fetchCourseById.ts
│   │   │   │   ├── fetchMyCourses.ts
│   │   │   │   ├── fetchSubjects.ts
│   │   │   │   └── index.ts
│   │   │   ├── enrollment
│   │   │   │   ├── downloadCertificate.ts
│   │   │   │   ├── enrollmentServices.ts
│   │   │   │   ├── enrollOnCourse.ts
│   │   │   │   ├── fetchMyEnrollment.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── updateEnrollment.ts
│   │   │   ├── exercise
│   │   │   │   ├── addExercise.ts
│   │   │   │   ├── fetchEvaluation.ts
│   │   │   │   ├── fetchExerciseById.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── submitExercise.ts
│   │   │   ├── index.ts
│   │   │   ├── instructor
│   │   │   │   ├── acceptInstructorContract.ts
│   │   │   │   ├── getInstructorContractStatus.ts
│   │   │   │   └── index.ts
│   │   │   ├── lesson
│   │   │   │   ├── addLesson.ts
│   │   │   │   ├── editLesson.ts
│   │   │   │   ├── fetchLessonById.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── videoServices.ts
│   │   │   ├── localization
│   │   │   │   ├── fetchCountryCode.ts
│   │   │   │   ├── getCurrency.ts
│   │   │   │   └── index.ts
│   │   │   ├── note
│   │   │   │   ├── addNote.ts
│   │   │   │   ├── downloadPDF.ts
│   │   │   │   ├── editNote.ts
│   │   │   │   ├── fetchMyNote.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── saveAsPDF.ts
│   │   │   ├── payment
│   │   │   │   ├── index.ts
│   │   │   │   └── payment.ts
│   │   │   ├── profile
│   │   │   │   ├── editProfile.ts
│   │   │   │   ├── fetchProfile.ts
│   │   │   │   └── index.ts
│   │   │   ├── request
│   │   │   │   ├── cancelRefundRequest.ts
│   │   │   │   ├── fetchMyAccessRequest.ts
│   │   │   │   ├── fetchMyRefundRequest.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── sendAccessRequest.ts
│   │   │   │   └── sendRefundRequest.ts
│   │   │   ├── review
│   │   │   │   ├── addCourseReview.ts
│   │   │   │   ├── addInstructorReview.ts
│   │   │   │   ├── fetchCourseReviews.ts
│   │   │   │   ├── fetchMyReviewForCourse.ts
│   │   │   │   ├── fetchMyReviewForInstructor.tsx
│   │   │   │   ├── fetchMyReviews.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── updateCourseReview.ts
│   │   │   │   └── updateInstructorReview.ts
│   │   │   └── settlements
│   │   │   ├── fetchMySettlements.ts
│   │   │   └── index.ts
│   │   ├── types
│   │   │   ├── AccessRequest.ts
│   │   │   ├── auth
│   │   │   │   ├── index.ts
│   │   │   │   ├── login.ts
│   │   │   │   └── register.ts
│   │   │   ├── Country.ts
│   │   │   ├── Course.ts
│   │   │   ├── Enrollment.ts
│   │   │   ├── enums
│   │   │   │   ├── index.ts
│   │   │   │   ├── ReportStatus.ts
│   │   │   │   ├── ReportType.ts
│   │   │   │   └── UserType.ts
│   │   │   ├── Evaluation.ts
│   │   │   ├── Exercise.ts
│   │   │   ├── FormProps.ts
│   │   │   ├── index.ts
│   │   │   ├── Instructor.ts
│   │   │   ├── Lesson.ts
│   │   │   ├── Note.ts
│   │   │   ├── Profile.ts
│   │   │   ├── Promotion.ts
│   │   │   ├── Question.ts
│   │   │   ├── RefundRequest.ts
│   │   │   ├── report
│   │   │   │   ├── index.ts
│   │   │   │   ├── ReportFormProps.ts
│   │   │   │   ├── ReportThread.ts
│   │   │   │   └── Report.ts
│   │   │   ├── ReviewSubmission.ts
│   │   │   ├── Review.ts
│   │   │   └── User.ts
│   │   └── utils
│   │   ├── index.ts
│   │   └── validateFormData.ts
│   ├── tsconfig.json
│   └── tsconfig.paths.json
├── contributing.md
├── docs
│   ├── AdminDashboard.png
│   └── APIDocs.png
├── LICENSE
├── README.md
└── server
├── babel.config.js
├── jest.config.ts
├── package.json
├── package-lock.json
├── public < -- public static files (images, fonts, etc.)
│   ├── admin
│   │   └── css
│   │   └── dashboard.css
│   ├── assets
│   │   ├── qr.png
│   │   └── winners.png
│   ├── certificates
│   │   ├── 63a5dd8a26d81baf0958bb2e.pdf
│   │   ├── 63a6000d6828d41508671a8d.pdf
│   │   ├── 63a6050cd7ed49254b880181.pdf
│   ├── fonts
│   │   ├── NotoSansJP-Bold.otf
│   │   ├── NotoSansJP-Light.otf
│   │   └── NotoSansJP-Regular.otf
│   └── notes
│   ├── 63a225e117897bfd964a8417.pdf
│   └── 63a89405c0fa640e7e80b26f.pdf
├── src
│   ├── admin
│   │   ├── components
│   │   │   ├── AddPromotion.tsx
│   │   │   └── dashboard.tsx
│   │   ├── config.ts
│   │   ├── hooks
│   │   │   └── hashPasswordInPayload.ts
│   │   ├── index.ts
│   │   ├── locale
│   │   │   └── en
│   │   │   ├── index.ts
│   │   │   └── report.json
│   │   └── resources
│   │   ├── AccessRequest.ts
│   │   ├── Admin.ts
│   │   ├── CorporateTrainee.ts
│   │   ├── Course.ts
│   │   ├── IndividualTrainee.ts
│   │   ├── Instructor.ts
│   │   ├── RefundRequest.ts
│   │   ├── Report.ts
│   │   └── User.ts
│   ├── config
│   │   └── config.ts
│   ├── controllers <--- API Controllers
│   │   ├── AccessRequest.ts
│   │   ├── Auth.ts
│   │   ├── CorporateTrainee.ts
│   │   ├── CourseRating.ts
│   │   ├── Course.ts
│   │   ├── Currency.ts
│   │   ├── Enrollment.ts
│   │   ├── Exercise.ts
│   │   ├── IndividualTrainee.ts
│   │   ├── InstructorRating.ts
│   │   ├── Instructor.ts
│   │   ├── Lesson.ts
│   │   ├── Note.ts
│   │   ├── PasswordResetToken.ts
│   │   ├── Payment.ts
│   │   ├── Profile.ts
│   │   ├── Promotion.ts
│   │   ├── RefundRequest.ts
│   │   ├── Report.ts
│   │   ├── Settlement.ts
│   │   └── UserType.ts
│   ├── enums
│   │   └── UserTypes.ts
│   ├── media
│   │   ├── country-currency.json
│   │   └── currency-rates.json
│   ├── middleware <----------------- Middlewares are here
│   │   ├── logger.ts
│   │   ├── permissions <----------------- Middlewares Permissions are here
│   │   │   ├── isAuthenticated.ts
│   │   │   ├── isAuthorized.ts
│   │   │   ├── isCourseOwner.ts
│   │   │   ├── isEnrolled.ts
│   │   │   ├── isOwnerOrEnrolled.ts
│   │   │   └── isRatingOwner.ts
│   │   └── rateLimiter.ts
│   ├── models <----------------- Models are here
│   │   ├── AccessRequest.ts
│   │   ├── Admin.ts
│   │   ├── Answer.ts
│   │   ├── CorporateTrainee.ts
│   │   ├── Course.ts
│   │   ├── Enrollment.ts
│   │   ├── Exercise.ts
│   │   ├── IndividualTrainee.ts
│   │   ├── Instructor.ts
│   │   ├── Lesson.ts
│   │   ├── Note.ts
│   │   ├── PasswordResetToken.ts
│   │   ├── Promotion.ts
│   │   ├── Rating.ts
│   │   ├── RefundRequest.ts
│   │   ├── ReportThread.ts
│   │   ├── Report.ts
│   │   ├── Settlement.ts
│   │   ├── Trainee.ts
│   │   └── User.ts
│   ├── routes <----------------- Routes are here
│   │   ├── Auth.ts
│   │   ├── CorporateTrainee.ts
│   │   ├── Course.ts
│   │   ├── Currency.ts
│   │   ├── Enrollment.ts
│   │   ├── IndividualTrainee.ts
│   │   ├── Instructor.ts
│   │   ├── Me.ts
│   │   ├── Payment.ts
│   │   ├── Promotion.ts
│   │   └── UserType.ts
│   ├── server.ts
│   ├── services
│   │   ├── certificateService.ts
│   │   ├── CourseServices.ts
│   │   ├── emails <----------------- Email services are here
│   │   │   ├── accessRequests
│   │   │   │   ├── sendAccessRequestApprovalEmail.ts
│   │   │   │   ├── sendAccessRequestCreationEmail.ts
│   │   │   │   └── sendAccessRequestRejectionEmail.ts
│   │   │   ├── refundRequests
│   │   │   │   ├── sendRefundRequestApprovalEmail.ts
│   │   │   │   ├── sendRefundRequestCreationEmail.ts
│   │   │   │   └── sendRefundRequestRejectionEmail.ts
│   │   │   ├── sendCertificateEmail.ts
│   │   │   ├── sendEnrollmentEmail.ts
│   │   │   ├── sendMailService.ts
│   │   │   ├── sendPasswordResetEmail.ts
│   │   │   └── templates <----------------- Email templates are here
│   │   │   ├── accessRequestApproval.html
│   │   │   ├── accessRequestCreation.html
│   │   │   ├── accessRequestRejection.html
│   │   │   ├── certificateUponCompletion.html
│   │   │   ├── instructorCredit.html
│   │   │   ├── partials
│   │   │   │   ├── footer.html
│   │   │   │   └── header.html
│   │   │   ├── passwordResetEmail.html
│   │   │   ├── refundRequestApproval.html
│   │   │   ├── refundRequestCreation.html
│   │   │   └── refundRequestRejection.html
│   │   ├── EnrollmentCreateServices.ts
│   │   ├── PasswordResetTokenServices.ts
│   │   ├── SettlementService.ts
│   │   ├── UserServices.ts
│   │   └── videoServices.ts
│   ├── start.ts
│   ├── swagger.json
│   ├── swagger.ts <------------------ Swagger Generation ------------------
│   ├── tasks
│   │   └── cacheCurrencyRates.ts
│   ├── tests <------------------ Tests ------------------
│   │   ├── test_apis <------------------ API Tests ------------------
│   │   │   ├── course
│   │   │   │   └── course.test.ts
│   │   │   ├── course_ratings
│   │   │   │   └── rating.test.ts
│   │   │   ├── example.test.ts
│   │   │   ├── instructor
│   │   │   │   └── instructor.test.ts
│   │   │   ├── instructor_ratings
│   │   │   │   └── instructor_ratings.test.ts
│   │   │   └── trainee
│   │   │   ├── corporateTrainee.test.ts
│   │   │   └── individualTrainee.test.ts
│   │   ├── test_models <------------------ Model Tests ------------------
│   │   │   ├── answer
│   │   │   │   ├── answer.test.ts
│   │   │   │   └── factory.ts <------------------ Factory ------------------
│   │   │   ├── course
│   │   │   │   ├── course.test.ts
│   │   │   │   └── factory.ts
│   │   │   ├── enrollment
│   │   │   │   └── factory.ts
│   │   │   ├── exercise
│   │   │   │   ├── exercise.test.ts
│   │   │   │   └── factory.ts
│   │   │   ├── instructor
│   │   │   │   ├── factory.ts
│   │   │   │   └── instructor.test.ts
│   │   │   ├── lesson
│   │   │   │   ├── factory.ts
│   │   │   │   └── lesson.test.ts
│   │   │   ├── rating
│   │   │   │   ├── factory.ts
│   │   │   │   └── rating.test.ts
│   │   │   ├── trainee
│   │   │   │   ├── factory.ts
│   │   │   │   └── trainee.test.ts
│   │   │   └── userFactory.ts
│   │   ├── test_services <------------------ Service Tests ------------------
│   │   │   └── CourseService.test.ts
│   │   └── test_utils
│   │   └── modelUtilities.test.ts
│   └── utils
│   ├── auth
│   │   └── token.ts
│   ├── loadModelsUtil.ts
│   ├── parseQueryParams.ts
│   ├── populateTestDb.ts
│   └── testUtilities.ts
└── tsconfig.json
```
