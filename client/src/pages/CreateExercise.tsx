import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IQuestionProps from "src/types/Question";
import styled from "styled-components";
import * as Yup from "yup";

import {
    FloatingButton,
    GroupRadioButton,
    QuestionCard,
    QuestionTitle,
    Title,
    SubmitButton,
    Header,
    CourseNavbar
} from "@internals/components";
import { useToast } from "@internals/hooks";
import { AddQuestion, EditQuestion, EditExerciseTitle } from "@internals/modals";
import { addExercise, updateExercise } from "@internals/services";
import { Exercise } from "@internals/types";
import { validateFormData } from "@internals/utils";

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
const ExerciseAction = styled.div`
    margin-left: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const CancelButton = styled(SubmitButton)`
    background-color: #d32f2f;
`;

const CreateExercise: React.FC<{
    edit?: boolean;
    exercise?: Exercise;
    exerciseId?: string;
}> = ({ exercise, edit, exerciseId }) => {
    const location = useLocation();

    const navigate = useNavigate();

    const { courseId, lessonId } = useParams();
    const [title, setTitle] = useState(exercise ? exercise.title : location.state.title);
    const [questions, setQuestions] = useState<IQuestionProps[]>(exercise ? exercise.questions : []);
    const [openQuestionModal, setOpenQuestionModal] = useState(false);
    const [openEditQuestionModal, setOpenEditQuestionModal] = useState(false);
    const [openEditExerciseTitleModal, setOpenEditExerciseTitleModal] = useState(false);
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
        setEditQuestionIndex(index);
        setOpenEditQuestionModal(true);
    };

    const handleCloseEditQuestionModal = (data: IQuestionProps) => {
        setOpenEditQuestionModal(false);
        if (data) {
            const newQuestions = [...questions];
            newQuestions[editQuestionIndex] = data;
            setQuestions(newQuestions);
        }
    };

    const handleOpenEditExerciseTitle = () => {
        setOpenEditExerciseTitleModal(true);
    };

    const handleCloseEditExerciseTitleModal = (data: string) => {
        setOpenEditExerciseTitleModal(false);
        if (data) {
            setTitle(data);
        }
    };

    const deleteQuestion = (index: number) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
        if (formErrors.has(`question${index}Answer`)) {
            formErrors.delete(`question${index}Answer`);
        }
    };
    const validationRules: any = {};
    for (let i = 0; i < questions.length; i++) {
        validationRules[`question${i}Answer`] = Yup.number().min(0, "Please select a correct answer") as any;
    }
    const handleSetAnswer = (index: number, answer: number) => {
        const newQuestions = [...questions];
        newQuestions[index].answerIndex = answer;
        setQuestions(newQuestions);
    };

    const handleSubmit = () => {
        setLoading(true);
        const formData: any = {};
        for (let i = 0; i < questions.length; i++) {
            formData[`question${i}Answer`] = questions[i].answerIndex >= 0 ? questions[i].answerIndex : -1;
        }
        validateFormData(formData, validationRules)
            .then(() => {
                const exercise = {
                    title,
                    questions
                };
                if (questions.length == 0) {
                    setLoading(false);
                    showToast({ message: "Please add at least one question", type: "error" });
                    return;
                }
                if (edit) {
                    updateExercise(exercise, courseId, lessonId, exerciseId)
                        .then(() => {
                            setLoading(false);
                            showToast({ message: "Exercise Updated successfully", type: "success" });
                            navigate(`/courses/${courseId}`);
                        })
                        .catch(() => {
                            setLoading(false);
                            showToast({ message: "Failed to update Exercise . Try later", type: "error" });
                        });
                } else {
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
                }
            })
            .catch((errors) => {
                setFormErrors(errors);
                setLoading(false);
            });
    };

    return (
        <>
            <CourseNavbar />
            <Header>
                <HorizontalContainer>
                    <Title>{title}</Title>
                    <ModeEditIcon
                        sx={{
                            fontSize: "1.7",
                            margin: "5px",
                            marginLeft: "15px",
                            "&:hover": {
                                fontSize: "2rem"
                            }
                        }}
                        onClick={handleOpenEditExerciseTitle}
                    />
                </HorizontalContainer>
                <ExerciseAction>
                    {edit ? (
                        <SubmitButton loading={loading} variant="contained" color="primary" onClick={handleSubmit}>
                            Update
                        </SubmitButton>
                    ) : (
                        <SubmitButton loading={loading} variant="contained" color="primary" onClick={handleSubmit}>
                            {" "}
                            submit
                        </SubmitButton>
                    )}
                    <CancelButton
                        variant="contained"
                        color="error"
                        onClick={() => {
                            navigate(`/courses/${courseId}`);
                        }}
                    >
                        {" "}
                        Cancel
                    </CancelButton>
                </ExerciseAction>
            </Header>
            {questions.map((question, index) =>
                !formErrors.has(`question${index}Answer`) ? (
                    <QuestionCard>
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
                            {exercise && (
                                <GroupRadioButton
                                    answer={question.answerIndex}
                                    questionNumber={index}
                                    choices={question.choices}
                                    onChange={handleSetAnswer}
                                />
                            )}
                            {!exercise && (
                                <GroupRadioButton
                                    answer={question.answerIndex}
                                    questionNumber={index}
                                    choices={question.choices}
                                    onChange={handleSetAnswer}
                                />
                            )}
                        </div>
                    </QuestionCard>
                ) : (
                    <>
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
            {openEditQuestionModal && (
                <EditQuestion
                    open={openEditQuestionModal}
                    onClose={handleCloseEditQuestionModal}
                    questionToEdit={questions[editQuestionIndex]}
                />
            )}
            {openEditExerciseTitleModal && (
                <EditExerciseTitle
                    open={openEditExerciseTitleModal}
                    onClose={handleCloseEditExerciseTitleModal}
                    titleToEdit={title}
                />
            )}
        </>
    );
};

export default CreateExercise;
