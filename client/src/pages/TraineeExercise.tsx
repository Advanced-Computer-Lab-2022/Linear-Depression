import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Container, CourseContentTitle, HorizontalContainer } from "./Lesson";
import {
    GroupRadioButton,
    Header,
    QuestionCard,
    QuestionTitle,
    SolvedQuestion,
    SubmitButton,
    Title,
    TotalGrade,
    CourseNavbar,
    ContentAccordion
} from "@internals/components";
import { useFetchExerciseById, useFetchEvaluation, useFetchMyEnrollment, useFetchCourseById } from "@internals/hooks";
import { getEnrollment, useAppDispatch, useAppSelector } from "@internals/redux";
import { submitExercise, updateEnrollment, updateExerciseOfLessonAsCompleted } from "@internals/services";

const SideMenu = styled.div`
    width: 50%;
`;

const TraineeExercise = () => {
    const { courseId, lessonId, exerciseId } = useParams();

    useFetchMyEnrollment(courseId);
    useFetchCourseById(courseId);

    const course = useAppSelector((state) => state.course);
    const enrollment = useAppSelector((state) => state.enrollment);

    const dispatch = useAppDispatch();

    const { exercise, answers, setAnswers } = useFetchExerciseById();
    const { data } = exercise;

    const { evaluation, setEvaluation } = useFetchEvaluation();

    const handleSetAnswer = (index: number, answer: number) => {
        const newAnswers = [...answers];
        newAnswers[index] = answer;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        submitExercise(courseId, lessonId, exerciseId, answers)
            .then((data) => {
                const newEnrollment = updateExerciseOfLessonAsCompleted(enrollment.data, lessonId, exerciseId);
                updateEnrollment(enrollment.data?._id, newEnrollment)
                    .then(() => {
                        console.log("Updated enrollment", newEnrollment);
                        dispatch(getEnrollment(courseId));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                setEvaluation({
                    data: data,
                    loading: false,
                    error: false
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (!data) {
        return (
            <>
                <CourseNavbar />
                <div
                    style={{
                        marginLeft: "10px"
                    }}
                >
                    <br />
                    <Skeleton height={40} width={200} />
                    <br />
                    <Skeleton height={250} width={900} />
                    <br />
                    <Skeleton height={250} width={900} />
                    <br />
                </div>
            </>
        );
    }

    if (evaluation.data) {
        return (
            <>
                <CourseNavbar />
                <HorizontalContainer>
                    <Container>
                        <Header>
                            <Title>{data.title}</Title>
                            <TotalGrade totalGrade={evaluation.data.totalGrade} />
                        </Header>

                        {data.questions.map((question, index) => (
                            <QuestionCard>
                                <div key={index}>
                                    <SolvedQuestion question={question} evaluation={evaluation.data.results[index]} />
                                </div>
                            </QuestionCard>
                        ))}
                    </Container>
                    <SideMenu>
                        <CourseContentTitle>Course Content</CourseContentTitle>
                        {course.data?.lessons.map((lesson) => {
                            return (
                                <div>
                                    <ContentAccordion key={lesson._id} lesson={lesson} showLessonStatus={true} />
                                </div>
                            );
                        })}
                    </SideMenu>
                </HorizontalContainer>
            </>
        );
    } else {
        return (
            <>
                <CourseNavbar />
                <HorizontalContainer>
                    <Container>
                        <Header>
                            <Title>{data.title}</Title>
                            <SubmitButton variant="contained" color="primary" onClick={handleSubmit}>
                                Submit
                            </SubmitButton>
                        </Header>
                        {data.questions.map((question, index) => (
                            <QuestionCard>
                                <div key={index}>
                                    <QuestionTitle>{question.question}</QuestionTitle>
                                    <GroupRadioButton
                                        questionNumber={index}
                                        choices={question.choices}
                                        onChange={handleSetAnswer}
                                    />
                                </div>
                            </QuestionCard>
                        ))}
                    </Container>
                    <SideMenu>
                        <CourseContentTitle>Course Content</CourseContentTitle>
                        {course.data?.lessons.map((lesson) => {
                            return (
                                <div>
                                    <ContentAccordion key={lesson._id} lesson={lesson} showLessonStatus={true} />
                                </div>
                            );
                        })}
                    </SideMenu>
                </HorizontalContainer>
            </>
        );
    }
};

export default TraineeExercise;
