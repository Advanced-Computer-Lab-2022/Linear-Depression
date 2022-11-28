import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IQuestionProps from "src/types/Question";
import styled from "styled-components";

import { FloatingButton, GroupRadioButton } from "@internals/components";
import { AddQuestion } from "@internals/modals";
import { addExercise } from "@internals/services";

const Title = styled.div`
    font-size: 2rem;
    font-weight: 800;
`;

const ExerciseCard = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
`;

const QuestionTitle = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
`;

const SubmitButton = styled(Button)`
    margin-top: 1rem;
    margin-left: auto;
    margin-right: 1rem;
    background-color: #3f51b5 !important;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
`;

const Exercise = () => {
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
        <div>
            <Header>
                <Title>{title}</Title>
                <SubmitButton variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </SubmitButton>
            </Header>
            {questions.map((question, index) => (
                <ExerciseCard>
                    <div key={index}>
                        <QuestionTitle>{question.question}</QuestionTitle>
                        <GroupRadioButton
                            questionNumber={index}
                            choices={question.choices}
                            onChange={handleSetAnswer}
                        />
                    </div>
                </ExerciseCard>
            ))}
            <FloatingButton onClick={handleOpenQuestionModal}>
                <AddIcon />
            </FloatingButton>
            <AddQuestion open={openQuestionModal} onClose={handleCloseQuestionModal} />
        </div>
    );
};

export default Exercise;
