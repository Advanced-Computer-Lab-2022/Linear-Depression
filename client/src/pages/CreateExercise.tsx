import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IQuestionProps from "src/types/Question";

import {
    FloatingButton,
    GroupRadioButton,
    QuestionCard,
    QuestionTitle,
    Title,
    SubmitButton,
    Header,
    Navbar
} from "@internals/components";
import { AddQuestion } from "@internals/modals";
import { addExercise } from "@internals/services";

const CreateExercise = () => {
    const location = useLocation();

    const navigate = useNavigate();

    const { courseId, lessonId } = useParams();
    const title = location.state.title;

    const [questions, setQuestions] = useState<IQuestionProps[]>([]);
    const [openQuestionModal, setOpenQuestionModal] = useState(false);

    const handleOpenQuestionModal = () => {
        setOpenQuestionModal(true);
    };

    const handleCloseQuestionModal = (data: IQuestionProps) => {
        setOpenQuestionModal(false);
        if (data) {
            setQuestions([...questions, data]);
        }
    };

    const handleSetAnswer = (index: number, answer: number) => {
        const newQuestions = [...questions];
        newQuestions[index].answerIndex = answer;
        setQuestions(newQuestions);
        console.log(newQuestions);
    };

    const handleSubmit = () => {
        const data = {
            title,
            questions
        };
        addExercise(data, courseId, lessonId)
            .then(() => {
                navigate(`/courses/${courseId}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Navbar />
            <Header>
                <Title>{title}</Title>
                <SubmitButton variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </SubmitButton>
            </Header>
            {questions.map((question, index) => (
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
            <FloatingButton onClick={handleOpenQuestionModal}>
                <AddIcon />
            </FloatingButton>
            <AddQuestion open={openQuestionModal} onClose={handleCloseQuestionModal} />
        </>
    );
};

export default CreateExercise;
