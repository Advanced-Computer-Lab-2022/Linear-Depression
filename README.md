# Linear-Depression

An implementation of a full-stack web application. The application is a platform to manage an online learning platform that serves 4 different types of users : Individual/Corporate Trainees , Instructors and Admins. It was built using the `MERN` stack.

[Read this on medium!](https://medium.com/@ibrahimabouelanin/a-software-engineering-team-wants-to-share-with-you-their-experience-16175a0cfe9a)

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


## Build Status 🔨

![example workflow](https://github.com/Advanced-Computer-Lab-2022/Linear-Depression/actions/workflows/test.yml/badge.svg)

-   The project is currently in development.
-   The admin need some improvements
-   Course Page and API' needs Pagagination.
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


<details>
<summary>Course page</summary>

![image](https://user-images.githubusercontent.com/82768721/210188013-cf33cf2f-f473-4e47-a98e-9bec634a1afb.png)
    
</details>


<details>
<summary>Course page (course content - courese reviews)</summary>
    
![image](https://user-images.githubusercontent.com/82768721/210188015-7711fce7-d410-4258-b5d3-82dca97f9381.png)
   
</details>

<details>
<summary>Lesson page</summary>
    
![image](https://user-images.githubusercontent.com/82768721/210188002-6b651151-74c4-45b9-9684-f6da660cc915.png)
    
</details>


<details>
<summary>Exercise page</summary>

![image](https://user-images.githubusercontent.com/82768721/210188187-b1724bf4-1247-4b46-a470-53f431fd82b6.png)
    
</details>

<details>
<summary>Profile page</summary>

![image](https://user-images.githubusercontent.com/82768721/210188023-0ba2b3fe-368a-484c-8471-bd8d57765744.png)
    
</details>


<details>
<summary>Admin dashboard login</summary>

![image](https://user-images.githubusercontent.com/82768721/210188208-793cb897-06bc-4940-834b-5320ae511056.png)
    
</details>

<details>
<summary>Admin dashboard</summary>

![image](https://user-images.githubusercontent.com/82768721/210188033-3da8e7e4-bb1a-4c85-8d82-811ed1481e53.png)
    
</details>


<details>
<summary>Report a course</summary>

![image](https://user-images.githubusercontent.com/82768721/210188036-fb6e5356-13ee-4104-b6f8-d0c1165a52e5.png)
    
</details>

<details>
<summary>Report thread</summary>

![image](https://user-images.githubusercontent.com/82768721/210188040-2e2b80e6-0d54-4077-b2f0-414ddcd30c6c.png)
    
</details>


<details>
<summary>My reports</summary>

![image](https://user-images.githubusercontent.com/82768721/210188044-d69bc4cc-a8f9-4f95-96b4-6ac5e4903d5c.png)
    
</details>

<details>
<summary>Reset password email</summary>
    
![image](https://user-images.githubusercontent.com/82768721/210187997-797355b5-106f-4efd-b75d-ee809ebfa7c1.png)

</details>

<details>
<summary>Enrollment email</summary>
    
![image](https://user-images.githubusercontent.com/82768721/210188000-36b95d03-6d96-4af7-b5ff-fc8a227fd24d.png)
    
</details>

<details>
<summary>Certificate of completion</summary>

![image](https://user-images.githubusercontent.com/82768721/210188031-9c6287c2-8a9e-4b27-8471-7a6b283b5d73.png)
    
</details>

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

The system serves different type of users (Admin, Instructor , Individual Trainee, Corporate Trainee)
<details>
    
 <summary> As an Admin I can </summary>

- Add instructors and corporate trainees to the system 
- View Reported problems and resolve them 
- View access requests from Corporate Trainees and grant access
- View Refund Requests from Individual Trainees

</details>

<details>

<summary> As an Instructor I can </summary>

- Create and edit a draft Course 
- Publish draft Course so trainees could enroll in 
- Close a published course to prevent more trainees from enrolling in it
- View my settlements and update my profile
- Add a promotion for a specific period

 </details>

<details>

<summary> As an Individual Trainee I can </summary>

- Search and filter Courses 
- Pay for a course 
- Report problems 
- Watch a video and solve exercises from my courses
- See my progress
- Recieve a certificate by mail
- Request refund 
- Rate a course and its instructor

</details>

<details>

<summary> As a Corporate Trainee I can </summary>

- Search and filter Courses 
- Send access requests for specific course
- Watch a video and solve exercises from my courses
- See my progress
- Recieve a certificate by mail
- Rate a course and its instructor

</details>

<details>

<summary> As  Guest I can </summary>

- Sign up as individual trainee 
- Search and filter courses

</details>

    
## Code Examples 🐱‍💻

<details>
    <summary>
    Send Certificate Service
    </summary>

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


</details>

<details>
    
<summary> Course Action Methods </summary>

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


</details>

<details>

<summary>  Setting Rate Limiters </summary>

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

</details>
<details>

<summary>
    Caching Currency Rates
</summary> 

```typescript
// run every day at 00:00
const getCurrencyRatesTask = new CronJob("0 0 0 * * *", async () => {
    console.log("Cache currency rates");
    const data = fs.readFileSync("src/media/country-currency.json", "utf8");
    const currencies = JSON.parse(data);
    // convert to distinct currency codes
    const currencyCodes = currencies.map((currency: any) => currency.Code) as string[];
    const distinctCurrencyCodes = [...new Set(currencyCodes)] as string[];

    const currencyRates = {} as CurrencyRate;
    for (const currencyCode of distinctCurrencyCodes) {
        try {
            const rate = await getCurrencyRate(currencyCode, "USD");
            console.log(`Currency code: ${currencyCode}, rate: ${rate}`);
            currencyRates[currencyCode] = rate;
        } catch (error) {
            console.log(error);
        }
    }
    fs.writeFileSync("src/media/currency-rates.json", JSON.stringify(currencyRates));
});
```

</details>

<details>
    <summary>
        Promotion Validator
    </summary> 

```typescript
export const PromotionValidator = {
    validate: async (promotion: IPromotionModel) => {
        if (!isValidStartDate(promotion)) {
            throw new Error("Promotion start date is invalid");
        }

        if (!isValidEndDate(promotion)) {
            throw new Error("Promotion end date is invalid");
        }

        if (!(await onlyIncludesPaidCourses(promotion))) {
            throw new Error("Promotion can only include paid courses");
        }

        if (!(await noConflictWithAdminPromotion(promotion))) {
            throw new Error("Promotion conflicts with Admin promotion");
        }

        return true;
    }
};
```

</details>

<details>

<summary>
    Course NavBar
</summary>

```typescript
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
```

</details>


<details>

   <summary>
        Question Card
   </summary> 
   
```typescript
<ErrorCourseCard>
    <div key={index}>
        <HorizontalContainer>
            <QuestionTitle>{question.question}</QuestionTitle>
            <QuestionAction>
                <ModeEditIcon
                    onClick={() => {
                        handleOpenEditQuestion(index);
                    }}
                    sx={{
                        "&:hover": {
                            fontSize: "1.8rem"
                        },
                        margin: "5px"
                    }}
                />
                <DeleteIcon
                    onClick={() => {
                        deleteQuestion(index);
                    }}
                    sx={{
                        color: "error.main",
                        "&:hover": {
                            fontSize: "1.8rem"
                        },
                        margin: "5px"
                    }}
                />
            </QuestionAction>
        </HorizontalContainer>
        <GroupRadioButton
            answer={question.answerIndex}
            questionNumber={index}
            choices={question.choices}
            onChange={handleSetAnswer}
        />
    </div>
</ErrorCourseCard>
```

</details>

## Running Tests 🧪

The testing is done using `jest`. To run the tests, run the following command

```bash
> cd server && npm run test
```

![image](https://user-images.githubusercontent.com/35760882/211102907-56f489aa-ba15-4cfc-be88-e6ce930e8685.png)

### Tests Structure 
<details>
<summary> Click Me! </summary>

```bash
.
├── test_apis
│   ├── course
│   │   └── course.test.ts
│   ├── course_ratings
│   │   └── rating.test.ts
│   ├── example.test.ts
│   ├── instructor
│   │   └── instructor.test.ts
│   ├── instructor_ratings
│   │   └── instructor_ratings.test.ts
│   └── trainee
│       ├── corporateTrainee.test.ts
│       └── individualTrainee.test.ts
├── test_models
│   ├── answer
│   │   ├── answer.test.ts
│   │   └── factory.ts
│   ├── course
│   │   ├── course.test.ts
│   │   └── factory.ts
│   ├── enrollment
│   │   └── factory.ts
│   ├── exercise
│   │   ├── exercise.test.ts
│   │   └── factory.ts
│   ├── instructor
│   │   ├── factory.ts
│   │   └── instructor.test.ts
│   ├── lesson
│   │   ├── factory.ts
│   │   └── lesson.test.ts
│   ├── rating
│   │   ├── factory.ts
│   │   └── rating.test.ts
│   ├── trainee
│   │   ├── factory.ts
│   │   └── trainee.test.ts
│   └── userFactory.ts
├── test_services
│   └── CourseService.test.ts
└── test_utils
    └── modelUtilities.test.ts

```
</details>


### Models tests
`js-faker` is used to generate data to test different models 

There is tests done for the following models : `Trainee` , `Course` , `Exercise`, `Rating`, `Lesson`, `Answer`, `Instructor`


Also `curl` with used througout the process

## Installation 📥

Install my-project with `npm`

```bash
> git clone https://github.com/Advanced-Computer-Lab-2022/Linear-Depression
> cd Linear-Depression/
> cd server && npm i && cd -
> cd client && npm i -f && cd -
```

## How to use

To run backend 
```bash
cd server && nodemon src/start.ts
```
To run frontend
```bash
cd client && npm start
```
the backend server and client will be running on the specified ports on your env files.

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

<details>
    <summary>
        envs
    </summary>


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


</details>

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

## Generate API Documentation

```bash
> npm run generate-docs
```

## Credits

- [Clean code](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
- [RESTful Web API Patterns and Practices Cookbook](https://learning.oreilly.com/library/view/restful-web-api/9781098106737/)
- [Designing Data Intensive Applications](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/)
- [Mongoose docs](https://mongoosejs.com/docs/)
- [Express docs](https://expressjs.com/en/4x/api.html)
- [ReactJs docs](https://reactjs.org/docs/getting-started.html)
- [Redux docs](https://redux.js.org/api/api-reference)
- [NodeJs docs](https://nodejs.org/en/docs/)

## Feedback 🥹

If you have any feedback, please reach out to us at [ibrahim.abouelenein@student.guc.edu.eg](mailto:ibrahim.abouelenein@student.guc.edu.eg)

