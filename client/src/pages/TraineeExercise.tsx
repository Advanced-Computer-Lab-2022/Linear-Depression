import { useParams } from "react-router-dom";

import {
    GroupRadioButton,
    Header,
    QuestionCard,
    QuestionTitle,
    SolvedQuestion,
    SubmitButton,
    Title,
    TotalGrade,
    Navbar
} from "@internals/components";
import { useFetchExerciseById, useFetchEvaluation } from "@internals/hooks";
import { submitExercise } from "@internals/services";

const TraineeExercise = () => {
    const { courseId, lessonId, exerciseId } = useParams();

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
                <Navbar />
                <div>Loading...</div>
            </>
        );
    }

    if (evaluation.data) {
        return (
            <div>
                <Navbar />
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
            </div>
        );
    } else {
        return (
            <div>
                <Navbar />
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
            </div>
        );
    }
};

export default TraineeExercise;
