import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import IQuestionProps from "src/types/Question";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

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
import { AddQuestion, EditQuestion } from "@internals/modals";
import { addExercise } from "@internals/services";
import * as Yup from "yup";
import { validateFormData } from "@internals/utils";
import { useToast } from "@internals/hooks";

const ErrorCourseCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
    border: 1px solid #ff0000;
`;
const HorizontalContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const QuestionAction = styled.div`
    margin-left: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const CreateExercise = () => {
    const location = useLocation();

    const navigate = useNavigate();

    const { courseId, lessonId } = useParams();
    const title = location.state.title;

    const [questions, setQuestions] = useState<IQuestionProps[]>([]);
    const [openQuestionModal, setOpenQuestionModal] = useState(false);
    const [openEditQuestionModal, setOpenEditQuestionModal] = useState(false);
    const [editQuestionIndex, setEditQuestionIndex] = useState(-1);
    const [formErrors, setFormErrors] = useState(new Map());
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const handleOpenQuestionModal = () => {
        setOpenQuestionModal(true);
    };

    const handleCloseQuestionModal = (data: IQuestionProps) => {
        setOpenQuestionModal(false);
        if (data) {
            setQuestions([...questions, data]);
        }
    };

    const handleOpenEditQuestion = (index: number) => {
        setOpenEditQuestionModal(true);
        setEditQuestionIndex(index);
    };

    const handleCloseEditQuestionModal = (data: IQuestionProps) => {
        setOpenEditQuestionModal(false);
        if (data) {
            const newQuestions = [...questions];
            newQuestions[editQuestionIndex] = data;
            setQuestions(newQuestions);
        }
    };

    const deleteQuestion = (index: number) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };
    const validationRules: any = {};
    for (let i = 0; i < questions.length; i++) {
        validationRules[`question${i}Answer`] = Yup.number().min(0, "Please select a correct answer") as any;
    }
    const handleSetAnswer = (index: number, answer: number) => {
        const newQuestions = [...questions];
        newQuestions[index].answerIndex = answer;
        setQuestions(newQuestions);
        console.log(newQuestions);
    };

    const handleSubmit = () => {
        setLoading(true);
        const formData: any = {};
        for (let i = 0; i < questions.length; i++) {
            formData[`question${i}Answer`] = questions[i].answerIndex ? questions[i].answerIndex : -1;
        }
        validateFormData(formData, validationRules)
            .then((x) => {
                console.log(x);
                const exercise = {
                    title,
                    questions
                };
                addExercise(exercise, courseId, lessonId)
                    .then(() => {
                        setLoading(false);
                        showToast({ message: "Exercise created successfully", type: "success" });
                        navigate(`/courses/${courseId}`);
                    })
                    .catch(() => {
                        setLoading(false);
                        showToast({ message: "Failed to create exercise . Try later", type: "error" });
                    });
            })
            .catch((errors) => {
                setFormErrors(errors);
                setLoading(false);
            });
    };

    return (
        <>
            <Navbar />
            <Header>
                <Title>{title}</Title>
                <SubmitButton loading={loading} variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </SubmitButton>
            </Header>
            {questions.map((question, index) =>
                !formErrors.has(`question${index}Answer`) ? (
                    <QuestionCard>
                        <div key={index}>
                            <HorizontalContainer>
                                <QuestionTitle>{question.question}</QuestionTitle>
                                <QuestionAction>
                                    <DeleteIcon
                                        onClick={() => {
                                            deleteQuestion(index);
                                        }}
                                        sx={{
                                            color: "red",
                                            "&:hover": {
                                                fontSize: "1.8rem"
                                            }
                                        }}
                                    />
                                </QuestionAction>
                            </HorizontalContainer>
                            <GroupRadioButton
                                questionNumber={index}
                                choices={question.choices}
                                onChange={handleSetAnswer}
                            />
                        </div>
                    </QuestionCard>
                ) : (
                    <>
                        <ErrorCourseCard>
                            <div key={index}>
                                <HorizontalContainer>
                                    <QuestionTitle>{question.question}</QuestionTitle>
                                    <QuestionAction>
                                        <DeleteIcon
                                            onClick={() => {
                                                deleteQuestion(index);
                                            }}
                                            sx={{ color: "red" }}
                                        />
                                    </QuestionAction>
                                </HorizontalContainer>
                                <GroupRadioButton
                                    questionNumber={index}
                                    choices={question.choices}
                                    onChange={handleSetAnswer}
                                />
                            </div>
                        </ErrorCourseCard>
                        <Typography variant="caption" color="error" sx={{ marginLeft: "1rem" }}>
                            {formErrors.get(`question${index}Answer`)}
                        </Typography>
                    </>
                )
            )}
            <FloatingButton onClick={handleOpenQuestionModal}>
                <AddIcon />
            </FloatingButton>
            <AddQuestion open={openQuestionModal} onClose={handleCloseQuestionModal} />
            <EditQuestion
                open={openEditQuestionModal}
                onClose={handleCloseEditQuestionModal}
                questionToEdit={questions[editQuestionIndex]}
            />
        </>
    );
};

export default CreateExercise;
