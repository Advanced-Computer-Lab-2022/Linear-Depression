# Linear-Depression

An implementation of full stack web application using the MERN stack. The application is a platform for users to manage an online learning platform. The application is built using the `MERN` stack.

## Badges

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## Motivation 🔥


This project was created for The GUC `CSEN704 Advanced Computer lab` The lab is a project-based course that aims to teach students

-   Scrum and Agile methodologies
-   Software development best practices
-   Software development tools and techniques
-   Software development process
-   Software Testing
-   latest backend and frontend technologies

## Build Status 🔨

![example workflow](https://github.com/Advanced-Computer-Lab-2022/Linear-Depression/actions/workflows/test.yml/badge.svg)

-   The project is currently in development.
-   The Unit tests needs modifications.
-   A CI/CD pipeline needs to be migrated to Jenkins.
-   A caching layer needs to be added to the application.
-   A message broker needs to be added to the application to handle asynchronous tasks such as sending emails and notifications.

## Code Style 📜

The code style is enforced using `eslint` and `prettier`. The code style is enforced using `pre-commit` hooks and `pre-commit github action.`

### Pre-commit

The pre-commit hook is managed by pre-commit. It is a versatile way of managing the pre-commit tool but it also permits you to run the script on arbitrary files without committing. The module will take charge of installing your required dependencies (such as code-style tools: prettier, eslint, etc.) and will run them on the files you want to commit.

Install pre-commit package by running

```bash
> pip install pre-commit
```

Once installed, run the following for a one-time setup

```bash
> pre-commit install
```

Afterwards, the hook should run the next commit you will attempt!

## Screenshots 🖵

![image](https://user-images.githubusercontent.com/82768721/210187997-797355b5-106f-4efd-b75d-ee809ebfa7c1.png)

![image](https://user-images.githubusercontent.com/82768721/210188000-36b95d03-6d96-4af7-b5ff-fc8a227fd24d.png)

![image](https://user-images.githubusercontent.com/82768721/210188002-6b651151-74c4-45b9-9684-f6da660cc915.png)

![image](https://user-images.githubusercontent.com/82768721/210188187-b1724bf4-1247-4b46-a470-53f431fd82b6.png)

![image](https://user-images.githubusercontent.com/82768721/210188013-cf33cf2f-f473-4e47-a98e-9bec634a1afb.png)

![image](https://user-images.githubusercontent.com/82768721/210188015-7711fce7-d410-4258-b5d3-82dca97f9381.png)

![image](https://user-images.githubusercontent.com/82768721/210188023-0ba2b3fe-368a-484c-8471-bd8d57765744.png)

![image](https://user-images.githubusercontent.com/82768721/210188031-9c6287c2-8a9e-4b27-8471-7a6b283b5d73.png)

![image](https://user-images.githubusercontent.com/82768721/210188208-793cb897-06bc-4940-834b-5320ae511056.png)

![image](https://user-images.githubusercontent.com/82768721/210188033-3da8e7e4-bb1a-4c85-8d82-811ed1481e53.png)

![image](https://user-images.githubusercontent.com/82768721/210188036-fb6e5356-13ee-4104-b6f8-d0c1165a52e5.png)

![image](https://user-images.githubusercontent.com/82768721/210188040-2e2b80e6-0d54-4077-b2f0-414ddcd30c6c.png)

![image](https://user-images.githubusercontent.com/82768721/210188044-d69bc4cc-a8f9-4f95-96b4-6ac5e4903d5c.png)



## Tech/Framework used 🧰

-   [React](https://reactjs.org/)
-   [Redux](https://redux.js.org/)
-   [Node.js](https://nodejs.org/en/)
-   [Express](https://expressjs.com/)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [Jest](https://jestjs.io/)
-   [Swagger](https://swagger.io/)
-   [Material-UI](https://material-ui.com/)
-   [Stripe](https://stripe.com/)
-   [Typescript](https://www.typescriptlang.org/)
-   [Git](https://git-scm.com/)
-   [Github Actions](github.com/features/actions)
-   [NodeMailer](https://nodemailer.com/about/)
-   [Handlebars](https://handlebarsjs.com/)
-   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
-   [Postman](https://www.postman.com/)
-   [VSCode](https://code.visualstudio.com/)
-   [Pre-commit](https://pre-commit.com/)
-   [Mailtrap](https://mailtrap.io/)

## Features ✨

-   User Authentication
-   User Roles
-   User Profile
-   User Courses
-   User Payments
-   User Notifications
-   User Email Notifications
-   User Password Reset
-   REST API
-   REST API Documentation
-   Admin Dashboard
-   Admin Dashboard Authentication
-   Admin Dashboard Users
-   Refund Policy
-   Corporate Policy
-   Terms and Conditions
-   Fuzzy Search
-   Caching
-   Rate Limiting
-   Rating System
-   Reporting System
-

## Code Examples 🐱‍💻

```typescript
import { sendEmail } from "./sendMailService";

export const sendCertificateEmail = async (email: string, courseName: string, certificatePath: string) => {
    const context = {
        courseName: courseName,
        email: email
    };
    const attachments = [
        {
            filename: "certificate.pdf",
            path: certificatePath,
            contentType: "application/pdf"
        }
    ];
    sendEmail(email, context, "certificateUponCompletion", "Linear Depression | Congrats 🎉", attachments);
};
```
```typescript
courseSchema.methods.close = async function (this: ICourseModel) {
    if (this.status !== CourseStatus.PUBLISHED) {
        throw new Error("Invalid Transition, course must be published to be closed");
    }
    this.status = CourseStatus.CLOSED;
    await this.save();
};

courseSchema.methods.publish = async function (this: ICourseModel) {
    if (this.status !== CourseStatus.DRAFT) {
        throw new Error("Invalid Transition, course must be draft to be published");
    }
    this.status = CourseStatus.PUBLISHED;
    await this.save();
};

courseSchema.methods.reOpen = async function (this: ICourseModel) {
    if (this.status !== CourseStatus.CLOSED) {
        throw new Error("Invalid Transition, course must be closed to be re-opened");
    }
    this.status = CourseStatus.PUBLISHED;
    await this.save();
};
```
```typescript
const rateLimiter = (requestsPerMinute: number = 120) => {
    return rateLimit({
        windowMs: 60 * 1000, // 1 minute
        max: requestsPerMinute, // Limit each IP to n requests per `window` per minute
        message: { message: `Too many requests from this IP, please try again after a 60 second pause` },
        handler: (req: Request, res: Response, next: NextFunction, options: any) => {
            res.status(options.statusCode).send(options.message);
        },
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false // Disable the `X-RateLimit-*` headers
    });
};
```
```typescript
const CourseNavbar: React.FC = () => {
    const course = useAppSelector((state) => state.course);
    useFetchMyEnrollment(course.data?._id);
    const enrollment = useAppSelector((state) => state.enrollment);

    const navigate = useNavigate();

    const handleDownloadCertificate = () => {
        downloadCertificate(enrollment.data?._id);
    };

    return (
        <HorizontalContainer>
            <NavItem>
                <Image src={logo} alt="logo" onClick={() => navigate("/")} />
            </NavItem>
            <CustomDivider orientation="vertical" flexItem />
            <NavItem>
                <ArrowBackIcon sx={{ marginRight: "10px" }} />
                <Link className="navbar-brand" to={`/courses/${course.data?._id}`}>
                    {course.data?.title}
                </Link>
            </NavItem>
            {enrollment.data && (
                <ProgressContainer>
                    <NavItem>{enrollment.data && <CircularProgressBar value={enrollment.data?.progress} />}</NavItem>
                    {enrollment.data?.progress === 100 ? (
                        <Button
                            sx={{
                                color: "white",
                                textTransform: "none"
                            }}
                            onClick={handleDownloadCertificate}
                        >
                            Get Certificate
                        </Button>
                    ) : (
                        "Your Progress"
                    )}
                </ProgressContainer>
            )}
        </HorizontalContainer>
    );
};
```

## Running Tests 🧪

The testing is done using `jest`. To run the tests, run the following command

```bash
> npm run test
```

## Installation 📥

Install my-project with `npm`

```bash
> git clone https://github.com/Advanced-Computer-Lab-2022/Linear-Depression
> cd Linear-Depression/
> cd server && npm i && cd -
> cd client && npm i -f && cd -
```

## Feedback 🥹

If you have any feedback, please reach out to us at [ibrahim.abouelenein@student.guc.edu.eg](mailto:ibrahim.abouelenein@student.guc.edu.eg)

## Optimizations

-   Currency rates are cached using an cron job that runs at 12 AM.
-   Asynchronous programming was used.
-   Index was used on db to optimize search

## Authors

-   [@aboueleyes](https://www.github.com/aboueleyes)
-   [@AhmedNasserG](https://www.github.com/AhmedNasserG)
-   [@ShimaaBetah](https://www.github.com/ShimaaBetah)
-   [@MohammadOTaha](https://www.github.com/MohammadOTaha)
-   [@Abdulaziz-Hassan](https://www.github.com/Abdulaziz-Hassan)

![image](https://user-images.githubusercontent.com/82768721/210188006-1dbdf795-0f3d-4d9e-ae16-fa7a832d0e3d.png)

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_API_URL`

`REACT_APP_STRIPE_PUBLISHABLE_KEY`

`MONGO_URL`

`MONGO_TEST_URL`

`SERVER_PORT`

`FRONT_END_URL`

`JWT_ACCESS_TOKEN_SECRET`

`JWT_REFRESH_TOKEN_SECRET`

`EMAIL_HOST`

`EMAIL_PORT`

`EMAIL_USER`

`EMAIL_PASSWORD`

`PASSWORD_RESET_EMAIL_FROM`

`PASSWORD_RESET_EMAIL_SUBJECT`

`EMAIL_FROM`

`STRIPE_SECRET_KEY`

`STRIPE_WEBHOOK_SECRET`

## Project Structure

<details>
<summary>Click to expand!</summary>

```bash
## Project Structure

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

</details>

## License

The software is open source under the GPL.3 License.

[GPT3](https://choosealicense.com/licenses/gpl-3.0/)

## Stripe in development mode

how to run stripe in development mode

1. update your .env file in both the client and server bu following the .env.example files
2. install the stripe cli

```bash
sudo apt install stripe # for linux
brew install stripe/stripe-cli/stripe # for mac
```

you can refer to this [documentation](https://stripe.com/docs/stripe-cli) for more information

3. login to to stripe cli using stripe api key

```bash
stripe login --api-key sk_test_example
# contact the team for the api key or use your own
```

4. run the stripe cli

```bash
stripe listen --forward-to localhost:PORT/payment/stripe-webhook
# PORT is the port you are running the server on
```

## Admin Dashboard

Access the admin dashboard by going to the following URL

```
http://localhost:PORT/admin
```

![Admin Dashboard](https://user-images.githubusercontent.com/82768721/210188231-acaaf2d2-7556-4004-afe0-fc3a3727acb5.png)


## API Documentation

The API documentation is done using swagger. To access the documentation, go to the following URL

```
http://localhost:PORT/api-docs
```

![API Documentation](docs/APIDocs.png)

### Instructor Resource

#### Get all instructors

```http
  GET /instructors
```

<details>
<summary>
Response
</summary>

```json
[
    {
        "_id": "636020ca8701caab59e5dc30",
        "firstName": "Elshimaa",
        "lastName": "Ahmed",
        "email": "shimaabetah1911@gmail.com",
        "userName": "shimaa",
        "passwordHash": "$2b$10$3rrug5dUKTgB6.seFk6vhuqFgBfV5KUvtcixDahQDBYTzTVj3XxNe",
        "__t": "Instructor",
        "__v": 5,
        "averageRating": 2.6666666666666665,
        "ratings": [
            "638ca04b782e6628906298d4",
            "638cc5130d13c06915eb4c66",
            "63ac8bc27d024a636f415c69",
            "63ac93a3264852bad3d5b0ec",
            "63ade060eca5f43cb35bbe75"
        ],
        "balance": 226.04818069639646
    },
    {
        "_id": "6362ed27802b350e006822cd",
        "firstName": "Ibrahim",
        "lastName": "Abouelenien",
        "email": "ibrahim@gmail.com",
        "userName": "ibrahim",
        "passwordHash": "$2b$10$3IEAfS7gyXKfy1fYzIIUV.hzEkUOX9t9LUTVjitoKq0cK7kSJXx.m",
        "__t": "Instructor",
        "__v": 1,
        "averageRating": 3,
        "ratings": ["638ca5430f9e6923d6fbc561"],
        "balance": 127.76157985710933
    }
]
```

</details>

#### Create Instructor

```http
  POST /instructors
```

| Headers         | Type     | Description                              |
| :-------------- | :------- | :--------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the Admin. |

| Body        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `firstName` | `string` | **Required**. firstName of instructor     |
| `lastName`  | `string` | **Required**. lastName of the instructor  |
| `email`     | `string` | **Required**. email of instructor         |
| `userName`  | `string` | **Required**. user name of the instructor |
| `password`  | `string` | **Required**. password of the instructor  |

<details>
<summary>
Response
</summary>

```json
{
    "instructor": {
        "_id": "63b20325aa432ea8fa2da329",
        "firstName": "shimaa",
        "lastName": "Ahmed",
        "email": "nkhk11@test.com",
        "userName": "shejljlmmooo",
        "passwordHash": "$2b$10$47BPoAqwAcSqNK7b5HKlKudH8/H9EdC6NL.M69cd9E6z4XIX5eW1O",
        "ratings": [],
        "averageRating": 0,
        "balance": 0,
        "__t": "Instructor",
        "__v": 0
    }
}
```

</details>

### Corporate Trainee Resource

#### Get all Corporate Trainees

```http
  GET /corporate-trainees
```

<details>
<summary>
Response
</summary>

```json
[
    {
        "enrollments": [],
        "_id": "6362ed5b802b350e006822d6",
        "firstName": "john",
        "lastName": "barker",
        "email": "john@example.com",
        "userName": "john",
        "passwordHash": "$2b$10$i5aOe7TqSsmVx8IWz7JCjOQ.ymyHdOFk.vPeUY61O1m9TZIEs3XIy",
        "courses": [],
        "gender": "male",
        "corporate": "amazon",
        "status": "ACTIVE",
        "expiredAt": "2022-11-23T22:00:00.000Z",
        "__t": "CorporateTrainee",
        "__v": 0
    },
    {
        "enrollments": [],
        "_id": "63638d2dfa52a234ba846b39",
        "firstName": "jhalskjdghajkld",
        "lastName": "jklhgakjshgd",
        "email": "asjdg@gmail.com",
        "userName": "kjashdjk",
        "passwordHash": "$2b$10$EAQbim1cSB6FcAqT0hOYFuRDEEgc/6ddc9DdlvlDAoR6ON6YzmwWa",
        "courses": [],
        "gender": "male",
        "corporate": "hjagsdhj",
        "status": "ACTIVE",
        "expiredAt": "2022-11-14T22:00:00.000Z",
        "__t": "CorporateTrainee",
        "__v": 0
    }
]
```

</details>

#### Create Corporate Trainee

```http
  POST /corporate-trainees
```

| Headers         | Type     | Description                              |
| :-------------- | :------- | :--------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the Admin. |

| Body        | Type     | Description                                          |
| :---------- | :------- | :--------------------------------------------------- |
| `firstName` | `string` | **Required**. firstName of corporate trainee         |
| `lastName`  | `string` | **Required**. lastName of the corporate trainee      |
| `email`     | `string` | **Required**. email of corporate trainee             |
| `userName`  | `string` | **Required**. user name of the corporate trainee     |
| `password`  | `string` | **Required**. password of the corporate trainee      |
| `gender`    | enum     | **Required**. gender of the corporate trainee        |
| `corporate` | `string` | **Required**. corporate of the corporate trainee     |
| `expiredAt` | `date`   | **Required** . expiration date the corporate trainee |

<details>
<summary>
Response
</summary>

```json
{
    "corporateTrainee": {
        "_id": "63b201f1aa432ea8fa2da31e",
        "firstName": "shimaa",
        "lastName": "Ahmed",
        "email": "corporate11@test.com",
        "userName": "shejlmmooo",
        "passwordHash": "$2b$10$ObuAW/UuRq2jssTt.d5gweTSYXDZEZLabda2yEh19BN8dRcdyKTxS",
        "courses": [],
        "enrollments": [],
        "gender": "female",
        "corporate": "google",
        "expiredAt": "2023-01-01T22:00:00.000Z",
        "__t": "CorporateTrainee",
        "__v": 0
    }
}
```

</details>

### Courses Resource

#### Get all Courses

```http
  GET /courses
```

<details>
<summary>
Response
</summary>

```json
[
    {
        "enrollmentsCount": 0,
        "activePromotion": null,
        "_id": "636026eb1828121ec06086ee",
        "title": "Intro to backend",
        "description": "javascript is baaaad",
        "instructor": {
            "_id": "636020ca8701caab59e5dc30",
            "firstName": "Elshimaa",
            "lastName": "Ahmed",
            "__t": "Instructor",
            "id": "636020ca8701caab59e5dc30"
        },
        "subject": "backend",
        "price": 13.31,
        "averageRating": 5,
        "ratings": [
            {
                "_id": "63ac8bc07d024a636f415c5d",
                "comment": "new review",
                "rating": 5,
                "traineeId": "63a4ce661751cf3eff56d6f7",
                "createdAt": "2022-12-28T18:32:32.458Z",
                "updatedAt": "2022-12-28T18:38:17.211Z",
                "__v": 0,
                "id": "63ac8bc07d024a636f415c5d"
            }
        ],
        "totalHours": 0,
        "discount": 0,
        "lessons": [],
        "isFree": false,
        "__v": 0,
        "thumbnail": "https://vishwaentertainers.com/wp-content/uploads/2020/04/No-Preview-Available.jpg",
        "id": "636026eb1828121ec06086ee",
        "currency": "USD"
    },
    {
        "enrollmentsCount": 0,
        "_id": "63602a05823c823dda88323b",
        "title": "python in 4 days",
        "description": "python in 3 days",
        "instructor": {
            "_id": "6362ed27802b350e006822cd",
            "firstName": "Ibrahim",
            "lastName": "Abouelenien",
            "__t": "Instructor",
            "id": "6362ed27802b350e006822cd"
        },
        "subject": "backend",
        "price": 53.24,
        "averageRating": 4,
        "ratings": [],
        "totalHours": 0,
        "discount": 0,
        "lessons": [],
        "isFree": false,
        "__v": 1,
        "activePromotion": null,
        "preview": "https://youtu.be/93KmHm4ggPo",
        "thumbnail": "https://img.youtube.com/vi/93KmHm4ggPo/0.jpg",
        "id": "63602a05823c823dda88323b",
        "currency": "USD"
    },
    {
        "enrollmentsCount": 0,
        "_id": "63602a25823c823dda883245",
        "title": "java in 3 days",
        "description": "java in 3 days",
        "instructor": {
            "_id": "636020ca8701caab59e5dc30",
            "firstName": "Elshimaa",
            "lastName": "Ahmed",
            "__t": "Instructor",
            "id": "636020ca8701caab59e5dc30"
        },
        "subject": "backend",
        "price": 266.17,
        "averageRating": 0,
        "ratings": [],
        "totalHours": 0,
        "discount": 0,
        "lessons": [],
        "isFree": false,
        "__v": 0,
        "activePromotion": null,
        "thumbnail": "https://vishwaentertainers.com/wp-content/uploads/2020/04/No-Preview-Available.jpg",
        "id": "63602a25823c823dda883245",
        "currency": "USD"
    }
]
```

</details>

#### Read Course

```http
  GET /courses/:id
```

<details>
<summary>
Response
</summary>

```json
{
    "enrollmentsCount": 0,
    "_id": "63602a25823c823dda883245",
    "title": "java in 3 days",
    "description": "java in 3 days",
    "instructor": {
        "_id": "636020ca8701caab59e5dc30",
        "firstName": "Elshimaa",
        "lastName": "Ahmed",
        "__t": "Instructor",
        "id": "636020ca8701caab59e5dc30"
    },
    "subject": "backend",
    "price": 266.17,
    "averageRating": 0,
    "ratings": [],
    "totalHours": 0,
    "discount": 0,
    "lessons": [],
    "isFree": false,
    "__v": 0,
    "activePromotion": null,
    "thumbnail": "https://vishwaentertainers.com/wp-content/uploads/2020/04/No-Preview-Available.jpg",
    "id": "63602a25823c823dda883245",
    "currency": "USD"
}
```

</details>

</details>

#### Create Course

```http
  POST /courses
```

| Headers         | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

| Parameter     | Type     | Description                             |
| :------------ | :------- | :-------------------------------------- |
| `title`       | `string` | **Required**. Title of the course       |
| `subject`     | `string` | **Required**. Subject of the course     |
| `description` | `string` | **Required**. Description of the course |
| `price`       | `number` | **Required**. Price of the course       |

<details>
<summary>
Response
</summary>

```json
{
    "course": {
        "title": "How to use curl",
        "description": "Learn how to use curl to make HTTP requests from the command line or scripts",
        "instructor": "6384904acf1b15bc21323b81",
        "subject": "Programming",
        "price": 10,
        "averageRating": 0,
        "ratings": [],
        "totalHours": 0,
        "enrollmentsCount": 0,
        "discount": 0,
        "activePromotion": null,
        "lessons": [],
        "_id": "63ade6b9840f840cca37802f",
        "createdAt": "2022-12-29T19:12:57.494Z",
        "updatedAt": "2022-12-29T19:12:57.494Z",
        "__v": 0
    }
}
```

</details>

### Update Course

```http
  PUT /courses/:id
```

| Headers         | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

| Parameter     | Type     | Description                             |
| :------------ | :------- | :-------------------------------------- |
| `title`       | `string` | **Required**. Title of the course       |
| `subject`     | `string` | **Required**. Subject of the course     |
| `description` | `string` | **Required**. Description of the course |
| `price`       | `number` | **Required**. Price of the course       |

<details>
<summary>
Response
</summary>

```json
{
    "course": {
        "title": "How to use curl",
        "description": "Learn how to use curl to make HTTP requests from the command line or scripts",
        "instructor": "6384904acf1b15bc21323b81",
        "subject": "Programming",
        "price": 10,
        "averageRating": 0,
        "ratings": [],
        "totalHours": 0,
        "enrollmentsCount": 0,
        "discount": 0,
        "activePromotion": null,
        "lessons": [],
        "_id": "63ade6b9840f840cca37802f",
        "createdAt": "2022-12-29T19:12:57.494Z",
        "updatedAt": "2022-12-29T19:12:57.494Z",
        "__v": 0
    }
}
```

</details>

### Delete Course

```http
  DELETE /courses/:id
```

| Headers         | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

<details>
<summary>
Response
</summary>

```json
{
    "message": "Course deleted successfully"
}
```

</details>

### List Course Subjects

```http
  GET /courses/subjects
```

<details>
<summary>
Response
</summary>

```json
{
    "subjects": [
        "docker",
        "backend",
        "frontend",
        "mobile",
        "devops",
        "programming",
        "data science",
        "typescript",
        "python",
        "ocaml",
        "haskell",
        "testing",
        "software engineering"
    ]
}
```

</details>

### Close Course

```http
  PUT /courses/:id/close
```

| Headers         | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

<details>
<summary>
Response
</summary>

```json
{
    "message": "Course closed successfully"
}
```

</details>

### Open Course

```http
  PUT /courses/:id/open
```

| Headers         | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

<details>
<summary>
Response
</summary>

```json
{
    "message": "Course opened successfully"
}
```

</details>

### Publish Course

```http
  PUT /courses/:id/publish
```

| Headers         | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

<details>
<summary>
Response
</summary>

```json
{
    "message": "Course published successfully"
}
```

</details>

### Me

### My courses

```http
  GET /me/courses
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

<details>
<summary>
Response
</summary>

```json
{
    "courses": [
        {
            "_id": "63aef6afd3303e06746e3e17",
            "title": "Docker Tutorial for Beginners",
            "description": "Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers. The service has both free and premium tiers. The software that hosts the containers is called Docker Engine.",
            "instructor": {
                "_id": "6384904acf1b15bc21323b81",
                "firstName": "Ibrahim",
                "lastName": "Abou Elenein",
                "__t": "Instructor",
                "id": "6384904acf1b15bc21323b81"
            },
            "subject": "docker",
            "price": 100,
            "averageRating": 0,
            "ratings": [],
            "totalHours": 0,
            "enrollmentsCount": 1,
            "discount": 0,
            "activePromotion": {
                "_id": "63aff8901abdb0eceface57f",
                "name": "t",
                "startDate": "2022-12-24T00:00:00.000Z",
                "endDate": "2023-01-07T00:00:00.000Z",
                "discountPercent": 12,
                "status": "Active",
                "id": "63aff8901abdb0eceface57f"
            },
            "lessons": [],
            "status": "closed",
            "createdAt": "2022-12-30T14:33:20.331Z",
            "updatedAt": "2022-12-31T08:53:37.426Z",
            "__v": 0,
            "thumbnail": "https://vishwaentertainers.com/wp-content/uploads/2020/04/No-Preview-Available.jpg",
            "id": "63aef6afd3303e06746e3e17",
            "currency": "USD"
        }
    ]
}
```

</details>

### List my enrollments

```http
  GET /me/enrollments
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

<details>
<summary>
Response
</summary>

```json
{
    "enrollment": [
        {
            "_id": "63aed9d94073c1fce7942775",
            "courseId": "63a6241205424927cbfab326",
            "traineeId": "63aece85d4bc1b83e09cb687",
            "progress": 0,
            "lessons": [
                {
                    "lessonId": "63a6255249c44631dc3a1044",
                    "isVideoWatched": false,
                    "exercisesStatus": [
                        {
                            "exerciseId": "63a6258c465fff5c68c15d16",
                            "isCompleted": false,
                            "_id": "63aed9da4073c1fce794277c"
                        }
                    ],
                    "_id": "63aed9da4073c1fce794277b"
                }
            ],
            "__v": 0
        }
    ]
}
```

</details>

### Create a new enrollment

```http
  POST /me/enrollments
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |
| `courseId`      | `string` | **Required**. course id.                      |

<details>
<summary>
Response
</summary>

```json
{
    "enrollment": {
        "courseId": "63aff9641abdb0eceface5c9",
        "traineeId": "63aece85d4bc1b83e09cb687",
        "progress": 0,
        "_id": "63b003bda014ee9567f07138",
        "lessons": [],
        "__v": 0
    }
}
```

</details>

### Get your refund requests

```http
  GET /me/enrollments/:enrollmentId/refunds
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

NOTE: you need to be individual trainee to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "refundRequest": {
        "traineeId": "63aece85d4bc1b83e09cb687",
        "enrollmentId": "63b003bda014ee9567f07138",
        "refundAmount": 100,
        "status": "PENDING",
        "_id": "63b0081fa014ee9567f07152",
        "__v": 0
    }
}
```

</details>

### Create a new refund request

```http
  POST /me/enrollments/:enrollmentId/refunds
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

NOTE: you need to be individual trainee to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "refundRequest": {
        "traineeId": "63aece85d4bc1b83e09cb687",
        "enrollmentId": "63b003bda014ee9567f07138",
        "refundAmount": 100,
        "status": "PENDING",
        "_id": "63b0081fa014ee9567f07152",
        "__v": 0
    }
}
```

</details>

### Delete a refund request

```http
  DELETE /me/enrollments/:enrollmentId/refunds/
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

NOTE: you need to be individual trainee to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "refundRequest": {
        "_id": "63b0081fa014ee9567f07152",
        "traineeId": "63aece85d4bc1b83e09cb687",
        "enrollmentId": "63b003bda014ee9567f07138",
        "refundAmount": 100,
        "status": "PENDING",
        "__v": 0
    }
}
```

</details>

### List my notes of a lesson

```http
  GET /me/lessons/:lessonId/notes
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

<details>
<summary>
Response
</summary>

```json
{
    "note": {
        "_id": "63b14db79483581561b7d57c",
        "lessonId": "63aed9da4073c1fce794277b",
        "traineeId": "63aece85d4bc1b83e09cb687",
        "content": "this a new note",
        "__v": 0
    }
}
```

</details>

### Create a new note

```http
  POST /me/lessons/:lessonId/notes
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |
| `content`       | `string` | **Required**. note content.                   |

<details>
<summary>
Response
</summary>

```json
{
    "note": {
        "lessonId": "63aed9da4073c1fce794277b",
        "traineeId": "63aece85d4bc1b83e09cb687",
        "content": "this a new note",
        "_id": "63b14db79483581561b7d57c",
        "__v": 0
    }
}
```

</details>

### Update a note

```http
  PUT /me/lessons/:lessonId/notes/:noteId
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |
| `content`       | `string` | **Required**. note content.                   |

<details>
<summary>
Response
</summary>

```json
{
    "note": {
        "_id": "63b14db79483581561b7d57c",
        "lessonId": "63aed9da4073c1fce794277b",
        "traineeId": "63aece85d4bc1b83e09cb687",
        "content": "this a new note UPDATED",
        "__v": 0
    }
}
```

</details>

### Payment

#### Create a checkout session

```http
  POST /payment/checkout-session
```

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| courseId  | `string` | **Required**. Course id. |

<details>
<summary>
Response
</summary>

```json
{
    "url": "https://checkout.stripe.com/c/pay/cs_test_a1gDqrqiCS6myj4aA7ul7JJ2ZzWfu2KqkMRgJOZJ1jLLkdgt3FC58Xl5g5#fidkdWxOYHwnPyd1blpxYHZxWjA0SExPYmpObFVLPWF1PXxqR1NPfW9Ac3VKbHdPQnZxTTduRkFqS2ldNFJ3NVJmaG99SV9wREs3NTZQQ11AVUh%2FMW49X1xyYTRIVTZwUmIzZGsxd0dCf2JWNTVvcmcxdzQyNicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl",
    "id": "cs_test_a1gDqrqiCS6myj4aA7ul7JJ2ZzWfu2KqkMRgJOZJ1jLLkdgt3FC58Xl5g5"
}
```

</details>

#### Stripe Webhook

```http
  POST /payment/stripe-webhook
```

| Header             | Type     | Description                     |
| :----------------- | :------- | :------------------------------ |
| `stripe-signature` | `string` | **Required**. Stripe signature. |

<details>
<summary>
Response
</summary>

```json
{
    "received": true,
    "payment": "success",
    "enrollment": true
}
```

</details>

### Enrollments

### Get enrollment

```http
GET /enrollments/:enrollmentId
```

| Header          | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

<details>
<summary>
Response
</summary>

```json
{
    "enrollment": [
        {
            "_id": "63aed9d94073c1fce7942775",
            "courseId": "63a6241205424927cbfab326",
            "traineeId": "63aece85d4bc1b83e09cb687",
            "progress": 0,
            "lessons": [
                {
                    "lessonId": "63a6255249c44631dc3a1044",
                    "isVideoWatched": false,
                    "exercisesStatus": [
                        {
                            "exerciseId": "63a6258c465fff5c68c15d16",
                            "isCompleted": false,
                            "_id": "63aed9da4073c1fce794277c"
                        }
                    ],
                    "_id": "63aed9da4073c1fce794277b"
                }
            ],
            "__v": 0
        }
    ]
}
```

</details>

---

### Update enrollment

```http
PUT /enrollments/:enrollmentId
```

| Header          | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

| Body       | Type     | Description             |
| :--------- | :------- | :---------------------- |
| `progress` | `number` | Progress of the course. |
| `lessons`  | `array`  | Array of lessons.       |

<details>
<summary>
Response
</summary>

```json
{
    "enrollment": [
        {
            "_id": "63aed9d94073c1fce7942775",
            "courseId": "63a6241205424927cbfab326",
            "traineeId": "63aece85d4bc1b83e09cb687",
            "progress": 0,
            "lessons": [
                {
                    "lessonId": "63a6255249c44631dc3a1044",
                    "isVideoWatched": false,
                    "exercisesStatus": [
                        {
                            "exerciseId": "63a6258c465fff5c68c15d16",
                            "isCompleted": false,
                            "_id": "63aed9da4073c1fce794277c"
                        }
                    ],
                    "_id": "63aed9da4073c1fce794277b"
                }
            ],
            "__v": 0
        }
    ]
}
```

</details>

### Authentication

#### Login

```http
  POST /auth/login
```

| Parameter  | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `email`    | `string` | **Required**. user's email    |
| `password` | `string` | **Required**. user's password |

<details>
<summary>
Response
</summary>

```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWZmNzlmYTAxNGVlOTU2N2YwNzEwZSIsInVzZXJUeXBlIjozLCJpYXQiOjE2NzI0NzY2NzMsImV4cCI6MTY3Mzc3MjY3M30.SXWK_GY0fzWSVKQYmPe1fTQQbDddJ4AsuoHbUmkjp-Y",
    "userType": 3
}
```

</details>

#### Refresh

```http
  GET /auth/refresh
```

NOTE: this endpoint requires to have jwt cookie set

<details>
<summary>
Response
</summary>

```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWZmNzlmYTAxNGVlOTU2N2YwNzEwZSIsInVzZXJUeXBlIjozLCJpYXQiOjE2NzI0Nzc3ODksImV4cCI6MTY3Mzc3Mzc4OX0.XLS1DC6I2IHs93ahkPSDH2UNTXQK9x14AB4szyvBtrs",
    "userType": 3
}
```

</details>

#### Logout

```http
  POST /auth/logout
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

<details>
<summary>
Response
</summary>

```json
{
    "message": "Logout successful"
}
```

</details>

#### Forgot Password

```http
  POST /auth/forgot
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**. user's email |

<details>
<summary>
Response
</summary>

```json
{
    "success": true
}
```

</details>

#### Reset Password

<!-- TODO: not correct -->

```http
  GET /auth/reset
```

<details>
<summary>
Response
</summary>

```json
{
    "success": true
}
```

</details>

```http
  POST /auth/reset
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**. user's email |

<details>
<summary>
Response
</summary>

```json
{
    "success": true
}
```

</details>

#### Change Password

```http
  POST /auth/change
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |
| `oldPassword`   | `string` | **Required**. user's old password             |
| `newPassword`   | `string` | **Required**. user's new password             |

<details>
<summary>
Response
</summary>

```json
{
    "success": true
}
```

</details>

### Course Ratings

#### Get Course Ratings

```http
POST /courses/:course_id/ratings
```

| Headers         | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

| Parameter   | Type     | Description                         |
| :---------- | :------- | :---------------------------------- |
| `course_id` | `string` | **Required**. ID of the course.     |
| `rating`    | `number` | **Required**. Rating of the course. |
| `comment`   | `string` | Comment of the course.              |

<details>
<summary>
Response
</summary>

```json
{
    "_id": "5f9f9b9b9b9b9b9b9b9b9b9b",
    "course_id": "5f9f9b9b9b9b9b9b9b9b9b9b",
    "rating": 5,
    "comment": "This is a comment",
    "created_at": "2020-11-01T00:00:00.000Z",
    "updated_at": "2020-11-01T00:00:00.000Z"
}
```

</details>

#### Update Course Ratings

```http
PUT /courses/:course_id/ratings
```

| Headers         | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

| Parameter   | Type     | Description                         |
| :---------- | :------- | :---------------------------------- |
| `course_id` | `string` | **Required**. ID of the course.     |
| `rating`    | `number` | **Required**. Rating of the course. |
| `comment`   | `string` | Comment of the course.              |

<details>
<summary>
Response
</summary>

```json
{
    "_id": "5f9f9b9b9b9b9b9b9b9b9b9b",
    "course_id": "5f9f9b9b9b9b9b9b9b9b9b9b",
    "rating": 5,
    "comment": "This is a comment"
}
```

</details>

#### Delete Course Ratings

```http
DELETE /courses/:course_id/ratings
```

| Headers         | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

| Parameter   | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `course_id` | `string` | **Required**. ID of the course. |

<details>
<summary>

Response

</summary>

```json
{
    "message": "Course ratings deleted successfully"
}
```

</details>

## Instructor Ratings

#### Get Instructor Ratings

```http
GET /me/ratings
```

| Headers         | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

<details>
<summary>
Response
</summary>

```json
[{
    "_id": "5f9f9b9b9b9b9b9b9b9b9b9b",
    "trainee": {
                "_id": "63aece85d4bc1b83e09cb687",
                "firstName": "ahmed",
                "lastName": "nasser",
                "__t": "IndividualTrainee"
    }
    "rating": 5,
    "comment": "This is a comment",
    "created_at": "2020-11-01T00:00:00.000Z",
    "updated_at": "2020-11-01T00:00:00.000Z"
},
{
    "_id": "5f9f9b9b9b9b9b9b9b9b9b9b",
    "trainee": {
                "_id": "63aece85d4bc1b83e09cb687",
                "firstName": "ahmed",
                "lastName": "nasser",
                "__t": "IndividualTrainee"
    }
    "rating": 5,
    "comment": "This is a comment",
    "created_at": "2020-11-01T00:00:00.000Z",
    "updated_at": "2020-11-01T00:00:00.000Z"
}]
```

</details>

#### Create Instructor Ratings

```http
POST /instructors/:instructorId/ratings
```

| Headers         | Type     | Description                                |
| :-------------- | :------- | :----------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the Trainee. |

| Parameter      | Type     | Description                         |
| :------------- | :------- | :---------------------------------- |
| `instructorId` | `string` | **Required**. ID of the instructor. |

| Body      | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `rating`  | `number` | **Required**. Rating of the instructor. |
| `comment` | `string` | Comment of the instructor.              |

<details>
<summary>
Response
</summary>

```json
{
    "_id": "5f9f9b9b9b9b9b9b9b9b9b9b",
    "trainee": {
                "_id": "63aece85d4bc1b83e09cb687",
                "firstName": "ahmed",
                "lastName": "nasser",
                "__t": "IndividualTrainee"
    }
    "rating": 5,
    "comment": "This is a comment",
    "created_at": "2020-11-01T00:00:00.000Z",
    "updated_at": "2020-11-01T00:00:00.000Z"
}
```

</details>

#### Update Instructor Ratings

```http
PUT /courses/:instructorId/ratings
```

| Headers         | Type     | Description                                |
| :-------------- | :------- | :----------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the trainee. |

| Parameter      | Type     | Description                         |
| :------------- | :------- | :---------------------------------- |
| `instructorId` | `string` | **Required**. ID of the instructor. |

| Body      | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `rating`  | `number` | **Required**. Rating of the instructor. |
| `comment` | `string` | Comment of the course.                  |

<details>
<summary>
Response
</summary>

```json
{
    "_id": "5f9f9b9b9b9b9b9b9b9b9b9b",
    "traineeId": "5f9f9b9b9b9b9b9b9b9b9b9b",
    "rating": 5,
    "comment": "This is a comment"
}
```

</details>

#### Delete instructor Ratings

```http
DELETE /instructors/:instructorId/ratings
```

| Headers         | Type     | Description                                |
| :-------------- | :------- | :----------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the trainee. |

| Parameter      | Type     | Description                         |
| :------------- | :------- | :---------------------------------- |
| `instructorId` | `string` | **Required**. ID of the instructor. |

<details>
<summary>

Response

</summary>

```json
{
    "message": "instructor ratings deleted successfully"
}
```

</details>

### Exercise

### Get all exercises in a specific lesson

```http
  GET /courses/:courseId/lessons/:lessonId/exercises
```

| Parameter       | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

<details>
<summary>
Response
</summary>

```json
{
    "exercises": [
        {
            "_id": "63b091de2e8cd50e5db3711f",
            "title": "What is Jenkins",
            "questions": [
                {
                    "question": "What is Jenkins",
                    "choices": [
                        "Version Control System",
                        "Note taking app",
                        "Automation server",
                        "Programmin Language"
                    ],
                    "answerIndex": 2,
                    "_id": "63b091de2e8cd50e5db37121"
                },
                {
                    "question": "Which one is a type of CI/CD Jenkins Pipeline?",
                    "choices": [
                        "Programming Pipeline",
                        "Declarative Pipeline",
                        "Abstract Pipeline",
                        "Concrete Pipeline"
                    ],
                    "answerIndex": 1,
                    "_id": "63b091de2e8cd50e5db37122"
                }
            ],
            "__v": 0
        },
        {
            "_id": "63b092362e8cd50e5db37135",
            "title": "Execution Pipeline Stages",
            "questions": [
                {
                    "question": "Which one is not a execution pipeline stage ?",
                    "choices": ["Fetch stage", "Decode stage", "Execute stage", "Memory stage"],
                    "answerIndex": 3,
                    "_id": "63b092362e8cd50e5db37137"
                }
            ],
            "__v": 0
        }
    ]
}
```

</details>

### Get a specific exercise in a specific lesson

```http
  GET /courses/:courseId/lessons/:lessonId/exercises/:exerciseId
```

| Parameter       | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

<details>
<summary>
Response
</summary>

```json
{
    "exercise": {
        "_id": "63b091de2e8cd50e5db3711f",
        "title": "What is Jenkins",
        "questions": [
            {
                "question": "What is Jenkins",
                "choices": ["Version Control System", "Note taking app", "Automation server", "Programmin Language"],
                "answerIndex": 2,
                "_id": "63b091de2e8cd50e5db37121"
            },
            {
                "question": "Which one is a type of CI/CD Jenkins Pipeline?",
                "choices": ["Programming Pipeline", "Declarative Pipeline", "Abstract Pipeline", "Concrete Pipeline"],
                "answerIndex": 1,
                "_id": "63b091de2e8cd50e5db37122"
            }
        ],
        "__v": 0
    }
}
```

</details>

### Create a new Exercise in a specific lesson

```http
  POST /courses/:courseId/lessons/:lessonId/exercises
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |
| `title`         | `string` | **Required**. Title of the exercise.          |
| `questions`     | `json`   | **Optional**. Questions of the exercise.      |

NOTE: you need to be an instructor as well as the course owner to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "exercise": {
        "title": "Jenkins Language",
        "questions": [
            {
                "question": "What is the language of jenkins ?",
                "choices": ["Python", "Java", "Groovy", "C++"],
                "answerIndex": 2,
                "_id": "63b096502c0a3671b4f79110"
            }
        ],
        "_id": "63b096502c0a3671b4f7910e",
        "__v": 0
    }
}
```

</details>

### Update a exercise in a specific lesson

```http
  PUT /courses/:courseId/lessons/:lessonId/exercises/:exerciseId
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |
| `title`         | `string` | **Required**. Title of the exercise.          |
| `questions`     | `json`   | **Optional**. Questions of the exercise.      |

NOTE: you need to be an instructor as well as the course owner to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "exercise": {
        "title": "Jenkins Language",
        "questions": [
            {
                "question": "What is the language of jenkins ?",
                "choices": ["Python", "Java", "Groovy", "Golang"],
                "answerIndex": 2,
                "_id": "63b0979e2c0a3671b4f7911e"
            }
        ],
        "_id": "63b091de2e8cd50e5db3711f",
        "__v": 1
    }
}
```

</details>

### Delete a specific exercise

```http
  DELETE /courses/:courseId/lessons/:lessonId/exercises/:exerciseId
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

NOTE: you need to be an instructor as well as the course owner to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "message": "Exercise deleted Successfully"
}
```

</details>

### Get a specifc submission of a exercise in a specific lesson

```http
  GET /courses/:courseId/lessons/:lessonId/exercises/:exerciseId/submission
```

| Parameter       | Type     | Description                                |
| :-------------- | :------- | :----------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the trainee. |

NOTE: you need to be a trainee as well as enrolled in the course to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "evaluation": {
        "totalGrade": 100,
        "results": [
            {
                "isCorrect": true,
                "correctAnswer": 1,
                "userAnswer": 1
            }
        ]
    }
}
```

</details>

### Submit a exercise in a specific lesson

```http
  POST /courses/:courseId/lessons/:lessonId/exercises/:exerciseId/submission
```

| Parameter       | Type     | Description                                |
| :-------------- | :------- | :----------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the trainee. |

NOTE: you need to be a trainee as well as enrolled in the course to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "evaluation": {
        "totalGrade": 100,
        "results": [
            {
                "isCorrect": true,
                "correctAnswer": 1,
                "userAnswer": 1
            }
        ]
    }
}
```

</details>

### Lesson

### Get a specific Lesson

```http
  GET /courses/:courseId/lessons/:lessonId
```

| Parameter       | Type     | Description                                |
| :-------------- | :------- | :----------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the trainee. |

NOTE: you need to be a trainee as well as enrolled in the course to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "lesson": {
        "_id": "63b08018229f88974896da6f",
        "title": "Rust for beginners",
        "exercises": [],
        "totalHours": 23,
        "video": {
            "title": "Rust for beginners",
            "videoLink": "https://www.youtube.com/watch?v=gvgBUY8iNO4",
            "description": "Rust is a multi-paradigm, general-purpose programming language."
        },
        "__v": 0
    }
}
```

</details>

### Create a new Lesson

```http
  POST /courses/:courseId/lessons
```

| Parameter       | Type            | Description                                                     |
| :-------------- | :-------------- | :-------------------------------------------------------------- |
| `Authorization` | `string`        | **Required**. Bearer token of the instructor.                   |
| `title`         | `number`        | **Required**. Title of the lesson.                              |
| `totalHours`    | `string`        | **Required**. Duration of the lesson.                           |
| `video`         | `json`          | **Optional**. Video of the lesson.                              |
| `exercises`     | `Array<string>` | **Optional**. Exercise IDs referencing exercises in the lesson. |

NOTE: you need to be an instructor as well as the course owner to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "lesson": {
        "title": "Rust for beginners",
        "exercises": ["63b0081fa014ee9567f07152"],
        "totalHours": 23,
        "video": {
            "title": "Rust for beginners",
            "videoLink": "https://www.youtube.com/watch?v=gvgBUY8iNO4",
            "description": "Rust is a multi-paradigm, general-purpose programming language."
        },
        "_id": "63b080e6784b76b62a2afc80",
        "__v": 0
    }
}
```

</details>

### Update a Lesson

```http
  PUT /courses/:courseId/lessons/:lessonId
```

| Parameter       | Type            | Description                                                     |
| :-------------- | :-------------- | :-------------------------------------------------------------- |
| `Authorization` | `string`        | **Required**. Bearer token of the instructor.                   |
| `title`         | `number`        | **Optional**. Title of the lesson.                              |
| `totalHours`    | `string`        | **Optional**. Duration of the lesson.                           |
| `video`         | `json`          | **Optional**. Video of the lesson.                              |
| `exercises`     | `Array<string>` | **Optional**. Exercise IDs referencing exercises in the lesson. |

NOTE: you need to be an instructor as well as the course owner to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "lesson": {
        "title": "Rust for amateurs",
        "exercises": [],
        "totalHours": 23,
        "video": {
            "title": "Rust for beginners",
            "videoLink": "https://www.youtube.com/watch?v=gvgBUY8iNO4",
            "description": "Rust is a multi-paradigm, general-purpose programming language."
        },
        "_id": "63b080e6784b76b62a2afc80",
        "__v": 0
    }
}
```

</details>

### Delete a Lesson

```http
  DELETE /courses/:courseId/lessons/:lessonId
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

NOTE: you need to be an instructor as well as the course owner to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "message": "Lesson deleted Successfully"
}
```

</details>

### Promotions

### Get all promotions

```http
GET /promotions
```

<details>
<summary>
Response
</summary>

```json
{
    "promotions": [
        {
            "_id": "63b168e70087317dde042f45",
            "name": "brand",
            "courses": [
                {
                    "_id": "63b11e5ca6c2dc8b7b1fa1bd",
                    "title": "Docker in 30 seconds",
                    "description": "Learn Docker in 30 seconds",
                    "instructor": "63847b66f067f8a676dd1df3",
                    "subject": "paid",
                    "price": 69420,
                    "averageRating": 0,
                    "ratings": [],
                    "totalHours": 1,
                    "enrollmentsCount": 0,
                    "discount": 0,
                    "activePromotion": "63b168e70087317dde042f45",
                    "lessons": [],
                    "status": "draft",
                    "createdAt": "2023-01-01T05:47:08.247Z",
                    "updatedAt": "2023-01-01T11:05:12.069Z",
                    "__v": 0
                }
            ],
            "startDate": "2023-01-18T22:00:00.000Z",
            "endDate": "2023-01-27T21:59:59.999Z",
            "discountPercent": 10,
            "source": "Admin",
            "__v": 0
        }
    ]
}
```

</details>

---

### Get a promotion

```http
GET /promotions/:promotionId
```

<details>
<summary>
Response
</summary>

```json
{
    "promotion": {
        "_id": "63b168e70087317dde042f45",
        "name": "brand",
        "courses": [
            {
                "_id": "63b11e5ca6c2dc8b7b1fa1bd",
                "title": "Docker in 30 seconds",
                "description": "Learn Docker in 30 seconds",
                "instructor": "63847b66f067f8a676dd1df3",
                "subject": "paid",
                "price": 69420,
                "averageRating": 0,
                "ratings": [],
                "totalHours": 1,
                "enrollmentsCount": 0,
                "discount": 0,
                "activePromotion": "63b168e70087317dde042f45",
                "lessons": [],
                "status": "draft",
                "createdAt": "2023-01-01T05:47:08.247Z",
                "updatedAt": "2023-01-01T11:05:12.069Z",
                "__v": 0
            }
        ],
        "startDate": "2023-01-18T22:00:00.000Z",
        "endDate": "2023-01-27T21:59:59.999Z",
        "discountPercent": 10,
        "source": "Admin",
        "__v": 0
    }
}
```

</details>

---

### Create a promotion

```http
POST /promotions
```

| Body              | Type     | Description                                     |
| :---------------- | :------- | :---------------------------------------------- |
| `name`            | `string` | **Required**. Name of the promotion             |
| `discountPercent` | `number` | **Required**. Discount percent of the promotion |
| `startDate`       | `date`   | **Required**. Start date of the promotion       |
| `endDate`         | `date`   | **Required**. End date of the promotion         |
| `courses`         | `array`  | **Required**. Courses of the promotion          |

<details>
<summary>
Response
</summary>

```json
{
    "promotion": {
        "_id": "63b168e70087317dde042f45",
        "name": "brand",
        "courses": [
            {
                "_id": "63b11e5ca6c2dc8b7b1fa1bd",
                "title": "Docker in 30 seconds",
                "description": "Learn Docker in 30 seconds",
                "instructor": "63847b66f067f8a676dd1df3",
                "subject": "paid",
                "price": 69420,
                "averageRating": 0,
                "ratings": [],
                "totalHours": 1,
                "enrollmentsCount": 0,
                "discount": 0,
                "activePromotion": "63b168e70087317dde042f45",
                "lessons": [],
                "status": "draft",
                "createdAt": "2023-01-01T05:47:08.247Z",
                "updatedAt": "2023-01-01T11:05:12.069Z",
                "__v": 0
            }
        ],
        "startDate": "2023-01-18T22:00:00.000Z",
        "endDate": "2023-01-27T21:59:59.999Z",
        "discountPercent": 10,
        "source": "Admin",
        "__v": 0
    }
}
```

</details>

---

### Update a promotion

```http
PUT /promotions/:promotionId
```

| Body              | Type     | Description                       |
| :---------------- | :------- | :-------------------------------- |
| `name`            | `string` | Name of the promotion             |
| `courses`         | `array`  | Courses of the promotion          |
| `startDate`       | `date`   | Start date of the promotion       |
| `endDate`         | `date`   | End date of the promotion         |
| `discountPercent` | `number` | Discount percent of the promotion |

<details>
<summary>
Response
</summary>

```json
{
    "promotion": {
        "_id": "63b168e70087317dde042f45",
        "name": "brand",
        "courses": [
            {
                "_id": "63b11e5ca6c2dc8b7b1fa1bd",
                "title": "Docker in 30 seconds",
                "description": "Learn Docker in 30 seconds",
                "instructor": "63847b66f067f8a676dd1df3",
                "subject": "paid",
                "price": 69420,
                "averageRating": 0,
                "ratings": [],
                "totalHours": 1,
                "enrollmentsCount": 0,
                "discount": 0,
                "activePromotion": "63b168e70087317dde042f45",
                "lessons": [],
                "status": "draft",
                "createdAt": "2023-01-01T05:47:08.247Z",
                "updatedAt": "2023-01-01T11:05:12.069Z",
                "__v": 0
            }
        ],
        "startDate": "2023-01-18T22:00:00.000Z",
        "endDate": "2023-01-27T21:59:59.999Z",
        "discountPercent": 10,
        "source": "Admin",
        "__v": 0
    }
}
```

</details>

---

### Delete a promotion

```http
DELETE /promotions/:promotionId
```

<details>
<summary>
Response
</summary>

```json
{
    "message": "Promotion deleted successfully"
}
```

</details>

### Reports

### Get all user's reports

```http
GET /me/reports
```

| Header          | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

<details>

<summary>
Response
</summary>

```json
{
    "reports": [
        {
            "_id": "63aeb2dd728c859d4601ac08",
            "userId": "63847b66f067f8a676dd1df3",
            "courseId": "63abefa6485cfbc7e2c4ac6c",
            "threadId": {
                "_id": "63aeb2dd728c859d4601ac07",
                "updatedAt": "2022-12-30T09:44:28.084Z"
            },
            "type": "Financial",
            "subject": "Refund didn't come through",
            "description": "I have requested a refund but still didn't come through.",
            "seen": false,
            "status": "Pending",
            "createdAt": "2022-12-30T09:43:57.993Z",
            "updatedAt": "2022-12-30T09:43:57.993Z",
            "__v": 0
        }
    ]
}
```

</details>

---

### Get a specific report

```http
GET /me/reports/:reportId
```

| Header          | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

<details>

<summary>
Response
</summary>

```json
{
    "report": {
        "_id": "63aeb2dd728c859d4601ac08",
        "userId": {
            "_id": "63847b66f067f8a676dd1df3",
            "firstName": "Mohammad",
            "lastName": "Omar",
            "__t": "Instructor"
        },
        "courseId": "63abefa6485cfbc7e2c4ac6c",
        "threadId": {
            "_id": "63aeb2dd728c859d4601ac07",
            "reportId": "63aeb2dd728c859d4601ac08",
            "replies": [
                {
                    "userId": {
                        "_id": "63ada239aef4bb883ee72eb2",
                        "firstName": "Admin",
                        "lastName": "ElAdmoon",
                        "__t": "Admin"
                    },
                    "message": "The refund will be processed within 3-5 business days.",
                    "createdAt": "2022-12-30T09:44:28.083Z",
                    "_id": "63aeb2fc728c859d4601ac5d"
                }
            ],
            "createdAt": "2022-12-30T09:43:58.169Z",
            "updatedAt": "2022-12-30T09:44:28.084Z",
            "__v": 0
        },
        "type": "Financial",
        "subject": "Refund didn't come through",
        "description": "I have requested a refund but still didn't come through.",
        "seen": true,
        "status": "Resolved",
        "createdAt": "2022-12-30T09:43:57.993Z",
        "updatedAt": "2022-12-30T09:43:57.993Z",
        "__v": 0
    }
}
```

</details>

---

### Create a new report

```http
POST /me/reports
```

| Header          | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

| Body          | Type     | Description                             |
| :------------ | :------- | :-------------------------------------- |
| `courseId`    | `string` | Id of the course.                       |
| `type`        | `string` | **Required** Type of the report.        |
| `subject`     | `string` | **Required** Subject of the report.     |
| `description` | `string` | **Required** Description of the report. |

<details>
<summary>
Response
</summary>

```json
{
    "report": {
        "userId": "63aac5c4ee11bad5c3c2e6bc",
        "threadId": "63b1bf1f11c8cc4b8c62cccc",
        "type": "Technical",
        "subject": "Video not playing",
        "description": "The video is not playing",
        "seen": true,
        "status": "Pending",
        "_id": "63b1bf1f11c8cc4b8c62cccd",
        "createdAt": "2023-01-01T17:13:03.600Z",
        "updatedAt": "2023-01-01T17:13:03.600Z",
        "__v": 0
    }
}
```

</details>

---

### Post a reply to a report

```http
POST /me/reports/:reportId

```

| Header          | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

| Body      | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `message` | `string` | **Required** Message of the reply. |

<details>
<summary>
Response
</summary>

```json
{
    "thread": {
        "_id": "63b1bf1f11c8cc4b8c62cccc",
        "reportId": "63b1bf1f11c8cc4b8c62cccd",
        "replies": [
            {
                "userId": "63847b66f067f8a676dd1df3",
                "message": "now pay $8",
                "createdAt": "2023-01-01T17:19:56.261Z",
                "_id": "63b1c0bc11c8cc4b8c62ccd3"
            }
        ],
        "createdAt": "2023-01-01T17:13:03.750Z",
        "updatedAt": "2023-01-01T17:19:56.262Z",
        "__v": 0
    }
}
```

</details>

---

### Get report thread

```http
GET /me/report-thread/:threadId
```

| Header          | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

<details>
<summary>
Response
</summary>

```json
{
    "thread": {
        "_id": "63b1bf1f11c8cc4b8c62cccc",
        "reportId": "63b1bf1f11c8cc4b8c62cccd",
        "replies": [
            {
                "userId": "63847b66f067f8a676dd1df3",
                "message": "now pay $8",
                "createdAt": "2023-01-01T17:19:56.261Z",
                "_id": "63b1c0bc11c8cc4b8c62ccd3"
            }
        ],
        "createdAt": "2023-01-01T17:13:03.750Z",
        "updatedAt": "2023-01-01T17:19:56.262Z",
        "__v": 0
    }
}
```

</details>

### Generate API Documentation

```bash
> npm run generate-docs
```
